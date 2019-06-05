import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {TourRepo, BookingRepo} from '../../../../../common/repos';
import {Router, ActivatedRoute} from '@angular/router';
import {Spinner} from '../../../../../common/services';
import {ToastrService} from 'ngx-toastr';
import {Error, TourReservation} from '../../../../../common';

@Component({
  selector: 'booking-tour-detail-comment',
  templateUrl: './comment.component.html'
})
export class BookingTourDetailComment extends AppPage {

  tour: TourReservation;

  comment: string = '';
  ratingLabel: Array<string> = ['Phương tiện', 'Khách sạn', 'Điểm tham quan', 'Ăn uống', 'Hướng dẫn viên'];
  rating: Array<number> = this.ratingLabel.map(item => 0);

  constructor(private _router: Router,
              private _spinner: Spinner,
              private _bookingRepo: BookingRepo,
              private activatedRoute: ActivatedRoute,
              private _tourRepo: TourRepo,
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
      .getBookedDetail('tour', params.code)
      .then(
        (res: any) => {
          this.tour = new TourReservation(res.data);
          this._spinner.hide();

          if (this.tour.isReviewed) {
            this._router.navigate(['/my-booking'], {
              queryParams: {
                tab: 'tour'
              }
            });
          }
        },
        (errors: any) => {
          this._spinner.hide();
        }
      );
  };

  // submit review
  onSubmit = () => {

    this._spinner.show('Vui lòng chờ...');

    return this._tourRepo
      .review({
        reservationCode: this.tour.code,
        individualComment: this.comment,
        ratedCategories: this.rating.map((value, index) => {
          return {
            categoryCode: index + 1,
            categoryName: this.ratingLabel[index],
            stars: value
          };
        })
      })
      .then(
        (res: any) => {
          this._spinner.hide();

          if (res.code.toLowerCase() === 'success') {
            this._toaster.success(' Đánh giá của bạn rất quan trọng đối với chúng tôi. Xin cám ơn vì đã tin tưởng và sử dụng Xtrip ', 'Cảm ơn bạn đã đánh giá');
            this._router.navigate([`/my-booking/tour/${this.tour.code}`]);

          } else {
            this._toaster.error('Vui lòng kiểm tra lại');
          }
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