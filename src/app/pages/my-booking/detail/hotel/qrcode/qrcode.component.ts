import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {StorageService} from '../../../../../common/services/index';
import {CSTORAGE} from '../../../../../app.constants';
import {TourRepo} from '../../../../../common/repos';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'booking-hotel-detail-qrcode',
  templateUrl: './qrcode.component.html'
})
export class BookingHotelDetailQRCode extends AppPage {

  hotel: any = null;

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
    this.hotel = this._storage.getItem(CSTORAGE.BOOKED_HOTEL);
  };

  // fn generate qr code
  onGetQRCode = (hotel: any) => {
    return `${environment.API_GEN_URL}/${hotel.code}s.jpg`;
  };
}