import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {
  DeviceService,
  Hotel,
  HotelLocation,
  HotelRepo,
  HotelSearch,
  StorageService
} from '../../../../common/index';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {CSTORAGE} from '../../../../app.constants';

@Component({
  selector: 'home-top-hotel',
  templateUrl: './top-hotel.component.html',
  styleUrls: ['top-hotel.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeTopHotelComponent extends AppPage {

  params: HotelSearch = new HotelSearch();
  hotels: Hotel[] = [];
  locations: Array<Location> = [];

  itemsPerRow: number = 4;
  limit: number = 20;

  carouselOptions: any = {
    items: 3,
    navigation: true,
    nav: !this.isMobile,
    navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    margin: this.isMobile ? 15 : 20,
    dots: false
  };

  constructor(private _router: Router,
              private _hotelRepo: HotelRepo,
              private _storage: StorageService,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);

    this.carouselOptions = Object.assign(this.carouselOptions, {
      nav: !this.isMobile,
      margin: this.isMobile ? 15 : 20,
    });
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event: any) {

    const width = window.innerWidth;

    if (width < 768) {
      this.itemsPerRow = 1;
    } else if (width < 992) {
      this.itemsPerRow = 2;
    } else if (width < 1200) {
      this.itemsPerRow = 3;
    } else {
      this.itemsPerRow = 4;
    }
  }

  ngOnInit() {
    if (this.isDesktop) {
      this.limit = 4;
    }

    this.getHotels();

  }

  // fn get hotels
  getHotels = (code: any = null): Promise<any> => {

    return this._hotelRepo
      .getPreferentialHotels(0, this.limit)
      .then(
        (res: any) => {
          this.params = new HotelSearch(res.data.parameters);
          this.hotels = res.data.hotels.map((hotel) => new Hotel(hotel));
        }
      );
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

  // fn generate location params
  generateLocationParams = (location: HotelLocation): any => {

    let now = moment();
    return Object.assign({}, location, {
      title: location.name,
      checkIn: now.format('YYYY-MM-DD'),
      checkOut: now.add(1, 'day').format('YYYY-MM-DD'),
      rooms: 1,
      adults: 1,
      nights: 1,
      sortIndex: 0
    });
  };

  //set local storage favorite location
  onSelectDestination = (location: HotelLocation): void => {
    this._storage.setItem(CSTORAGE.HOTEL_DESTINATION, location);
  };
}
