import {Component} from '@angular/core';
import {PopupBase} from "../popup.base";

@Component({
  selector: 'qr-code-popup',
  templateUrl: './qr-code.popup.html',
  styleUrls: ['./qr-code.less']
})
export class QrCodePopup extends PopupBase {

  constructor() {
    super();
  }

  // on initial
  ngOnInit() {

  }

  ngOnChanges() {

  }
}