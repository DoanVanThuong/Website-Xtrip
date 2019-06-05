import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";
import {Observable} from "rxjs";
import {TOUR_TYPE} from "../../app.constants";
import {SeoService} from "../../common/services";

@Injectable()
export class TourArrivalResolver implements Resolve<any> {

  constructor(@Inject(PLATFORM_ID) private platformID: string,
              private _seo: SeoService) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

    let data = {
      title: 'Tour du lịch nước ngoài - Xtrip',
      description: 'Đến với Xtrip bạn sẽ có dịp khám phá những miền đất mới tại các nước Đông Nam Á, Châu Á. Với lịch trình dày, khởi hành đúng thời gian cam kết, luôn sẵn sàng phục vụ du khách mọi lúc, mọi nơi.',
      keywords: 'du lịch Thái Lan, du  lịch Singapore - Malaysia, du lịch Đài Loan, du lịch Phượng Hoàng Cổ Trấn, du lịch Hàn Quốc, du lịch Campuchia, du lịch Nhật Bản, du lịch HongKong ,Du Thuyền'
    };

    if (isPlatformServer(this.platformID) && route.paramMap.get('type') === TOUR_TYPE.DOMESTIC) {
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

    return data;
  }
}

