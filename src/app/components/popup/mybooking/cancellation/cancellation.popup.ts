import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PopupBase } from '../../popup.base';

@Component({
  selector: 'cancellation-popup',
  templateUrl: './cancellation.popup.html'
})
export class CancellationPopup extends PopupBase {

  @Output() yes: EventEmitter<any> = new EventEmitter<any>();
  @Input('type') type: string = '';

  @Input('data') data: any;

  constructor() {
    super();
  }

  onCancel() {
    this.yes.emit();
  }

}