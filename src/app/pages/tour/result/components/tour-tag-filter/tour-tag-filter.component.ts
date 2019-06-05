import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AppBase} from '../../../../../app.base';
import {TourRepo, TourFilterOption} from '../../../../../common';

import * as _ from 'lodash';

@Component({
  selector: 'app-tour-tag-filter',
  templateUrl: './tour-tag-filter.component.html',
  styleUrls: ['./tour-tag-filter.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourTagFilterComponent extends AppBase {

  @Input('params') params: any = {};
  @Input('data') data: any = {};

  filter: any = {};

  originalFilter: any;

  tagsServiceItem = [];

  constructor(
    private _router: Router,
    private _tourRepo: TourRepo,
    private _activatedRoute: ActivatedRoute
  ) {
    super();


  }

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe((params: any) => {
      this.handleRouteFilter(params);
    });

    this.getAllServiceType();
    this.getFilterOptions();
  }

  handleRouteFilter = (params: any = {}) => {

    let filter: any = {};

    for (let key in params) {

      let value = params[key];

      switch (key.toLowerCase()) {
        case 'time': {
          this.filter[key] = isNaN(value) ? value : Number(value);
          break;
        }
        case 'prices':
        case 'days': {
          this.filter[key] = value.split(',').map((value) => {
            return isNaN(value) ? value : Number(value);
          });
          break;
        }
        case 'departs':
        case 'topics':
        case 'suppliers':
        case 'transports':
        case 'services': {
          if (!this.filter['options']) {
            this.filter['options'] = {};
          }

          this.filter['options'][key] = params[key].split(',').map((value) => {
            return isNaN(value) ? value : Number(value);
          });

          // filter['options'][key] = params[key].split(',').map((value) => {
          //   return isNaN(value) ? value : Number(value);
          // })
          break;
        }
      }
    }

    return this.filter;

  };


  // tags: any[] = [];
  // handleFilterToTags = (params: any, pKey: string = '') => {

  //   for (let key in params) {
  //     switch (typeof params[key]) {
  //       case 'string':
  //       case 'number': {
  //         this.tags.push({
  //           key: pKey + '.' + key,
  //           value: params[key],
  //           unit: ''
  //         });
  //         break;
  //       }
  //       case 'object': {
  //         if (!!params[key].length) {
  //           // is array
  //           this.tags.push({ key: pKey + '.' + key, value: params[key] });
  //         } else {

  //           // handle data with options

  //           this.handleFilterToTags(params[key], key);
  //           break;
  //         }
  //       }
  //     }
  //   }

  // }


  //remove current filter-popup
  removeFilter(type) {
    let query = _.omit(this.params, [type]);
    this._router.navigate([], {queryParams: query})
  }

  //get original filter-popup
  getFilterOptions = (): Promise<any> => {

    return this._tourRepo
      .getFilterOptions(this.params)
      .then(
        (res: any) => {
          this.originalFilter = new TourFilterOption(res.data);
        }
      );
  };

  //get all service tag
  getAllServiceType() {
    this.getAllServicePropertyFromParams(_.pick(this.params, ['departs', 'topics', 'services', 'transports', 'suppliers']));
  }

  getAllServicePropertyFromParams(tag) {
    for (let key in tag) {
      switch (key.toLowerCase()) {
        case 'departs':
        case 'topics':
        case 'suppliers':
        case 'transports':
        case 'services': {
          this.tagsServiceItem = [...this.tagsServiceItem, ...tag[key].split(',')];
        }
      }
    }
  }

  //get name service by code
  getNameService(code) {
    if (!!this.originalFilter.options) {
      for (let i in this.originalFilter.options) {
        for (let j in this.originalFilter.options[i].values) {
          if (code === this.originalFilter.options[i].values[j].code) {
            return this.originalFilter.options[i].values[j].name
          }
        }
      }
    }
  }

  //clear service item
  clearServiceItem(code) {
    let options: any = Object.assign({}, this.params);
    let tempServiceArray = _.pick(this.params, ['departs', 'topics', 'services', 'transports', 'suppliers']);
    for (let key in tempServiceArray) {
      options[key] = _.remove(tempServiceArray[key].split(','), (obj) => {
        return obj != code
      }).join(',');
    }
    this.updateParamsToRoute(this.utilityHelper.convertObjectToQueryParams(this.handleRouteFilter(options)));
  }

  updateParamsToRoute = (params: any = {}) => {
    /*this._router.navigate(['/tour/result'], {
      relativeTo: this._activatedRoute,
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.params, params))
    });*/
  };


}
