import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {CSTORAGE} from '../../../../../app.constants';
import {HotelRepo} from '../../../../../common/repos';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../../../../common/services';

@Component({
  selector: 'booking-hotel-detail-description',
  templateUrl: './description.component.html'
})
export class BookingHotelDetailDescription extends AppPage {

  hotel: any = null;
  tab: string = 'intro';

  intro: string = '';
  policies: Array<string> = [];
  facilities: Array<any> = [];

  constructor(
    private _actRouter: ActivatedRoute,
    private _storage: StorageService,
    private _hotelRepo: HotelRepo) {
    super();
  }

  ngOnInit() {
    this.onLoadDetail();
    this.getDetail(this.hotel);
    this.onGetFacilities(this.hotel);
    this.onGetTourDetail(this.hotel);

    this._actRouter.queryParams.subscribe((params) => {
      if (!!params.tab) {
        this.tab = params.tab;
      }
    });
  }

  // fn get detail
  onLoadDetail = () => {
    this.hotel = this._storage.getItem(CSTORAGE.BOOKED_HOTEL);
  };

  // fn get detail
  getDetail = (hotel: any) => {

    return this._hotelRepo
      .getDetail(hotel.hotelCode)
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
  onGetFacilities = (hotel: any) => {

    return this._hotelRepo
      .getFacilities(hotel.hotelCode)
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
  onGetTourDetail = (hotel: any) => {

    return this._hotelRepo
      .getPolicies(hotel.hotelCode)
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