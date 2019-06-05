import {
  Component,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  ElementRef
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import {TourRepo} from '../../../../common/repos';
import {AppPage} from '../../../../app.base';
import {Error, Tour, TourArrival, TourFilter, TourFilterOption, TourSearch} from '../../../../common/entities';
import {DeviceService, SeoService, Spinner, StorageService} from '../../../../common/services';
import {TourFilterPopup} from '../components/popup/tour-filter-mobile-popup/tour-filter-mobile.popup';
import {TourArrivalPopup} from '../components/popup/tour-arrival-popup/tour-arrival-popup.component';
import {TourDatePickerPopup} from '../../../../components/popup/tour-date-picker/tour-date-picker.popup';
import * as moment from 'moment';
import {TOUR_TYPE} from '../../../../app.constants';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-tour-result-mobile',
  templateUrl: './tour-result-mobile.component.html',
  styleUrls: ['./tour-result-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class TourResultMobileComponent extends AppPage {

  @ViewChild(TourFilterPopup) filterPopup: TourFilterPopup;
  @ViewChild(TourArrivalPopup) tourArrivalPopup: TourArrivalPopup;
  @ViewChild(TourDatePickerPopup) tourDatePickerPopup: TourDatePickerPopup;

  isLoading: boolean = false;
  tours: Array<Tour> = [];
  relatedTours: Array<Tour> = [];
  tourSearch: TourSearch = new TourSearch({
    type: TOUR_TYPE.INTERNATIONAL
  });
  tourQuery: ITourQuery = new Object() as ITourQuery;

  breadcrumbs: any[] = [];
  limit: number = 5;
  arrival: any = {};

  filterCounter: number = 0;
  filter: TourFilter = null;
  filterOption: TourFilterOption = new TourFilterOption();

  params: any = {};
  keyword: string = '';

  dateOptions = {};
  selectedDate = {
    start: null,
    end: null
  };

  sorts: Array<any> = [];
  isHaveRelatedTour = false;
  isFiltered: boolean = false;
  reInitFilter = false;

  constructor(protected _activatedRoute: ActivatedRoute,
              protected _router: Router,
              protected _spinner: Spinner,
              protected _tourRepo: TourRepo,
              protected _storage: StorageService,
              protected _ele: ElementRef,
              private _seo: SeoService,
              private _device: DeviceService) {
    super();
    this.setDeviceMode(this._device);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: any): void {

    const header: HTMLElement = document.querySelector('.header.header-mobile');
    const container: HTMLElement = document.querySelector('.wrapper');

    if (window.scrollY > 0) {
      header.classList.add('fixed-header');
      container.classList.add('m-t-83');
    } else {
      header.classList.remove('fixed-header');
      container.classList.remove('m-t-83');
    }
  }

  // fn on init
  ngOnInit() {

    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((params: any): void => {

        this.handleRouteParams(params);

        this.getFilterOptions();
        this.getTours();
      });
  }

  // fn destroy component
  ngOnDestroy() {

    const body: HTMLElement = document.querySelector('body');
    body.classList.remove('fixed-header');
  }

  // fn back to
  back = () => {
    window.history.back();
  };

  // fn handle route params
  handleRouteParams = (params: any): void => {

    this.params = params;
    this.tourSearch = new TourSearch(this.tourSearch.getKeys(params));

    this.selectedDate = {
      start: this.tourSearch.from ? moment(this.tourSearch.from) : null,
      end: this.tourSearch.to ? moment(this.tourSearch.to) : null
    };

    this.handleFilter(params);
  };

  // fn hashing filter-popup-popup from query params;
  handleFilter = (params: any): void => {

    for (let key in params) {

      let value = params[key];

      switch (key.toLowerCase()) {
        case 'time': {
          this.filter[key] = isNaN(value) ? value : Number(value);
          break;
        }
        case 'prices':
        case 'days': {
          this.filter[key] = value.split(',').map((value) => {
            return isNaN(value) ? value : Number(value);
          });
          break;
        }
        case 'departs':
        case 'topics':
        case 'suppliers':
        case 'transports':
        case 'services': {
          if (!this.filter['options']) {
            this.filter['options'] = {};
          }

          this.filter['options'][key] = params[key].split(',').map((value) => {
            return {code: isNaN(value) ? value : Number(value)};
          });
          break;
        }
      }
    }
  };

  // fn scroll window
  onScrollDown = (): void => {

    if (!this.isLoading && this.tours.length > 0) {
      this.offset += this.limit;
      this.getTours();
    } else if (!this.isLoading && this.relatedTours.length > 0) {
      this.offset += this.limit;
      this.getRelatedTours();
    }
  };

  // fn set breadcrumb
  setBreadcrumb = (keyword: string = ''): void => {

    this.keyword = keyword;

    this.breadcrumbs = [{
      title: 'Trang chủ',
      link: '/',
    }, {
      title: `Tour ${this.keyword}`,
      link: null
    }];
  };

  // fn result tour
  getTours = (): Promise<any> => {

    this.isLoading = true;

    return this._tourRepo
      .search(Object.assign({}, this.tourSearch, {
        filter: this.filter
      }), this.offset, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;

          this.tourQuery = res.data.query;
          this.setBreadcrumb(this.tourQuery.arrivalPlace);

          this.tourSearch.setType(this.tourQuery.type);
          this.tours = this.tours.concat(res.data.tours.map(tour => new Tour(tour)));

          if (!res.data.tours.length && !!this.offset) {
            this.offset -= this.limit;
          }

          if (!this.tours.length) {
            this.getRelatedTours();
            this.isHaveRelatedTour = true;
          }
        },
        (errors: Array<Error> = []) => {
          this.isLoading = false;

          if (!!this.offset) {
            this.offset -= this.limit;
          }
        }
      );
  };

  //get related tour
  getRelatedTours = (): Promise<any> => {

    this.isLoading = true;

    return this._tourRepo
      .getRelatedTour({
        arrival: this.tourSearch.arrival
      }, this.offset, this.limit)
      .then(
        (res: any) => {
          this.relatedTours = this.relatedTours.concat(res.data.tours.map(tour => new Tour(tour)));
          this.isLoading = false;

          if (!res.data.total && !!this.offset) {
            this.offset -= this.limit;
          }
        },
        (errors: Array<Error> = []) => {
          this.isLoading = false;
          this.offset -= this.limit;
        }
      );
  };

  // fn on open filter-popup-popup
  openFilter = (): void => {
    this.filterPopup.show();
  };

  // fn on update filter
  onUpdateFilter = ($event: TourFilter = null): void => {

    this.filter = $event;
    this.updateParamsToRoute(this.utilityHelper.convertObjectToQueryParams(Object.assign({}, $event, {
      options: this.handleFilterOptions($event.options)
    })));
  };

  // fn on handle filter options
  handleFilterOptions = (options: any): Object => {
    let result: any = {};

    for (let key in options) {
      if (options[key].length) {
        if (this.isMobile) {
          result[key] = options[key].map((item) => item.code);
        } else {
          result[key] = options[key].map((item) => item);
        }
      }
    }
    return result;
  };

  // fn on update filter-popup-popup counter
  onUpdateFilterCounter = ($event: any): any => {
    this.filterCounter = $event || 0;
  };

  // fn on append params to router
  updateParamsToRoute = (params: any = {}) => {

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.tourSearch.getQueryParams(), params))
    });
  };

  //change Arrival
  changeArrival() {
    this.tourArrivalPopup.show();
  };

  //on open change date popup
  openChangeDatePopup() {
    this.tourDatePickerPopup.show();
  }

  //change date
  onSelectDate = ($event: any): void => {
    this.offset = 0;
    this.updateParamsToRoute({
      from: $event.start ? moment($event.start).format('YYYY-MM-DD') : null,
      to: $event.end ? moment($event.end).format('YYYY-MM-DD') : null
    });
  };

  //get sort object
  getFilterOptions = (): Promise<any> => {

    return this._tourRepo
      .getFilterOptions(this.tourSearch)
      .then(
        (res: any) => {
          this.filterOption = new TourFilterOption(res.data);
          this.isFiltered = true;
          this.reInitFilter = false;
        }
      );
  };

  // on select sort
  onSelectSort = (sortIndex: number = 0): void => {
    if (this.tourSearch.getSortIndex() !== sortIndex) {
      this.tourSearch.setSortIndex(sortIndex);
    }

    this.updateParamsToRoute();
  };

  // fn on select arrival
  onSelectArrival = (arrival: TourArrival): void => {

    const tourSearch: TourSearch = new TourSearch({
      from: this.tourSearch.from,
      to: this.tourSearch.to
    });
    this.reInitFilter = true;

    this.updateParamsToRoute(tourSearch);
  };
}

export interface ITourQuery {
  arrival: string;
  arrivalPlace: string;
  arrivalAlias: string;
  type: string;
  from: string;
  to: string;
  filter: { options: any, prices: null, days: null, time: 0 }
  days: null;
  options: null
  prices: null
  time: null;
  filterOption: null
  requestId: null
  sortIndex: 0
};
