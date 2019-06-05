import { Component, Input, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
import { DeviceService, StorageService } from '../../../../../common/services';
import { UUID } from 'angular2-uuid';
import { BookingPassengerInfoPopup } from '../passenger-info-popup/passenger-info.popup';
import { AppBase } from '../../../../../app.base';
import { ProductOption } from '../../../../../common/entities';
import { CSTORAGE } from '../../../../../app.constants';

@Component({
  selector: 'booking-passenger-box',
  templateUrl: './passenger-box.component.html',
  styleUrls: ['./passenger-box.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingPassengerBoxComponent extends AppBase {

  @ViewChild(BookingPassengerInfoPopup) passengerPopup: BookingPassengerInfoPopup;

  @Input() class: string = '';
  @Input('invalid') isInvalid: boolean = false;

  @Input() data: any[] = [];
  @Input() adults: number = 0;
  @Input() children: number = 0;
  @Input() infants: number = 0;
  @Input() seniors: number = 0;

  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  passengers: any[] = [];
  selectedIndex: number = -1;
  selectedPassenger: any = {
    data: [],
    options: []
  };

  constructor(private _storage: StorageService,
    protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {

    this.onHandlePassengers();
  }

  ngOnChanges() {
    if (!this.passengers.length) {
      this.onHandlePassengers();
    }
  }

  // fn handle passenger data
  onHandlePassengers = () => {
    let passengers = [
      { type: 'SNR', data: Array(Number(this.seniors)).fill(0).map((x, i) => i) },
      { type: 'ADT', data: Array(Number(this.adults)).fill(0).map((x, i) => i) },
      { type: 'CHD', data: Array(Number(this.children)).fill(0).map((x, i) => i) },
      { type: 'INF', data: Array(Number(this.infants)).fill(0).map((x, i) => i) }
    ];

    passengers.map((item: any, index: number) => {
      item.data.map((iItem: any, subIndex: number) => {

        let passenger = this.findExistingPassenger(subIndex, item.type);

        if (!!passenger) {
          this.passengers.push(passenger);
        } else {
          this.passengers.push({
            id: UUID.UUID(),
            paxType: item.type,
            options: this.getFields(),
            idUpdated: false,
            index: subIndex,
          });
        }
      });
    });
  };

  findExistingPassenger = (index: number = -1, type: string = '') => {

    for (let i in this.data) {
      let passenger = this.data[i];

      if (Number(passenger.index) === Number(index) && passenger.paxType === type) {
        return Object.assign({ isUpdated: true }, passenger);
      }
    }

    return false;
  }

  // fn get data fields
  getFields = () => {

    const combo = new ProductOption(this._storage.getItem(CSTORAGE.PRODUCT_COMBO) || {});
    if (!combo) {
      return [];
    }

    return combo.options.perPax.map((item, index) => {
      return {
        uuid: item.uuid,
        value: ''
      };
    });
  };

  // fn get passenger title
  getPassengerTitle = (passenger: any = {}) => {

    switch (passenger.paxType) {
      case 'SNR': {
        return 'người cao tuổi';
      }
      case 'ADT': {
        return 'người lớn';
      }
      case 'CHD': {
        return 'trẻ em';
      }
      case 'INF': {
        return 'em bé';
      }
      default: {
        return '';
      }
    }
  };

  // fn counter valid passenger data
  onDetectUpdatedCounter = () => {
    return _.filter(this.passengers, (item) => {
      return item.isUpdated;
    }).length;
  };

  // fn on select passenger
  onSelectPassenger = (passenger: any, index: number = -1) => {

    this.selectedPassenger = passenger;
    this.selectedIndex = index;
    this.passengerPopup.passenger = passenger;
    this.passengerPopup.show();
  };

  // on passenger info change - realtime
  onPassengerChange = ($event: any, $index: number = 0): void => {
    this.selectedIndex = $index;
    this.onUpdatePassenger($event);
  };

  // fn on update passenger
  onUpdatePassenger = ($event: any) => {

    let passenger = this.passengers[this.selectedIndex];

    passenger.options = $event.map((item: any, index: number) => {
      return Object.assign(passenger.options[index], item);
    });
    passenger.isUpdated = true;

    this.onChange(this.passengers
      .filter((passenger: any) => {
        return passenger.isUpdated;
      })
      .map((passenger: any, index: number) => {

        return {
          id: passenger.id,
          paxType: passenger.paxType,
          index: passenger.index,
          options: passenger.options.map(item => {
            return {
              uuid: item.uuid,
              value: item.value
            };
          })
        };
      }));
  };

  // fn on change passenger info
  onChange = (passengers: Array<any> = []) => {
    this.changes.emit(passengers);
  };
}
