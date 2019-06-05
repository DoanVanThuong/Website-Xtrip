import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { AppBase } from 'app/app.base';
import { ProductRepo } from 'app/common';
import * as _ from 'lodash';
import { ProductDestination } from 'app/common/entities/product-destination.entity';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductFilterDesktopComponent extends AppBase {

  @Input() params: any = {};

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() originalFilter ?: EventEmitter<any> = new EventEmitter<any>();

  productFilter: any = null;

  filter: any = {
    prices: [0, 1000000],
    options: [],
    categories: []
  };
  
  sliderPriceConfig: any = {
    behaviour: 'hover-snap',
    start: [0, 1000000],
    step: 100000,
    range: {
      min: 0,
      max: 1000000
    },
    connect: true,
    animate: false,
    margin: 100000
  };

  labelSlider = {
    price: {
      min: 0,
      max: 100000
    }
  };

  constructor(
    private _productRepo: ProductRepo
  ) {
    super();
  }

  ngOnInit(): void {
    this.onGetFilter(this.params);
  }

  //get filter data
  onGetFilter(params: any = {}) {
    let paramsFilter = Object.assign({}, params, {
      destination: new ProductDestination({
        id: params.destination
      })
    })
    return this._productRepo
      .filterProduct(paramsFilter)
      .then(
        (res: any) => {
          this.productFilter = res.data;
          this.setPricesSlider(this.productFilter, this.params);
          this.setOptionsAndCategoriesData(this.params);
          this.originalFilter.emit(this.productFilter);
        },
        (errors: Array<Error> = []) => {
        }
      );
  };

  // fn set range slider
  setPricesSlider = (originalFilter, params: any = {}) => {
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

  // on price change after touch
  onPriceChange = (e: any) => {
    this.filter.prices = e;
    this.onSubmitFilter();
  };

  //on update price
  onUpdatePrice = (e: any = []) => {
    this.labelSlider.price.min = e[0];
    this.labelSlider.price.max = e[1];
  };

  //get field data
  getArrayDataField(data: any = [], type: string = '') {
    for(let i in data) {
      if(data[i].code === type) {
        return data[i].data;
      }
    }
  };

  //set option and categories filter from params
  setOptionsAndCategoriesData(params) {
    this.filter.options = !!params.options ? this.params['options'].split(',') : [];
    this.filter.categories = !!params.categories ? this.params['categories'].split(',') : [];
  }

  //on select options
  onSelectOptions(code: string = '') {
    if (!!_.find(this.filter.options, (obj: any) => obj === code)) {
      for (let i = 0; i < this.filter.options.length; i++) {
        if (this.filter.options[i] === code) {
          this.filter.options.splice(i, 1);
        }
      }
    } else {
      this.filter.options.push(code);
    }
    this.onSubmitFilter();
  };

  //on select Categories
  onSelectCategories(code: string = '') {
    if (!!_.find(this.filter.categories, (obj: any) => obj === code)) {
      for (let i = 0; i < this.filter.categories.length; i++) {
        if (this.filter.categories[i] === code) {
          this.filter.categories.splice(i, 1);
        }
      }
    } else {
      this.filter.categories.push(code);
    }
    this.onSubmitFilter();
  };
  
  //check is exist
  checkIsExist(options: any = [], current: string = '') {
    return !!_.find(options, (obj: any) => obj === current);
  };

  //reset filter
  onReset = () => {
    let price = _.pickBy(this.productFilter, (obj: any) => obj.code === 'prices');
    this.labelSlider.price = {
      min: price[0].data[0].value[0],
      max: price[0].data[0].value[1]
    }
    this.filter.prices = price[0].data[0].value;
    this.filter.options = [];
    this.filter.categories = [];
    this.onSubmitFilter();
  };

  //on submit filter
  onSubmitFilter() {
    this.submit.emit(this.filter);
  }

}
