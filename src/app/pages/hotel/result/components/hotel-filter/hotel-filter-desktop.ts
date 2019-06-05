import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppBase } from '../../../../../app.base';
import { HotelRepo, HotelFilterOptions, HotelFilter } from '../../../../../common';

@Component({
  selector: 'app-hotel-filter-desktop',
  templateUrl: './hotel-filter-desktop.html',
  styleUrls: ['./hotel-filter-desktop.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelFilterDesktopComponent extends AppBase {

  @Input('mapView') mapView: boolean = false;
  @Input('params') params: any = {};
  @Input('filterOption') filterOption: any = {};
  @Input('nights') nights: number = 0;
  @Input('typeEvent') typeEvent: string = '';

  @Output('submitFilter') submitFilter: EventEmitter<any> = new EventEmitter<any>();

  filter: any = {
    sortIndex: 0,
    prices: [0, 1000000],
    stars: [],
    others: {}
  };

  sliderConfig: any = {
    behaviour: 'hover-snap',
    step: 100000,
    start: [0, 5000000],
    range: {
      min: 0,
      max: 15000000
    },
    connect: true,
    animate: true
  };

  labelSlider = {
    price: {
      min: 0,
      max: 1
    }
  };

  selectedHotelTypes: Array<any> = [];
  selectedHotelFacilities: Array<any> = [];

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.setFilterOptions();
    this.setRangePrice();
    this.fillCheckedData(this.params);
  }

  //set price range (only get one time)
  setRangePrice() {
    //case onFilter
    if (this.typeEvent === 'onFilter') {
      if (!this.params.prices) {
        this.labelSlider.price.min = this.filterOption.prices[0];
        this.labelSlider.price.max = this.filterOption.prices[1];
      }
      else {
        this.labelSlider.price.min = Number(this.params.prices.substring(0, this.params.prices.indexOf(',')));
        this.labelSlider.price.max = Number(this.params.prices.substring(this.params.prices.indexOf(',') + 1, this.params.prices.length));
      }
    }

    //case onSearch
    else {
      this.labelSlider.price.min = this.filterOption.prices[0];
      this.labelSlider.price.max = this.filterOption.prices[1];
    }

  }

  //set Filter Options (get one change event)
  setFilterOptions = () => {
    //case onFilter
    if (this.typeEvent === 'onFilter') {
      if (!!this.params.prices) {
        this.sliderConfig.start = [Number(this.params.prices.substring(0, this.params.prices.indexOf(','))), Number(this.params.prices.substring(this.params.prices.indexOf(',') + 1, this.params.prices.length))];
        this.filter.prices = [Number(this.params.prices.substring(0, this.params.prices.indexOf(','))), Number(this.params.prices.substring(this.params.prices.indexOf(',') + 1, this.params.prices.length))];
        this.filter.stars = (!!this.params.stars ? _.map(_.split(this.params.stars, ','), _.parseInt) : []);
      }
      else {
        this.sliderConfig.start = this.filterOption.prices;
        this.filter.prices = this.filterOption.prices;
      }
    }
    this.sliderConfig.range.min = this.filterOption.prices[0];
    this.sliderConfig.range.max = this.filterOption.prices[0] === this.filterOption.prices[1] ? this.filterOption.prices[1] + 1000000 : this.filterOption.prices[1];
  };

  //update price(onchange)
  onUpdatePrice(e) {
    if (this.typeEvent === 'onFilter') {
      this.labelSlider.price.min = e[0];
      this.labelSlider.price.max = e[1];
    }
  }
  //set price after drop
  onSetPrice(e) {
    this.filter.prices = e;
    this.submitFilter.emit(this.filter);
  }

  //Active selected item stars
  isStarSelected = (list: Array<any> = [], item: any = null): boolean => {
    if (_.includes(list, item)) {
      return true;
    }
    return false;
  };

  //on click star
  onSelectStar = (currentStar: number = 0): void => {
    let index = this.filter.stars.indexOf(currentStar)
    if (index === -1) {
      this.filter.stars.push(currentStar);
    } else {
      this.filter.stars.splice(index, 1);
    }
    this.submitFilter.emit(this.filter);
  };

  // fn check item is eixist
  isSelected = (item: any, code: string) => {
    if(code.toLowerCase() === 'hoteltypes') {
      return this.selectedHotelTypes.indexOf(item.code) !== -1;
    }
    else if(code.toLowerCase() === 'hotelfacilities') {
      return this.selectedHotelFacilities.indexOf(item.code) !== -1;
    }
  };

  // fn on select
  onSelect = (item: any, options: any) => {
    let type = options.code.toLowerCase();
    if(type === 'hoteltypes') {
      let index = this.selectedHotelTypes.indexOf(item.code);
      if (index !== -1) {
        this.selectedHotelTypes.splice(index, 1);
      } else {
        this.selectedHotelTypes.push(item.code);
      }
      this.filter.others[options.code] = this.selectedHotelTypes;
    }
    else if(type === 'hotelfacilities') {
      let index = this.selectedHotelFacilities.indexOf(item.code);
      if (index !== -1) {
        this.selectedHotelFacilities.splice(index, 1);
      } else {
        this.selectedHotelFacilities.push(item.code);
      }
      this.filter.others[options.code] = this.selectedHotelFacilities;
    }
  
    this.submitFilter.emit(this.filter);

  };

  onReset() {

    this.sliderConfig.range.min = this.filterOption.prices[0];
    this.sliderConfig.range.max = this.filterOption.prices[1];
    this.sliderConfig.start = [0, 1000000];


    this.filter = new HotelFilter({
      sortIndex: 0,
      prices: this.filterOption.prices,
      stars: [1, 2, 3, 4, 5],
      others: {}
    });

    this.selectedHotelTypes = [];
    this.selectedHotelFacilities = [];
    this.submitFilter.emit('reset');
  }

  fillCheckedData(param) {
    if (!!param.HotelTypes) {
      this.selectedHotelTypes = param.HotelTypes.split(",") || [];
    }
    if(!!param.HotelFacilities) {
      this.selectedHotelFacilities = param.HotelFacilities.split(",") || [];
    }
  }

}



