import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {BookingRepo} from '../../../../../common/repos';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../../common/services';
import {ProductReservation} from '../../../../../common/entities';
import {Location} from '@angular/common';

@Component({
  selector: 'booking-product-detail-description',
  templateUrl: './description.component.html',
  styleUrls: ['../../product/description/description.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingProductDetailDescriptionComponent extends AppPage {

  product: ProductReservation = new ProductReservation();
  mode: string = '';
  heading: string = '';

  notes: string[] = [];
  policies: string[]=[];

  constructor(private _router: Router,
              private _actRouter: ActivatedRoute,
              private _storage: StorageService,
              private _location: Location,
              private _bookingRepo: BookingRepo) {
    super();
  }

  ngOnInit() {

    this._actRouter.params.subscribe((params: any) => {
      this.onGetDetail(params.code);
    });

    this._actRouter.queryParams.subscribe((params) => {
      if (!!params.tab) {
        this.mode = params.tab;
        this.detectHeading();
      }
    });
  }

  detectHeading = (): void => {
    switch (this.mode) {
      case 'policy': {
        this.heading = 'Chính sách hoàn hủy';
        break;
      }
      case 'note': {
        this.heading = 'Thông tin lưu ý';
        break;
      }
      case 'more': {
        this.heading = 'Thông tin bổ sung';
        break;
      }
      default: {
        this.heading = 'Mô tả';
        break;
      }
    }
  };

  // fn get detail
  onGetDetail = (code: string = ''): Promise<any> => {
    return this._bookingRepo
      .getBookedProductDetail(code)
      .then(
        (res: any) => {
          this.product = new ProductReservation(res.data);

          // note
          this.notes = this.utilityHelper.breakString(this.product.notes).map(note => {
            if (note[0] === '-') {
              return note.substr(2, note.length);
            } else {
              return note;
            }
          });

          // cancellation policy
          this.policies = this.utilityHelper.breakString(this.product.cancellationPolicy).map(policy => {
            if (policy[0] === '-') {
              return policy.substr(2, policy.length);
            } else {
              return policy;
            }
          });
        }
      );
  };

  backTo = (): void => {
    this._location.back();
  };

}