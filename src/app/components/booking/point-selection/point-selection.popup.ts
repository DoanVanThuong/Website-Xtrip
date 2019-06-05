import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {CAPP} from '../../../app.constants';
import {PopupBase, ErrorPopup} from '../../popup/index';
import {NouiFormatter} from 'ng2-nouislider';
import {Security} from '../../../common';

@Component({
  selector: 'point-selector-popup',
  templateUrl: 'point-selection.popup.html',
  styleUrls: ['./point-selection.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class PointSelectorPopup extends PopupBase {

  @ViewChild(ErrorPopup) errorPopup: ErrorPopup;

  @Input() error: Array<any> = [];
  @Output() submit: EventEmitter<number> = new EventEmitter<number>();

  min: number = 0;
  max: number = 0;
  sliderConfig = {
    connect: [true, false],
    padding: [0, 0],
    step: 1
  };

  selectedPoint: number = 0;
  price: number = 0;
  errorMessage: string = '';

  constructor(private _security: Security) {
    super();
  }

  ngOnInit() {
    if (this._security.isAuthenticated()) {
      this.max = this._security.getCurrentUser().points;
    }
  }

  ngOnChanges() {
    if (this.error.length) {
      this.errorMessage = this.error[0].value;
      this.errorPopup.show();
      this.selectedPoint = 0;
      this.price = Number(this.selectedPoint) * CAPP.UNIT_POINT;
    } else {
      this.errorMessage = '';
      this.hide();
    }
  }

  // fn accept get point
  onSubmit = () => {
    this.submit.emit(this.selectedPoint);
  };

  // fn close popup
  onCancel = () => {
    this.hide();
  };

  // fn on change
  onChangeSlider(e) {
    this.selectedPoint = e;
    this.price = Number(this.selectedPoint) * CAPP.UNIT_POINT;
  }
}
