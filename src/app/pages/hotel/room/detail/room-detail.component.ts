import { Component, ViewEncapsulation, ViewChild, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppBase } from 'app/app.base';
import { GalleryPopup } from 'app/components/popup';
import { Room, HotelRepo, Spinner, StorageService } from 'app/common';
import { DeviceService } from '../../../../common/services';

import * as moment from 'moment';
import { CSTORAGE } from 'app/app.constants';

@Component({
  selector: 'app-room-detail-mobile',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RoomDetailMobileComponent extends AppBase {

  @ViewChild(forwardRef(() => GalleryPopup)) galleryPopup: GalleryPopup;
  
  room: Room = null;
  params: any = null;
  galleryImages: Array<any> = [];
  nights: number = 0;

  constructor(
    private _hotelRepo: HotelRepo,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _router: Router,
    private _spinner: Spinner,
    private _storage: StorageService,
    protected _device: DeviceService
  ) { super(); this.setDeviceMode(_device); }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      if(this.isMobile) {
        this.getRoomDetail(params.selectedValue);
      }
      else {
        this._router.navigate([`hotel/${this.params.code}/detail`], {queryParams: this.params});
      }
    });
    
  }

  //fn get room detail
  getRoomDetail = (selectedValue: string = ''): Promise<any> => {
    this._spinner.show('Vui lòng chờ...');
    return this._hotelRepo
      .getRoomDetail(selectedValue)
      .then(
        (res: any) => {
          this.room = new Room(res.data.room);
          this.nights = res.data.nights;
          this._spinner.hide();
        },
        (errors) => {
          this._spinner.hide();
        }
      );
  };

  //open gallery image hotel room
  openGalleryWith = (category: any = {}) => {
    if (category.length) {
      this.galleryImages = category.map(image => {
        let url = image.imageHost + image.imageName;

        return {
          small: url,
          medium: url,
          big: url,
          description: `(${image.description}`
        };
      });
      this.galleryPopup.category = category;
      this.galleryPopup.show();
    }
  };

  // fn redirect to booking hotel
  goToBookingHotel = (room: Room): void => {

    this._storage.setItem(CSTORAGE.ROOM_BOOKING, {
      selectedValue: room.selectedValue,
      couponCode: '',
      points: 0
    });

    this._storage.removeItem(CSTORAGE.ROOM_BOOKING_INFO);
    this._storage.setItem(CSTORAGE.HOTEL_SEARCH, this.params);
    this._storage.setItem(CSTORAGE.ROOM, room);
    
    this._router.navigate([`/hotel/booking`]);
  };

  //back
  backBtn = (): void => {
    this._location.back();
  };

}
