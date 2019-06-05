import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {Error, PassengerRepo, Security} from '../../../common/index';
import {PopupBase} from '../popup.base';
import {Passenger} from '../../../common/entities/passenger.entity';
import * as moment from 'moment';

@Component({
  selector: 'passenger-selector-popup',
  templateUrl: './passenger-selector.popup.html',
  styleUrls: ['./passenger-selector.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerSelectorPopup extends PopupBase {

  @Output('submit') submit: EventEmitter<any> = new EventEmitter<any>();

  isLoading: boolean = false;
  heading = 'Chọn hành khách';
  passengers: Array<Passenger> = [];

  constructor(private _passengerRepo: PassengerRepo,
              private _security: Security) {
    super();

    this.onInit = this.ngOnInit;
  }

  ngOnInit() {
    if (this._security.isAuthenticated()) {
      this.getPassengers();
    }
  }

  ngOnChanges() {
  }

  initial = () => {
    this.getPassengers();
  };

  // Get list passenger
  getPassengers() {
    this.isLoading = true;
    this._passengerRepo
      .fetchAll()
      .then(
        (res: any) => {
          this.isLoading = false;
          this.passengers = res.map(passenger => new Passenger(passenger));
        }
      )
      .catch((errors: Error[] = []) => {
        this.isLoading = false;
      });
  }

  // fn on submit
  onSelect = (passenger: any): void => {
    this.hide();

    this.submit.emit(passenger);
  };

}
