import {Component, ViewEncapsulation, Input, PLATFORM_ID, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppBase} from '../../../../../app.base';
import {TOUR_TYPE} from '../../../../../app.constants';
import {TourArrival, TourRepo, StorageService, DeviceService, TourSearch} from '../../../../../common';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-tour-arrival-mobile',
  templateUrl: './tour-arrival-mobile.component.html',
  styleUrls: ['./tour-arrival-mobile.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class TourArrivalMobileComponent extends AppBase {

  @Input() themes?: string = 'default';

  tourSearch: TourSearch = new TourSearch({
    type: TOUR_TYPE.INTERNATIONAL
  });

  arrivals: TourArrival[] = [];
  isLoading: boolean = false;
  params: any = {};

  constructor(protected _router: Router,
              protected _tourRepo: TourRepo,
              protected _storage: StorageService,
              protected _activatedRoute: ActivatedRoute,
              private _device: DeviceService,
              @Inject(PLATFORM_ID) public platformID: string) {
    super();

    this.setDeviceMode(_device);
  };

  ngOnInit() {
    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((params: any): void => {
        this.params = params;
        this.tourSearch = new TourSearch(params);

        this.getArrivals();
      });
  }

  // fn get arrivals
  getArrivals = () => {
    this.isLoading = true;

    return this._tourRepo
      .getTourArrivalBy(this.tourSearch.type)
      .then(
        (res: any) => {
          this.arrivals = res.data.map((arrival: any) => new TourArrival(arrival));
          this.isLoading = false;
        },
        (errors: any) => {
          this.isLoading = false;
        }
      );
  };

  // fn gen query params
  genQueryParams = (arrival: TourArrival = null): any => {
    return this.utilityHelper.buildQueryParams(
      /*this.tourSearch.setKeys({
        // arrival: arrival.code
      })*/
    )
  }
}
