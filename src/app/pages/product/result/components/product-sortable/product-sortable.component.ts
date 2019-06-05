import {Component, ViewEncapsulation, EventEmitter, Output, Input} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {PRODUCT_TYPE} from '../../../../../app.constants';
import {DeviceService} from '../../../../../common';
@Component({
  selector: 'app-product-sortable',
  templateUrl: './product-sortable.component.html',
  styleUrls: ['./product-sortable.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductSortableDesktopComponent extends AppBase {

  @Input('params') params: any = {};
  @Output('select') select: EventEmitter<any> = new EventEmitter<any>();

  sorts = [
    {value: 0, display: 'Giá tăng dần'},
    {value: 1, display: 'Giá giảm dần'},
    {value: 2, display: 'Xếp hạng'}
  ];

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  //on select sort
  onSelectSort = (type) => {
    this.select.emit(type);
  };

  //check active sort
  activeSort(value) {
    if (value === Number(this.params.sortIndex)) {
      return 'active';
    }
  };

  //return type product by text
  typeProduct = (params) => {
    if (!!params.type) {
      switch (params.type.toLowerCase()) {
        case PRODUCT_TYPE.ACTIVITIES: {
          return 'Vé vui chơi';
        }
        case PRODUCT_TYPE.FREE_AND_EASY: {
          return 'Tour free and easy';
        }
        default: {
          return 'Tất cả hoạt động';
        }

      }
    }
    else {
      return 'Tất cả hoạt động';
    }
  };


}
