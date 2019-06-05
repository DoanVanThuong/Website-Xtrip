import {Component, OnInit, ViewEncapsulation, Input, ViewChild} from '@angular/core';
import {PopupBase} from '../../../../../components/popup';
import {HotelRepo, Room} from '../../../../../common';
import {HotelGalleryPopup} from '../../../../../components/hotel/hotel-gallery-popup/hotel-gallery.popup';

@Component({
  selector: 'app-hotel-room-popup',
  templateUrl: './hotel-room-popup.html',
  styleUrls: ['./hotel-room-popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelRoomPopupComponent extends PopupBase {

  @ViewChild(HotelGalleryPopup) galleryPopup: HotelGalleryPopup;

  @Input() params: any = {};
  @Input() nights: number = 0;
  @Input() room: Room = new Room();
  @Input() code: string = '';

  isShowPolicy: boolean = false;
  policy: string = '';

  galleryImages: Array<any> = [];

  constructor(
    protected _hotelRepo: HotelRepo
  ) {
    super();
  }

  ngOnInit(): void {

  }

  ngOnChanges() {

  }

  // fn get policy
  getPolicy = (code) => {
    this._hotelRepo
      .getPolicies(code)
      .then(
        (res: any) => {
          this.policy = res.data.policies;
        }
      );
  };

  //open gallery rooms images
  onOpenGalleryPopup = (category: any = {}) => {
    if (category.length) {
      this.galleryImages = category.map((image, index) => {
        let url = image.imageHost + image.imageName;

        return {
          index: Number(index + 1),
          small: url,
          medium: url,
          big: url,
          description: `${Number(index + 1) + '/' + category.length}`
        };
      });

      this.galleryPopup.category = category;
      this.galleryPopup.show();
    }
  };

}
