import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import * as moment from 'moment';
import {TourRepo, BookingTour} from '../../../../../common';

@Component({
  selector: 'tour-date-selector',
  templateUrl: 'tour-datepicker.component.html',
  styleUrls: ['tour-datepicker.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourDatepickerComponent extends AppBase {

  date: any = moment();

  @Input() departDates: any[] = null;
  @Input() code: string = '';
  @Input() bookingTour: BookingTour = null;
  @Output() onChangeDate: EventEmitter<any> = new EventEmitter<any>();

  data: Array<any> = [
    {
      date: moment(),
      price: 1000
    },
    {
      date: moment().add(10, 'day'),
      price: 1000
    },
    {
      date: moment().add(-3, 'day'),
      price: 1000
    }
  ];

  constructor(private _tourRepo: TourRepo) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (!!this.bookingTour && !!this.code) {
      this.getTourDates(this.code);
    }
  }

  ngAfterViewInit() {

  }

  onSelectDate = ($event): void => {
    this.onChangeDate.emit($event);
  };

  onChangeMonth = ($event): void => {
    this.date = moment($event);
    this.getTourDates(this.code);
  };


  // fn get tour
  async getTourDates(code: string = '') {
    const body = {
      code,
      month: this.date.month() + 1,
      year: this.date.year(),
      adults: this.bookingTour.adults,
      children: this.bookingTour.children,
      infants: this.bookingTour.infants
    };
    try {
      const res: any = await this._tourRepo.getAvailableTours(body);
      this.data = (res.data || []).map((tour: any) => {
        return {
          date: moment(tour.departDate),
          price: tour.adultPrice || 0,
          data: tour
        };
      });
    } catch (error) {
    }
  };
}