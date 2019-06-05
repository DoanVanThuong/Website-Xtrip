import {Component, Inject, Optional, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../app.base';
import {DeviceService, SeoService, StorageService} from 'app/common';
import {isPlatformServer} from "@angular/common";

@Component({
  selector: 'app-homepage',
  template: `
    <app-seo></app-seo>

    <app-homepage-mobile *ngIf="isMobile"></app-homepage-mobile>
    <app-homepage-desktop *ngIf="isDesktop"></app-homepage-desktop>

    <!-- for mkt -->
    <h1 class="invisible h-none m-t-none">Với Xtrip du lịch thật dễ dàng</h1>
  `,
  styleUrls: ['./homepage.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class HomepageComponent extends AppPage {

  constructor(private _device: DeviceService,
              private _storage: StorageService,
              private _seo: SeoService,
              @Optional() @Inject('ServerUrl') private serverUrl: string,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit(): void {

    let data = {
      title: 'Xtrip: Ứng dụng đặt phòng khách sạn, vé máy bay giá rẻ và tour du lịch',
      description: 'Ứng dụng du lịch thông minh giúp săn vé máy bay giá rẻ dễ dàng, đặt phòng khách sạn nhanh chóng và tìm mua tour du lịch hấp dẫn; nhiều ưu đãi mỗi ngày',
      keywords: 'ứng dụng du lịch; săn vé máy bay; book khách sạn; book tour; đặt phòng khách sạn; vé máy bay giá rẻ; xtrip; ứng dụng xtrip; du lịch thông minh; ứng dụng du lịch xtrip; ứng dụng đặt phòng khách sạn; ứng dụng đặt vé máy bay; traveloka;'
    };

    if (isPlatformServer(this.platformID) && this.utilityHelper.isVietmapTravel(this.serverUrl)) {
      data = {
        title: 'VietmapTravel - Chuyên tổ chức du lịch nội địa và quốc tế',
        description: 'Vietmap Travel là công ty du lịch lữ hành, chuyên cung cấp các tour du lịch nước ngoài, đặc biệt là các tour du lịch Nhật Bản, du lịch Đài Loan.',
        keywords: 'Du lich nhat ban, du lich japan, du lich nuoc ngoai, du lich dai loan, vietmaptravel, xtrip, Vietmap Travel'
      };
    }

    this._seo
      .setTitle(data.title)
      .updateTags([
        {name: 'description', content: data.description},
        {name: 'keywords', content: data.keywords},
      ]);
  }
}

