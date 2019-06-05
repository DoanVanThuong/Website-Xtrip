import { Component } from '@angular/core';
import { AppPage } from '../../../../../app.base';
import { Spinner } from '../../../../../common/services/index';
import { BookingRepo } from '../../../../../common/repos';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'booking-tour-detail-price',
  templateUrl: './price.component.html'
})
export class BookingTourDetailPrice extends AppPage {

  tour: any = null;
  totalPrice: number = 0;

  params: any = null;

  constructor(private _spinner: Spinner,
    private _bookingRepo: BookingRepo,
    private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    )
    .pipe(
      map(([params, qParams]) => ({...params, ...qParams}))
    )
    .subscribe((param: any): void => {
      this.params = param;
      this.onGetDetail(param);
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
          this.tour.priceSummary.totalItems.map(item => {
            this.totalPrice += item.price;
          });
        },
        (errors: any) => {
          this.tour = [];
          this._spinner.hide();
        }
      );

  };

}