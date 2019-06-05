import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {BookingHotelDetailMobileComponent} from '../mobile/booking-hotel-detail-mobile.component';
import {HotelGalleryPopup} from '../../../../../components/hotel/hotel-gallery-popup/hotel-gallery.popup';
import {Error, Room} from '../../../../../common/entities';
import {SucceedReviewPopup} from '../../components/succeed-review-popup/succeed-review.popup';
import {ChangePaymentMethodPopup} from '../../../components/method-change-payment-popup/method-change-payment.popup';


@Component({
  selector: 'booking-hotel-detail-desktop',
  templateUrl: './booking-hotel-detail-desktop.component.html',
  styleUrls: ['./booking-hotel-detail-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingHotelDetailDesktopComponent extends BookingHotelDetailMobileComponent {

  @ViewChild(ChangePaymentMethodPopup) changePaymentPopup: ChangePaymentMethodPopup;

  policy: any;
  roomImages: Array<any> = [];
  room: Room = new Room();

  @ViewChild(HotelGalleryPopup) galleryPopup = new HotelGalleryPopup();
  @ViewChild(SucceedReviewPopup) reviewPopup = new SucceedReviewPopup();

  // fn get policy hotel
  getHotelPolicy = () => {
    return this._hotelRepo
      .getPolicies(this.hotel.hotelCode)
      .then(
        (res: any) => {
          this.policy = res.data.policies;
        }
      );
  };

  // fn open tour detail
  onOpenPolicy = ($event: boolean = false) => {
    if ($event && !this.policy) {
      this.getHotelPolicy();
    }
  };

  onShowChangePopup = (): void => {
    this.changePaymentPopup.show();
  };

  // fn on open gallery
  onOpenGallery = () => {

    this.room = new Room(Object.assign({}, this.hotel, {
      cancellationPolicies: this.hotel.cancellationPolicies,
      limitedAdults: this.hotel.roomMaxAdults,
      roomPreferences: this.hotel.characteristic.map(item => {
        return {
          name: item
        };
      }),
      facilityGroups: {
        mainFacilityGroup: this.hotel.popularFacility,
        roomFacilityGroup: this.hotel.generalFacility,
        refundPolicyGroup: {
          facilities: this.hotel.refundPolicies.map(item => {
            return {
              name: item
            };
          })
        }
      }
    }));

    this.roomImages = this.hotel.roomPhotos.map((photo, index) => {
      return {
        index: Number(index + 1),
        small: this.utilityHelper.markImageSize(photo.src, 500),
        medium: this.utilityHelper.markImageSize(photo.src, 700),
        big: this.utilityHelper.markImageSize(photo.src, 900),
        description: photo.name
      };
    });

    this.galleryPopup.show();
  };

  // fn submit review
  onSubmitReview = ($event: any) => {

    return this._hotelRepo
      .review(Object.assign({}, $event, {
        reservationCode: this.hotel.code
      }))
      .then(
        (res: any) => {

          this.hotel.isReviewed = true;
          this.reviewPopup.show();
        },
        (errors: Error[] = []) => {
          let message = 'Vui lòng kiểm tra lại';

          if (errors.length) {
            message = errors[0].value;
          }
          this._toast.error(message, 'Vui lòng kiểm tra lại', {
            positionClass: 'toast-top-right'
          });
        }
      );
  };
}
