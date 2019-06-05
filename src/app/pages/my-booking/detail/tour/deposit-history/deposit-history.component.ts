import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { AppBase } from 'app/app.base';
import { BookingRepo, Spinner, TourReservation } from 'app/common';
import * as moment from 'moment';

@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.component.html',
  styleUrls: ['./deposit-history.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DepositHistoryComponent extends AppBase {

  tour: TourReservation = null;

  constructor(
    private _location: Location,
    private _spinner: Spinner,
    private _bookingRepo: BookingRepo,
    private activatedRoute: ActivatedRoute
  ) { super() }

  ngOnInit(): void {
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
          this._spinner.hide();
        }
      );
  };

  // fn back
  back = () => {
    this._location.back();
  };

}
