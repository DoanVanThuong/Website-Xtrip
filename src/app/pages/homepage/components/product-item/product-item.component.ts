import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {FreeTourActivityItem, Product} from '../../../../common/entities';
import * as moment from "moment";

@Component({
  selector: 'home-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeProductItemComponent extends AppPage {

  @Input() product: FreeTourActivityItem = new FreeTourActivityItem();
  @Input() queryParams: any = {};

  isToday: boolean = true;

  constructor() {
    super();
  }

  ngOnChanges(): void {
    this.isToday = this.handleToday(this.product.dateNotice);
  }

  // fn check date notice is less then or equal today
  handleToday = (date: string = null): boolean => {
    if (!date) {
      return true;
    }

    return moment().diff(moment(date), 'second') >= 0;
  };

  // fn generate query params
  generateQueryParameters = (): any => {
    return this.utilityHelper.buildQueryParams(Object.assign({}, this.queryParams));
  };
}
