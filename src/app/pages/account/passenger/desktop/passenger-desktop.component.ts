import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {PassengerMobileComponent} from '../mobile/passenger-mobile.component';
import {Passenger} from '../../../../common/entities/passenger.entity';
import {animate, animateChild, query, stagger, style, transition, trigger} from '@angular/animations';
import {Error} from '../../../../common/entities';
import {ConfirmPopup} from '../../../../components/popup';

@Component({
  selector: 'app-account-passenger-desktop',
  templateUrl: './passenger-desktop.component.html',
  styleUrls: ['./passenger-desktop.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@item', stagger(80, animateChild()), {optional: true})
      ]),
    ]),
    trigger('item', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ])
    ])
  ]
})
export class PassengerDesktopComponent extends PassengerMobileComponent {

  @ViewChild(ConfirmPopup) confirmPopup: ConfirmPopup;

  selectedIndex: number = 0;
  selectedPassenger: Passenger = new Passenger();

  ngOnInit() {
    this.getPassengers(() => {
      this.selectedIndex = this.passengers.length;
    });
  }

  // fn on delete passenger
  onDelete = (passenger: Passenger): void => {

    this._authRepo
      .deletePassenger(passenger.id)
      .then(
        (res: any) => {

          const index = _.findIndex(this.passengers, (item: any) => {
            return item.id === passenger.id;
          });

          if (index > -1) {
            this.passengers.splice(index, 1);
          }

          this._toastr.success('Xóa thông tin hành khách thành công', null, {
            positionClass: 'toast-top-right'
          });
        },
        (errors: Error[] = []) => {
          this._toastr.error('Đã có lỗi xãy ra khi xóa một hành khách', null, {
            positionClass: 'toast-top-right'
          });
        }
      );
  };

  // fn on select edit item
  onSelectEdition = (passenger: Passenger, index: number = 0): void => {
    this.selectedIndex = index;
    this.selectedPassenger = passenger;
  };

  // on update passenger successfully
  onUpdateSuccess = ($event: any): void => {
    this.selectedPassenger = new Passenger();

    this.getPassengers(() => {
      this.selectedIndex = this.passengers.length;
    });
  };

  // fn on open confirm popup
  onOpenConfirmPopup = (passenger: Passenger) => {

    const message = `Bạn muốn xóa thông tin hành khách "${this.utilityHelper.getPassengerTitle(passenger.title, passenger.type)} ${passenger.lastName} ${ passenger.firstName }"?`;

    this.confirmPopup.open({
      message: message,
      event: {
        accept: () => {
          this.onDelete(passenger);
        }
      }
    });
  };
}
