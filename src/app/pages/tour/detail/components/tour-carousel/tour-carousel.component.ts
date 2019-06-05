import {Component, Input, ViewEncapsulation, ViewChild, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {TourGalleryPopup} from '../tour-gallery-popup/tour-gallery.popup';
import {TourRepo, Tour} from '../../../../../common';

@Component({
  selector: 'tour-carousel',
  templateUrl: './tour-carousel.component.html',
  styleUrls: ['./tour-carousel.less'],
  encapsulation: ViewEncapsulation.None
})

export class TourCarouselDesktopComponent extends AppBase {

  @ViewChild(TourGalleryPopup) tourGallery: TourGalleryPopup;

  @Input() images: any[] = [];
  @Input() tour: Tour = null;
  @Input() height: number = 0;
  @Output() onFavourite: EventEmitter<any> = new EventEmitter<any>();

  isFavorite: boolean = false;

  carouselOptions: any = {
    items: 1,
    navigation: true,
    nav: true,
    navText: [
      '<span><img class="m-b-0 size-36x36" src="assets/images/hotel/desktop/nav-left.svg"></span>',
      '<span><img src="assets/images/hotel/desktop/nav-right.svg"></span>'
    ],
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

  constructor(private _tourRepo: TourRepo) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (!!this.tour.code) {
      this.getTourFavourite(this.tour.code);
    }
  }

  //on open popup image
  onOpenPopupImages = (category: any = {}) => {
    // this.images = category.map((item, index) => {
    //   return {
    //     index: Number(index + 1),
    //     small: item.small,
    //     medium: item.medium,
    //     big: item.big,
    //     description: `${Number(index + 1) + '/' + category.length}`
    //   };
    // });

    this.tourGallery.show({
      backdrop: 'static'
    });
  };

  // fn submit favourite
  onFavouriteTour = () => {
    return this._tourRepo.postFavoriteTour(this.tour.code)
      .then(
        (res: any) => {
          this.isFavorite = res.data;
        }
      );
  };

  // fn get favourite
  getTourFavourite(code: string = '') {
    return this._tourRepo
      .getFavouriteTour(code || this.tour.code)
      .then(
        (res: any) => {
          this.isFavorite = res.data;
        }
      );
  }

}
