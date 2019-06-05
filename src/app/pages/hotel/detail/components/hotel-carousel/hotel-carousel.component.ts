import {Component, ViewEncapsulation, Input, ViewChild} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {HotelGalleryPopup} from '../../../../../components/hotel/hotel-gallery-popup/hotel-gallery.popup';
import {Hotel, HotelRepo} from '../../../../../common';

@Component({
  selector: 'app-hotel-carousel',
  templateUrl: './hotel-carousel.component.html',
  styleUrls: ['./hotel-carousel.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelCarouselComponent extends AppBase {

  @ViewChild(HotelGalleryPopup) galleryPopup: HotelGalleryPopup;

  carouselList: Array<any> = [];
  galleryImages: Array<any> = [];
  isFavorite: boolean = false;

  @Input() data: any = {};
  @Input() hotel: Hotel = null;
  @Input() code: string = '';

  imgHeight: number = 0;

  constructor(
    protected _hotelRepo: HotelRepo
  ) {
    super();
  }

  ngOnInit() {
    this.imgHeight = 450;
    this.getHotelFavourite();
  }

  ngOnChanges() {
    this.joinCategories(this.data);
  }

  carouselOptions: any = {
    items: 1,
    navigation: true,
    nav: true,
    navText: ['<span><img class=\'m-b-0 size-36x36\' src=\'assets/images/hotel/desktop/nav-left.svg\'></span>', '<span><img src=\'assets/images/hotel/desktop/nav-right.svg\'></span>'],
    navClass: ['owl-prev', 'owl-next'],
    loop: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    margin: 0,
    dots: true,
    lazyLoad: true,
    animateOut: 'fadeOut'
  };

  //join images category into 1 list
  joinCategories(data) {
    this.carouselList = [];
    for (let i in data.categories) {
      for (let j in data.categories[i].images) {
        this.carouselList.push(data.categories[i].images[j]);
      }
    }
    this.carouselList.map(item => {
      item.url = item.imageHost + item.imageName;
    });

    this.carouselList;
  }

  //on open popup image
  onOpenPopupImages = (category: any = {}) => {

    if (category.length) {
      this.galleryImages = category.map((image, index) => {
        let url = image.imageHost + image.imageName;

        return {
          index: Number(index + 1),
          small: this.utilityHelper.markImageSize(url, 400, 300, true),
          medium: this.utilityHelper.markImageSize(url, 600, 400, true),
          big: this.utilityHelper.markImageSize(url, 700, 500, true),
          description: `${Number(index + 1) + '/' + category.length}`
        };
      });

      this.galleryPopup.category = category;
      this.galleryPopup.show();
    }
  };

  // fn submit favourite
  onFavourite = () => {
    return this._hotelRepo
      .postFavoriteHotel(this.code)
      .toPromise()
      .then(
        (res: any) => {
          this.isFavorite = res.data;
        }
      );
  };

  // fn get favourite
  getHotelFavourite() {
    return this._hotelRepo
      .getFavouriteHotel(this.code)
      .toPromise()
      .then(
        (res: any) => {
          this.isFavorite = res.data;
        }
      );
  }


}
