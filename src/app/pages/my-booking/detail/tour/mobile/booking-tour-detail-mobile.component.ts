import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {SeoService, Spinner, StorageService} from '../../../../../common/services';
import {AppPage} from '../../../../../app.base';
import {BookingRepo, Error, TourRepo, TourReservation, UtilityHelper, Tour, TourJourney, TourDeposit} from '../../../../../common';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {BOOKING_STATUS, PAYMENT_METHOD} from '../../../../../app.constants';
import { TourJourneyDetailPopup, TourPolicyDetailPopup, TourTermDetailPopup, TourDepositPopup } from 'app/components';
import * as moment from 'moment';

@Component({
  selector: 'booking-tour-detail-mobile',
  templateUrl: './booking-tour-detail-mobile.component.html',
  styleUrls: ['./booking-tour-detail-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingTourDetailMobileComponent extends AppPage {

  @ViewChild(TourJourneyDetailPopup) tourJourneyDetailPopup : TourJourneyDetailPopup;
  @ViewChild(TourPolicyDetailPopup) tourPolicyDetailPopup : TourPolicyDetailPopup;
  @ViewChild(TourTermDetailPopup) tourTermDetailPopup : TourTermDetailPopup;

  code: string = '';
  tour: TourReservation = null;
  url: string = '';
  error: any = {};

  tourDetail: Tour = new Tour();

  METHOD: any = PAYMENT_METHOD;
  STATUS: any = BOOKING_STATUS;
  tourDepositItems: Array<TourDeposit> = [];
  isExpired = false;

  @ViewChild(TourDepositPopup) tourDepositPopup: TourDepositPopup;

  journey: TourJourney = new TourJourney();

  constructor(protected _spinner: Spinner,
              protected _tourRepo: TourRepo,
              private _bookingRepo: BookingRepo,
              protected _activatedRoute: ActivatedRoute,
              protected _router: Router,
              protected _toast: ToastrService,
              protected _location: Location,
              protected _toastr: ToastrService,
              protected _storage: StorageService) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.code = params.code;
      this.getTour(this.code);
    });

    // get url form next route
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
        return;
      }
    });
  };

  ngOnDestroy() {
    if (this.url.includes('payment/result') && !this.url.includes('mode=change-method')) {
      this._router.navigate(['/']);
    }
  }

  back = (): void => {
    this._location.back();
  };

  // on get tour detail
  getTour = (code: string = '') => {

    this._spinner.show('Vui lòng chờ...');

    return this._bookingRepo
      .getBookedDetail('tour', code)
      .then(
        (res: any) => {
          this._spinner.hide();

          this.tour = new TourReservation(res.data);
          this.getTourDetail(this.tour.tourCode);
          this.getTourJourney(this.tour.tourCode);

        },
        (errors: any) => {
          let message = 'Đã có lỗi xãy ra khi yêu cầu thông tin tour';
          if (errors.length) {
            message = errors[0].value;
          }

          this._toast.error(message, 'Lỗi');

          this._location.back();
          this._spinner.hide();
        }
      );

  };
  
  //get tour detail by code
  getTourDetail = (code: string) => {
    return this._tourRepo
      .getDetailTour(code)
      .then(
        (res: any) => {
          this.tourDetail = new Tour(res.data);
        },
        (errors: any) => {
          
        }
      );
  };

  // fn get tour journey
  getTourJourney = (code) => {
    this._tourRepo
      .getTourJourney(code)
      .then(
        (res: any) => {
          this.journey = new TourJourney(res.data);
        }
      );
  };
  
  //open tour journey detail
  openJourneyPopup = () => {
    this.tourJourneyDetailPopup.show();
  };
  
  //open tour policy detail
  openPolicyPopup = () => {
    this.tourPolicyDetailPopup.show();
  };

  //open tour terms detail
  openTermPopup = () => {
    this.tourTermDetailPopup.show();
  };

  //get text current payment status
  getTextPaymentStatus(status: number) {
    // return this.utilityHelper.getPaymentStatusText(status);
  }

  //goto Request Support
  gotoRequestSupport() {
    this._router.navigate([`/more/request-support`], {
      queryParams: {
        type: 'tour',
        code: this.code
      }
    });
  }

  
  // fn on expired to keep place
  onExpired = () => {
    this.isExpired = true;
  };

  //on get list deposit by code
  onContinuedDeposit = (code: string = ''): Promise<any> => {
    return this._tourRepo
    .getTourDepositByOrderCode(code)
    .then(
      (res: any) => {
        this.tourDepositItems = (res.data || []).map((item: any) => new TourDeposit(item));
        this.tourDepositPopup.show();
      },
      (errors: Error[] = []) => {
        this.onHandleError(errors);
      }
    );
  };

  //submit data deposit
  onSubmitDeposit(e) {
    this.confirmDepositByCode(e, this.tour.code);
  }

  //confirm deposit code
  confirmDepositByCode(depositCode: string = '', orderCode: string = '') {
    return this._tourRepo
    .confirmDeposit(Object.assign({}, {
      code: orderCode,
      depositCode: depositCode
    }))
    .then(
      (res: any) => {
        if(res.status) {
          let queryParams = {
            reservationCode: orderCode,
            module: 'tour'
          }
          this._router.navigate(['payment'], { queryParams: queryParams })
        }
      },
      (errors: Error[] = []) => {
        this.onHandleError(errors);
      }
    );
  }

  // fn handle error
  onHandleError = (errors: Array<any> = []) => {
    this.error = { };
    let message = 'Đã cố lỗi xãy ra. Vui lòng thử lại sau.';
    if (errors.length) {
      for (let index in errors) {
        let error = errors[index];
        message = error.value;
      }
      this._toastr.error(message, 'Lỗi', {
        timeOut: 3000,
        closeButton: true,
        positionClass: 'toast-bottom-full-width'
      });
    };
  };
  

}
