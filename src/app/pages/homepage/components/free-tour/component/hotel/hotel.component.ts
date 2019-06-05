import {
  Component,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
  ViewEncapsulation
} from '@angular/core';
import {AppPage} from "../../../../../../app.base";
import {
  FreeTourHotelItem,
  FreeTourPlaceItem,
  HotelLocation,
  HotelSearch
} from "../../../../../../common/entities";
import {DeviceService, StorageService} from "../../../../../../common/services";
import {isPlatformBrowser} from "@angular/common";
import * as moment from "moment";
import {CSTORAGE, DATE_FORMAT} from "../../../../../../app.constants";

@Component({
  selector: 'home-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['hotel.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeHotelComponent extends AppPage {

  @Input() hotels: FreeTourHotelItem[] = [];
  @Input() place: FreeTourPlaceItem = null;
  @Input() heading: string = '';
  @Input() description: string = '';
  @Input() checkIn: string = null;
  @Input() checkOut: string = null;
  @Input() params: any = {};

  hotelSearch: HotelSearch = new HotelSearch({});

  constructor(protected _device: DeviceService,
              private _storage: StorageService,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();
    this.setDeviceMode(_device);
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event) {

    if (isPlatformBrowser(this.platformID)) {
      const width = $(window).innerWidth();

      if (width < 992) {
        this.itemsPerRow = 2;
      } else if (width < 1200) {
        this.itemsPerRow = 3;
      } else {
        this.itemsPerRow = 4;
      }
    }
  }

  // generate query params
  generateQueryParams = (hotel: FreeTourHotelItem = null): any => {
    return this.utilityHelper.buildQueryParams(
      Object.assign({}, this.hotelSearch, {
          checkIn: moment(this.checkIn).format(DATE_FORMAT.VALUE),
          checkOut: moment(this.checkOut).format(DATE_FORMAT.VALUE),
        },
        this.params,
        !hotel ? {
          name: this.params.destinationName
        } : {
          name: hotel.name
        })
    );
  };

  // fn on select destination
  onLoadMore = (): void => {
    this._storage.setItem(CSTORAGE.HOTEL_DESTINATION, new HotelLocation({
      code: this.params.destinationCode,
      name: this.params.destinationType
    }));
  };
}
