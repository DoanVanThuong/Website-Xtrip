import {Component, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService, SeoService} from '../../../common/services';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Hotel, HotelSearch, Tour} from '../../../common/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-hotel-detail',
  template: `
    <app-hotel-detail-desktop *ngIf="isDesktop"></app-hotel-detail-desktop>
    <app-hotel-detail-mobile *ngIf="isMobile"></app-hotel-detail-mobile>
  `,
  encapsulation: ViewEncapsulation.None
})
export class HotelDetailComponent extends AppBase {

  code: string = '';
  hotel: Hotel = new Hotel();
  hotelSearch: HotelSearch = new HotelSearch();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _device: DeviceService,
              private _seo: SeoService,
              private _http: HttpClient) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {

    // combineLatest(
    //   this._activatedRoute.params,
    //   this._activatedRoute.queryParams
    // )
    //   .pipe(
    //     map(([params, qParams]) => ({...params, ...qParams}))
    //   )
    //   .subscribe((params: any): void => {
    //     this.code = params.code;
    //     this.hotelSearch = new HotelSearch(params);

    //     // this.getHotel(this.code);
    //   });
  }

  // fn get hotel detail
  getHotel = (code: string = '') => {

    this._http
      .get(`${this.getBaseURL()}/hotel/detail/${code}`)
      .subscribe((res: any) => {

        if (res.code.toLowerCase() === 'success') {

          this.hotel = new Hotel(res.data.hotel);

          this._seo
            .setTitle(this.hotel.name)
            .setDeepLink(`hotel/${this.hotel.code}/detail`, {
              checkIn: this.hotelSearch.checkIn,
              checkOut: this.hotelSearch.checkOut,
              rooms: this.hotelSearch.rooms,
              adults: this.hotelSearch.adults
            })
            .updateTags([
              {name: 'description', content: this.hotel.name},
              {name: 'keywords', content: this.hotel.name},
              {property: 'og:image', content: this.utilityHelper.markImageSize(this.hotel.photo.url)},
              {property: 'og:description', content: this.hotel.fullAddress},
              {property: 'og:title', content: this.hotel.name}
            ]);
        }
      });
  };
}
