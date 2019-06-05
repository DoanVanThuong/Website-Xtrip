import {Component, Input} from '@angular/core';
import {AppBase} from '../../../../app.base';

@Component({
  selector: 'booking-empty',
  template: `
    <div class="animated zoomIn" *ngIf="isShow">
      <div class="panel card panel-desktop">
        <div class="panel-body card-body p-55 text-center">
          <img class="m-b-none mx-w-350" cdn-src="assets/images/bg-booking.png" alt="image"/>
          <div class="font-16 m-b-10 m-t-30">
            <h4 class="font-medium font-15 m-none">{{ heading }}</h4>
            <div class="">{{ description }}</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingEmptyComponent extends AppBase {

  @Input('show') isShow: boolean = false;
  @Input() heading: string = 'Không tìm thấy dữ liệu';
  @Input() description: string = 'Mọi chỗ bạn đặt sẽ được hiển thị tại đây.';

  constructor() {
    super();
  }

}
