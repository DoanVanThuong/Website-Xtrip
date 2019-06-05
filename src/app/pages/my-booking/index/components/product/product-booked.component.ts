import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {Router} from '@angular/router';
import {BookingRepo, DeviceService, TourReservation} from '../../../../../common/index';
import {EVENT} from '../../../../../app.constants';
import {GlobalState} from '../../../../../global.state';
import {ProductReservation} from '../../../../../common/entities/product-reservation.entity';

@Component({
  selector: 'booked-product',
  templateUrl: './product-booked.component.html'
})
export class ProductBookedComponent extends AppPage {

  isLoading: boolean = false;
  products: Array<TourReservation> = [];

  constructor(private _router: Router,
              private _state: GlobalState,
              protected _device: DeviceService,
              private _bookingRepo: BookingRepo) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.getBookedProducts();

    this._state.subscribe([
      EVENT.BOOKING_SYNCED,
      EVENT.LOGGED_IN
    ], (value: boolean = false) => {
      if (value) {
        this.offset = 0;
        this.products = [];
        this.getBookedProducts();
      }
    });
  }

  ngAfterViewInit() {
  }

  // fn scroll down
  onScrollDown() {
    if (!this.isLoading && this.products.length > 0) {
      this.offset += this.limit;
      this.getBookedProducts();
    }
  }

  // fn get my tour booking
  getBookedProducts() {

    this.isLoading = true;

    return this._bookingRepo
      .getBookedProducts(this.offset, this.limit)
      .then(
        (res: any) => {

          this.isLoading = false;
          this.products = this.products.concat(res.data.reservations.map(product => new ProductReservation(product)));

          if (!res.data.reservations.length) {
            this.offset -= this.limit;
          }
        },
        (errors: any) => {
          this.isLoading = false;
        }
      );
  }

  // fn on open detail
  openDetail = (product: ProductReservation): void => {
    this._router.navigate(['/my-booking/product/' + product.code]);
  };
}
