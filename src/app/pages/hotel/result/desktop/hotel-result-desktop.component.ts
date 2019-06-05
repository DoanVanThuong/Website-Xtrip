import {Router, ActivatedRoute} from '@angular/router';
import {Component, ViewEncapsulation, ElementRef} from '@angular/core';
import {query, stagger, animateChild, trigger, transition, style, animate} from '@angular/animations';
import {
  HotelSearch,
  HotelRepo,
  Hotel,
  HotelFilterOptions,
  HotelLocation
} from '../../../../common';
import {AppBase} from '../../../../app.base';
import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'app-hotel-result-desktop',
  templateUrl: './hotel-result-desktop.component.html',
  styleUrls: ['./hotel-result-desktop.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@item', stagger(80, animateChild()), {optional: true})
      ]),
    ]),
    trigger('item', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class HotelResultDesktopComponent extends AppBase {

  params: any = {};
  hotelSearch: HotelSearch = new HotelSearch();
  hotels: Array<Hotel> = [];
  nights = 0;
  isLoading = true;
  viewMode = 1; //1: list, 2: map

  filterOption: any = new HotelFilterOptions();
  filter: any = {
    sortIndex: 0,
    prices: [],
    stars: [],
    others: {}
  };

  typeEvent: string = 'onSearch'; //input: onSearch, onFilter

  isListView: boolean = true;


  constructor(private _hotelRepo: HotelRepo,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _ele: ElementRef) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.params = params;

      this.hotelSearch = new HotelSearch(Object.assign({}, this.params, {
        destination: new HotelLocation(Object.assign({}, this.params, {
          code: this.params.destinationCode
        }))
      }, { roomOccupancies: (!!this.params.roomOccupancies ? this.params.roomOccupancies : "1-0") }));

      this.searchHotel('getFilter');
      //this.getFilterOptions();
    });

  }

  filterHeight = 0;

  //on submit view mode
  submitSwitchBtn(e) {
    this.viewMode = e;
    setTimeout(() => {
      this.filterHeight = this._ele.nativeElement.querySelector('#filterHeight').clientHeight;
    }, 1);
  }

  // search hotel
  searchHotel = (actionType: string = '') => {

    if (!!this.params.prices) {
      this.hotelSearch = new HotelSearch(Object.assign(this.hotelSearch, this.params, {
        filterOptions: this.handleFilter(this.params)
      }));
    } else {
      this.hotelSearch = new HotelSearch(Object.assign(this.hotelSearch, this.params, {
        filterOptions: null
      }));
    }

    return this._hotelRepo
      .search(this.hotelSearch, this.offset, this.limit)
      .pipe().subscribe(
        (success: any) => {
          this.typeEvent = 'onFilter';
          this.hotels = this.hotels.concat(success.data.hotels.map(hotel => new Hotel(hotel)));
          this.nights = success.data.nights;

          this.isLoading = false;
          if (actionType === 'getFilter') {
            this.getFilterOptions();
          }
        },
        (error: any) => {
          this.isLoading = false;
        }
      )
  };

  // fn scroll window
  onScrollDown = (): void => {
    if (!this.isLoading) {
      this.offset += this.limit;
      this.searchHotel('');
    }
  };

  // fn hashing filter-popup-popup from query params;
  handleFilter = (params: any): void => {
    for (let key in params) {

      let value = params[key];

      switch (key.toLowerCase()) {
        case 'sortindex': {
          this.filter[key] = isNaN(value) ? value : Number(value);
          break;
        }
        case 'prices':
        case 'stars': {
          this.filter[key] = value.split(',').map((value) => {
            return isNaN(value) ? value : Number(value);
          });
          break;
        }
        case 'hoteltypes':
        case 'hotelfacilities':
        case 'areas': {
          if (!!params[key]) {
            this.filter['others'][key] = params[key].split(',').map((value) => {
              return isNaN(value) ? value : Number(value);
            });
            break;
          }
        }
        default:
          this.filter.others = {};
      }
    }
    return this.filter;
  };

  doneFilter = false;
  //get Filter Options
  getFilterOptions = (): Promise<any> => {
    return this._hotelRepo
      .getFilterOperations(this.hotelSearch)
      .then(
        (res: any) => {
          this.filterOption = new HotelFilterOptions(res.data);
          this.filterOption.sorts = this.filterOption.sorts.reverse();
          // set options
          this.filter.options = {};
          for (let index in this.filterOption.options) {
            let option = this.filterOption.options[index];
            this.filter.options[option.code] = [];
          }
          this.doneFilter = true;
        },
        (errors: any) => {
        }
      );
  };

  //submit data sort
  onSubmitSort(e) {
    this.offset = 0;
    this.hotels = [];
    this.isLoading = true;
    this.params = Object.assign({}, this.params, {sortIndex: e});
    this._router.navigate(['/hotel/result'], {
      queryParams: this.params
    });
  }

  //submit filter-popup-popup
  submitFilter(e) {
    this.offset = 0;
    this.hotels = [];
    this.isLoading = true;
    let queryParams = this.utilityHelper.buildQueryParams(Object.assign({}, this.params, e != 'reset' ? this.utilityHelper.convertObjectToQueryParams(e) : {}));
    if (e != 'reset') {
      this.typeEvent = 'onFilter';
      this._router.navigate(['/hotel/result'], {
        queryParams: queryParams
      });
    } else {
      this.typeEvent = 'onSearch';
      this._router.navigate(['/hotel/result'], {
        queryParams: new HotelSearch(queryParams)
      });
    }
  }

}



