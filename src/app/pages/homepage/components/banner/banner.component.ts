import {Component, Inject, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {GlobalRepo} from '../../../../common/repos/index';
import {DeviceService, Photo} from 'app/common';

@Component({
  selector: 'home-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['banner.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeBannerComponent extends AppPage {

  banners: Array<any> = [];
  isBannerLoading = false;

  // slider options
  carouselOptions: any = {
    items: 1,
    navigation: true,
    nav: this.isDesktop,
    navText: [
      '<img class="" src="assets/images/icon/icon-angle-left-white-big.svg"/>',
      '<img class="" src="assets/images/icon/icon-angle-right-white-big.svg"/>'
    ],
    navClass: ['owl-prev', 'owl-next'],
    loop: true,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    margin: 0,
    dots: true,
    lazyLoad: true,
    navSpeed: 1000,
    dotsSpeed: 1000,
    autoplayHoverPause: true,
    responsive: {
      768: {
        dots: false
      }
    }
  };

  constructor(protected _globalRepo: GlobalRepo,
              private _device: DeviceService,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();
    this.setDeviceMode(this._device);
    this.carouselOptions = Object.assign(this.carouselOptions, {
      nav: this.isDesktop,
    });
  }

  ngOnInit() {
    this.getBanners();
  }

  // fn get banner
  getBanners() {
    this.isBannerLoading = true;

    return this._globalRepo
      .getBanners()
      .then(
        (res: any) => {
          this.isBannerLoading = false;
          this.banners = res.data.map((banner: IBanner) => banner);
        }
      );
  }

  // fn get target of link
  getTargetOfLink = (link: string = ''): string => {
    const targets: string[] = ['xtrip.vn', 'vietmaptravel.vn'];

    targets.forEach((value: any, index: number) => {
      if (link.indexOf(targets[index]) !== -1) {
        return '_blank';
      }
    });

    return '_self';
  };
}

interface IBanner {
  alias: string;
  code: string
  description: string;
  name: string;
  photo: Photo
  url: string
}
