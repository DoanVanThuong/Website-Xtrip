import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Inject, Injectable, Optional, PLATFORM_ID} from "@angular/core";
import {isPlatformServer} from "@angular/common";
import {UtilityHelper} from "../../common/helpers";
import {Observable} from "rxjs";
import {SeoService} from "../../common/services";

@Injectable()
export class HomepageResolver implements Resolve<any> {

  constructor(@Optional() @Inject('ServerUrl') private serverUrl: string,
              private _seo: SeoService,
              @Inject(PLATFORM_ID) private platformID: string) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

    const utilityHelper = new UtilityHelper();

    let data = {
      title: 'Xtrip: Ứng dụng đặt phòng khách sạn, vé máy bay giá rẻ và tour du lịch',
      description: 'Ứng dụng du lịch thông minh giúp săn vé máy bay giá rẻ dễ dàng, đặt phòng khách sạn nhanh chóng và tìm mua tour du lịch hấp dẫn; nhiều ưu đãi mỗi ngày',
      keywords: 'ứng dụng du lịch; săn vé máy bay; book khách sạn; book tour; đặt phòng khách sạn; vé máy bay giá rẻ; xtrip; ứng dụng xtrip; du lịch thông minh; ứng dụng du lịch xtrip; ứng dụng đặt phòng khách sạn; ứng dụng đặt vé máy bay; traveloka;'
    };

    if (isPlatformServer(this.platformID) && utilityHelper.isVietmapTravel(this.serverUrl)) {
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

    return data;
  }
}

