import {Component, ViewEncapsulation} from '@angular/core';
import {ProfileMyPointMobileComponent} from '../mobile/reward-point-mobile.component';

@Component({
  selector: 'app-reward-point-desktop',
  templateUrl: './reward-point-desktop.component.html',
  styleUrls: ['./reward-point-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileMyPointDesktopComponent extends ProfileMyPointMobileComponent {

  tipIndex: number = 0;
  tips: string[] = [
    'Điểm chờ duyệt là điểm thưởng chưa được kích hoạt khi bạn thanh toán vé máy bay, tour, hotel…',
    'Điểm khả dung là diểm sau khi bạn hoàn thành chuyến đi, điểm chờ duyệt sẽ tự động chuyển sang điểm khả dụng'
  ];


  ngOnInit() {
    this.onLoadPoints();

    this.tipIndex = this.utilityHelper.random(0, this.tips.length - 1);
  }

}