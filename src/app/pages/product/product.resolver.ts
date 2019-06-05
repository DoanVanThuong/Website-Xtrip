import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformServer} from "@angular/common";
import {Observable} from "rxjs";
import {PRODUCT_TYPE, TOUR_TYPE} from "../../app.constants";

@Injectable()
export class ProductResolver implements Resolve<any> {

  constructor(@Inject(PLATFORM_ID) private platformID: string) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

    let data = {
      title: ' Tour du lịch tự túc - Xtrip',
      description: 'Cùng Xtrip khám phá vùng đất xinh đẹp này qua lịch trình du lịch tự túc, đến với những vùng đất thơ mộng và trữ tình với biển xanh nắng vàng hay Đà Lạt ngàn hoa, Sapa dầy tuyết.',
      keyword: 'du lịch tự túc, đi du lịch bụi'
    };

    if (isPlatformServer(this.platformID) && route.paramMap.get('type') === PRODUCT_TYPE.ACTIVITIES) {
      data = {
        title: 'Vé Vui Chơi - Xtrip',
        keyword: 'Mua vé vui chơi trực tuyến với hàng ngàn điểm vui chơi trong và ngoài nước thoải sức lựa chọn.',
        description: 'Vé khu vui chơi, vé khu giải trí, vé tham quan,'
      };
    }

    return data;
  }
}

