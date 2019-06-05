import {Component, ViewEncapsulation, HostListener, ElementRef, Input, Inject, PLATFORM_ID} from '@angular/core';
import {ProductRepo, StorageService, ProductSearch} from '../../../../../common';
import {ActivatedRoute, Router} from '@angular/router';
import {CSTORAGE, PRODUCT_TYPE} from '../../../../../app.constants';
import {AppBase} from '../../../../../app.base';
import {DeviceService} from '../../../../../common';
import {ProductDestination} from 'app/common/entities/product-destination.entity';
import {isPlatformBrowser} from "@angular/common";


@Component({
  selector: 'app-product-search-bar',
  templateUrl: './product-search-bar.component.html',
  styleUrls: ['./product-search-bar.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductSearchBarComponent extends AppBase {

  @Input() destination: ProductDestination = new ProductDestination();

  params: any = {};
  keyword: string = '';

  productSearch: ProductSearch = new ProductSearch();

  isDestinationShow: boolean = false;
  history: Array<ProductDestination> = [];
  destinations: Array<ProductDestination> = [];
  favoriteLocations: Array<ProductDestination> = [];
  sourcesDestination: Array<ProductDestination> = [];
  sourcesProduct: Array<ProductDestination> = [];

  isTyping: boolean = false;
  timeout: any;

  PRODUCT_TYPE = PRODUCT_TYPE;

  types: Array<any> = [
    {code: PRODUCT_TYPE.ALL, display: 'Tất cả'},
    {code: PRODUCT_TYPE.FREE_AND_EASY, display: 'Tour trong ngày'},
    {code: PRODUCT_TYPE.ACTIVITIES, display: 'Vé vui chơi'}
  ];

  constructor(private _router: Router,
              private _productRepo: ProductRepo,
              private _storage: StorageService,
              protected _activatedRoute: ActivatedRoute,
              private _ele: ElementRef,
              private _device: DeviceService,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();
    this.setDeviceMode(this._device);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll = () => {

    if (isPlatformBrowser(this.platformID)) {
      const header = $('.header');
      const bar = $('.product-search-bar');
      const body = $('.main-body');

      if ($(window).scrollTop() > header.innerHeight()) {
        bar.addClass('fixed-top');
        body.css({
          marginTop: bar.innerHeight()
        })
      } else {
        bar.removeClass('fixed-top');
        body.removeAttr('style');
      }
    }
  };

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this.params = params;

      this.productSearch = new ProductSearch(Object.assign({}, this.params, {
        destination: {
          id: this.params.destination
        }
      }));

      this.listFavoriteLocation();
      this.getHistory();
      this.fillParamsData(this.params);
    });
  }

  //return type product by text
  typeProduct = (type) => {
    return (type.code === this.params.type) ? 'checked-desktop' : 'unchecked-desktop';
  };

  //open form search
  openFormSearch() {
    this.onChange(this.keyword || this.destination.name);
    this.isDestinationShow = true;
  }

  //change type
  // selectType(code) {
  //   let queryParams = Object.assign({}, this.params, {type: code}) 
  //   this._router.navigate([`/product/result`], {
  //     queryParams: queryParams
  //   });
  // };

  //fill data on param to search bar
  fillParamsData(params) {
    if (!!params.name) {
      this.destination = new ProductDestination(Object.assign({}, this.params, {
        id: this.params.destination
      }));
      this.keyword = params.name;
    } else if (this.destination.id) {
      this.keyword = this.destination.name;
    } else {
      this.destination.name = 'Tất cả';
      this.keyword = 'Tất cả';
    }
  }

  //get favorite location
  listFavoriteLocation() {
    return this._productRepo
      .getFavouriteDestinationsBy({type: this.params.type})
      .then(
        (res: any) => {
          this.favoriteLocations = (res.data || []).map((favorite: any) => new ProductDestination(favorite));
        },
        (errors: any) => {
          this.favoriteLocations = [];
        }
      );
  };

  // on select location
  onSelectLocation = (destination: ProductDestination) => {
    this.destination = destination;
    this.keyword = destination.name;

    if (!this.checkExistingLocation(destination)) {
      this.history.unshift(destination);
      this._storage.setItem(CSTORAGE.PRODUCT_LOCATION, this.history);
    }

    this.isDestinationShow = false;
  };

  //check existing item
  checkExistingLocation(location: ProductDestination) {
    const item = _.find(this.history, (item) => {
      return item.id === location.id;
    });
    return !!item;
  }

  // result history
  getHistory() {
    let history = this._storage.getItem(CSTORAGE.PRODUCT_LOCATION);
    if (!this.utilityHelper.isNullOrUndefined(history)) {
      if (history.length > 0) {
        this.history = (history || []).map((history: any) => new ProductDestination(history));
      }
    }
  };

  // result on change
  onChange = (keyword: any) => {

    clearTimeout(this.timeout);

    this.isTyping = true;

    this.timeout = setTimeout(() => {
      if (keyword.length > 1) {
        return this._productRepo
          .searchDestinations(keyword, this.params.type)
          .then(
            (res: any) => {
              this.isTyping = false;
              this.sourcesDestination = (res.data.destinations || []).map((destination: any) => new ProductDestination(destination));
              this.sourcesProduct = (res.data.products || []).map((product: any) => new ProductDestination(product)); // làm lại interface cho rõ ràng
            },
            (errors: any) => {
              this.sourcesDestination = [];
              this.sourcesProduct = [];
              this.isTyping = false;
            }
          );
      } else if (keyword.length == 0) {
        this.sourcesDestination = [];
        this.sourcesProduct = [];
        this.isTyping = false;
      }
    }, 500);
  };

  //on search
  onSearch = () => {

    this._router.navigate(['/product/result'], {
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.params, {
        destination: this.destination.id || '',
        name: this.destination.name || ''
      }))
    })
  }

}
