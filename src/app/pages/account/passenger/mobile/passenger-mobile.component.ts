import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {AppPage} from '../../../../app.base';
import {AuthRepo, Error, PassengerRepo, StorageService} from '../../../../common/index';
import {Passenger} from '../../../../common/entities/passenger.entity';
import {CSTORAGE} from '../../../../app.constants';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account-passenger-mobile',
  templateUrl: './passenger-mobile.component.html',
  styleUrls: ['./passenger-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerMobileComponent extends AppPage {

  isLoading: boolean = false;
  passengers: Array<Passenger> = [];
  selectedPassengers: Array<any> = [];
  isDeleteMode: boolean = false;

  constructor(private _router: Router,
              protected _authRepo: AuthRepo,
              protected _passengerRepo: PassengerRepo,
              private _storage: StorageService,
              protected _toastr: ToastrService) {
    super();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {

    this.getPassengers();
  }

  // fn on load passengers
  getPassengers = (callback?: Function) => {
    this.isLoading = true;

    return this._passengerRepo
      .fetchAll()
      .then(
        (res: any) => {

          this.isLoading = false;
          this.passengers = res.map((passenger: Passenger) => new Passenger(passenger));

          if (callback instanceof Function) {
            callback();
          }
        }, (errors: Error[] = []) => {
          this.isLoading = false;
        }
      );
  };

  // fn on select editor
  onSelectEditor = (passenger: Passenger) => {
    this._storage.setItem(CSTORAGE.PASSENGER, passenger);

    this._router.navigate([`/account/passenger/${passenger.id}/edit`]);
  };

  // fn check passenger
  onSelectPassenger = (passenger: Passenger): void => {
    const index = this.selectedPassengers.findIndex(item => item === passenger);

    if (index === -1) {
      this.selectedPassengers.push(passenger);
    } else {
      this.selectedPassengers.splice(this.selectedPassengers.findIndex(item => item === passenger), 1);
    }

    !this.selectedPassengers.length ? this.isDeleteMode = false : this.isDeleteMode = true;
  };

  // fn detect item is selected
  onIsSelected = (passenger: Passenger): boolean => {
    let index = this.utilityHelper.findInListByID(passenger, this.selectedPassengers);

    if (typeof (index) === 'number') {
      return true;
    }

    return false;
  };

  // fn select all
  onSelectAll = () => {

    if (this.passengers.length === this.selectedPassengers.length) {
      this.isDeleteMode = false;
      this.selectedPassengers = [];
      return;
    }

    for (let index in this.passengers) {
      let passenger = this.passengers[index];

      let iNum = this.utilityHelper.findInListByID(passenger, this.selectedPassengers);
      if (typeof iNum === 'boolean') {
        this.selectedPassengers.push(passenger);
      }
    }
  };

  // fn on delete selected passenger
  onDeleteGroup = () => {

    for (let index in this.selectedPassengers) {

      let passenger = this.selectedPassengers[index];

      this._authRepo
        .deletePassenger(this.selectedPassengers[index].id)
        .then(
          (res: any) => {
            if (res.code.toLowerCase() === 'success') {

              let iPassenger = this.utilityHelper.findInListByID(passenger, this.selectedPassengers);

              if (typeof (iPassenger) === 'number') {
                this.selectedPassengers.splice(iPassenger, 1);
              }

              if (!this.selectedPassengers.length) {
                this.getPassengers();
                this.isDeleteMode = false;
              }
            }
          }
        );
    }
  };

}
