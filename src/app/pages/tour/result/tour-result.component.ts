import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService, SeoService, StorageService, TourSearch} from '../../../common';
import {CSTORAGE} from 'app/app.constants';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tour-result',
  template: `
    <app-tour-result-mobile *ngIf="isMobile"></app-tour-result-mobile>
    <app-tour-result-desktop *ngIf="isDesktop"></app-tour-result-desktop>
  `
})
export class TourResultComponent extends AppBase {

  tourSearch: TourSearch = new TourSearch();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _device: DeviceService,
              private _seo: SeoService,
              private _storage: StorageService) {
    super();

    this.setDeviceMode(this._device);
    this._storage.removeItem(CSTORAGE.TOUR_BOOKING);
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params: any) => {

      this.tourSearch = new TourSearch(params);

      this._seo
        .setDeepLink(`tour/result`, {
          title: this.tourSearch.title,
          arrival: this.tourSearch.arrival,
          type: this.tourSearch.type
        });
    });
  }
}
