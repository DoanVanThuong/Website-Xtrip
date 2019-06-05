import {Component} from '@angular/core';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'about-me-popup',
  templateUrl: './about-me.popup.html',
  styleUrls: ['./about-me.popup.less']
})
export class AboutMePopup extends PopupBase {

  constructor() {
    super();
  }

  // on initial
  ngOnInit() {

  }

  ngOnChanges() {

  }
}
