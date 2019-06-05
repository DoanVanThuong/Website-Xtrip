import {Photo} from './photo.entity';
import {Payment} from './payment.entity';
import {CancellationPolicy} from './cancellation-policy.entity';
import {FacilityGroup} from './facility-group.entity';

export class HotelReservation {

  adults: number = 0;
  bookingDate: string = null;
  checkIn: string = null;
  checkOut: string = null;
  code: string = null;
  holdExpiry: string = null;
  hotelAddress: string = null;
  hotelCode: string = null;
  hotelName: string = null;
  hotelStars: number = 0;
  isCancelled: boolean = false;
  isReviewable: boolean = false;
  isReviewed: boolean = false;
  nights: number = 0;
  photo: Photo = new Photo();
  status: number = 0;
  contactPhone: string = '';
  paymentDetail: Payment = new Payment();
  paymentHelpUrl: string = null;
  photoRoom: Photo = new Photo;
  pnr: string = null;
  preferedService: string = '';
  presenter: string = '';
  priceSummary: any = null;
  roomBedType: string = null;
  roomMaxAdults: number = 0;
  roomName: string = '';
  roomNumbers: number = 0;
  totalPrice: number = 0;

  roomPhotos: Photo[] = [];
  popularFacility: FacilityGroup = new FacilityGroup();
  generalFacility: FacilityGroup = new FacilityGroup();
  cancellationPolicies: CancellationPolicy[] = [];
  fullRefundTo: string = null;
  isFullRefund: boolean = false;
  characteristic: string[] = [];
  refundPolicies: string[] = [];

  roomDescriptions: RoomDescription[] = [];

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['photo', 'photoRoom', 'paymentDetail', 'roomPhotos', 'cancellationPolicies', 'popularFacility', 'generalFacility', 'roomDescriptions'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      // hotel photo
      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

      // room photo
      if (!!data.photoRoom) {
        this.photoRoom = new Photo(data.photoRoom);
      }

      // room photos
      if (!!data.roomPhotos) {
        this.roomPhotos = data.roomPhotos.map(item => new Photo(item));
      }

      // payment detail
      if (!!data.paymentDetail) {
        this.paymentDetail = new Payment(data.paymentDetail);
      }

      // cancellation policy
      if (!!data.cancellationPolicies) {
        this.cancellationPolicies = data.cancellationPolicies.map(item => new CancellationPolicy(item));
      }

      // popular facility
      if (!!data.popularFacility) {
        this.popularFacility = new FacilityGroup(data.popularFacility);
      }

      // general facility
      if (!!data.generalFacility) {
        this.generalFacility = new FacilityGroup(data.generalFacility);
      }

      // room description
      if (!!data.roomDescriptions) {
        this.roomDescriptions = data.roomDescriptions.map(item => new RoomDescription(item));
      }
    }
  }
}

export class RoomDescription {
  description: string = null;
  icon: Photo = new Photo();

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;
      let keys = ['icon'];
      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.icon) {
        this.icon = new Photo(data.icon);
      }
    }
  }
}

