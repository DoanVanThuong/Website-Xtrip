import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { PopupBase } from '../popup.base';
import { ToastrService } from 'ngx-toastr';
import { Promotion } from '../../../common';
import { PromotionSurveyPopup } from '../promotion-survey-popup/promotion-survey-popup.component';

@Component({
  selector: 'app-promotion-result-popup',
  templateUrl: './promotion-result-popup.component.html',
  styleUrls: ['./promotion-result-popup.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PromotionResultPopup extends PopupBase {

  @ViewChild(PromotionSurveyPopup) promotionSurveyPopup: PromotionSurveyPopup;

  @Input('data') data: any = new Promotion();

  constructor(
    private _toastr: ToastrService
  ) {
    super();
  }

  //notify after copy promotion code
  onClipboardSuccess = () => {
    this._toastr.success('Đã copy mã', 'Thông báo');
  }
  
  //on open servey
  openServey() {
    this.hide();
    this.promotionSurveyPopup.show();
  }
  

}
