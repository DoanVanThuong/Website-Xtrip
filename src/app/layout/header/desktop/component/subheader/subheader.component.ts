import {Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {PRODUCT_TYPE, TOUR_TYPE} from '../../../../../app.constants';
import {ProductRepo, TourRepo} from '../../../../../common/repos/index';
import {Destination, ProductSearch, TourArrival, TourSearch} from '../../../../../common/entities/index';

@Component({
  selector: 'app-sub-header',
  templateUrl: 'subheader.component.html',
  styleUrls: ['subheader.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SubheaderComponent extends AppPage {

  @Input() type: string = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  ele: HTMLElement = null;

  url: string = '';
  params: any = {};
  locations: TourArrival[] = [];
  isLoading: boolean = false;

  carouselOptions: any = {
    item: 6,
    navigation: true,
    nav: true,
    navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    margin: 20,
    dots: false
  };

  constructor(private _ele: ElementRef,
              private _tour: TourRepo,
              private _product: ProductRepo) {
    super();
    this.ele = this._ele.nativeElement;
  }

  ngOnChanges(): void {
    if (!!this.type) {
      this.onGetData();
    }
  }

  // fn on get data
  onGetData = (): void => {
    switch (this.type) {
      case TOUR_TYPE.INTERNATIONAL:
      case TOUR_TYPE.DOMESTIC: {

        this.getTourArrivalsBy(this.type);
        this.url = '/tour/result';

        break;
      }
      case PRODUCT_TYPE.FREE_AND_EASY:
      case PRODUCT_TYPE.ACTIVITIES: {
        this.getActivityDestinationsBy(this.type);

        break;
      }
    }
  };

  // fn get arrival tour by type
  getTourArrivalsBy = (type: string = TOUR_TYPE.INTERNATIONAL): Promise<any> => {
    this.isLoading = true;
    return this._tour
      .getTourArrivalBy(type)
      .then(
        (res: any) => {
          this.locations = res.data.map(location => new TourArrival(location));
          this.isLoading = false;
        },
        (errors: Error[] = []) => {
          this.locations = [];
          this.isLoading = false;
        });

  };

  // fn get activity destination by type
  getActivityDestinationsBy = (type: string = null): Promise<any> => {
    this.isLoading = true;
    return this._product
      .getPopularDestinations(type)
      .then(
        (res: any) => {
          this.locations = res.data.map(location => new Destination(location));
          this.isLoading = false;
        },
        (errors: Error[] = []) => {
          this.locations = [];
          this.isLoading = false;
        });
  };

  // fn gen url
  genUrl = (location: any): string => {
    switch (this.type) {
      case TOUR_TYPE.INTERNATIONAL:
      case TOUR_TYPE.DOMESTIC: {
        return location.href || `/tour/${location.alias}/result`;
      }
      case PRODUCT_TYPE.FREE_AND_EASY:
      case PRODUCT_TYPE.ACTIVITIES: {
        return '/product/result';
      }
    }
  };

  // fn generate query params
  generateQueryParams = (location: any): any => {

    switch (this.type) {
      case TOUR_TYPE.INTERNATIONAL:
      case TOUR_TYPE.DOMESTIC: {
        return this.utilityHelper.buildQueryParams(new TourSearch({
          // arrival: location.code,
        }));
      }
      case PRODUCT_TYPE.FREE_AND_EASY:
      case PRODUCT_TYPE.ACTIVITIES: {
        return this.utilityHelper.buildQueryParams({
          destination: location.id,
          name: location.name,
          type: this.type
        });
      }
    }
  };

  onClose = (): void => {

    this.close.emit();
  };
}
