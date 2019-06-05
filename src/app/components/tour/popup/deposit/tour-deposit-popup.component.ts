import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {PopupBase} from 'app/components/popup';
import {TourDeposit} from 'app/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-tour-deposit-popup',
  templateUrl: './tour-deposit-popup.component.html',
  styleUrls: ['./tour-deposit-popup.component.less']
})
export class TourDepositPopup extends PopupBase {

  @Input() headerText ?: string = '';
  @Input('data') depositItems: any = [];
  @Input() tips ?: string = null;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  selectedItem: any = {};

  constructor(protected _device: DeviceDetectorService) {
    super();
    this.setDeviceMode(_device);
  }

  ngOnChanges() {
    this.selectedItem = this.depositItems[0];
  }

  //select item
  onSelectItem(item: TourDeposit) {
    this.selectedItem = item;
  };

  //submit deposit code
  onSubmit() {
    this.hide();
    this.submit.emit(this.selectedItem.code);
  }

}
