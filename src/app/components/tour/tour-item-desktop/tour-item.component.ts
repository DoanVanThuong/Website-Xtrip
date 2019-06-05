import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppPage } from '../../../app.base';
import { Tour, TourSearch } from '../../../common/entities';
import { TOUR_TYPE } from '../../../app.constants';

export const TYPE = {
  EVERYDAY: 1,
  ONE: 0,
  MORE: 2 // > 1
};

@Component({
  selector: 'home-tour-item-desktop',
  templateUrl: './tour-item.component.html',
  styleUrls: ['tour-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourItemDesktopComponent extends AppPage {

  @Input() tour: Tour = new Tour();
  @Input('depart') isDepartTime: boolean = true;
  @Input() type: string = '';
  TOUR_TYPE: any = TOUR_TYPE;

  constructor(private _router: Router) {
    super();
  }

  // fn detect tour types
  checkTypeDateTour = (type: number = 0, date: string, dates: Array<any> = []) => {

    switch (type) {
      case TYPE.ONE: {
        // tour 1 ngày
        return moment(date).format('DD/MM/YYYY');
      }
      case TYPE.EVERYDAY: {
        // tour hàng ngày

        return 'Hằng ngày';
      }
      default: {
        // tour nhiều ngày
        let str = '';
        dates.slice(0, 1).map((item: any, index: number) => {
          str += moment(item).format('DD/MM/YYYY') + (index < (date.slice(0, 1).length - 1) ? ', +' : '');
        });

        return str;
      }
    }
  };

  generateTourParams = (tour: Tour): any => {
    return this.utilityHelper.buildQueryParams(Object.assign({
      title: tour.arrivalPlace,
      arrival: tour.arrivalCode,
      departure: tour.departCode,
      sortIndex: 0,
      type: tour.isInternational ? TOUR_TYPE.INTERNATIONAL : TOUR_TYPE.DOMESTIC
    }));
  };
}