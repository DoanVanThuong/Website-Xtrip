import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../popup.base';
import {UtilityHelper} from '../../../common/helpers';
import * as moment from 'moment';

@Component({
  selector: 'date-selector-popup',
  templateUrl: './date-selector.popup.html',
  styleUrls: ['./date-selector.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class DateSelectorPopup extends PopupBase {


  @Input() date: any = null;
  @Input() available: any = null;
  @Input() options: any = null;
  @Input() showButton ?: boolean = true;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  selected: any = {start: null, end: null};

  constructor() {
    super();

  }

  // popup init
  onInit = () => {
    if (!this.date) {
      this.selected = {
        start: null,
        end: null
      };
    } else if (typeof (this.date) === 'string') {
      this.selected = {
        start: UtilityHelper.isDate(this.date) ? moment(this.date) : null,
        end: null
      };
    } else {
      this.selected = Object.assign(this.selected, this.date);
    }
  };

  ngOnChanges() {
    this.onInit();
  }

  // date change
  onChange = ($event: any) => {
    this.selected = $event;
    if (this.showButton == false) {
      this.onSubmit();
    }
  };

  // fn on disable submit button
  onDisableSubmit = () => {
    if (this.options.single) {
      return !this.selected.start;
    } else {
      return !this.selected.start || !this.selected.end;
    }
  };

  // fn on submit
  onSubmit = (): void => {
    this.submit.emit(this.selected);
    this.hide();
  };
}
