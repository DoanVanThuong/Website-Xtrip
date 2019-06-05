import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {AppBase} from '../../../../app.base';
import {DeviceService, SeoService} from '../../../../common/services';
import {HttpClient} from '@angular/common/http';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Airport, FlightReservation} from '../../../../common/entities';

const FLIGHT = makeStateKey('BOOKING_FLIGHT');

@Component({
  selector: 'app-booking-flight-detail',
  template: `
    <booking-flight-detail-mobile *ngIf="isMobile"></booking-flight-detail-mobile>
    <booking-flight-detail-desktop *ngIf="isDesktop"></booking-flight-detail-desktop>
  `,
})
export class BookingFlightDetailComponent extends AppBase {

  code: string = '';
  flight: FlightReservation = new FlightReservation();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _device: DeviceService,
              private _transferState: TransferState,
              private _http: HttpClient,
              private _seo: SeoService,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe((params: any) => {

      this._seo.setDeepLink(`flight/mybooking/${params.code}`);

      this.getFlight(params.code);
    });
  }

  // fn get flight
  getFlight = (code: string = '') => {
    this._http
      .post(`${this.getBaseURL()}/booking/flight/mybooking/detail/${code}`, null)
      .subscribe(
        (res: any) => {
          if (res.code.toLowerCase() === 'success') {

            this.flight = new FlightReservation(res.data.reservation);

            const title = this.getTitle(this.flight, res.data.airports);

            this._seo
              .setTitle(title)
              .updateTags([
                {name: 'description', content: title},
                {name: 'keywords', content: title},
                // {property: 'og:image', content: this.utilityHelper.markImageSize(title)},
                {property: 'og:description', content: title},
                {property: 'og:title', content: title},
                {property: 'og:title', content: this._router.url}
              ]);
          }
        });
  };

  getTitle = (flight: FlightReservation, airports: Airport[] = []): string => {
    let title = 'Chuyến bay ';
    if (this.flight.segments.length > 1) {
      title += 'khứ hồi ';
    }
    title += `từ ${this.findAirportWith(flight.segments[0].origin, airports, 'location')} đến ${this.findAirportWith(flight.segments[0].destination, airports, 'location')}`;

    return title;
  };

  findAirportWith = (code: string = '', list: any[] = [], field: string = ''): string => {
    for (let index in list) {
      const item = list[index];

      if (item.code === code) {
        return item[field];
      }
    }

    return 'Unknown';
  };

}



