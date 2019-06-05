import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {ProductOption} from '../../../../../common/entities';
import { DeviceService } from '../../../../../common/services';

@Component({
  selector: 'app-combo-mobile',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ComboMobileComponent extends AppBase {

  @Input() data: ProductOption[] = [];
  @Input() isShowButton: boolean = false;

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _device: DeviceService){
    super();
    this.setDeviceMode(this._device);
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }

  //fn select combo
  onSelectCombo(combo: any) {
    this.onSelect.emit(combo);
  }
}
