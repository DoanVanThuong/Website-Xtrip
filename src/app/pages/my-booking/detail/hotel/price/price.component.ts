import { Component } from '@angular/core';
import { AppPage } from '../../../../../app.base';
import { Spinner, BookingRepo } from '../../../../../common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'booking-tour-detail-price',
  templateUrl: './price.component.html'
})
export class BookingHotelDetailPrice extends AppPage {

  hotel: any = null;
  totalPrice: number = 0;

  constructor(
    private _spinner: Spinner,
    private _bookingRepo: BookingRepo,
    private activatedRoute: ActivatedRoute
  ) {
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
      .getBookedDetail('hotel', params.code)
      .then(
        (res: any) => {
          this.hotel = res.data;
          this._spinner.hide();
          // calculate total price
          this.hotel.priceSummary.totalItems.map(item => {
            this.totalPrice += item.price;
          });
        },
        (errors: any) => {
          this.hotel = [];
          this._spinner.hide();
        }
      );
  };

}