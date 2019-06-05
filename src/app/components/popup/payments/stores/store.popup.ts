import {Component, Input, Output, EventEmitter} from '@angular/core';
import {PopupBase} from '../../popup.base';
import {Bank, Payment} from '../../../../common';
import * as _ from 'lodash';

@Component({
  selector: 'store-popup',
  templateUrl: './store.popup.html',
  styleUrls: ['./store.popup.less']
})

export class PaymentStorePopup extends PopupBase {

  stores: Bank[] = [];
  eStores: Bank[] = [];

  @Input('method') payment: Payment = new Payment();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {

    if (!!this.payment.options.length) {
      _.chain(this.payment.options)
        .groupBy('sub')
        .map((data, key) => {
          switch (Number(key)) {
            case 1: {
              this.eStores = data;
              break;
            }
            case 2: {
              this.stores = data;
              break;
            }
          }
        }).value();
    }

  }
}