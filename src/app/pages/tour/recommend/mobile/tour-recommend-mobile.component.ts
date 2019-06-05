import {Component, Inject, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {TourRepo} from '../../../../common/repos';
import {DeviceService} from '../../../../common/services';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {Tour, Error} from "../../../../common/entities";

@Component({
  selector: 'app-tour-recommend-mobile',
  templateUrl: './tour-recommend-mobile.component.html',
  styleUrls: ['./tour-recommend-mobile.component.less',],
  encapsulation: ViewEncapsulation.None
})

export class TourRecommendMobileComponent extends AppPage {

  params: any = null;
  code: string = '';

  heading: string = '';
  isLoading: boolean = false;
  tours: Tour[] = [];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _tourRepo: TourRepo,
              private _device: DeviceService,
              @Inject(PLATFORM_ID) public platformID: string) {
    super();

    this.setDeviceMode(_device);
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
        this.code = params.code;
        this.heading = params.name;

        this.getRecommendTours();
      });
  }

  // fn scroll window
  onScrollDown = (): void => {

    if (!this.isLoading && this.tours.length > 0) {
      this.offset += this.limit;
      this.getRecommendTours();
    }
  };

  // fn get recommend tours with
  getRecommendTours = (code: string = null): Promise<any> => {

    this.isLoading = true;
    return this._tourRepo
      .getRecommendToursWith(this.code, this.offset, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;
          this.tours = this.tours.concat(res.data.tours.map(tour => new Tour(tour)));
        },
        (errors: Error[] = []) => {
          this.isLoading = false;
        }
      )
  }
}
