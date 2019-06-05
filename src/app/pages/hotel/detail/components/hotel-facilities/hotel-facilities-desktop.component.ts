import {Component, ViewEncapsulation, Input} from '@angular/core';
import {HotelRepo} from '../../../../../common';

@Component({
  selector: 'app-hotel-facilities-desktop',
  templateUrl: './hotel-facilities-desktop.component.html',
  styleUrls: ['hotel-facilities-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelFacilitiesDesktopComponent {

  TITLE = {
    INTRODUCE: 'Giới thiệu khách sạn',
    FACILITIES: {
      TEXT: 'Tiện nghi khách sạn',
      MAIN: 'Tiện nghi nổi bật',
      SUB: 'Tiện nghi khách sạn'
    },
    // POLICY: 'Chính sách khách sạn'
  };
  mainFacility: any = [];
  allFacility: any = [];
  policy: any = [];

  @Input('code') code: any = {};
  @Input('hotel') hotel: any = {};
  @Input('mode') mode ?: string = '';//intro, facilities

  constructor(
    protected _hotelRepo: HotelRepo
  ) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.getAllFacility(this.code);
    this.getPolicy(this.code);
  }

  // fn get main facility
  getAllFacility = (code) => {
    this._hotelRepo
      .getFacilities(code)
      .then(
        (res: any) => {
          this.mainFacility = res.data.facilityGroups[0].facilities;
          this.allFacility = res.data.facilityGroups[1].facilities;
        }
      );
  };

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

}