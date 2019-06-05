import {Component, ViewEncapsulation, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
// import {trigger, transition, animate, style, state} from '@angular/animations';

import {ProductRepo, Product, ProductSearch, SeoService} from '../../../../common';
import {AppBase} from '../../../../app.base';
import {ProductLocationSelectorPopup} from '../../../../components/product/shared/product-location-selector/product-location-selector.component';
import {ProductFilterPopup} from '../components/popup/product-filter/product-filter.popup';
import {DeviceService} from '../../../../common';
import {PRODUCT_TYPE} from 'app/app.constants';
import {environment} from '../../../../../environments/environment';
import { ProductDestination } from 'app/common/entities/product-destination.entity';

@Component({
  selector: 'app-product-result-mobile',
  templateUrl: './product-result-mobile.component.html',
  styleUrls: ['./product-result-mobile.component.less'],
  encapsulation: ViewEncapsulation.None,
  // animations: [
  //   trigger('scrollAnimation', [
  //     state('show', style({
  //       visibility: 'visible',
  //       transition: 'all .25s ease-out',
  //       transform: 'translate(-50%, -100%)',
  //     })),
  //     state('hide', style({
  //       visibility: 'hidden',
  //       transform: 'translate(-50%, 0%)',
  //       transition: 'all .25s ease-in-out'
  //     })),
  //     transition('show <=> hide', animate('0.25s ease-in-out')),
  //   ])
  // ]
})
export class ProductResultMobileComponent extends AppBase {

  @ViewChild(ProductLocationSelectorPopup) productLocationSelectorPopup: ProductLocationSelectorPopup;
  @ViewChild(ProductFilterPopup) filterPopup: ProductFilterPopup;

  products: Product[] = [];
  relatedProducts: Product[] = [];
  params: any = {};
  productSearch: ProductSearch = new ProductSearch();

  isDone = false;

  lastScrollTop: number = 0;
  stateIconMap = 'show';

  PRODUCT_TYPE = PRODUCT_TYPE;

  breadItems = [];

  sorts = [
    {value: 0, display: 'Giá tăng dần'},
    {value: 1, display: 'Giá giảm dần'},
    {value: 2, display: 'Xếp hạng'}
  ];

  quickCategories: any = [];
  isShowDropdown = false;

  originalFilterData: any = {};

  navigationSubscription: any;

  constructor(private _productRepo: ProductRepo,
              private _activatedRoute: ActivatedRoute,
              protected _router: Router,
              private _location: Location,
              private _seo: SeoService,
              private _device: DeviceService) {
    super();
    this.setDeviceMode(this._device);
  }

  ngOnInit() {

    this._activatedRoute.queryParams.subscribe(params => {
      this.isDone = false;
      this.products = [];
      this.relatedProducts = [];
      this.offset = 0;
      this.limit = 10;
      this.params = params;

      this.handleBreadCrumb(this.params);

      this.productSearch = new ProductSearch(Object.assign({}, params, {
        destination: new ProductDestination({
          id: params.destination
        }),
        filters: this.handleFilterFromParams(params)
      }));

      /*this._seo
        .setDeepLink(`product/result`, {
          name: this.productSearch.name,
          destination: this.productSearch.destination.id,
          type: this.productSearch.type
        });*/

      this.getProducts();
    });
  };

  ngOnDestroy() {
    const body: HTMLElement = document.querySelector('body');
    body.classList.remove('fixed-header');
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isMobile) {
      const header: HTMLElement = document.querySelector('.header.header-mobile');
      const container: HTMLElement = document.querySelector('.pos-container');

      if (window.scrollY > 0) {
        header.classList.add('fixed-header');
        container.classList.add('m-t-110');
      } else {
        header.classList.remove('fixed-header');
        container.classList.remove('m-t-110');
      }
    }

    if (window.pageYOffset > this.lastScrollTop && window.pageYOffset > 0) {
      this.stateIconMap = 'hide';
    } else {
      this.stateIconMap = 'show';
    }
    this.lastScrollTop = window.pageYOffset;

  }

  backTo = () => {
    this._location.back();
  };

  //get name location
  getLocation(params) {
    return !!params.name ? params.name : 'Tất cả';
  }

  //handle breadcrumb
  handleBreadCrumb(params) {
    this.breadItems = [
      {title: 'Trang chủ', link: '/'},
      {
        title: `${params.type === this.PRODUCT_TYPE.FREE_AND_EASY ? 'Tour Free and Easy' : 'Vé vui chơi'}`,
        link: `${params.type === this.PRODUCT_TYPE.FREE_AND_EASY ? '/product/daytour' : '/product/activities'}`
      },
      {title: params.name, link: ''}
    ];
  }

  // fn scroll window
  onScrollDown = (): void => {
    if(this.isDone && this.products.length > 0) {
      this.offset += this.limit;
      this.getProducts();
    }
    else if(this.isDone && this.relatedProducts.length > 0) {
      this.offset += this.limit;
      this.getRelatedProduct();
    }
  };

  //get list product result
  getProducts = () => {

    return this._productRepo
      .searchProduct(this.productSearch, this.offset, this.limit)
      .then(
        (res: any) => {
          this.products = this.products.concat(res.data.results.map(item => new Product(item)));
          if(this.products.length === 0) {
            this.getRelatedProduct();
          }
          this.isDone = true;
        },
        (errors: Array<Error> = []) => {
          this.isDone = true;
        }
      );
  };

  //get related product when search empty product
  getRelatedProduct = () => {
    this.isDone = false;
    return this._productRepo
    .relatedProduct(this.productSearch, this.offset, this.limit)
    .then(
      (res: any) => {
        this.relatedProducts = this.relatedProducts.concat(res.data.results.map(item => new Product(item)));
        this.isDone = true;
      },
      (errors: Array<Error> = []) => {
        this.isDone = true;
      }
    );
  }

  //on select sort
  onSelectSort(e) {
    let queryParmas = Object.assign({}, this.params, {sortIndex: e});
    this._router.navigate(['/product/result'], {
      queryParams: queryParmas
    });
  };

  //on open location selecttor
  onOpenLocationSelecttor = () => {
    this.productLocationSelectorPopup.show();
  };

  //on select location
  onSelectLocation = (location) => {
    let queryParmas = Object.assign({}, _.omit(this.params, 'prices', 'options', 'categories'), {
      destination: location.id,
      name: location.name
    });
    this._router.navigate(['/product/result'], {
      queryParams: queryParmas
    });
  };

  //open filter popup
  onOpenFilterPopup() {
    this.filterPopup.show({
      backdrop: 'static'
    });
  };

  // fn on submit filter-popup-popup
  onSubmitFilter = ($event: any): void => {
    this.offset = 0;
    this.updateParamsToRoute(this.utilityHelper.convertObjectToQueryParams($event));
  };

  // fn on append params to router
  updateParamsToRoute = (params: any = {}) => {
    let queryParams: any = this.utilityHelper.buildQueryParams(Object.assign({}, this.params, params));
    let isEqualsPrices: boolean = false;//check current prices filter with original prices filter
    if(!!this.params.prices) {
      isEqualsPrices = _.isEqual(queryParams.prices.split(',').map(item => {
        return Number(item)
      }), this.originalFilterData[0].data[0].value);
    }
    this._router.navigate([], {
      queryParams: !!isEqualsPrices ? _.omit(queryParams, 'prices'): queryParams
    });
  };

  //handle filter from params
  handleFilterFromParams(params: any = {}) {
    let dataFilter = _.omit(params, ['name', 'destination', 'type', 'sortIndex']);
    let result = [];
    for (let key in dataFilter) {
      result.push({code: key, data: params[key].split(',')});
    }
    return result;
  };

  //get original filter
  getOriginalFilter(e) {
    this.originalFilterData = e;
  }

  //check active sort
  activeSort(value) {
    if (value === Number(this.params.sortIndex)) {
      return 'active';
    }
  };

  //get category data
  getCategoryData(data: any) {
    this.quickCategories = data[2].data;
    //this.quickCategories.unshift({name: "Tất cả", code: "ALL", value: null})
  };

  //select item category
  selectCategoryItem(e: string = '') {
    let data: any;
    if(!!this.params.categories) {
      let currentCategories = this.params.categories.split(',');
      if(_.find(currentCategories, (obj: any) => obj === e)) {
        for (let i = 0; i < currentCategories.length; i++) {
          if (currentCategories[i] === e) {
            currentCategories.splice(i, 1);
          }
        }
      }
      else {
        currentCategories.push(e)
      }
      data = { categories: currentCategories.toString() }
    }
    else {
      data = { categories: e.toString() }
    }
    this.updateParamsToRoute(this.utilityHelper.convertObjectToQueryParams(data));
  };

  checkIsExist(options: string = '', current: string = '') {
    return !!_.find(options.split(','), (obj: any) => obj === current);
  }

  checkIsHaveFilter() {
    return (!!this.params.prices || !!this.params.options||!!this.params.categories);
  }

}
