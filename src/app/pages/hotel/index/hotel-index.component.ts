import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {Router} from '@angular/router';
import {HotelRepo} from '../../../common/repos';
import {Error, Hotel, HotelLocation, HotelSearch} from '../../../common/entities';
import {DeviceService, StorageService} from '../../../common/services';
import * as moment from 'moment';
import {CSTORAGE, DATE_FORMAT} from '../../../app.constants';

@Component({
  selector: 'app-tour-index',
  templateUrl: './hotel-index.component.html',
  styleUrls: ['./hotel-index.component.less',],
  encapsulation: ViewEncapsulation.None
})

export class HotelIndexComponent extends AppPage {

  hotels: Hotel[] = [];
  locations: Location[] = [];

  limit: number = 20;
  params: any = {};
  itemsPerRow: number = 4;
  locationsPerRow: number = 6;
  isLoading: boolean = false;

  constructor(private _router: Router,
              private _hotelRepo: HotelRepo,
              private _storage: StorageService,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    if (this.isMobile) {
      this._router.navigate(['/hotel/search']);
      return;
    }

    this.getHotels();
    this.getFavoriteDestinations();
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoadResize($event) {

    const width = window.innerWidth;
    if (width < 576) {
      this.locationsPerRow = 2;
    } else if (width < 768) {
      this.locationsPerRow = 3;
      this.itemsPerRow = 1;
    } else if (width < 992) {
      this.locationsPerRow = 4;
      this.itemsPerRow = 2;
    } else if (width < 1200) {
      this.locationsPerRow = 6;
      this.itemsPerRow = 3;
    } else {
      this.itemsPerRow = 4;
    }

  }

  // fn infinite scroll down
  onScrollDown = () => {
    if (!this.isLoading && this.hotels.length > 0) {
      this.offset += this.limit;
      this.getHotels();
    }
  };

  // fn get favourite destination
  getFavoriteDestinations = (): Promise<any> => {
    return this._hotelRepo
      .getFavourites()
      .then(
        (res: any) => {
          this.locations = res.data.map(location => new HotelLocation(location));
        }
      );
  };

  // fn get flights
  getHotels = (): Promise<any> => {
    this.isLoading = true;

    return this._hotelRepo
      .getPreferentialHotels(this.offset, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;

          this.params = res.data.parameters;
          this.hotels = this.hotels.concat(res.data.hotels.map((hotel: any) => new Hotel(hotel)));

          if (!res.data.hotels.length) {
            this.offset -= this.limit;
          }

        }, (errors: Error[] = []) => {
          this.isLoading = false;
          this.offset -= this.limit;
        });
  };

  // fn generate location params
  generateLocationParams = (location: HotelLocation): any => {

    const now = moment().add(1, 'day');

    return this.utilityHelper.buildQueryParams(Object.assign(
      {},
      new HotelSearch(Object.assign({
          title: location.name,
          checkIn: now.format(DATE_FORMAT.VALUE),
          checkOut: now.add(1, 'day').format(DATE_FORMAT.VALUE),
          destinationCode: location.code,
        }, location)
      )));
  };

  // fn on select destination
  onSelectDestination = (location: Location): void => {
    this._storage.setItem(CSTORAGE.HOTEL_DESTINATION, location);
  };
}
