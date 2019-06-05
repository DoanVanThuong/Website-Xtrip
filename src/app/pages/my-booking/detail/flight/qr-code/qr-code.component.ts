import { ActivatedRoute } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-flight-booked-qr-code',
  templateUrl: './qr-code.component.html',
  encapsulation: ViewEncapsulation.None
})
export class QRCodeComponent {

  constructor(
    private activatedRoute: ActivatedRoute) { }

  code: string = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.code = params.code;
    });
  }

  // fn generate qr code
  onGetQRCode = () => {
    return `${environment.API_GEN_URL}/${this.code}.jpg`;
  };

}



