import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'reward-point-popup',
  templateUrl: 'reward-point.popup.html',
  styleUrls: ['./reward-point.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class RewardPointPopup extends PopupBase {

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }
}
