import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {PopupBase} from '../../../../../../components/popup';
import {TourRepo, TourArrival, TourSearch} from '../../../../../../common';
import {Router, ActivatedRoute} from '@angular/router';
import {TOUR_TYPE} from '../../../../../../app.constants';

@Component({
  selector: 'app-tour-arrival-popup',
  templateUrl: './tour-arrival-popup.component.html',
  styleUrls: [
    './tour-arrival-popup.component.less',
    '../../../../search/arrival/mobile/tour-arrival-mobile.component.less'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TourArrivalPopup extends PopupBase {

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  params: any;
  isLoading: boolean = false;
  arrivals: TourArrival[] = [];

  constructor(private _tourRepo: TourRepo,
              private _router: Router,
              protected _activatedRoute: ActivatedRoute) {
    super();
    this.onInit = this.init;
  }

  // fn initial
  init = (): void => {
    if (!this.arrivals.length) {
      this.getArrivals(this.params.type || TOUR_TYPE.INTERNATIONAL);
    }
  };

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  // fn get arrivals
  getArrivals = (type: string = TOUR_TYPE.INTERNATIONAL) => {
    this.isLoading = true;

    return this._tourRepo
      .getTourArrivalBy(type)
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

  // fn on select arrival
  onSelectArrival = (arrival: TourArrival): void => {

    this.select.emit(arrival);
    this.hide();
  };

}
