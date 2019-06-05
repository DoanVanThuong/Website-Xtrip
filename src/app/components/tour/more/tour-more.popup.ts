import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PopupBase} from './../../popup/popup.base';
import {TourRepo} from '../../../common/repos/index';
import {Tour, TourJourney} from './../../../common/entities';

@Component({
  selector: 'tour-more-popup',
  templateUrl: './tour-more.popup.html',
  styleUrls: ['./tour-more.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourMorePopup extends PopupBase {

  @Input('tour') tour: Tour = new Tour();
  @Input('code') code: string = '';
  @Input('title') title: string = '';
  @Input('tab') tab: string = 'journey'; // rule | policy
  @Input('term') term: string = '';
  @Input('policy') policy: string = '';
  @Input('journey') journey: TourJourney = new TourJourney();

  constructor(private _tourRepo: TourRepo) {
    super();
  }

  // on initial
  ngOnInit() {

  }

  ngOnChanges() {

    if (this.code) {
      // this.getDetail(this.code);
      this.getJourney(this.code);
    }

    this.onSelectTab(null, this.tab);
  }

  onSelectTab = ($event, tab: string = '') => {
    this.tab = tab;
  };

  // fn get detail-item
  getJourney = (code: string = '') => {

    return this._tourRepo
      .getTourJourney(code)
      .then(
        (res: any) => {
          this.journey = res.data;
        }
      );
  };

  getDetail = (code: string = '') => {
    return this._tourRepo
      .getDetailTour(code)
      .then(
        (res: any) => {
          this.term = res.data.term;
          this.policy = res.data.policy;
        }
      );
  };
}
