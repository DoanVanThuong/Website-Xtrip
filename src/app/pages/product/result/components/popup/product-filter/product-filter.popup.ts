import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {PopupBase} from "../../../../../../components/popup";
import { ProductRepo } from 'app/common';
import * as _ from 'lodash';
import { ProductDestination } from 'app/common/entities/product-destination.entity';
@Component({
  selector: 'app-product-filter-popup',
  templateUrl: './product-filter.popup.html',
  styleUrls: ['./product-filter.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductFilterPopup extends PopupBase {

  @Input() params: any = {};

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() categoryData ?: EventEmitter<any> = new EventEmitter<any>();
  @Output() originalFilter ?: EventEmitter<any> = new EventEmitter<any>();

  filter: any = {
    prices: [0, 10000000],
    options: [],
    categories: []
  };

  productFilter: any = null;

  sliderPriceConfig: any = {
    behaviour: 'hover-snap',
    start: [0, 10000000],
    step: 1,
    range: {
      min: 0,
      max: 10000000
    },
    connect: true,
    animate: true,
    margin: 1
  };

  labelSlider = {
    price: {
      min: 0,
      max: 100000
    }
  };

  changedPrices: boolean = false;

  constructor(
    private _productRepo: ProductRepo
  ) {
    super();
  }

  // on initial
  ngOnInit() {
    this.onGetFilter(this.params);
  };

  ngOnChanges() {
    this.onGetFilter(this.params);
  }

  //get filter-popup
  onGetFilter(params) {
    let paramsFilter = Object.assign({}, params, {
      destination: new ProductDestination({
        id: params.destination
      })
    });

    return this._productRepo
      .filterProduct(paramsFilter)
      .then(
        (res: any) => {
          this.productFilter = res.data;
          this.setRangeSlider(this.productFilter, this.params);
          this.setOptionsAndCategoriesData(this.params);
          this.checkDisableReset();
          this.categoryData.emit(_.pickBy(this.productFilter, (obj: any) => obj.code === 'categories'));

          this.originalFilter.emit(this.productFilter);
        },
        (errors: Array<Error> = []) => {
        }
      );
  };

  // fn set range slider
  setRangeSlider = (originalFilter, params: any = {}) => {
    if (!!originalFilter) {
      let originalPrice = _.pickBy(originalFilter, (obj: any) => obj.code === 'prices');
      this.labelSlider.price = {
        min: !!this.params.prices ? this.params['prices'].split(',')[0] : originalPrice[0].data[0].value[0],
        max: !!this.params.prices ? this.params['prices'].split(',')[1] : originalPrice[0].data[0].value[1]
      };
      this.filter.prices = !!this.params.prices ? this.params['prices'].split(',') : originalPrice[0].data[0].value;

      this.sliderPriceConfig.range.min = originalPrice[0].data[0].value[0];
      this.sliderPriceConfig.range.max = originalPrice[0].data[0].value[1];
    }
  };

  //set option and categories filter from params
  setOptionsAndCategoriesData(params) {
    this.filter.options = !!params.options ? this.params['options'].split(',') : [];
    this.filter.categories = !!params.categories ? this.params['categories'].split(',') : [];
  }

  // on price change after touch
  onPriceChange = (event: any) => {
    this.filter.prices = event;
    this.changedPrices = _.isEqual(this.filter.prices, [this.labelSlider.price.min, this.labelSlider.price.max]);
    this.checkDisableReset();
  };

  //on change price
  onChangePrice = ($event: any = []) => {
    this.labelSlider.price.min = $event[0];
    this.labelSlider.price.max = $event[1];
  };

  //get field data
  getArrayDataField(data: any = [], type: string = '') {
    for(let i in data) {
      if(data[i].code === type) {
        return data[i].data;
      }
    }
  };

  // fn on select options
  onSelectOptions = (code: string = '') => {
    if (!!_.find(this.filter.options, (obj: any) => obj === code)) {
      for (let i = 0; i < this.filter.options.length; i++) {
        if (this.filter.options[i] === code) {
          this.filter.options.splice(i, 1);
        }
      }
    } else {
      this.filter.options.push(code);
    }
    this.checkDisableReset();
  };

  // fn on select category
  onSelectCategory = (code: string = '') => {
    if (!!_.find(this.filter.categories, (obj: any) => obj === code)) {
      for (let i = 0; i < this.filter.categories.length; i++) {
        if (this.filter.categories[i] === code) {
          this.filter.categories.splice(i, 1);
        }
      }
    } else {
      this.filter.categories.push(code);
    }
    this.checkDisableReset();
  };


  checkIsExist(options: any = [], current: string = '') {
    return !!_.find(options, (obj: any) => obj === current);
  }

  // fn reset filter-popup-popup
  onReset = () => {
    let price = _.pickBy(this.productFilter, (obj: any) => obj.code === 'prices');
    this.labelSlider.price = {
      min: price[0].data[0].value[0],
      max: price[0].data[0].value[1]
    }
    this.filter.prices = price[0].data[0].value;
    this.filter.options = [];
    this.filter.categories = [];
    this.changedPrices = false;
  };

  // fn submit filter-popup-popup
  onFilter = (): void => {
    this.submit.emit(this.filter);
    this.hide();
  };

  //check disable reset button
  checkDisableReset = () => {
    return !(this.changedPrices || this.filter.options.length != 0 || this.filter.categories.length != 0);
  }

}
