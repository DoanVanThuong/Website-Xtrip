import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';
import {Transfer} from '../../../common/entities';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'payment-transfer-detail',
  templateUrl: './payment-transfer-detail.component.html',
  styleUrls: ['./payment-transfer-detail.component.less',],
  encapsulation: ViewEncapsulation.None
})
export class PaymentTransferDetailComponent extends AppBase {

  @Input() bank: Transfer = new Transfer();

  isAccountNo: boolean = true;

  constructor(private _toastr: ToastrService) {
    super();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
    
  }

  ngOnDestroy() {

  }

  // on clipboard success
  onClipboardSuccess = (content: any) => {
    this._toastr.success(content, 'Thông báo', {
      positionClass: 'toast-top-right'
    });
  };
}
