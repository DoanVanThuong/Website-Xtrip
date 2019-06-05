import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {BookingTourDetailMobileComponent} from '../mobile/booking-tour-detail-mobile.component';
import {Error, TourJourney, TourPackage} from '../../../../../common/entities';
import {TRANSPORT_TYPE} from '../../../../../app.constants';
import {HotelGalleryPopup, TourDepositPopup} from '../../../../../components';
import {SucceedReviewPopup} from '../../components/succeed-review-popup/succeed-review.popup';
import { ChangePaymentMethodPopup } from '../../../components/method-change-payment-popup/method-change-payment.popup';
import {PriceDetailComponent} from '../../components/price-detail-popup/price-detail-popup';

@Component({
  selector: 'booking-tour-detail-desktop',
  templateUrl: './booking-tour-detail-desktop.component.html',
  styleUrls: ['./booking-tour-detail-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingTourDetailDesktopComponent extends BookingTourDetailMobileComponent {

  @ViewChild(HotelGalleryPopup) galleryPopup = new HotelGalleryPopup();
  @ViewChild(SucceedReviewPopup) reviewPopup = new SucceedReviewPopup();
  @ViewChild(ChangePaymentMethodPopup) changePaymentPopup: ChangePaymentMethodPopup;
  @ViewChild(TourDepositPopup) tourDepositPopup: TourDepositPopup;
  @ViewChild(PriceDetailComponent) priceDetailComponent: PriceDetailComponent;

  TRANSPORT_TYPE: any = TRANSPORT_TYPE;

  journey: TourJourney;
  package: TourPackage;

  // fn get tour
  getJourneyTour = (): Promise<any> => {
    return this._tourRepo
      .getTourJourney(this.tour.tourCode)
      .then(
        (res: any) => {
          this.journey = new TourJourney(res.data);
        }
      );
  };

  // fn get tour package
  getTourPackage = (): Promise<any> => {
    return this._tourRepo
      .getTourPackage(this.tour.tourCode)
      .then(
        (res: any) => {
          this.package = new TourPackage(res.data);
        },
        (errors: Error[] = []) => {

        }
      );
  };

  // fn open tour detail
  onOpenJourney = ($event: boolean = false) => {
    if ($event) {
      this.getJourneyTour();
      this.getTourPackage();
    }
  };

  // fn submit review
  onSubmitReview = ($event: any) => {

    return this._tourRepo
      .review(Object.assign({}, $event, {
        reservationCode: this.tour.code
      }))
      .then(
        (res: any) => {

          this.tour.isReviewed = true;
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
  
  //show popup change payment
  showPopupChangePayment() {
    this.changePaymentPopup.show();
  }

  //submit event after changed payment 
  submitChangePayment = () => {
    this.getTour(this.code);
  };

  //on show popup detail
  showDetailPricePopup(e) {
    this.priceDetailComponent.show();
  }

}
