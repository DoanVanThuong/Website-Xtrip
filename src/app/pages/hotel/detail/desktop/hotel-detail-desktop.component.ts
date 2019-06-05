import {Component, ViewEncapsulation, HostListener} from '@angular/core';
import {ScrollToConfigOptions} from '@nicky-lenaers/ngx-scroll-to';
import {Hotel, Room} from '../../../../common';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {HotelDetailMobileComponent} from '../mobile/hotel-detail-mobile.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hotel-detail-desktop',
  templateUrl: './hotel-detail-desktop.component.html',
  styleUrls: ['./hotel-detail-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelDetailDesktopComponent extends HotelDetailMobileComponent {

  basicHeight = 0;
  rooms: any = {};
  nights: number = 0;

  scrollToItem: Array<any> = [
    {
      display: 'Chọn phòng',
      value: 'rooms'
    },
    {
      display: 'Giới thiệu',
      value: 'introduce'
    },
    {
      display: 'Tiện nghi',
      value: 'facilities'
    },
    {
      display: 'Chính sách',
      value: 'policies'
    },
    {
      display: 'Đánh giá',
      value: 'reviews'
    }];
  selectedScrollTo: string = this.scrollToItem[0].value;

  reClickSearch = false;

  ngOnInit() {
    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((param: any): void => {

        if (!param.code) {
          this.back();
        }

        this.code = param.code;
        this.params = param;

        this.getHotelDetail();
        this.getImageCategory();
        this.getHotelRooms();
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll = ($event: any) => {

    if(!this.isLoading) {
      const ele: HTMLElement = this._ele.nativeElement;
      const menu = ele.querySelector('.scroll-to');
      const bar = ele.querySelector('.search-bar');
  
      if (window.scrollY > document.querySelector('.header').clientHeight) {
        bar.classList.add('fixed');
        menu.classList.add('fixed');
      } else {
        bar.classList.remove('fixed');
        menu.classList.remove('fixed');
        // menu.nextSibling.style.marginTop = bar.clientHeight + menu.clientHeight;
      }
  
      // for (let i in this.scrollToItem) {
      //   let element = document.querySelector(`#${this.scrollToItem[i].value}`);
      //   if (window.scrollY >= element.clientTop - window.innerHeight / 4) {
      //     this.selectedScrollTo = this.scrollToItem[i].value;
      //   }
      // }
      
    }

  };

  //submit search hotel
  submitSearchHotel = ($event: any) => {
    if ($event.name !== this.params.name) {
      this._router.navigate([`/hotel/result`], {
        queryParams: $event
      });
    } else {
      this._router.navigate([`/hotel/${this.code}/detail`], {
        queryParams: $event
      });
    }
  };

  //get rooms list
  getHotelRooms = () => {

    return this._hotelRepo
      .getRooms(Object.assign({}, this.params, {
        hotelCode: this.code
      }))
      .then(
        (res: any) => {
          this.rooms = res.data.rooms.map(room => new Room(room));
          this.nights = res.data.nights;
        }
      );
  };

  //scroll to
  triggerScrollTo = (type) => {
    this.selectedScrollTo = type;
    const config: ScrollToConfigOptions = {
      target: '#' + type,
      offset: -150
    };
    this._scrollToService.scrollTo(config);
  };

  // fn get category
  getImageCategory = () => {
    this._hotelRepo
      .getImageCategories(this.code)
      .then(
        (res: any) => {
          this.imageCategory = res.data;
        }
      );
  };

  // fn get hotel detail
  getHotelDetail() {

    this.isLoading = true;
    if (this.isMobile) {
      this._spinner.show('Đang lấy dữ liệu...');
    }

    return this._hotelRepo
      .getDetail(this.code, this.params)
      .then(
        (res: any) => {

          this.hotel = new Hotel(res.data.hotel);

          this.searchInfo = res.data.searchInfo;
          this.breadcrumbs = [
            { title: 'Trang chủ', link: '/' },
            { title: this.params.name, link: `/hotel/result`, queryParams: this.params },
            { title: `${this.hotel.name}`, link: '' }
          ];
          this.detectHotelUnavailable();
          this.getEquivalentHotel(this.searchInfo);
          this.getHotelFavourite();

          this._spinner.hide();

          this.isLoading = false;
        },
        (errors: Array<Error> = []) => {
          this._spinner.hide();
          this.isLoading = false;
        }
      );
  }

  // fn get equivalent hotels
  getEquivalentHotel(data: any = {}) {
    data.destination.code = this.params.destinationCode;
    return this._hotelRepo
      .getEquivalentHotels(data)
      .then(
        (res: any) => {
          this.equivalentHotels = res.data.hotels.map(hotel => new Hotel(hotel));
          this.equivalentHotels.unshift(this.hotel);
        }
      );
  }
}
