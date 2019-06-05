import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppBase } from 'app/app.base';

import * as _ from 'lodash';

@Component({
  selector: 'app-empty-screen-product',
  templateUrl: './product-empty-screen.component.html',
  styleUrls: ['./product-empty-screen.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductEmptyScreenComponent extends AppBase {
  
  @Input() show: boolean = false;
  @Input() originalFilter: any = {};
  @Input() params: any = {};
  
  tagItems: any;

  constructor(
    protected _router: Router
  ) { super() }

  ngOnChanges() {
    this.getUsableData(this.params);
  }
  
  //convert object string params -> object array params
  getUsableData = (params: any = {}) => {
    this.tagItems = this.handleFilter(_.pick(params, 'prices', 'options', 'categories'));
  }

  //handle object string params -> object params
  handleFilter(data: any = {}) {
    let result = {};
    for(let key in data) {
      result[key] = data[key].split(',').map((value) => {
        return isNaN(value) ? value : Number(value)
      })
    }
    return result;
  }

  //get tag name by code
  getNameTag(type: string, code: string) {
    for(let i in this.originalFilter) {
      if(this.originalFilter[i].code === type ) {
        for(let j in this.originalFilter[i].data) {
          if(this.originalFilter[i].data[j].code === code) {
            return this.originalFilter[i].data[j].name;
          }
        }
      }
    }
  };


  //on remove tag
  onClickRemoveTag = (type: string, tag: string) => {
    if(type === 'prices') {
      let result = _.omit(this.params, 'prices');
      this._router.navigate([],{
        queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, result))
      })
    }
    else {
      for(let key in this.tagItems) {
        if(key === type) {
          this.tagItems[key].splice(this.tagItems[key].indexOf(type))
        }
      }

      let queryParams = this.utilityHelper.convertObjectToQueryParams(Object.assign({}, this.params, this.tagItems));
      this._router.navigate([],{
        queryParams: _.pickBy(queryParams, (obj) => {
          return !_.isEmpty(obj)
        })
      })
    }
  }

}
