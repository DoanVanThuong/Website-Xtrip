import { Component } from '@angular/core';
import { AppPage } from '../../../../../app.base';
import { Spinner, BookingRepo } from '../../../../../common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'booking-tour-detail-passenger',
  templateUrl: './passenger.component.html'
})
export class BookingTourDetailPassenger extends AppPage {

  tour: any = null;

  constructor(private _spinner: Spinner,
    private _bookingRepo: BookingRepo,
    private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.onGetDetail(params);
    });

  }

  // fn get detail
  onGetDetail = (params) => {
    this._spinner.show("Vui lòng chờ...");
    return this._bookingRepo
      .getBookedDetail('tour', params.code)
      .then(
        (res: any) => {
          this.tour = res.data;
          this._spinner.hide();
        },
        (errors: any) => {
          this.tour = [];
          this._spinner.hide();
        }
      );
  };

}