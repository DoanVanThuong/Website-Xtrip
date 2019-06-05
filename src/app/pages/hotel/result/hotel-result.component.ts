import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService, SeoService} from '../../../common/services';
import {HotelLocation, HotelSearch} from '../../../common/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-hotel-result',
  template: `
    <app-hotel-result-desktop *ngIf="isDesktop"></app-hotel-result-desktop>
    <app-hotel-result-mobile *ngIf="isMobile"></app-hotel-result-mobile>
  `
})
export class HotelResultComponent extends AppBase {

  hotelSearch: HotelSearch = new HotelSearch();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _device: DeviceService,
              private _seo: SeoService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit(): void {

    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((params: any): void => {

        this.hotelSearch = new HotelSearch(new HotelSearch(Object.assign({}, params, {
          destination: new HotelLocation(params)
        })));

        this._seo
          .setDeepLink(`hotel/result`, {
            name: this.hotelSearch.name,
            checkIn: this.hotelSearch.checkIn,
            checkOut: this.hotelSearch.checkOut,
            destinationType: this.hotelSearch.destination.destinationType,
            rooms: this.hotelSearch.rooms,
            adults: this.hotelSearch.adults,
            latitude: this.hotelSearch.latitude,
            longitude: this.hotelSearch.longitude,
          });
      });
  }

}
