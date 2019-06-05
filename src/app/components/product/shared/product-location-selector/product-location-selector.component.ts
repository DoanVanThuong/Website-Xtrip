import { Component, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PopupBase } from '../../../../components/popup';
import { ProductRepo, StorageService } from '../../../../common';
import { CSTORAGE } from '../../../../app.constants';
import * as _ from 'lodash';
import { ProductDestination } from 'app/common/entities/product-destination.entity';

@Component({
  selector: 'product-location-selector-popup',
  templateUrl: './product-location-selector.component.html',
  styleUrls: ['./product-location-selector.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductLocationSelectorPopup extends PopupBase {

  keyword: string = '';
  history: Array<ProductDestination> = [];
  sourcesFavorite: Array<ProductDestination> = [];
  sourcesDestination: Array<ProductDestination> = [];
  sourcesProduct: Array<ProductDestination> = [];
  isTyping: boolean = false;
  timeout: any;

  @Output('select') select: EventEmitter<any> = new EventEmitter<any>();
  @Input('icon') icon ?: string = ''; //input: isClose. Defauld: icon back
  @Input('') type: string = '';

  constructor(
    private _productRepo: ProductRepo,
    private _storage: StorageService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getHistory();
    this.listFavoriteLocation();
  }

  ngOnChanges(): void {
    if(this.keyword) {
      this.getHistory();
    }
  }

  //get favorite location
  listFavoriteLocation() {
    //getFavouriteDestinationsBy
    return this._productRepo
      .getFavouriteDestinationsBy({type: this.type})
      .then(
        (res: any) => {
          this.sourcesFavorite = res.data.map(favorite => new ProductDestination(favorite));
        },
        (errors: any) => {
          this.sourcesFavorite = [];
        }
      );
  }

  // result on change
  onChange = (keyword: any) => {

    clearTimeout(this.timeout);

    this.isTyping = true;

    this.timeout = setTimeout(() => {
      if (keyword.length > 1) {
        return this._productRepo
          .searchDestinations(keyword, this.type)
          .then(
            (res: any) => {
              this.isTyping = false;
              this.sourcesDestination = (res.data.destinations || []).map(destination => new ProductDestination(destination));
              this.sourcesProduct = (res.data.products || []).map(product => new ProductDestination(product));
            },
            (errors: any) => {
              this.sourcesDestination = [];
              this.sourcesProduct = [];
              this.isTyping = false;
            }
          );
      } else if (keyword.length == 0) {
        this.sourcesDestination = [];
        this.sourcesProduct = [];
        this.isTyping = false;
      }
    }, 500);
  };

  // result history
  getHistory() {
    let history = this._storage.getItem(CSTORAGE.PRODUCT_LOCATION);
    if (!this.utilityHelper.isNullOrUndefined(history)) {
      if (history.length > 0) {
        this.history = history.map(history => new ProductDestination(history));
      }
    }
  };

  // on select location
  onSelectLocation = (location: any = {}, mode: string = 'history') => {
    this.select.emit(location);
    // push in history
    if (mode == 'result') {
      if (!this.checkExistingLocation(location)) {
        this.history.unshift(new ProductDestination(location));
        this._storage.setItem(CSTORAGE.PRODUCT_LOCATION, this.history);
      }
    }
    this.onClose();
  };

  checkExistingLocation(location: ProductDestination) {
    const item = _.find(this.history, (item) => {
      return item.id === location.id;
    });
    return !!item;
  }

  //close popup
  onClose() {
    this.keyword = '';
    this.hide();
  };

}
