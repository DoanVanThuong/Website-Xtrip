import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'sync-request-popup',
  templateUrl: './sync-request.popup.html',
  styleUrls: ['./sync-request.popup.less']
})
export class SyncRequestPopup extends PopupBase {

  @Output('submit') submit: EventEmitter<any> = new EventEmitter<any>();
  @Output('cancel') cancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  // on initial
  ngOnInit() {

  }

  ngOnChanges() {

  }

// on submit sync
  onSubmit = () => {
    this.submit.emit(true);
    this.hide();
  };

  // on cancel sync
  onCancel = () => {
    this.cancel.emit(true);
    this.hide();
  };
}