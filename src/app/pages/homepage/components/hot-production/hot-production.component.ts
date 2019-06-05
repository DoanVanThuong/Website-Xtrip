import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {DeviceService, StorageService} from '../../../../common/services/index';
import {Router} from '@angular/router';
import {Destination, Product, Tour} from '../../../../common/entities';
import {ProductRepo} from '../../../../common/repos/product.repo';
import {CSTORAGE, PRODUCT_TYPE} from '../../../../app.constants';
import {TourRepo} from '../../../../common';

@Component({
  selector: 'home-hot-production',
  templateUrl: './hot-production.component.html',
  styleUrls: ['hot-production.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeHotProductionComponent extends AppPage {

  isLoading: boolean = false;
  locations: Destination[] = [];
  tours: Tour[] = [];
  products: Product[] = [];

  limit: number = 20;

  types: Object[] = [
    {
      type: PRODUCT_TYPE.ALL,
      name: 'Tất cả'
    },
    {
      type: PRODUCT_TYPE.FREE_AND_EASY,
      name: 'Tour free and easy'
    },
    {
      type: PRODUCT_TYPE.ACTIVITIES,
      name: 'Vé vui chơi'
    }
  ];
  selectedType: any = this.types[0];

  carouselOptions: any = {
    item: 1,
    navigation: !this.isMobile,
    nav: !this.isMobile,
    navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    margin: this.isMobile ? 10 : 20,
    dots: false
  };

  constructor(private _router: Router,
              private _productRepo: ProductRepo,
              protected _device: DeviceService,
              private _storage: StorageService,
              private _tourRepo: TourRepo) {
    super();

    this.setDeviceMode(this._device);
    this.carouselOptions = Object.assign(this.carouselOptions, {
      navigation: !this.isMobile,
      nav: !this.isMobile,
      margin: this.isMobile ? 10 : 20
    });
  }

  ngOnInit() {

    if (this.isDesktop) {
      this.getHotDeal();
      this.getFavouriteDestinations();
    }
    if (this.isMobile) {
      this.getTours();
    }
  }

  // fn get favourite destinations
  getFavouriteDestinations = (): Promise<any> => {
    return this._productRepo
      .getFavouriteDestinations(0, 10)
      .then(
        (res: any) => {
          this.locations = res.data.map(destination => new Destination(destination));
        }
      );
  };

  // fn get hot deal
  getHotDeal = (): Promise<any> => {

    this.isLoading = true;

    return this._productRepo
      .getHotDeal('daytour', this.offset, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;
          this.products = res.data.results.map(product => new Product(product));
        }
      )
      .catch((errors: Error[] = []) => {
        this.isLoading = false;
      });
  };

  // fn generate destination
  generateLocationParams = (location: Destination): any => {

    return Object.assign({}, {
      name: location.name,
      sortIndex: 0,
      type: PRODUCT_TYPE.ALL
    });
  };

  onSelectDestination = (location: Destination): void => {
    this._storage.setItem(CSTORAGE.PRODUCT_DESTINATION, location);
  };

  // fn select product type
  onSelectProductType = (type: any) => {
    if (this.selectedType.type !== type.type) {
      this.selectedType = type;

      this.getHotDeal();
    }
  };

  // fn get tours
  getTours() {
    return this._tourRepo
      .getCheapTours(0, this.limit)
      .then(
        (res: any) => {
          this.tours = res.data.map((tour: any) => new Tour(tour));
        });
  }
}
