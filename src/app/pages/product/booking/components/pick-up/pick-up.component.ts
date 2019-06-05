import {Component, ViewEncapsulation, Input, EventEmitter, Output} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {ProductOption} from '../../../../../common/entities';
import {DeviceService, StorageService} from 'app/common';
import {CSTORAGE} from '../../../../../app.constants';

@Component({
  selector: 'booking-pickup',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingPickUpComponent extends AppBase {

  @Input() class: string = '';
  @Input() combo: ProductOption = new ProductOption();
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  note: string = '';

  constructor(private _storage: StorageService,
              private _device: DeviceService) {
    super();
    this.setDeviceMode(this._device);
  }

  ngOnInit() {
    this.combo = new ProductOption(this._storage.getItem(CSTORAGE.PRODUCT_COMBO) || {});
  }

  ngOnChanges() {

  }

  onNoteChange = ($event: any): void => {
    this.changes.emit(this.note);
  };

}
