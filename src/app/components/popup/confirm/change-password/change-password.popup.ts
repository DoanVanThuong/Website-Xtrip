import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {PopupBase} from '../../popup.base';

@Component({
  selector: 'change-password-confirm-popup',
  templateUrl: 'change-password.popup.html',
  styleUrls: ['./change-password.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordPopup extends PopupBase {

  @Output('accept') accept: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  // fn on accept
  onAccept = () => {
    this.hide();
    this.accept.emit();
  };
}
