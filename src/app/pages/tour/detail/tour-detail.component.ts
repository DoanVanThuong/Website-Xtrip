import {Component} from '@angular/core';
import {AppPage} from '../../../app.base';
import {DeviceService, SeoService} from '../../../common/services';
import {HttpClient} from '@angular/common/http';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Tour} from '../../../common/entities';

@Component({
  selector: 'app-tour-detail',
  template: `
    <app-tour-detail-mobile *ngIf="isMobile"></app-tour-detail-mobile>
    <app-tour-detail-desktop *ngIf="isDesktop"></app-tour-detail-desktop>
  `
})

export class TourDetailComponent extends AppPage {

  code: string = '';
  tour: Tour = new Tour();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _device: DeviceService,
              private _seo: SeoService,
              private _http: HttpClient) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {

    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((params: any): void => {

        if (!!params.code) {
          this.code = params.code;
        }

        if (!!params.alias) {
          this.code = this.tour.getCode(params.alias);
        }

        this.getTour(this.code);
      });
  }

  // fn get tour detail
  getTour = (code: string = '') => {

    this._http
      .get(`${this.getBaseURL()}/tour/detail/${code}`)
      .subscribe((res: any) => {

        if (res.code.toLowerCase() === 'success') {
          this.tour = new Tour(res.data);

          this._seo
            .setTitle(this.tour.name)
            .setDeepLink(`tour/${this.tour.code}/detail`)
            .updateTags([
              {name: 'description', content: this.tour.name},
              {name: 'keywords', content: this.tour.name},
              {property: 'og:image', content: this.utilityHelper.markImageSize(this.tour.photo.src)},
              {property: 'og:description', content: this.tour.name},
              {property: 'og:title', content: this.tour.name},
              {property: 'og:url', content: this._router.url}
            ]);
        }
      });
  };
}
