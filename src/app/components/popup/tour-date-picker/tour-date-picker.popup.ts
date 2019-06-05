import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {UtilityHelper} from '../../../common/helpers';
import {PopupBase} from '../popup.base';
import * as moment from 'moment';

@Component({
  selector: 'app-tour-date-picker-popup',
  templateUrl: './tour-date-picker.popup.html',
  styleUrls: ['./tour-date-picker.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourDatePickerPopup extends PopupBase {

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

  ngOnInit() {

  }

  ngOnChanges() {
    this.initial();
  }

  ngAfterViewInit() {
  }

  // date change
  onChange = ($event: any): void => {
    this.selected = $event;
  };

  // fn on disable submit button
  onDisableSubmit = (): boolean => {
    return !this.selected.start || !this.selected.end;
  };

  // fn on submit
  onSubmit = ($event: any): void => {
    this.submit.emit(this.selected);
    this.hide();
  };

}
