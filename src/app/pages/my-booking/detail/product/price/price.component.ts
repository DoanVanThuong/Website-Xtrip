import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {Spinner} from '../../../../../common/services/index';
import {BookingRepo} from '../../../../../common/repos';
import {ActivatedRoute} from '@angular/router';
import {ProductReservation} from '../../../../../common/entities';
import * as _ from 'lodash';

@Component({
  selector: 'booking-product-detail-price',
  templateUrl: './price.component.html'
})
export class BookingProductDetailPriceComponent extends AppPage {

  product: ProductReservation = new ProductReservation();
  totalPrice: number = 0;

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
          this._spinner.hide();

          this.product = new ProductReservation(res.data);
          this.totalPrice = _.sumBy(this.product.priceSummary.totalItems, 'price');
        },
        (errors: any) => {
          this._spinner.hide();
        }
      );

  };

}