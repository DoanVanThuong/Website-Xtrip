import {Component, ViewEncapsulation, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService, DeviceService} from '../../../../../common/services';
import {ProductRepo} from '../../../../../common/repos';
import {CSTORAGE} from '../../../../../app.constants';
import {DetailNotePopupComponent} from '../detail-note-popup/detail-note.popup';
import {ProductOption} from '../../../../../common/entities';
import { FullScreenMap } from 'app/components/popup';

@Component({
  selector: 'product-combo-info',
  templateUrl: './combo-info.component.html',
  styleUrls: ['./combo-info.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComboInfoComponent extends AppBase {
  @ViewChild(DetailNotePopupComponent) notePopup: DetailNotePopupComponent;
  @ViewChild(FullScreenMap) map: FullScreenMap;

  @Input() combo: ICombo = null;
  @Input() priceSummary: any;
  @Input() totalPrice: number = 0;

  requestId: string = null;
  isCollapsed: boolean = false;
  notes: any[] = [];

  constructor(private _router: Router,
              private _storage: StorageService,
              private _productRepo: ProductRepo,
              private _device: DeviceService) {
    super();
    this.setDeviceMode(this._device);
  }


  ngOnInit() {

  }

  ngOnChanges() {

    if (!!this.combo) {
      this.notes = this.combo.notes.trim().replace(/(?:\r\n|\r|\n|\\n|\\r|\- |\*)/g, '|').split('|').map(item => item.trim()).filter(i => !!i);
    }
  }

  viewDetailNote() {
    this.notePopup.show();
  }

  viewMap() {
    this.map.show();
  }
}

export interface ICombo {
  productName: string;
  duration: string;
  date: string;
  totalPax: number;
  optionName: string;
  notes: string
}
