import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppBase} from 'app/app.base';
import {BookingRepo, TourReservation} from 'app/common';

@Component({
  selector: 'app-deposit-progress',
  templateUrl: './deposit-progress.component.html',
  styleUrls: ['./deposit-progress.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DepositProgressComponent extends AppBase {

  tour: TourReservation = new TourReservation();

  constructor(
    private _bookingRepo: BookingRepo,
    protected _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.getTour(params.code);
    });
  };

  getTour = (code: string = '') => {

    return this._bookingRepo
      .getBookedDetail('tour', code)
      .then(
        (res: any) => {
          this.tour = new TourReservation(res.data);

        },
        (errors: any) => {
        }
      );

  };

}
