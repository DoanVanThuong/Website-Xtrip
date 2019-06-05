import {CancellationPolicy} from './cancellation-policy.entity';
import {FacilityGroup} from './facility-group.entity';
import {Photo} from './photo.entity';

export class Room {

  allotment: number = 0;
  cancellationPolicies: CancellationPolicy[] = [];
  currency: string = '';
  facilityGroups: any = {
    mainFacilityGroup: new FacilityGroup(),
    roomFacilityGroup: new FacilityGroup(),
    refundPolicyGroup: new FacilityGroup()
  };
  id: string = null;
  isPayNow: boolean = false;
  limitedAdults: number = 0;
  netPrice: number = 0;
  originalHotelCode: string = null;
  originalValue: string = null;
  points: number = 0;
  priceClass: string = null;
  priceKey: string = null;
  priceType: string = null;
  requestId: string = null;
  roomCode: string = null;
  roomImage: any = {};
  roomImageList: any[] = [];
  roomName: string = null;
  roomPreferences: any[] = [];
  selectedValue: string = null;
  sellingPrice: number = 0;
  source: string = null;
  originalRefundPolicies: any[] = [];
  refundPolicies: string[] = [];
  photo: Photo = new Photo();
  instructions: string = null;

  photos: Photo[] = [];

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['cancellationPolicies', 'facilityGroups'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });

      if (!!data.cancellationPolicies) {
        this.cancellationPolicies = data.cancellationPolicies.map(item => new CancellationPolicy(item));
      }

      if (!!data.facilityGroups) {
        if (!!data.facilityGroups.mainFacilityGroup) {
          this.facilityGroups.mainFacilityGroup = new FacilityGroup(data.facilityGroups.mainFacilityGroup);
        }
        if (!!data.facilityGroups.roomFacilityGroup) {
          this.facilityGroups.roomFacilityGroup = new FacilityGroup(data.facilityGroups.roomFacilityGroup);
        }
        if (!!data.facilityGroups.refundPolicyGroup) {
          this.facilityGroups.refundPolicyGroup = new FacilityGroup(data.facilityGroups.refundPolicyGroup);
        }
      }

      this.photo = new Photo({
        name: this.roomImage.name,
        url: this.roomImage.imageHost + this.roomImage.imageName,
        src: this.roomImage.imageHost + this.roomImage.imageName,
      });

      this.photos = this.roomImageList.map(photo => {
        return new Photo({
          name: this.roomImage.name,
          url: this.roomImage.imageHost + this.roomImage.imageName,
          src: this.roomImage.imageHost + this.roomImage.imageName,
        });
      });
    }
  }
}
