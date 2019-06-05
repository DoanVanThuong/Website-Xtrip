import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {HotelRepo, BookingRepo, Spinner, Error} from '../../../../../common/index';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'booking-hotel-detail-comment',
  templateUrl: './comment.component.html'
})
export class BookingHotelDetailComment extends AppPage {

  hotel: any = null;

  comment: string = '';
  ratingLabel: Array<string> = ['Thoải mái', 'Dịch vụ', 'Sạch sẽ', 'Đồ ăn', 'Tiện nghi'];
  rating: Array<number> = this.ratingLabel.map(item => 0);

  constructor(private _router: Router,
              private _spinner: Spinner,
              private _bookingRepo: BookingRepo,
              private activatedRoute: ActivatedRoute,
              private _hotelRepo: HotelRepo,
              private _toaster: ToastrService) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.onGetDetail(params);
    });
  }

  // fn get detail
  onGetDetail = (params) => {
    this._spinner.show('Vui lòng chờ...');
    return this._bookingRepo
      .getBookedDetail('hotel', params.code)
      .then(
        (res: any) => {
          this.hotel = res.data;
          this._spinner.hide();

          if (this.hotel.isReviewed) {
            this._router.navigate(['/my-booking'], {
              queryParams: {
                tab: 'tour'
              }
            });
          }
        },
        (errors: any) => {
          this.hotel = [];
          this._spinner.hide();
        }
      );

  };

  // submit review
  onSubmit = () => {
    const body = {
      reservationCode: this.hotel.code,
      individualComment: this.comment,
      ratedCategories: this.rating.map((value, index) => {
        return {
          categoryCode: index + 1,
          categoryName: this.ratingLabel[index],
          stars: value
        };
      })
    };

    return this._hotelRepo
      .review(body)
      .then(
        (res: any) => {
          this._toaster.success(' Đánh giá của bạn rất quan trọng đối với chúng tôi. Xin cám ơn vì đã tin tưởng và sử dụng Xtrip ', 'Cảm ơn bạn đã đánh giá');
          this._router.navigate([`/my-booking/hotel//${this.hotel.code}`]);
        },
        (errors: any) => {
          const error: Error = new Error(errors[0]);
          this._toaster.error('Vui lòng kiểm tra lại', `${error.value}`);

          //hide spinner when get error
          this._spinner.hide();
        }
      );
  };

}