import {Component, ViewEncapsulation, Input, ViewChild} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {Hotel, HotelRepo, Room, StorageService} from '../../../../../common';
import * as moment from 'moment';
import {HotelGalleryPopup} from '../../../../../components/hotel/hotel-gallery-popup/hotel-gallery.popup';
import {CSTORAGE} from '../../../../../app.constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hotel-room-desktop',
  templateUrl: './hotel-room-desktop.component.html',
  styleUrls: ['hotel-room-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelRoomDesktopComponent extends AppBase {

  @ViewChild(HotelGalleryPopup) galleryPopup: HotelGalleryPopup;

  @Input() hotel: Hotel = new Hotel();
  @Input() params: any = {};
  @Input() room: any = new Room();
  @Input() nights: number = 0;

  galleryImages: Array<any> = [];

  constructor(
    protected _hotelRepo: HotelRepo,
    private _storage: StorageService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
  }

  //open gallery rooms images
  onOpenGalleryPopup = (category: any = {}) => {
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

  // fn redirect to booking hotel
  goToBookingHotel() {

    this._storage.setItem(CSTORAGE.ROOM_BOOKING, {
      selectedValue: this.room.selectedValue,
      couponCode: '',
      points: 0
    });

    this._storage.removeItem(CSTORAGE.ROOM_BOOKING_INFO);

    this._storage.setItem(CSTORAGE.HOTEL, this.hotel);
    this._storage.setItem(CSTORAGE.ROOM, this.room);
    this._storage.setItem(CSTORAGE.HOTEL_SEARCH, this.params);
    this.router.navigate([`/hotel/booking`]);
  }

  //getURLImage
  getURLImage(path, name) {
    return path + name;
  }

}
