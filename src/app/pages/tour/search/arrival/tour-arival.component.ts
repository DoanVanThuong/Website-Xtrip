import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {AppBase} from '../../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService, SeoService} from '../../../../common/services';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {TOUR_TYPE} from "../../../../app.constants";
import {isPlatformServer} from "@angular/common";

@Component({
  selector: 'app-tour-arrival',
  template: `

    <!-- for mkt -->
    <h1 class="invisible h-none m-none">{{ heading1 }}</h1>
    <h2 class="invisible h-none m-none"
        *ngFor="let item of heading2; trackBy: trackByFn">{{ item }}</h2>

    <app-tour-arrival-desktop *ngIf="isDesktop"></app-tour-arrival-desktop>
    <app-tour-arrival-mobile *ngIf="isMobile"></app-tour-arrival-mobile>

  `
})
export class TourArrivalComponent extends AppBase {

  type: string = TOUR_TYPE.INTERNATIONAL;
  heading1: string = '';
  heading2: any = [];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _seo: SeoService,
              private _device: DeviceService,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();
    this.setDeviceMode(_device);
  };

  ngOnInit() {

    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((params: any): void => {
        this.type = params.type;

        let data = {
          title: 'Tour du lịch nước ngoài - Xtrip',
          description: 'Đến với Xtrip bạn sẽ có dịp khám phá những miền đất mới tại các nước Đông Nam Á, Châu Á. Với lịch trình dày, khởi hành đúng thời gian cam kết, luôn sẵn sàng phục vụ du khách mọi lúc, mọi nơi.',
          keywords: 'du lịch Thái Lan, du  lịch Singapore - Malaysia, du lịch Đài Loan, du lịch Phượng Hoàng Cổ Trấn, du lịch Hàn Quốc, du lịch Campuchia, du lịch Nhật Bản, du lịch HongKong ,Du Thuyền'
        };

        if (isPlatformServer(this.platformID) && this.type === TOUR_TYPE.DOMESTIC) {
          data = {
            title: 'Tour du lịch trong nước - Xtrip',
            description: 'du lịch Việt Nam, du lịch miền bắc, du lịch miền tây, du lịch Hà Nội,du lịch Hạ Long,du lịch Sapa, du lịch Đà Nẵng,du lịch Hội An, du lịch Huế, du lịch Nha Trang, du lịch Phan Thiết, du lịch Phú Quốc, du lịch Đà Lạt, du lịch Buôn Mê, du lịch Tây Nguyên',
            keywords: 'Việt Nam với đường bờ biển dài hơn 3260km, với những hòn đảo thơ mộng, những thành phố nhộn nhịp, những di tích lịch sử hào hùng, nền văn hóa độc đáo và hấp dẫn, cùng một danh sách dài những món ăn ngon nhất thế giới.'
          };
        }

        this._seo
          .setTitle(data.title)
          .updateTags([
            {name: 'description', content: data.description},
            {name: 'keywords', content: data.keywords},
          ]);

        // for mkt
        switch (this.type) {
          case TOUR_TYPE.INTERNATIONAL: {
            this.heading1 = 'Du lịch nước ngoài';
            this.heading2 = [
              'Thái Lan',
              'Singapore - Malaysia',
              'Đài Loan',
              'Phượng Hoàng Cổ Trấn',
              'Hàn Quốc',
              'Campuchia',
              'Nhật Bản',
              'HongKong',
              'Du Thuyền'
            ];
            break;
          }
          case TOUR_TYPE.DOMESTIC: {
            this.heading1 = 'du lịch trong nước';
            this.heading2 = [
              'Khám Phá Miền Bắc',
              'Khám Phá Miền Tây',
              'Hà Nội - Hạ Long - Sapa',
              'Đà Nẵng - Hội An - Huế',
              'Nha Trang - Phan Thiết',
              'Phú Quốc',
              'Đà Lạt - Buôn Mê - Tây Nguyên'
            ];
            break;
          }
        }
      });
  }
}
