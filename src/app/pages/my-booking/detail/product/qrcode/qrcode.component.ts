import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {StorageService} from '../../../../../common/services/index';
import {CSTORAGE} from '../../../../../app.constants';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'booking-product-detail-qrcode',
  templateUrl: './qrcode.component.html'
})
export class BookingProductDetailQRCodeComponent extends AppPage {

  code: string = '';

  title: string = '';

  constructor(private _router: Router,
              private _activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {

    this._activeRoute.queryParams.subscribe((params) => {
      this.code = params.code;
    });

  }

  // fn generate qr code
  onGetQRCode = () => {
    return `${environment.API_GEN_URL}/${this.code}s.jpg`;
  };
}
