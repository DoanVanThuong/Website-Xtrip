import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../../../app.base';
import {DeviceService} from '../../../../common/services';

@Component({
  selector: 'home-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeEmptyComponent extends AppBase {

  @Input('show') isShow: boolean = false;
  @Input() content: string = 'Chạm để thử lại';
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  onReload = (): void => {
    this.reload.emit();
  }
}
