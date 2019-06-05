import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {DeviceService, SeoService} from '../../../../common/services';
import {TourReservation} from '../../../../common/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

const TOUR = makeStateKey('BOOKING_TOUR');

@Component({
  selector: 'booking-tour-detail',
  template: `
    <booking-tour-detail-mobile *ngIf="isMobile"></booking-tour-detail-mobile>
    <booking-tour-detail-desktop *ngIf="isDesktop"></booking-tour-detail-desktop>
  `
})
export class BookingTourDetailComponent extends AppPage {

  code: string = '';
  tour: TourReservation = new TourReservation();

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

      this._seo.setDeepLink(`tour/mybooking/${params.code}`);

      this.getHotel(params.code);
    });
  }

  // fn get hotel
  getHotel = (code: string = '') => {
    this._http
      .post(`${this.getBaseURL()}/booking/tour/mybooking/detail/${code}`, null)
      .subscribe(
        (res: any) => {
          if (res.code.toLowerCase() === 'success') {

            this.tour = new TourReservation(res.data);

            this._seo
              .setTitle(this.tour.tourName)
              .updateTags([
                {name: 'description', content: this.tour.tourName},
                {name: 'keywords', content: this.tour.tourName},
                {property: 'og:title', content: this.tour.tourName},
                {property: 'og:description', content: this.tour.tourName},
                {property: 'og:image', content: this.utilityHelper.markImageSize(this.tour.photo.src)},
                {property: 'og:url', content: this._router.url},
              ]);
          }
        });
  };
}
