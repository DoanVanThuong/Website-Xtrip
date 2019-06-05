import { Component, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AppBase } from '../../../../../app.base';
import { Hotel, HotelRepo, HotelSearch, Room, StorageService, DeviceService } from '../../../../../common';
import { CSTORAGE } from '../../../../../app.constants';
import { UtilityHelper } from '../../../../../common/helpers/utility.helper';
import * as moment from 'moment';
import { HotelMapViewPopup } from '../../../../../components/hotel/hotel-mapview-popup/hotel-mapview-popup';
import { HotelRoomPopupComponent } from '../../../booking/components/hotel-room-popup/hotel-room-popup.component';

@Component({
  selector: 'hotel-room-detail',
  templateUrl: 'hotel-info.component.html',
  styleUrls: ['hotel-info.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelInfoComponentDesktop extends AppBase {

  @ViewChild(HotelMapViewPopup) mapviewPopup: HotelMapViewPopup;
  @ViewChild(HotelRoomPopupComponent) roomDetailPopup: HotelRoomPopupComponent;

  @Input() room: Room = null;
  hotel: Hotel = null;

  @Input() data: any = null;
  isLoading: boolean = false;
  params: HotelSearch = null;
  night: number = 0;

  constructor(private _storage: StorageService,
    private _router: Router,
    private _device: DeviceService,
    private _hotelRepo: HotelRepo) {
    super();
    this.setDeviceMode(this._device);

  }


  ngOnInit() {
    this.getData();
  }

  ngOnChanges() {

  }

  //get data
  getData() {
    let params = this._storage.getItem(CSTORAGE.HOTEL_SEARCH);
    let hotel = this._storage.getItem(CSTORAGE.HOTEL);
    let room = this._storage.getItem(CSTORAGE.ROOM);

    this.params = new HotelSearch(params);
    this.hotel = new Hotel(hotel);
    this.room = new Room(room);

    this.night = this.utilityHelper.calcDay(this.params.checkOut, this.params.checkIn);
  }

  //get day of week
  getDayOfWeek(date) {
    return UtilityHelper.getDayOfWeekShortDate(moment(date));
  }

  //open map view popup
  openMapView = () => {
    this.mapviewPopup.show();
  };

  //open room detail popup
  openDetailRoom = () => {
    this.roomDetailPopup.show();
  };

  // fn get room detail
  getRoomDetail = (selectedValue: string = ''): Promise<any> => {

    this.isLoading = true;
    return this._hotelRepo
      .getRoomDetail(selectedValue)
      .then(
        (res: any) => {
          this.room = new Room(res.data.room);
          this.isLoading = false;
        },
        (errors: Error[] = []) => {
          this._router.navigate(['/404']);
          this.isLoading = false;
        }
      );
  };

}
