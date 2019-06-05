import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CBOOKING, EVENT} from '../../../../app.constants';
import {AppPage} from '../../../../app.base';
import {BookingRepo} from '../../../../common/repos/index';
import {Security} from '../../../../common/security';
import {GlobalState} from '../../../../global.state';
import {SyncRequestPopup} from '../../../../components/popup';

@Component({
  selector: 'my-booking-index-mobile',
  templateUrl: './my-booking-index-mobile.component.html',
  styleUrls: ['./my-booking-index-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MyBookingIndexMobileComponent extends AppPage {

  @ViewChild(SyncRequestPopup) syncRequestPopup = new SyncRequestPopup();

  MODULE: any = CBOOKING;
  isLoading: boolean = false;
  tab: string = CBOOKING.FLIGHT;

  constructor(private _router: Router,
              private _state: GlobalState,
              private _activeRoute: ActivatedRoute,
              private _security: Security,
              private _bookingRepo: BookingRepo) {
    super();

  }

  ngOnInit() {

    if (this._security.isAuthenticated() && this.isMobile) {
      this.onDetectSync();
    }

    this._activeRoute.queryParams.subscribe((params) => {
      this.tab = this.utilityHelper.findInList(params.tab, [CBOOKING.FLIGHT, CBOOKING.HOTEL, CBOOKING.TOUR, CBOOKING.PRODUCT]) ? params.tab : CBOOKING.FLIGHT;
    });
  }

  ngAfterViewInit() {
  }

  // fn on select tab
  onSelectTab = ($e: any, tab: string = CBOOKING.FLIGHT): void => {

    this.tab = tab;

    this._router.navigate(['/my-booking'], {
      queryParams: {
        tab: this.tab
      }
    });
  };

  // fn on detect sync
  onDetectSync = () => {

    return this._bookingRepo
      .checkSync()
      .then(
        (res: any) => {
          if (res.data) {
            this.onOpenSync();
          }
        }
      );
  };

  // fn sync my booking
  onSync = () => {
    return this._bookingRepo
      .sync()
      .then(
        (res: any) => {
          this._state.notifyTo(EVENT.BOOKING_SYNCED, true);
        }
      );
  };

  // fn skip sync booking
  onSkip = () => {
    return this._bookingRepo
      .skipSync()
      .then((res: any) => {
        this._state.notifyTo(EVENT.BOOKING_SYNCED, false);
      });
  };

  // fn on open sync popup
  onOpenSync = () => {
    this.syncRequestPopup.show();
  };
}
