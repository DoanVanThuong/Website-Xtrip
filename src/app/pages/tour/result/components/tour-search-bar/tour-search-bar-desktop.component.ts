import {
  Component,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  PLATFORM_ID, Inject
} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {TourSearch, StorageService, TourRepo, TourArrival} from '../../../../../common';
import {Router, ActivatedRoute} from '@angular/router';
import {BsDatepickerConfig, BsLocaleService, defineLocale} from 'ngx-bootstrap';

import * as moment from 'moment';
import {viLocale} from '../../../../../../assets/localize/vi';
import {isPlatformBrowser} from "@angular/common";
import {TOUR_TYPE} from "../../../../../app.constants";

defineLocale('vi', viLocale);

@Component({
  selector: 'app-tour-search-bar-desktop',
  templateUrl: './tour-search-bar-desktop.component.html',
  styleUrls: ['./tour-search-bar-desktop.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourSearchBarDesktopComponent extends AppBase {

  @Input('params') tourSearch: TourSearch = new TourSearch({
    type: TOUR_TYPE.INTERNATIONAL
  });
  @Input() arrival: string = '';
  @Input('arrival-alias') alias: string = '';

  @Output('submit') submit: EventEmitter<any> = new EventEmitter<any>();

  isArrivalShow: boolean = false;
  selectedArrival: TourArrival = null; // default is empty
  arrivals: TourArrival[] = [];

  timeout: any = null;

  datePickerOptions: Partial<BsDatepickerConfig> = {
    minDate: new Date(),
    containerClass: 'theme-orange theme-custom m-t-15',
    dateInputFormat: 'DD/MM',
    showWeekNumbers: false
  };
  locale: string = 'vi';

  date: string = '';

  constructor(private _router: Router,
              private _storage: StorageService,
              private _ele: ElementRef,
              private _tourRepo: TourRepo,
              private _activatedRoute: ActivatedRoute,
              private _localeService: BsLocaleService,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();
    this._localeService.use(this.locale);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    if (isPlatformBrowser(this.platformID)) {

      const bar = $('.tour-search-bar');
      const header = $('.header');
      const body = $('.main-body');

      if ($(window).scrollTop() > header.innerHeight()) {

        bar.addClass('fixed-top');
        body.css({
          marginTop: bar.innerHeight()
        });

      } else {
        bar.removeClass('fixed-top');
        body.removeAttr('style');
      }
    }
  };

  ngOnChanges(): void {
    this.handleParams();

    // set default arrival item
    if (!!this.arrival && !!this.alias) {
      this.selectedArrival = new TourArrival({
        alias: this.alias,
        name: this.arrival
      });
    }
  }

  ngOnInit(): void {
    this.handleParams();
  }

  // fn handle get data params
  handleParams = (): void => {

    if (!!this.tourSearch.from && !!this.tourSearch.to) {
      this.date = `${moment(this.tourSearch.from).format('DD/MM/YYYY')} - ${moment(this.tourSearch.to).format('DD/MM/YYYY')}`;
    } else {
      this.date = '';
    }

    // need check api there - speed low
    if (!!this.tourSearch.type) {
      this.getArrivals();
    }
  };

  // fn get arrial
  getArrivals = (): Promise<any> => {
    return this._tourRepo.getTourArrivalBy(this.tourSearch.type)
      .then(
        (res: any) => {
          this.arrivals = res.data.map(arrival => new TourArrival(arrival));
        }
      );
  };

  // fn on select location (arrival)
  onSelectLocation = (arrival: TourArrival = null): void => {

    this.selectedArrival = arrival;
    this.arrival = arrival.name;
    this.tourSearch.arrival = arrival.code;
    this.isArrivalShow = false;
  };

  // fn on open dropdown search
  openDropdownSearch() {
    this.isArrivalShow = true;
    this.getArrivals();
  };

  // fn on clicked outside
  onClickedOutside(e: Event, mode: string = '') {
    this.isArrivalShow = false;
  };

  //on change date picker
  onSelectedDate = ($event: any): void => {

    this.tourSearch.from = moment(event[0]).format('YYYY-MM-DD');
    this.tourSearch.to = moment(event[1]).format('YYYY-MM-DD');

    this.date = `${moment($event[0]).format('DD/MM/YYYY')} - ${moment($event[1]).format('DD/MM/YYYY')}`;

  };

  // fn disable submit
  onDisableSubmit(): boolean {
    return !this.arrival;
  };

  // fn on submit
  onSearchTour() {

    this.submit.emit(null);

    this._router.navigate([this.selectedArrival.href], {
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.tourSearch.getQueryParams()))
    });
  }

}
