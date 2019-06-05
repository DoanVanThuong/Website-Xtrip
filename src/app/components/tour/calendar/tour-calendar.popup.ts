import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from './../../popup/popup.base';
import {TourRepo} from './../../../common/repos/index';
import {Error, Tour} from './../../../common/entities';
import * as moment from 'moment';
import {Spinner} from './../../../common/services';

@Component({
  selector: 'tour-calendar-popup',
  templateUrl: './tour-calendar.popup.html',
  styleUrls: ['./tour-calendar.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourCalendarPopup extends PopupBase {

  @Input() tour: Tour = new Tour();
  @Input() code: string = '';
  @Input() title: string = '';
  @Input() adults: number = 1;
  @Input() children: number = 0;
  @Input() infants: number = 0;

  @Output('select') select: EventEmitter<any> = new EventEmitter<any>();

  tours: Array<any> = [];
  selectedDate: any = moment();
  month: number = this.selectedDate.month();
  year: number = this.selectedDate.year();

  mobilScrollOptions: any = {
    theme: 'mobiscroll',
    lang: 'vi',
    display: 'center',
    rows: 3,
    wheels: [
      [{
        circular: false,
        data: this.utilityHelper.getNext12Months(),
        label: 'Chọn tháng'
      }]
    ],
    buttons: [
      {
        text: 'Hủy',
        handler: 'cancel',
        cssClass: 'btn btn-cancel-outline mn-w-90'
      },
      {}, //
      {
        text: 'Đồng ý',
        handler: 'set',
        cssClass: 'btn btn-main mn-w-90'
      },
    ],
    showLabel: true,
    minWidth: 130,
    onSet: (e, ins) => {

      this.month = moment(this.selectedDate).month();
      this.year = moment(this.selectedDate).year();

      this.getTourDates(this.code);
    }
  };

  constructor(private _tourRepo: TourRepo,
              private _spinner: Spinner) {
    super();

    this.onInit = this.initial;
  }

  // on initial
  ngOnInit() {

  }

  // fn initial
  initial = () => {
    this.month = moment(this.selectedDate).month();
    this.year = moment(this.selectedDate).year();

    this.getTourDates(this.code);
  };

  ngOnChanges() {
    if (this.code || this.adults || this.children || this.infants) {
      this.getTourDates(this.code);
    }
  }

  // fn get tour
  getTourDates = (code: string = '') => {

    //this._spinner.show();
    return this._tourRepo
      .getAvailableTours({
        code,
        month: this.month + 1,
        year: this.year,
        adults: this.adults,
        children: this.children,
        infants: this.infants
      })
      .then(
        (res: any) => {
          this._spinner.hide();

          this.tours = res.data.map((tour: any) => {
            return {
              date: moment(tour.departDate),
              price: tour.adultPrice || 0,
              data: tour
            };
          });

        },
        (errors: Array<Error> = []) => {
          this._spinner.hide();
        }
      );
  };

  // fn on select date
  onSelectDate = ($event: any) => {
    this.hide();
    this.select.emit($event);
  };
}
