import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {PopupBase} from '../../popup.base';

@Component({
  selector: 'signout-confirm-popup',
  templateUrl: 'sign-out.popup.html',
  styleUrls: ['./sign-out.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class SignOutPopup extends PopupBase {

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
    this.accept.emit();
  };
}
