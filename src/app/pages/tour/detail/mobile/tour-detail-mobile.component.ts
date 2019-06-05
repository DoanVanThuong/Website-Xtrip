import {Component, ViewEncapsulation, ViewChild, ElementRef, HostListener, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

import * as moment from 'moment';
import {isPlatformBrowser, Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {GalleryPopup, SocialSharing} from '../../../../components/popup';
import {TourMorePopup} from '../../../../components';
import {
  Tour,
  TourPackage,
  TourJourney,
  BookingTour,
  TourRepo,
  StorageService,
  Spinner,
  SeoService, DeviceService, Error, TourSearch
} from '../../../../common';
import {CSTORAGE, PASSENGER_TYPE, TOUR_TYPE} from '../../../../app.constants';
import {AppPage} from '../../../../app.base';
import {TourPassengerPopupComponent} from '../components/popup/passenger/tour-passenger.popup';
import {TourDepartDatePopupComponent} from '../components/popup/depart-date/depart-date-popup.popup';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {ChatInfoPopupComponent} from 'app/components/popup/chat-info/chat-info.popup';
import {Angulartics2} from 'angulartics2';
import {TourAdvisoryPopup} from '../components/popup/advisory/tour-advisory.popup';

import {TourJourneyDetailPopup} from '../../../../components/tour/popup/tour-journey-detail/tour-journey-detail.component';
import {TourPolicyDetailPopup} from '../../../../components/tour/popup/tour-policy-detail/tour-policy-detail.component';
import {TourTermDetailPopup} from '../../../../components/tour/popup/tour-term-detail/tour-term-detail.component';

declare const fbq: any;

const ITEMS: any[] = [
  {
    display: 'Lịch trình',
    key: 0,
    value: 'general'
  },
  {
    display: 'Chính sách',
    key: 1,
    value: 'policy'
  },
  {
    display: 'Điều khoản',
    key: 2,
    value: 'term'
  }
];

@Component({
  selector: 'app-tour-detail-mobile',
  templateUrl: './tour-detail-mobile.component.html',
  styleUrls: ['./tour-detail-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class TourDetailMobileComponent extends AppPage {

  @ViewChild(GalleryPopup) galleryPopup: GalleryPopup;
  @ViewChild(TourMorePopup) morePopup: TourMorePopup;
  @ViewChild(SocialSharing) socialSharing: SocialSharing;
  @ViewChild(TourPassengerPopupComponent) passengerPopup: TourPassengerPopupComponent;
  @ViewChild(TourDepartDatePopupComponent) departDatePopup: TourDepartDatePopupComponent;
  @ViewChild(ChatInfoPopupComponent) chatPopup: ChatInfoPopupComponent;
  @ViewChild(TourAdvisoryPopup) advisoryPopup: TourAdvisoryPopup;

  @ViewChild(TourJourneyDetailPopup) tourJourneyDetailPopup: TourJourneyDetailPopup;
  @ViewChild(TourPolicyDetailPopup) tourPolicyDetailPopup: TourPolicyDetailPopup;
  @ViewChild(TourTermDetailPopup) tourTermDetailPopup: TourTermDetailPopup;

  tour: Tour = new Tour();
  tourSearch: TourSearch = new TourSearch();

  package: TourPackage = null;
  journey: TourJourney = new TourJourney();

  relatedTours: Array<Tour> = [];
  galleryPhotos: Array<any> = [];
  departDates: Tour[] = [];

  code: string = '';
  params: any = {};

  totalPrice: number = 0;
  basicHeight: number = 0;
  currentItem: number = 1;

  bookingTour: BookingTour = new BookingTour({
    adult: 1,
    child: 0,
    infant: 0
  });

  carouselOptions: any = {
    items: 1,
    loop: false,
    navigation: true,
    autoplay: false,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    margin: 0,
    dots: false
  };

  scrollToItem: Array<any> = ITEMS;
  selectedScrollTo: string = this.scrollToItem[0].value;
  selectedIndex: number = 0;

  isExpired: boolean = false;
  isFavorite = false;
  isShowDateSelector: boolean = false;
  isLoading: boolean = false;
  isLoadingDepart: boolean = false;

  breadcrumbs: any[] = [];

  selectedDate: any;

  journeyTabIndex: number = 0;
  policyTabIndex: number = 0;
  termTabIndex: number = 0;

  groupAge: IGroupAge[] = [];

  navigationSubscription: any = null;

  constructor(protected _router: Router,
              protected _activatedRoute: ActivatedRoute,
              private _tourRepo: TourRepo,
              protected _location: Location,
              private _storage: StorageService,
              private _spinner: Spinner,
              protected _toastr: ToastrService,
              protected _ele: ElementRef,
              private _title: Title,
              private _meta: Meta,
              private title: Title,
              private meta: Meta,
              protected _device: DeviceService,
              private _angulartics: Angulartics2,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();

    this.setDeviceMode(this._device);
    this.carouselOptions = Object.assign(this.carouselOptions, {
      navigation: !this.isMobile,
      nav: !this.isMobile,
      margin: this.isMobile ? 0 : 20,
      items: !this.isMobile ? 6 : 1
    });
  }

  @HostListener('window:scroll', ['$event'])
  scrollTo($event: any) {
    if (this._device.isMobile()) {

      const header: HTMLElement = document.querySelector('.tour-heading');
      const scrollTo: HTMLElement = document.querySelector('.scroll-to');

      if (window.scrollY > 380) {
        header.classList.add('scroll');
        scrollTo.classList.add('scroll');
      } else {
        header.classList.remove('scroll');
        scrollTo.classList.remove('scroll');
      }
    }
  };

  ngOnInit(): void {
    this.onLoadHistory();

    this._storage.removeItems([CSTORAGE.CONTACT_INFO, CSTORAGE.TOUR, CSTORAGE.TOUR_REQUEST_ID]);

    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((params: any): void => {

        if (!!params.code) {
          this.code = params.code;
        }

        if (!!params.alias) {
          this.code = this.tour.getCode(params.alias);
        }

        if (!this.code) {
          this._router.navigate(['/']);
          return;
        }

        this.params = params;

        Promise.all([
          this.getTourDetail(this.code),
          this.getTourFavourite(),
          this.getTourJourney(),
          this.getTourPackage(),
          this.getRelatedTour(),
          this.getTourDates(),
          this.getGroupAge(this.code)
        ]);
      });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  // fn search params
  handleSearchParams = (): void => {
    this.tourSearch = new TourSearch(Object.assign(this.tourSearch, {
      type: this.tour.isInternational ? TOUR_TYPE.INTERNATIONAL : TOUR_TYPE.DOMESTIC,
      arrival: this.tour.arrivalCode,
      title: this.tour.arrivalPlace,
      from: this.params.from,
      to: this.params.to
    }));
  };

  // fn on load history
  onLoadHistory = (): void => {

    this.bookingTour = new BookingTour(Object.assign({},
      this._storage.getItem(CSTORAGE.TOUR_BOOKING) || {},
      {
        code: this.tour.code,
        alias: this.tour.alias,
        departDate: this.tour.departDate || moment().format('YYYY-MM-DD'),
        adults: 1,
        contact: {},
        couponCode: null,
        points: 0
      }));

  };

  // fn scroll to
  triggerScrollTo = (key, value) => {
    setTimeout(() => {
      const y = document.querySelector(`#tabsID`).getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y - 85,
        behavior: 'smooth'
      });
    }, 100);
    this.selectedIndex = key;
    this.selectedScrollTo = value;
  };

  // fn tab change event
  selectedTabChange(e) {
    for (let i in this.scrollToItem) {
      if (e.index === this.scrollToItem[i].key) {
        return this.selectedScrollTo = this.scrollToItem[i].value;
      }
    }
  }

  // fn push analytic tracking
  pushAnalyticTracking = (tour: Tour): void => {

    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', {
        id: tour.code,
        title: tour.name,
        category: tour.arrivalCode,
        // categories: [tour.arrivalCode]
      });
    }

    this._angulartics
      .eventTrack
      .next({
        action: 'ViewContent',
        properties: {
          id: tour.code,
          title: tour.name,
          category: this.tour.arrivalCode,
          // categories: [this.tour.arrivalCode]
        }
      });
  };

  // fn detect tour unavailable
  detectTourUnavailable = (): void => {

    let now = moment();
    let date = moment(this.tour.departDate);

    this.isExpired = this.tour.available === 0 || (date.diff(now) <= 0);
  };

  // fn back
  back = () => {
    this._location.back();
  };

  // fn get tour detail
  getTourDetail = (code: string = '') => {

    this.isLoading = true;
    return this._tourRepo
      .getDetailTour(this.code)
      .then(
        (res: any) => {

          if (!res.data && isPlatformBrowser(this.platformId)) {
            this._router.navigate(['/404']);
            return;
          }

          this.tour = new Tour(res.data);

          this.handleSearchParams();
          this.pushAnalyticTracking(this.tour);

          if (this.isDesktop) {

            setTimeout(() => {

              this.basicHeight = document.querySelector('#basicHeight').clientHeight;
            }, 100);

            this.breadcrumbs = [
              {title: 'Trang chủ', link: '/'},
              {
                title: `${this.tour.arrivalPlace}`,
                link: `/tour/${this.tour.arrivalAlias}/tim-kiem`,
                queryParams: this.utilityHelper.buildQueryParams(this.tourSearch.setKeys(this.tourSearch))
              },
              {title: `${this.tour.name}`, link: ''}
            ];
          }

          this.detectTourUnavailable();

          this.galleryPhotos = this.tour.photos.map(photo => {
            return {
              name: photo.name,
              src: photo.src,
              small: this.utilityHelper.markImageSize(photo.src, 500),
              medium: this.utilityHelper.markImageSize(photo.src, 700),
              big: this.utilityHelper.markImageSize(photo.src, 900),
            };
          });

          // update booking tour
          this.bookingTour.code = this.tour.code;
          this.bookingTour.isInternational = this.tour.isInternational;
          this.bookingTour.departDate = this.tour.departDate;

          // get price summary
          this.getPriceSummary();

          if (this.isMobile) {
            // this._spinner.hide();
          }
          this.isLoading = false;
        },
        error => {
          if (isPlatformBrowser(this.platformId)) {
            this._router.navigate(['/404']);
          }
          this.isLoading = false;
        }
      );
  };

  // fn get package tour
  getTourPackage() {
    return this._tourRepo
      .getTourPackage(this.code)
      .then(
        (res: any) => {
          !!res.data ? (this.package = new TourPackage(res.data)) : null;
        }
      );
  }

  // fn get tour journey
  getTourJourney = () => {
    this._tourRepo
      .getTourJourney(this.code)
      .then(
        (res: any) => {
          this.journey = new TourJourney(res.data);
        }
      );
  };

  // fn get related tour
  getRelatedTour() {
    const body = {
      code: this.code,
      from: !!this.params.from ? this.params.from : null,
      to: !!this.params.from ? this.params.to : null,
    };
    return this._tourRepo
      .getRelatedTours(this.code, body, 0, 4)
      .then(
        (res: any) => {
          this.relatedTours = res.data.tours.map(tour => new Tour(tour));
        }
      );
  }

  // fn on book tour
  onBookTour = () => {
    this._storage.setItem(CSTORAGE.TOUR, this.tour);
    this._storage.setItem(CSTORAGE.TOUR_BOOKING, this.bookingTour);

    this._router.navigate(['/tour/booking']);
  };

  // on open advisory
  onOpenAdvisory = (): void => {
    this.advisoryPopup.show();
  };

  // fn get price summary
  getPriceSummary = (): Promise<any> => {
    this.bookingTour.departDate = this.tour.departDate;

    return this._tourRepo
      .getPriceSummary(this.bookingTour)
      .then(
        (res: any) => {

          this.totalPrice = 0;
          res.data.totalItems.map(item => {
            this.totalPrice += item.price;
          });
        },
        (errors: Array<Error> = []) => {
          let message = 'Đã có lỗi xãy ra . Vui lòng thử lại sau';

          if (errors.length) {
            message = errors[0].value || message;
          }

          this._toastr.error(message, '', {
            positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
          });

        }
      );
  };

  // fn submit favourite
  onFavourite = (code: string = '') => {
    return this._tourRepo
      .postFavoriteTour(code || this.code)
      .then(
        (res: any) => {
          this.isFavorite = res.data;
        }
      );
  };

  // fn get favourite
  getTourFavourite(code: string = '') {
    return this._tourRepo
      .getFavouriteTour(code || this.code)
      .then(
        (res: any) => {
          this.isFavorite = res.data;
        }
      );
  }

  // fn get tour
  async getTourDates() {
    this.isLoadingDepart = true;
    const body = {
      code: this.code,
      month: null,
      year: null,
      adults: this.bookingTour.adults,
      children: this.bookingTour.children,
      infants: this.bookingTour.infants
    };

    try {
      const response: any = await this._tourRepo.getAvailableTours(body);
      this.departDates = response.data.map((tour: Tour) => new Tour(Object.assign(tour, {alias: this.tour.alias}))) || [];

      this.selectedDate = this.departDates.filter(d => d.code === this.tour.code || d.code === this.code)[0];
    } catch (error) {

    } finally {
      this.isLoadingDepart = false;
    }

  };

  // fn open gallery popup
  openGalleryPopup = () => {
    this.galleryPopup.category = {name: this.tour.name};
    this.galleryPopup.show();
  };

  //open tour journey popup
  openTourJourney(index: number) {
    this.journeyTabIndex = index;
    this.tourJourneyDetailPopup.show();
  };

  //on change journey tab index
  journeyIndexChange(e: number) {
    this.journeyTabIndex = e;
  }

  //open tour policy popup
  openTourPolicy(index: number) {
    this.policyTabIndex = index;
    this.tourPolicyDetailPopup.show();
  };

  //on change selected index
  policyIndexChange(e: number) {
    this.policyTabIndex = e;
  }

  //open tour term
  openTourTerm(index: number) {
    this.termTabIndex = index;
    this.tourTermDetailPopup.show();
  }

  //on change selected index
  termIndexChange(e: number) {
    this.termTabIndex = e;
  }

  // fn show people
  showPeople = () => {
    if (this.isMobile) {
      return `(<span class="text-main">
      ${this.bookingTour.adults} </span>  người lớn 
      ${this.bookingTour.children ? (`, <span class="text-main">${this.bookingTour.children}</span> trẻ em`) : ''} 
      ${this.bookingTour.infants ? (`, <span class="text-main">${this.bookingTour.infants}</span> em bé`) : ''})`;
    } else
      return `<span class="text-main font-bold">${this.bookingTour.adults} </span>  người lớn ${this.bookingTour.children ? `, <span class="text-main font-bold">${this.bookingTour.children}</span> trẻ em` : ''} ${this.bookingTour.infants ? `, <span class="text-main font-bold">${this.bookingTour.infants}</span> em bé` : ''}`;
  };

  //on share social button
  onSocialSharing = () => {
    this.socialSharing.show();
  };

  //fn open chose passenger number
  openPopupPassenger() {
    if (this.tour.available > 0) {
      this.passengerPopup.show();
    }
  }

  //fn open chose depart Date
  openPopupDepartDate() {

    if (!!this.departDates.length) {
      this.departDatePopup.show();
    }
  }

  //fn onfirm passenger
  onConfirmPassenger(bookingTour: BookingTour) {
    this.bookingTour = bookingTour;
    this._storage.setItem(CSTORAGE.TOUR_BOOKING, this.bookingTour);
    this.getPriceSummary();
    this.getTourDates();
  }

  //fn open chat
  openPopupChat() {
    this.chatPopup.show();
  }

  // fn push notify after copy code
  onClipboardSuccess = (message: string = ''): void => {
    this._toastr.success(message, 'Thông báo');
  };

  //fn get age group
  async getGroupAge(tourPriceCode: string) {
    this.isLoading = true;
    try {
      const res: any = await this._tourRepo.getAgegroup(tourPriceCode);
      this.groupAge = (res.data || []).map(item => new Object(item) as IGroupAge);

      for (let index in this.groupAge) {

        let item = this.groupAge[index];

        switch (item.type) {
          case PASSENGER_TYPE.ADULT: {
            this.bookingTour.rangeAdult = item.range;
            break;
          }
          case PASSENGER_TYPE.CHILDREN: {
            this.bookingTour.rangeChildren = item.range;
            break;
          }
          case PASSENGER_TYPE.INFANT: {
            this.bookingTour.rangeInfant = item.range;
            break;
          }
        }
      }
    } catch (error) {
      // TODO
    } finally {
      this.isLoading = false;
    }
  }

  // fn query params
  genQueryParams = (tour: Tour): any => {

    console.log(tour);

    return this.utilityHelper.buildQueryParams({});
  };
}

interface IGroupAge {
  title: string;
  price: number;
  range: any;
  type: string;
  value: string;
}

