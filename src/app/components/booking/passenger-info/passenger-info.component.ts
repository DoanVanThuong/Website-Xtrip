import {Component, Input, ViewEncapsulation, Output, EventEmitter, ViewChild} from '@angular/core';
import {PassengerInfoPopup} from '../../popup/passenger-info/passenger-info.popup';
import {PopupBase} from '../../popup/popup.base';
import {DeviceService, FlightSegment, StorageService} from '../../../common';
import * as moment from 'moment';
import {Passenger} from '../../../common/entities/passenger.entity';
import {CAPP, DATE_FORMAT, PASSENGER_TYPE} from '../../../app.constants';

@Component({
  selector: 'passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerInfoComponent extends PopupBase {

  @ViewChild(PassengerInfoPopup) passengerPopup: PassengerInfoPopup;

  @Input() title: string;
  @Input() segments: FlightSegment[] = [];
  @Input('international') isInternational: boolean = false;
  @Input() data: Array<any> = [];
  @Input('invalid') isInvalid: boolean = false;

  @Input() adults: number = 1;
  @Input() rangeAdult: any = {from: 12, to: 100};
  @Input() children: number = 0;
  @Input() rangeChildren: any = {from: 2, to: 12};
  @Input() infants: number = 0;
  @Input() rangeInfant: any = {from: 0, to: 2};
  @Input() isAdditionalInfoShow: boolean = false;
  @Input() isAdditionalInfo: boolean = true;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitAdditionalInfo = new EventEmitter<any>();

  selectedPassenger: any = {
    type: '',
    data: new Passenger(),
    index: -1,
    range: {
      from: 0,
      to: 0
    }
  };
  selectedPassengerIndex: number = null;

  passengers: Array<any> = [];
  numberValidPassenger: any[] = [];

  constructor(private _storage: StorageService,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    if (this.isAdditionalInfoShow) {
      if (this.isAdditionalInfo) {
        this.submitAdditionalInfo.emit(true);
        this.isInvalid = false;
      } else {
        this.submitAdditionalInfo.emit(false);
        this.isInvalid = true;
      }
    } else {
      this.isInvalid = false;
    }

    this.getPassengers();
  }

  ngOnChanges() {
  }

  // fn get passenger
  getPassengers = (): void => {

    this.passengers = [];

    let passengers = [
      {type: 'adult', number: Array(Number(this.adults)).fill(0).map((x, i) => i), data: []},
      {type: 'child', number: Array(Number(this.children)).fill(0).map((x, i) => i), data: []},
      {type: 'infant', number: Array(Number(this.infants)).fill(0).map((x, i) => i), data: []}
    ];

    passengers.map((item, index) => {
      item.number.map((subItem, subIndex) => {

        let passenger = this.findExistingPassenger(subIndex, item.type);
        if (!!passenger) {
          this.passengers.push(passenger);
        } else {

          let range: any = {};
          switch (item.type) {
            case 'adult': {
              range = this.rangeAdult;
              break;
            }
            case 'child': {
              range = this.rangeChildren;
              break;
            }
            case 'infant': {
              range = this.rangeInfant;
              break;
            }
          }

          this.passengers.push({
            type: item.type,
            data: new Passenger({
              type: item.type
            }),
            index: subIndex,
            isUpdated: false,
            range
          });
        }
      });
    });

  };

  // fn find existing passenger - who is updated
  findExistingPassenger = (index: number = -1, type: string = '') => {

    for (let i in this.data) {

      let passenger = this.data[i];
      let pType: string = null;
      let range: any = {};

      switch (passenger.PassengerType) {
        case PASSENGER_TYPE.ADULT: {
          pType = 'adult';
          range = this.rangeAdult;
          break;
        }
        case PASSENGER_TYPE.CHILDREN: {
          pType = 'child';
          range = this.rangeChildren;
          break;
        }
        case PASSENGER_TYPE.INFANT: {
          pType = 'infant';
          range = this.rangeInfant;
          break;
        }
      }

      if (type == pType && Number(index) == Number(passenger.index)) {

        return {
          type: type,
          data: new Passenger({
            baggages: (passenger.Baggages && !!passenger.Baggages.length) ? passenger.Baggages.map((baggage, index) => {

              for (let i in this.segments[index].baggageDetails) {
                if (this.segments[index].baggageDetails[i].weight === baggage.Weight) {
                  return this.segments[index].baggageDetails[i];
                }
              }

              return {
                weight: 0,
                price: 0
              };
            }) : [],
            title: this.utilityHelper.getPassengerTitle(passenger.Title, type),
            type: type,
            firstName: passenger.FirstName,
            lastName: passenger.LastName,
            dateOfBirth: !!passenger.DateOfBirth ? this.utilityHelper.convertDateWith(passenger.DateOfBirth) : '',
            passportNumber: passenger.PassportNumber,
            passportExpiry: !!passenger.PassportExpiry ? (
                this.utilityHelper.isDateWith(passenger.PassportExpiry, DATE_FORMAT.VALUE)
                  ? passenger.PassportExpiry
                  : this.utilityHelper.convertDateWith(passenger.PassportExpiry, DATE_FORMAT.VALUE))
              : null,
            passportCountry: passenger.PassportCountry,
            national: passenger.National,
          }),
          index: passenger.index,
          isUpdated: true,
          range
        };
      }
    }

    return false;
  };

  // fn open fill passenger form
  openPassengerForm(passenger: any, index: number) {

    this.passengerPopup.isInternational = this.isInternational;
    this.passengerPopup.passengerIndex = passenger.index + 1;
    this.passengerPopup.passenger = passenger.data;
    this.passengerPopup.rangeAge = passenger.range;
    this.passengerPopup.show();

    this.selectedPassenger = passenger;
    this.selectedPassengerIndex = index;
  }

  // fn on passenger change
  onPassengerChange = ($event: any, $index: number = 0): void => {

    this.selectedPassengerIndex = $index;
    this.onUpdatePassengers($event);
  };

  // fn on update passenger from popup
  onUpdatePassengers = ($event: any): void => {

    let passenger = this.passengers[this.selectedPassengerIndex];

    passenger.data = $event;
    passenger.isUpdated = true;

    this.onSubmit(this.passengers
      .filter((passenger: any) => {
        let valid = true;

        if (!this.utilityHelper.isNullOrUndefined(passenger.data.isValid)) {
          valid = passenger.data.isValid;
        }

        return passenger.isUpdated && valid;
      })
      .map((passenger: any, index: number) => {

        let passport = {};
        if (this.isInternational) {
          passport = {
            PassportNumber: passenger.data.passportNumber,
            PassportCountry: passenger.data.passportCountry,
            PassportExpiry: moment(passenger.data.passportExpiry, DATE_FORMAT.DATE).format(DATE_FORMAT.VALUE),
            National: passenger.data.national,
          };
        }

        const passengerItem = {
          index: passenger.index,
          Title: passenger.data.title,
          FirstName: passenger.data.firstName,
          LastName: passenger.data.lastName,
          DateOfBirth: !!passenger.data.dateOfBirth ? moment(passenger.data.dateOfBirth, DATE_FORMAT.DATE).format(DATE_FORMAT.VALUE) : '',
          PassengerType: this.utilityHelper.getPassengerTypeWith(passenger.type),
          Baggages: passenger.data.baggages.map((baggage, index) => {
            return {
              SegmentId: this.segments[index].itineraryType,
              Weight: baggage.weight
            };
          })
        };

        switch (passenger.type) {
          case 'adult': {
            passengerItem.Title = passenger.data.title === 'Ông' ? 'MR' : passenger.data.title === 'Bà' ? 'MRS' : 'MISS';
            break;
          }
          case 'child':
          case 'infant': {
            passengerItem.Title = passenger.data.title === 'Bé trai' ? 'MSTR' : 'MISS';
            break;
          }
        }

        // detect valid item in list
        let passengerIndex = _.find(this.numberValidPassenger, (item) => {
          return item === passenger.index;
        });

        if (passengerIndex < 0) {
          this.numberValidPassenger.push(passenger.index);
        }

        return Object.assign(passengerItem, passport);
      }));
  };

  // fn passenger data changed
  onSubmit = (passengers: Array<any> = []) => {
    this.submit.emit(passengers);
  };

  // fn on change data
  onChange = (passengers: Array<any> = []) => {
    this.onSubmit(passengers);
  };

  //fn check validate passenger
  checkValidatePassenger(arr: any[], number: number) {
    return _.includes(arr, number);
  }

  // fn on change following passenger info
  onChangeAdditionalInfo = ($event: any) => {

    this.isAdditionalInfo = $event;
    this.submitAdditionalInfo.emit(this.isAdditionalInfo);

    /*if (this.isAdditionalInfo) {
      this.submitAdditionalInfo.emit(true);
      this.isInvalid = false;
    } else {
      this.submitAdditionalInfo.emit(false);
      this.isInvalid = true;
      this.getPassengers();
      this.submit.emit(this.passengers);
    }*/
  };
}
