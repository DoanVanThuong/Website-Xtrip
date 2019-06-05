import {Component, ViewEncapsulation, HostListener} from '@angular/core';
import {TourDetailMobileComponent} from '../mobile/tour-detail-mobile.component';
import {TourSearch} from '../../../../common';

@Component({
  selector: 'app-tour-detail-desktop',
  templateUrl: './tour-detail-desktop.component.html',
  styleUrls: ['./tour-detail-desktop.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class TourDetailDesktopComponent extends TourDetailMobileComponent {

  params: TourSearch = new TourSearch();
  isPassengerShow: boolean = false;
  totalPassenger: number = 1;

  carouselOptions: any = {
    items: 1,
    loop: false,
    navigation: true,
    nav: true,
    margin: 10,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    dots: false
  };

  //fn people change
  onPeopleChanges($event: any, type: any) {
    switch (type) {
      case 'adult': {
        this.bookingTour.adults = $event;
        break;
      }
      case 'children': {
        this.bookingTour.children = $event;
        break;
      }
      case 'infant': {
        this.bookingTour.infants = $event;
        break;
      }
    }

    if (this.bookingTour.adults + this.bookingTour.children > this.tour.available) {
      this._toastr.error(`Rất tiếc không còn đủ chỗ trống phù hợp với yêu cầu của bạn`, null, {
        positionClass: 'toast-top-right'
      });
      this.bookingTour.adults = (!!this.tour && this.tour.available > 0 ? 1 : 0);

      setTimeout(() => {
        this.bookingTour.children = 0;
      }, 100);

      this.bookingTour.infants = 0;
    }

    this.totalPassenger = _.sum([this.bookingTour.adults, this.bookingTour.children, this.bookingTour.infants]);
    this.getPriceSummary();
    this.getTourDates();
  };

  @HostListener('window:resize', ['$event'])
  onResize = () => {

    const ele = $(this._ele.nativeElement);
    const bar = ele.find('.bg-search-bar');
    const menu = ele.find('.bg-menu');

    ele.find('.content-wp').css({
      'marginTop': bar.innerHeight() + menu.innerHeight()
    });

    if (window.scrollY > document.querySelector('.header').clientHeight) {
      menu.addClass('fixed');
      menu.css({
        top: bar.innerHeight()
      });
    } else {
      menu.removeClass('fixed');
      menu.css({
        top: bar.innerHeight() + ele.find('.header').innerHeight()
      });
    }
  };

  @HostListener('window:scroll', ['$event'])
  scrollToFixed = () => {
    const ele = $(this._ele.nativeElement);
    const bar = ele.find('.bg-search-bar');
    const menu = ele.find('.bg-menu');
    const box = ele.find('.w-content');
    // scroll to fixed search bar, menu
    if (window.scrollY > document.querySelector('.header').clientHeight) {
      menu.addClass('fixed');
      menu.css({
        top: bar.innerHeight()
      });
    } else {
      menu.removeClass('fixed');
      menu.css({
        top: bar.innerHeight() + ele.find('.header').innerHeight()
      });
    }

    if (window.scrollY + bar.innerHeight() + menu.innerHeight() > box.parent().offset().top && window.innerWidth > 992) {

      let top = (window.scrollY - box.parent().offset().top) + bar.innerHeight() + menu.innerHeight();

      box.parent().css({
        position: 'relative',
        width: '100%',
        height: '100%'
      });
      box.css({
        position: top + box.innerHeight() < box.parent().innerHeight() ? 'fixed' : 'absolute',
        width: top + box.innerHeight() < box.parent().innerHeight() ? box.width() : 'auto',
        top: top + box.innerHeight() < box.parent().innerHeight() ? menu.innerHeight() + bar.innerHeight() : 'auto',
        bottom: top + box.innerHeight() > box.parent().innerHeight() ? 0 : 'auto',
      });
    } else {
      box.parent().removeAttr('style');
      box.removeAttr('style');
    }
    // for (let i in this.scrollToItem) {
    //   const element: HTMLElement = document.querySelector(`#${this.scrollToItem[i].value}`);
    //   if (window.scrollY >= element.offsetTop + 300) {
    //     this.selectedScrollTo = this.scrollToItem[i].value;
    //   }
    // }
  };

  //scroll to
  triggerScrollTo = (element: HTMLElement) => {
    if (!!element) {
      const y = document.querySelector(`#${element}`).getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y - 185,
        behavior: 'smooth'
      });
    }
  };

  // fn click outside passenger box
  onClickedOutside = ($event: any, type: string): void => {

    switch (type) {
      case 'passenger': {
        this.isPassengerShow = false;
        break;
      }
      case 'calendar': {
        this.isShowDateSelector = false;
        break;
      }
      default: {
        this.isPassengerShow = false;
        this.isShowDateSelector = false;
        break;
      }
    }
  };
}
