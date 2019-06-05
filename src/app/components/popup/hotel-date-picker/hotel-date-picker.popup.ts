import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {UtilityHelper} from '../../../common/helpers';
import {PopupBase} from '../popup.base';
import * as moment from 'moment';

@Component({
  selector: 'app-hotel-date-picker-popup',
  templateUrl: './hotel-date-picker.popup.html',
  styleUrls: ['./hotel-date-picker.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelDatePickerPopup extends PopupBase {

  @Input() date: any = null;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  selected: any = {start: null, end: null};
  options: any = {
    single: false,
    startOfWeek: 1
  };

  constructor() {
    super();
    this.onInit = this.initial;
  }

  initial = () => {
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
    this.initial();
  }

  // date change
  onChange = ($event: any): void => {
    this.selected = $event;
  };

  //diff date
  btnText = () => {
    if(!!this.selected.start && !!this.selected.end) {
      if(moment(this.selected.start).format('DD/MM/YYYY') == moment(this.selected.end).format('DD/MM/YYYY')) {
        return `Đồng ý (1 đêm)`
      }
      else if(moment(this.selected.start).format('DD/MM/YYYY') != moment(this.selected.end).format('DD/MM/YYYY')) {
        return `Đồng ý (${moment(this.selected.end).diff(moment(this.selected.start), 'days')} đêm)`;
      }
    }
    else {
      return `Đồng ý (1 đêm)`
    }
  }

  // fn on disable submit button
  onDisableSubmit = (): boolean => {
    return !this.selected.start;
  };

  // fn on submit
  onSubmit = ($event: any): void => {
    if(!this.selected.end || moment(this.selected.start).format('DD/MM/YYYY') == moment(this.selected.end).format('DD/MM/YYYY')) {
      this.selected.end = moment(this.selected.start).add(1, 'days');
    }
    this.submit.emit(this.selected);
    this.hide();
  };

}
