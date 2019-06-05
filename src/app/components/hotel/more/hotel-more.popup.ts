import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PopupBase} from './../../popup/popup.base';
import {HotelRepo} from './../../../common/repos/index';
import {Hotel} from '../../../common/entities';

@Component({
  selector: 'hotel-more-popup',
  templateUrl: './hotel-more.popup.html',
  styleUrls: ['./hotel-more.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelMorePopup extends PopupBase {

  @Input() hotel: Hotel = new Hotel();
  @Input() code: string = '';
  @Input() title: string = '';
  @Input() tab: string = 'policy';

  intro: string = '';
  facilities: Array<any> = [];
  policies: Array<any> = [];

  constructor(private _hotelRepo: HotelRepo) {
    super();
  }

  // on initial
  ngOnInit() {

  }

  ngOnChanges() {

    if (this.code) {
      this.getDetail(this.code);
      this.getFacilities(this.code);
      this.getPolicies(this.code);
    }

    this.onSelectTab(null, this.tab);
  }

  onSelectTab = ($event, tab: string = '') => {
    this.tab = tab;
  };

  // fn get detail-item
  getDetail = (code: string = '') => {

    return this._hotelRepo
      .getDetail(code)
      .then(
        (res: any) => {
          this.intro = res.data.hotel.description;
        },
        (errors: any) => {
          this.intro = '';
        }
      );
  };

  // fn get facilities
  getFacilities = (code: string = '') => {

    return this._hotelRepo
      .getFacilities(code)
      .then(
        (res: any) => {
          this.facilities = res.data.facilityGroups.map(group => {
            return group;
          });
        },
        (errors: any) => {
          this.facilities = [];
        }
      );
  };

  // fn get journey tour
  getPolicies = (code: string = '') => {

    return this._hotelRepo
      .getPolicies(code)
      .then(
        (res: any) => {
          this.policies = res.data.policies;
        },
        (errors: any) => {
          this.policies = [];
        }
      );
  };
}
