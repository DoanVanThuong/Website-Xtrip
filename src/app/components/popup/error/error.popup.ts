import {Component, Input} from '@angular/core';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'error-popup',
  templateUrl: './error.popup.html',
  styleUrls: ['./error.popup.less']
})
export class ErrorPopup extends PopupBase {

  @Input('message') message: string = '';

  constructor() {
    super();
  }

  // on initial
  ngOnInit() {

  }

  ngOnChanges() {

  }
}
