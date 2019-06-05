import { Component, ViewEncapsulation, Input } from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
  selector: 'app-price-detail-popup',
  templateUrl: './price-detail-popup.html',
  styleUrls: ['./price-detail-popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class PriceDetailComponent extends PopupBase {

  @Input() heading: string = '';
  @Input() data: any = null;

  constructor() { super() }

  ngOnChanges() {

  }

}
