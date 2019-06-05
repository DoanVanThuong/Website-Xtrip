import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tour-info',
  templateUrl: './tour-info.component.html',
  styleUrls: ['./tour-info.less'],
  encapsulation: ViewEncapsulation.None
})

export class TourInfoDetailDesktopComponent extends AppBase {
  @Input() tour: any = null;

  constructor(
    protected _toastr: ToastrService
  ) {
    super();
  }

  onClipboardSuccess() {
    this._toastr.success('Đã sao lưu mã giảm khuyến mãi thành công.', 'Thông báo', {
      positionClass: 'toast-top-right'
    })
  }


}
