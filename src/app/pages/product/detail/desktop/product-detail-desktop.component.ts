import {Component, ViewEncapsulation} from '@angular/core';
import {ProductDetailMobileComponent} from '../mobile/product-detail-mobile.component';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';

import * as moment from 'moment';
import {ITimeslot, IPerBooking, IPerBookingItem} from '../../select-option/select-option.component';
import {ProductOption} from 'app/common/entities/product-option.entity';
import {CSTORAGE} from 'app/app.constants';

@Component({
  selector: 'app-product-detail-desktop',
  templateUrl: './product-detail-desktop.component.html',
  styleUrls: ['./product-detail-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailDesktopComponent extends ProductDetailMobileComponent {

  isShowDatePicker: boolean = false;
  isShowComboList: boolean = false;
  isShowTimeSlotList: boolean = false;
  isShowPassenger: boolean = false;
  isShowAddon: boolean = false;

  datePickerOptions: Partial<BsDatepickerConfig> = {
    minDate: new Date(),
    containerClass: 'theme-orange theme-custom m-t-15',
    dateInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false
  };

  locale: string = 'vi';
  UuidPerBooking: string = '';
  requestId: string = '';

  adults: number = 1;
  childrens: number = 0;
  infants: number = 0;
  seniors: number = 0;

  selectedDate: string = null;
  selectedCombo: ProductOption = null;
  selectedTimeSlot: ITimeslot = null;
  selectedOption: Partial<IPerBookingItem> = {
    price: 0,
    label: '',
    value: null
  };

  combos: ProductOption[] = [];
  timeSlots: ITimeslot[] = [];
  perBookings: IPerBooking[] = [];

  //fn select date
  onSelectedDate = (date: any) => {
    this.selectedDate = date;

    if (!!this.selectedDate) {
      this.getCombo(this.productId, this.selectedDate);
    }
  };

  //fn get combo
  async getCombo(id: string, date: string) {

    this.isLoading = true;
    const data = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    try {
      const response: any = await this._productRepo.getOption(id, data);
      this.combos = (response.data).map((item: any) => new ProductOption(item));

      // check is combo, timeslot only one item
      if (!!this.combos.length) {
        await this.onSelectCombo(this.combos[0]);
      } else {
        this.selectedCombo = null;
        this.selectedTimeSlot = null;
        this.timeSlots = [];
        this.combos = [];
        this.perBookings = [];
        this.selectedOption = {
          price: 0,
          label: '',
          value: null
        };
        this.adults = 1;
        this.childrens = 0;
        this.totalPrice = 0;
      }

    } catch (error) {
      this.handleError(error);
    }
    finally {
      this.isLoading = false;
    }
  }

  //fn select combo
  async onCreateBooking(combo: ProductOption) {
    this.isLoading = true;
    try {
      const response: any = await this._productRepo.generateRequestID({
        productTypeId: combo.id,
        timeslotId: null,
        date: moment(this.selectedDate).format('YYYY-MM-DD'),
        seniors: combo.allowSeniors ? combo.minSeniors : 0,
        adults: combo.minPax,
        children: combo.allowChildren ? combo.minChildren : 0,
        infants: combo.allowInfant ? combo.minPax : 0
      });
      this.requestId = response.data.requestId || '';

      this._storage.setItem(CSTORAGE.PRODUCT_COMBO, combo);
      this._storage.setItem(CSTORAGE.PRODUCT_REQUEST_ID, this.requestId);

    } catch (error) {
      this.handleError(error);
    }
    finally {
      this.isLoading = false;
    }
  }

  //fn update time slot
  async updateTimeSlot(timeSlot: ITimeslot) {
    this.isLoading = true;
    try {
      const body = {
        requestId: this.requestId,
        timeSlotId: timeSlot.uuid
      };
      await this._productRepo.updateTimeSlot(body);
    } catch (error) {
      this.handleError(error[0]);
    }
    finally {
      this.isLoading = false;
    }
  }

  //fn update passenger
  async onUpdatePassengerNumber() {
    this.isLoading = true;
    try {
      await this._productRepo.updatePassengerNumbers({
        requestId: this.requestId,
        adults: this.adults,
        children: this.childrens,
        infants: this.infants,
        seniors: this.seniors
      });
      this.getPriceSummary();

    } catch (error) {
      this.handleError(error[0]);
    }
    finally {
      this.isLoading = false;
    }
  }

  //fn get price summary
  async getPriceSummary() {
    this.isLoading = true;
    const body = {
      requestId: this.requestId
    };
    try {
      const response: any = await this._productRepo.getPriceSummary(body);
      this.totalPrice = 0;

      response.data.totalItems.map((item: any) => {
        this.totalPrice += item.price;
      });

    } catch (error) {
      this.handleError(error[0]);
    }
    finally {
      this.isLoading = false;
    }
  }

  //fn update option perbooking
  async updatePerBooking() {
    this.isLoading = true;

    try {
      const body = {
        requestId: this.requestId,
        value: this.selectedOption.value
      };
      await this._productRepo.updateOptionPerBookingByOne(this.UuidPerBooking, body);
      await this.getPriceSummary();

    } catch (error) {
      this.handleError(error[0]);
    }
    finally {
      this.isLoading = false;
    }
  }

  //fn show data list
  showDataList(type: string) {
    switch (type) {
      case 'combo':
        this.isShowComboList = !this.isShowComboList;
        break;
      case 'time':
        this.isShowTimeSlotList = !this.isShowTimeSlotList;
        break;
      case 'passenger':
        if (!this.isShowPassenger)
          this.isShowPassenger = !this.isShowPassenger;
        break;
      case 'addon':
        if (!this.isShowAddon)
          this.isShowAddon = !this.isShowAddon;
        break;
      default:
        this.isShowComboList = false;
        this.isShowTimeSlotList = false;
        break;
    }
  }

  onClickedOutside($event: any, key: string) {
    switch (key) {
      case 'passenger':
        this.isShowPassenger = false;
        break;
      case 'addon':
        this.isShowAddon = false;
        break;
      case 'timeslot':
        this.isShowTimeSlotList = false;
        break;
      case 'combo':
        this.isShowComboList = false;
        break;
      default:
        this.isShowPassenger = false;
        this.isShowAddon = false;
        this.isShowTimeSlotList = false;
        this.isShowComboList = false;
        break;
    }
  }

  //fn select combo
  async onSelectCombo(combo: ProductOption) {

    if (!!combo && combo !== this.selectedCombo) {

      this.selectedCombo = combo;

      this.timeSlots = this.selectedCombo.timeslots;
      this.selectedTimeSlot = this.timeSlots.length ? this.timeSlots[0] : null;

      this.adults = this.selectedCombo.minPax;
      this.childrens = this.selectedCombo.minChildren || 0;

      // update per booking
      this.perBookings = this.selectedCombo.options.perBooking || [];

      if (!!this.perBookings.length) {
        if (this.perBookings[0].inputType === 1) {
          this.UuidPerBooking = this.perBookings[0].uuid;
          this.selectedOption.value = null;
        }
      }

      await this.onCreateBooking(this.selectedCombo);
      if (!!this.selectedTimeSlot) {
        await this.updateTimeSlot(this.selectedTimeSlot);
      }
      await this.onUpdatePassengerNumber();
      await this.getPriceSummary();
    }
  };

  //fn select timeSlot
  selectTimeSlot(time: ITimeslot) {
    if (!!time && time !== this.selectedTimeSlot) {
      this.selectedTimeSlot = time;
      if (!!this.timeSlots.length && this.timeSlots.length > 1) {
        this.updateTimeSlot(this.selectedTimeSlot);
      }
    }
  }

  //fn people change
  onPeopleChanges(number: number, key: string) {
    switch (key) {
      case 'adult':
        this.adults = number;
        break;
      case 'children':
        this.childrens = number;
        break;
      case 'infant':
        this.infants = number;
        break;
      case 'senior':
        this.seniors = number;
        break;
      default:
        this.adults = 0;
        this.childrens = 0;
        this.infants = 0;
        this.seniors = 0;
        break;
    }
    this.onUpdatePassengerNumber();
  }

  //fn on change per booking
  onChangePerBooking(data: any) {
    this.selectedOption.value = data.count;
    this.UuidPerBooking = data.data.uuid;
    this.updatePerBooking();
  }

  //fn on select option type by one
  onSelectOptionTypeOne(item: IPerBookingItem) {
    if (this.isShowAddon) {
      this.isShowAddon = false;
      if (!!item && !item !== this.selectedOption) {
        this.selectedOption = item;
        this.updatePerBooking();
      }
    }
  }

  //fn detect type input
  detectType() {
    for (const item of this.perBookings) {
      if (item.addons) {
        return item.inputType;
      }
    }
  }

  onBookProduct() {
    this._router.navigate(['product/booking']);
  }
}
