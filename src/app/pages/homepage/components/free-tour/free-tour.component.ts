import {Component, HostListener, Inject, Input, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {DeviceService} from '../../../../common/services/index';
import {
  FreeTour, FreeTourActivityItem,
  FreeTourFlightItem,
  FreeTourHotelItem,
  FreeTourItem,
  FreeTourPlaceItem,
  TourRepo,
  Error
} from '../../../../common';
import {AppPage} from '../../../../app.base';
import {GlobalState} from '../../../../global.state';
import {isPlatformBrowser} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'home-free-tour',
  templateUrl: './free-tour.component.html',
  styleUrls: ['./free-tour.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeFreeTourComponent extends AppPage {

  @Input() catElement: string = '.sub-category';

  selectedPlace: FreeTourPlaceItem = null;
  isLoading: boolean = false;

  freeTour: FreeTour = new FreeTour();

  place: FreeTourItem<FreeTourPlaceItem> = new FreeTourItem<FreeTourPlaceItem>();
  flight: FreeTourItem<FreeTourFlightItem> = new FreeTourItem<FreeTourFlightItem>();
  hotel: FreeTourItem<FreeTourPlaceItem> = new FreeTourItem<FreeTourPlaceItem>();
  activity: FreeTourItem<FreeTourActivityItem> = new FreeTourItem<FreeTourActivityItem>();

  constructor(private _state: GlobalState,
              protected _device: DeviceService,
              private _tourRepo: TourRepo,
              private _http: HttpClient,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {
    this.getFreeTour();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event): void {
    if (this.isMobile
      && isPlatformBrowser(this.platformID)
      && !!this.place.items.length) {

      const ele = $('.block-destination .scroll-container');
      const parentEle = ele.parent();
      const catElement = $(this.catElement);

      if (($(window).scrollTop() + catElement.outerHeight()) > (parentEle.offset().top || 0)) {
        ele.addClass('fixed-top');
        ele.css({
          top: catElement.outerHeight()
        });
        ele.parent().css({
          height: ele.outerHeight()
        });
      } else {
        ele.removeClass('fixed-top');
        ele.removeAttr('style');
        ele.parent().removeAttr('style');
      }
    }
  }

  // fn get free tour
  getFreeTour = (): Promise<any> => {

    this.isLoading = true;

    return this._tourRepo
      .getFreeTour(this.selectedPlace ? this.selectedPlace.code : null)
      .then(
        (res: any) => {
          this.isLoading = false;
          this.freeTour = new FreeTour(res.data);

          if (!this.place.items.length) {
            this.place = new FreeTourItem<FreeTourPlaceItem>(res.data.place);
          }
          this.flight = new FreeTourItem<FreeTourFlightItem>(res.data ? res.data.flight : null);
          this.hotel = new FreeTourItem<FreeTourHotelItem>(res.data ? res.data.hotel : null);
          this.activity = new FreeTourItem<FreeTourActivityItem>(res.data ? res.data.activity : null);

          // default value
          if (!!this.place.items.length && !this.selectedPlace) {
            this.selectedPlace = this.place.items[0];
          }
        },
        (errors: Error[] = []) => {
          this.isLoading = false;
        }
      );
  };

  // fn on selected destination
  onSelectPlace = (place: FreeTourPlaceItem): void => {

    if (this.selectedPlace.code !== place.code) {
      this.selectedPlace = place;
      this.getFreeTour();
    }
  };

  isEmpty = (): boolean => {
    return !this.flight.items.length && !this.hotel.items.length && !this.activity.items.length;
  }
}

