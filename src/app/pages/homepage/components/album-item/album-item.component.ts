import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../../../app.base';
import {DeviceService} from '../../../../common/services';
import {Album} from '../../../../common/entities';

@Component({
  selector: 'home-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeAlbumItemComponent extends AppBase {

  @Input() album: Album = new Album();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  openDetailAlbum(item: any) {
    this.select.emit(item);
  }
}
