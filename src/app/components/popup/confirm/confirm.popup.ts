import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'confirm-popup',
  templateUrl: 'confirm.popup.html',
  styleUrls: ['./confirm.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmPopup extends PopupBase {

  @Input() title: string = 'Thông báo';
  @Input() message: string = '';
  @Output('submit') submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  // fn on submit
  onAccept = (): void => {
    this.hide();
    this.submit.emit();

    if (typeof this.event.accept === 'function') {
      this.event.accept();
    }
  };

  // fn on cancel
  onCancel = (): void => {
    this.hide();
    if (typeof this.event.cancel === 'function') {
      this.event.cancel();
    }
  };
}
