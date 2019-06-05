import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {PopupBase} from '../popup.base';
import {StorageService} from '../../../common/services';

@Component({
  selector: 'confirm-back-popup',
  templateUrl: 'confirm-back.component.html',
  styleUrls: ['./confirm-back.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmBackPopup extends PopupBase {

  @Input('lblCancel') labelCancel: string = 'Quay lại';
  @Input('lblOk') labelOk: string = 'Tiếp tục';

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  // fn back
  onBack() {
    this.submit.emit(true);
    this.hide();
  }

  onCancel() {
    this.submit.emit(false);
    this.hide();
  }
}
