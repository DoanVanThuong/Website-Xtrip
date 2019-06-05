import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'reference-price-popup',
  templateUrl: 'reference-price.popup.html',
  styleUrls: ['./reference-price.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class ReferencePricePopup extends PopupBase {

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }
}
