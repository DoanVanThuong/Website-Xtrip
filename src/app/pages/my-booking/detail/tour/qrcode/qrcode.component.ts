import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {StorageService} from '../../../../../common/services/index';
import {CSTORAGE} from '../../../../../app.constants';
import {TourRepo} from '../../../../../common/repos';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'booking-tour-detail-qrcode',
  templateUrl: './qrcode.component.html'
})
export class BookingTourDetailQRCode extends AppPage {

  tour: any = null;

  title: string = '';

  constructor(private _storage: StorageService,
              private _tourRepo: TourRepo) {
    super();
  }

  ngOnInit() {
    this.onGetDetail();
  }

  // fn get detail
  onGetDetail = () => {
    this.tour = this._storage.getItem(CSTORAGE.BOOKED_TOUR);
  };

  // fn generate qr code
  onGetQRCode = (tour: any) => {
    return `${environment.API_GEN_URL}/${tour.code}s.jpg`;
  };
}