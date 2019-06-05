import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from './../../popup/popup.base';

import * as _ from 'lodash';

@Component({
  selector: 'tour-filter-option-popup',
  templateUrl: './tour-filter-options.popup.html',
  styleUrls: ['./tour-filter-options.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourFilterOptionsPopup extends PopupBase {

  @Input('data') data: Array<any> = [];
  @Output('submit') submit: EventEmitter<any> = new EventEmitter<any>();

  title: string = '';
  values: Array<any> = [];
  selected: Array<any> = [];
  optionField: string = '';

  constructor() {
    super();

    this.onInit = this.initial;
  }

  initial = () => {
    if (!!this.data.length) {
      this.selected = this.data;
    } else {
      this.selected = [];
    }
  };

  // on initial
  ngOnInit() {

  }

  ngOnChanges() {

  }

  // fn check item is eixist
  isSelected = (item: any) => {
    return !!_.find(this.selected, (obj: any) => obj.code === item.code);
  };

  // fn on select
  onSelect = (item: any) => {
    if (!!_.find(this.selected, (obj: any) => obj.code === item.code)) {
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i].code === item.code) {
          this.selected.splice(i, 1);
        }
      }
    } else {
      this.selected.push({ code: item.code });
    }
  };

  // fn on submit
  onSubmit = () => {
    this.submit.emit({
      option: this.optionField,
      values: this.selected
    });

    this.hide();
  };
}

