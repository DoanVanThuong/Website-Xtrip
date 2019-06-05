import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {DeviceService, SeoService} from '../../../../common/services';
import {HotelReservation} from '../../../../common/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {makeStateKey, TransferState} from '@angular/platform-browser';

const HOTEL = makeStateKey('BOOKING_HOTEL');

@Component({
  selector: 'booking-hotel-detail',
  template: `
    <booking-hotel-detail-mobile *ngIf="isMobile"></booking-hotel-detail-mobile>
    <booking-hotel-detail-desktop *ngIf="isDesktop"></booking-hotel-detail-desktop>
  `,
})
export class BookingHotelDetailComponent extends AppPage {

  hotel: HotelReservation = new HotelReservation();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _transferState: TransferState,
              protected _device: DeviceService,
              @Inject(PLATFORM_ID) private platformID: string,
              private _seo: SeoService,
              private _http: HttpClient) {
    super();
    this.setDeviceMode(_device);
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe((params: any) => {

      this._seo.setDeepLink(`hotel/mybooking/${params.code}`);

      this.getHotel(params.code);
    });
  }

  // fn get hotel
  getHotel = (code: string = '') => {
    this._http
      .post(`${this.getBaseURL()}/booking/hotel/mybooking/detail/${code}`, null)
      .subscribe(
        (res: any) => {
          if (res.code.toLowerCase() === 'success') {

            this.hotel = new HotelReservation(res.data);

            this._seo
              .setTitle(this.hotel.hotelName)
              .updateTags([
                {name: 'description', content: this.hotel.hotelName},
                {name: 'keywords', content: this.hotel.hotelName},
                {property: 'og:title', content: this.hotel.hotelName},
                {property: 'og:description', content: this.hotel.hotelName},
                {property: 'og:image', content: this.utilityHelper.markImageSize(this.hotel.photo.url)},
                {property: 'og:url', content: this._router.url},
              ]);
          }
        });
  };
}
