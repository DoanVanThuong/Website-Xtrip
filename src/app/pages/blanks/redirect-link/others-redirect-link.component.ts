import {Component} from '@angular/core';
import {AppBase} from 'app/app.base';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-others-redirect-link',
  template: ``
})

export class RedirectLinkComponent extends AppBase {

  constructor(protected _activatedRoute: ActivatedRoute,
              protected _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.redirectLink(params);
    });
  };

  //calc redirect link from params
  redirectLink = (params: any = {}) => {
    switch (`/${params.category}/${params.type}/${params.id}/${params.alias}`) {
      case '/news/tintuc/206/di-du-lich-dai-loan-co-can-visa-khong': {
        this._router.navigate([`/blog/10aaca96/di-du-lich-dai-loan-co-can-visa-khong`]);
        break;
      }
      case '/news/diadiemdulich/146/6-dia-diem-du-lich-hap-dan-o-vung-ngoai-o-tokyo': {
        this._router.navigate([`/blog/14f177cf/6-dia-diem-du-lich-hap-dan-o-vung-ngoai-o-tokyo`]);
        break;
      }
      case '/news/tintuc/201/tim-hieu-tien-te-dai-loan': {
        this._router.navigate([`/blog/e007bcf9/tim-hieu-tien-te-dai-loan`]);
        break;
      }
      case '/news/tintuc/174/5-ky-quan-tai-a-ly-son-dai-loan': {
        this._router.navigate([`/blog/44f2e10c/5-ky-quan-tai-a-ly-son-dai-loan`]);
        break;
      }
      case '/news/tintuc/192/di-du-lich-dai-loan-nen-mua-gi': {
        this._router.navigate([`/blog/85a1fdfa/di-du-lich-dai-loan-nen-mua-gi`]);
        break;
      }
      case '/news/Index/180/bong-lua-chin-la-bong-lua-cui-dau': {
        this._router.navigate([`/blog/2c6b5d68/bong-lua-chin-la-bong-lua-cui-dau`]);
        break;
      }
      case '/news/tintuc/190/mach-ban-13-meo-xep-do-cuc-chat-khi-di-du-lich': {
        this._router.navigate([`/blog/be5297f3/mach-ban-13-meo-xep-do-cuc-chat-khi-di-du-lich`]);
        break;
      }
      case '/news/diadiemdulich/138/rung-dom-dom-me-hoac-o-nagoya-nhat-ban': {
        this._router.navigate([`/blog/b31d6f76/rung-dom-dom-me-hoac-o-nagoya-nhat-ban`]);
        break;
      }
      case '/news/tintuc/202/ve-dep-cong-vien-dia-chat-da-lieu-dai-loan': {
        this._router.navigate([`/blog/29e922ea/ve-dep-cong-vien-dia-chat-da-lieu-dai-loan`]);
        break;
      }
      case '/news/camnang/126/thu-tuc-nhap-canh-dai-loan': {
        this._router.navigate([`/blog/22ae3837/thu-tuc-nhap-canh-dai-loan`]);
        break;
      }
      case '/news/tintuc/191/5-dia-diem-dep-nhat-nhat-ban-mua-giang-sinh-2018': {
        this._router.navigate([`/blog/1f87b3c7/5-dia-diem-dep-nhat-nhat-ban-mua-giang-sinh-2018`]);
        break;
      }
      case '/news/tintuc/196/20-diem-ngam-hoa-anh-dao-dep-me-hon-o-nhat-ban': {
        this._router.navigate([`/blog/9d31c862/20-diem-ngam-hoa-anh-dao-dep-me-hon-o-nhat-ban`]);
        break;
      }
      case '/news/diadiemdulich/156/kham-pha-tokyo-disneyland-thien-duong-cua-nhung-giac-mo': {
        this._router.navigate([`/blog/216571b7/kham-pha-tokyo-disneyland-thien-duong-cua-nhung-giac-mo`]);
        break;
      }
      case '/news/tintuc/208/ve-dep-cua-rung-tre-sagano-nhat-ban': {
        this._router.navigate([`/blog/62e492b8/ve-dep-cua-rung-tre-sagano-nhat-ban`]);
        break;
      }
      case '/news/Index/178/tet-trung-thu-o-dai-loan': {
        this._router.navigate([`/blog/8f0a965a/tet-trung-thu-o-dai-loan`]);
        break;
      }
      case '/news/camnang/142/tham-khao-nhung-cua-hang-100-yen-o-tokyo': {
        this._router.navigate([`/blog/b2711c78/tham-khao-nhung-cua-hang-100-yen-o-tokyo`]);
        break;
      }
      case '/news/Index/166/10-trai-nghiem-kho-quen-tai-cong-vien-quoc-gia-taroko-dai-loan': {
        this._router.navigate([`/blog/c8429f43/10-trai-nghiem-kho-quen-tai-cong-vien-quoc-gia-taroko-dai-loan`]);
        break;
      }
      case '/news/tintuc/209/den-pho-co-thap-phan-shifen-cau-binh-an': {
        this._router.navigate([`/blog/13fabd17/den-pho-co-thap-phan-shifen-cau-binh-an`]);
        break;
      }
      case '/news/Index/184/4-hon-dao-nhan-tao-se-khien-ban-me-man-khi-toi-nhat-ban': {
        this._router.navigate([`/blog/b848e27a/4-hon-dao-nhan-tao-se-khien-ban-me-man-khi-toi-nhat-ban`]);
        break;
      }
      case '/news/Index/179/nhung-ngay-tet-thu-vi-o-dai-loan': {
        this._router.navigate([`/blog/9235d69f/nhung-ngay-tet-thu-vi-o-dai-loan`]);
        break;
      }
      case '/news/tintuc/194/18-ly-do-tuyet-voi-khien-ban-muon-di-dai-loan-ngay-lap-tuc!': {
        this._router.navigate([`/blog/3f1fa4bf/18-ly-do-tuyet-voi-khien-ban-muon-di-dai-loan-ngay-lap-tuc`]);
        break;
      }
      case '/news/tintuc/195/16-ly-do-ban-nen-di-nhat-ban-dip-cuoi-nam': {
        this._router.navigate([`/blog/8db37aa9/16-ly-do-ban-nen-di-nhat-ban-dip-cuoi-nam`]);
        break;
      }
      case '/news/camnang/165/du-lich-dai-loan-nen-luu-y-nhung-gi-khi-nhap-canh': {
        this._router.navigate([`/blog/ac11c4b2/du-lich-dai-loan-nen-luu-y-nhung-gi-khi-nhap-canh`]);
        break;
      }
      case '/news/tintuc/199/du-bao-thoi-gian-hoa-anh-dao-no-nam-2018-o-nhat-ban': {
        this._router.navigate([`/blog/a3c952a3/du-bao-thoi-gian-hoa-anh-dao-no-nam-2018-o-nhat-ban`]);
        break;
      }
      default: {
        this._router.navigate(['/404']);
        break;
      }
    }
  };

}
