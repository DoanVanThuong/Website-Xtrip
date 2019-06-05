import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { AppBase } from '../../../app.base';
import {Hotel, HotelRepo} from '../../../common/index';
import { HotelMapViewPopup } from '../hotel-mapview-popup/hotel-mapview-popup'

@Component({
  selector: 'app-hotel-detail-basic',
  templateUrl: './hotel-detail-basic.component.html',
  styleUrls: ['hotel-detail-basic.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelDetailBasicComponent extends AppBase {

  @ViewChild(HotelMapViewPopup) mapviewPopup: HotelMapViewPopup;

  @Input() shadow: boolean = true;
  @Input() hotel: Hotel = new Hotel();
  @Input() code: string = '';

  mainFacility: any = {};

  constructor(
    protected _hotelRepo: HotelRepo
  ) {
    super();
  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.getMainFacility(this.code);
  }

  //fn get main facility
  getMainFacility = (code) => {
    this._hotelRepo
      .getMainFacilities(code)
      .then(
        (res: any) => {
          this.mainFacility = res.data;
        }
      );
  };

  //open mapview popup
  onClickMapview() {
    this.mapviewPopup.show()
  }

}
