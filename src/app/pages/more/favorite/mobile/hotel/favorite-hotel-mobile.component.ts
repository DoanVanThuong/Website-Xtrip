import {Component, ElementRef} from '@angular/core';
import {Hotel, HotelRepo, HotelSearch, Spinner, StorageService} from '../../../../../common/index';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {AppPage} from '../../../../../app.base';
import {CSTORAGE} from './../../../../../app.constants';

@Component({
  selector: 'favorite-hotel-mobile',
  templateUrl: './favorite-hotel-mobile.component.html'
})
export class FavoriteHotelMobileComponent extends AppPage {

  hotels: Array<Hotel> = [];
  isLoading: boolean = false;

  constructor(protected hotelRepo: HotelRepo,
              private _router: Router,
              private _spinner: Spinner,
              private _storage: StorageService) {
    super();

  }

  ngOnInit() {
    this.onLoadHotels();
  }

  ngOnChanges() {
  }

  // fn on scroll down
  onScrollDown() {
    if (!this.isLoading) {
      this.offset += this.limit;
      this.onLoadHotels();
    }
  }

  // fn load hotels
  onLoadHotels = (): any => {
    this.isLoading = true;
    return this.hotelRepo
      .getHotelsFavorite(this.offset, this.limit)
      .then(
        (res: any) => {
          this.hotels = this.hotels.concat(res.data.items.map(hotel => hotel));
          this.isLoading = false;
        }
      )
      .catch(() => {
        this.isLoading = false;
      });
  };

  //delete a tour from list favorite
  onSelectFavorite(hotel: any, index: number = -1) {
    return this.hotelRepo
      .postFavoriteHotel(hotel.code)
      .toPromise()
      .then(
        (res: any) => {

          this.hotels.splice(index, 1);
        }
      );
  }

  // fn get any detail
  onOpenFavoriteItem = (hotel: any): any => {
    this._spinner.show('Đang cập nhật ...');

    return this.hotelRepo
      .getBestPriceHotel(hotel.code)
      .then(
        (res: any) => {

          let params = {
            checkIn: moment(res.data.checkIn).format('YYYY-MM-DD'),
            checkOut: moment(res.data.checkIn).add(res.data.nights, 'day').format('YYYY-MM-DD'),
            rooms: res.data.rooms,
            adults: res.data.adults,
            code: hotel.code
          };

          this._storage.setItem(CSTORAGE.BEST_HOTEL, res.data);

          this._router.navigate([`/hotel/${hotel.code}/detail`], {
            queryParams: params
          });

          this._spinner.hide();
        }
      );
  };


}