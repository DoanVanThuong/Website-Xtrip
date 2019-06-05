import {Component, ViewEncapsulation, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AppBase} from '../../../../app.base';
import {
  Product,
  Spinner,
  Error,
  DeviceService,
  StorageService,
  ProductSearch
} from '../../../../common';
import {ProductRepo} from '../../../../common/repos/product.repo';
import {SocialSharing, DateSelectorPopup, ChatInfoPopupComponent} from '../../../../components/popup';

import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import {CSTORAGE, PRODUCT_TYPE} from '../../../../app.constants';
import {BsLocaleService} from 'ngx-bootstrap';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Angulartics2} from 'angulartics2';

declare var require: any;
declare const fbq: any;

@Component({
  selector: 'app-product-detail-mobile',
  templateUrl: './product-detail-mobile.component.html',
  styleUrls: ['./product-detail-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailMobileComponent extends AppBase {

  @ViewChild(SocialSharing) socialSharing: SocialSharing;
  @ViewChild(DateSelectorPopup) dateSelectorPopup: DateSelectorPopup;
  @ViewChild(ChatInfoPopupComponent) chatPopup: ChatInfoPopupComponent;

  locale: string = 'vi';
  productId: string = '';
  product: Product = new Product();
  productSearch: ProductSearch = new ProductSearch();
  galleryPhotos: any[] = [];

  options: Partial<IOPtion[]> = [];
  breadcrumbs: any[] = [];

  isFavorite: boolean = false;
  isShowButtonCombo: boolean = false;

  mapStyles = require('./../../../../../assets/maps/map-style.json');

  selectedDate: any = {
    start: null,
    end: null
  };
  dateOptions: any = {
    single: true,
    startOfWeek: 1
  };

  scrollToItem: Array<any> = [
    {
      display: 'Tổng quan',
      value: 'general'
    },
    {
      display: 'Thông tin combo',
      value: 'combo'
    },
    {
      display: 'Điểm nổi bật',
      value: 'hightlight'
    },
    {
      display: 'Thông tin dịch vụ',
      value: 'service'
    },
    {
      display: 'Mô tả',
      value: 'description'
    },
    {
      display: 'Hướng dẫn',
      value: 'note'
    }
  ];
  selectedScrollTo: string = this.scrollToItem[0].value;

  carouselOptions: any = {
    items: 1,
    navigation: true,
    loop: true,
    autoplay: false,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    margin: 0,
    dots: false,
  };

  totalPrice: number = 0;
  basicHeight: number = 0;
  isLoading: boolean = false;

  params: any = {};
  PRODUCT_TYPE: any = PRODUCT_TYPE;
  tourDatesAvailable: any = [];

  constructor(protected _productRepo: ProductRepo,
              protected _spinner: Spinner,
              protected _toastService: ToastrService,
              protected _activedRouter: ActivatedRoute,
              protected _router: Router,
              protected _storage: StorageService,
              protected _device: DeviceService,
              private _angulartics: Angulartics2,
              private _localeService: BsLocaleService) {
    super();

    this.setDeviceMode(this._device);
    this._localeService.use(this.locale);
  }

  ngOnInit(): void {
    this._storage.removeItem(CSTORAGE.PRODUCT_BOOKING);
    this.getParams();
  }

  @HostListener('window:scroll', ['$event'])
  scrollTo() {
    if (this._device.isMobile()) {

      const header = $('.product-heading');
      const scrollTo = $('.scroll-to');

      if (window.scrollY > 100) {
        header.addClass('scroll bg-green-linear');
        scrollTo.addClass('scroll bg-green-linear');
      } else {
        header.removeClass('scroll bg-green-linear');
        scrollTo.removeClass('scroll bg-green-linear');
      }

      for (let i in this.scrollToItem) {
        const element: HTMLElement = document.querySelector(`#${this.scrollToItem[i].value}`);
        if (window.scrollY >= element.offsetTop - 83) {
          this.selectedScrollTo = this.scrollToItem[i].value;
        }
      }
    }
  };

  // fn get params from route
  getParams() {
    combineLatest(
      this._activedRouter.params,
      this._activedRouter.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((param: any): void => {

        if (!param.id) {
          this._router.navigate(['/']);
        }
        this.productId = param.id;
        this.params = param;

        this.productSearch = new ProductSearch(Object.assign({}, this.params, {
          destination: {
            id: this.params.destination
          }
        }));

        Promise.all([
          this.getDetail(this.productId),
          this.getOption(this.productId),
          this.getDatesAvailable(this.productId)
        ]);
      });
  }

  // fn trigger to scroll to element
  triggerScrollTo = (element: HTMLElement) => {
    if (!!element) {
      const y = document.querySelector(`#${element}`).getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y - 83,
        behavior: 'smooth'
      });
    }
  };

  // fn push analytic tracking
  pushAnalyticTracking = (product: Product): void => {

    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', {
        id: product.id,
        title: product.name,
        category: product.destination.id,
        // categories: [product.destination.id]
      });
    }

    this._angulartics.eventTrack.next({
      action: 'ViewContent',
      properties: {
        id: product.id,
        title: product.name,
        category: product.destination.id,
        // categories: [product.destination.id]
      }
    });
  };

  //fn get detail
  async getDetail(id: string) {
    this.isLoading = true;
    try {
      const response: any = await this._productRepo.getDetail(id);

      if (!response.data) {
        this._router.navigate(['/404']);
      }

      this.product = new Product(response.data);

      this.pushAnalyticTracking(this.product);

      this.totalPrice = this.product.sellingPrice;
      this.galleryPhotos = this.product.photos.map(photo => {
        return {
          small: photo.src,
          medium: photo.src,
          big: photo.src,
        };
      });
      if (this.isDesktop) {
        setTimeout(() => {
          this.basicHeight = document.querySelector('#basicHeight').clientHeight;
        }, 100);
      }

      // breadcrumb
      this.breadcrumbs = [
        {title: 'Trang chủ', link: '/'},
        this.params.type === PRODUCT_TYPE.FREE_AND_EASY ? {
          title: 'Tour Free and Easy',
          link: '/product/daytour'
        } : {
          title: 'Vé vui chơi',
          link: '/product/activities'
        },
        {
          title: this.product.destination.name,
          link: `/product/result`,
          queryParams: {
            type: this.params.type || PRODUCT_TYPE.FREE_AND_EASY,
            destination: this.product.destination.id,
            name: this.product.destination.name
          }
        },
        {title: `${this.product.name}`, link: ''}
      ].filter(item => !!item.title);

    } catch (error) {
      this._router.navigate(['/404']);
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }

  //fn get option ( COMBO )
  async getOption(id: string) {
    try {
      const response: any = await this._productRepo.getOption(id);
      if (response.code.toLowerCase() === 'success') {
        this.options = (response.data).map(item => {
          return {
            id: item.id,
            title: item.title,
            notes: item.notes,
            points: item.points,
            sellingPrice: item.sellingPrice,
            originalPrice: item.originalPrice,
            description: item.description,
            available: item.available,
            remark: item.remark
          };
        });
      } else {
        this.handleError(response.errors[0]);
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }

  //fn handle error
  handleError(error: any) {

    this._toastService.error(`${new Error(error).value}`, 'Có lỗi xảy ra', {
      positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
    });
    if (this.isMobile) {
      this._router.navigate(['/']);
    }
    this.isLoading = false;
  }

  //fn return time
  returnDuration(days: number = 0, hours: number = 0, minutes: number = 0) {
    if (days > 0) {
      return `${days} ngày`;
    } else {
      if (hours > 0) {
        if (minutes > 0) {
          return `${hours} giờ ${minutes} phút`;
        } else {
          return `${hours} giờ`;
        }
      } else return `${minutes} phút`;
    }
  }

  //fn open sharing social
  onSocialSharing() {
    this.socialSharing.show();
  }

  //fn show fulll
  openFullMap(map: any) {
    $('.gm-fullscreen-control').click();
  }

  // fn on show date picker
  onShowDatePicker = () => {
    this.dateSelectorPopup.show();
  };

  //fn select date
  onSelectDate(date: any) {
    const data = moment(date.start).format('YYYY-MM-DD');
    this._router.navigate([`product/${this.productId}/detail/${data}/combo`]);
  }

  //fn back
  back() {
    window.history.back();
  }

  openPopupChat() {
    this.chatPopup.show();
  }

  async getDatesAvailable(id: string) {
    this.isLoading = true;
    try {
      const res: any = await this._productRepo.getDatesAvailable(id);
      this.tourDatesAvailable = (res.data || []).filter((date: any) => !date.available);
    } catch (error) {
      const err: Error = new Error(error[0]);
      this._toastService.error(err.value, 'Có lỗi xảy ra');
    } finally {
      this.isLoading = false;
    }
  }
}

interface IOPtion {
  id: string;
  title: string;
  notes: string;
  points: string;
  sellingPrice: number;
  originalPrice: number;
  description: string;
  available: boolean;
  remark: any;
}
