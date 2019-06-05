import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {Spinner, BookingRepo, ProductReservation} from '../../../../../common';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'booking-product-detail-passenger',
  templateUrl: './passenger.component.html'
})
export class BookingProductDetailPassengerComponent extends AppPage {

  passengers: any = [];
  product: ProductReservation = new ProductReservation();

  constructor(private _spinner: Spinner,
              private _bookingRepo: BookingRepo,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.onGetDetail(params.code);
    });

  }

  // fn get detail
  onGetDetail = (code: string = '') => {
    this._spinner.show('Vui lòng chờ...');
    return this._bookingRepo
      .getBookedProductDetail(code)
      .then(
        (res: any) => {
          this.product = new ProductReservation(res.data);

          this.passengers = _.groupBy(this.product.passengers, 'paxType');

          this._spinner.hide();
        },
        (errors: any) => {
          this._spinner.hide();
        }
      );
  };

}