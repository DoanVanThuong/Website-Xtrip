import {Component, ViewEncapsulation, HostListener} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService, Error, ProductPerBooking, ProductRepo, StorageService} from '../../../common';
import {CSTORAGE} from '../../../app.constants';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class SelectOptionProductMobileComponent extends AppBase {

  combo: any = {};

  isLoading: boolean = false;

  requestId: string = '';
  iconAdd: string = 'assets/images/icon/icon-plus-orange-white.svg';
  iconMinus: string = 'assets/images/icon/icon-minus-orange-white.svg';

  adults: number = 1;
  childrens: number = 0;
  infants: number = 0;
  seniors: number = 0;
  totalPrice: number = 0;

  timeSlots: ITimeslot[] = new Array<ITimeslot>();
  perBookings: ProductPerBooking[] = new Array<ProductPerBooking>();
  UuidPerBooking: string;

  selectedTimeSlot: Partial<ITimeslot>;

  selectedOption: Partial<IPerBookingItem> = {
    label: 'string',
    price: 0,
    value: null,
  };

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _productRepo: ProductRepo,
              private _storage: StorageService,
              private _toastService: ToastrService,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit(): void {

    this._activatedRoute.params.subscribe((params: any) => {
      if (this.isDesktop) {
        this._router.navigate([`/product/${params.id}/detail`]);
        return;
      }

      this.combo = this._storage.getItem(CSTORAGE.PRODUCT_COMBO);
      this.requestId = this._storage.getItem(CSTORAGE.PRODUCT_REQUEST_ID);

      this._storage.removeItem(CSTORAGE.PRODUCT_BOOKING);

      this.timeSlots = this.combo.timeslots || [];
      this.selectedTimeSlot = this.timeSlots[0] || {};

      this.updateTimeSlot();

      this.perBookings = this.combo.options.perBooking;

      this.getOptionPerBooking();
      this.getPriceSummary();
    });

  }

  //fn get option perbooking
  getOptionPerBooking() {
    if (!!this.perBookings.length) {
      if (this.perBookings[0].inputType === 1) {
        this.perBookings[0].items.unshift({
          label: this.perBookings[0].name,
          price: 0,
          value: null
        });
        this.UuidPerBooking = this.perBookings[0].uuid;
        this.selectedOption = this.perBookings[0].items[0];
      }
    }
  }

  //fn detect people change
  onPeopleChanges(data: number, type: string) {
    switch (type.toLowerCase()) {
      case 'adult': {
        this.adults = data;
        break;
      }
      case 'children': {
        this.childrens = data;
        break;
      }
      case 'senior': {
        this.seniors = data;
        break;
      }
      case 'infant': {
        this.infants = data;
        break;
      }
    }
    this.updatePassengerNumber();
  }

  async updatePassengerNumber() {
    this.isLoading = true;

    const body = {
      requestId: this.requestId,
      adults: this.adults,
      children: this.childrens,
      infants: this.infants,
      seniors: this.seniors
    };
    try {
      await this._productRepo.updatePassengerNumbers(body);
      this.getPriceSummary();

    } catch (error) {
      this.handleError(error[0]);
    } finally {
      this.isLoading = false;
    }
  }

  //fn handle error
  handleError(error: any) {
    this._toastService.error(`${new Error(error).value}`, 'Có lỗi xảy ra');
    this._router.navigate(['/']);
    this.isLoading = false;
  }

  //fn get price summary
  async getPriceSummary() {
    this.isLoading = true;
    try {
      const response: any = await this._productRepo.getPriceSummary({
        requestId: this.requestId
      });

      this.totalPrice = 0;
      response.data.totalItems.map((item: any) => {
        this.totalPrice += item.price;
      });

    } catch (error) {
      this.handleError(error[0]);
    } finally {
      this.isLoading = false;
    }
  }

  //fn on select timeSlot
  onSelectTimeSlot(time: ITimeslot) {
    this.selectedTimeSlot = time;
    this.updateTimeSlot();
  }

  //fn update time slot
  async updateTimeSlot() {
    this.isLoading = true;
    try {
      const body = {
        requestId: this.requestId,
        timeSlotId: this.selectedTimeSlot.uuid || ''
      };
      await this._productRepo.updateTimeSlot(body);
    } catch (error) {
      this.handleError(error[0]);
    } finally {
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
      this.getPriceSummary();

    } catch (error) {
      this.handleError(error[0]);
    } finally {
      this.isLoading = false;

    }
  }

  //fn on change per booking
  onChangePerbooking(data: any) {
    // type == 1
    if (!!data && !data.data) {
      this.selectedOption = data;
    } else {
      this.selectedOption.value = data.count;
      this.UuidPerBooking = data.data.uuid; //update UUID perbooking
    }
    this.updatePerBooking();
  }

  detectDisabled() {
    if (!!this.perBookings.length && this.detectType() === 1) {
      return !this.selectedOption.value;
    }
  }

  back() {
    window.history.back();
  }

  //fn detect type input
  detectType() {
    for (const item of this.perBookings) {
      if (item.addons) {
        return item.inputType;
      }
    }
  }

  // fn redirect to booking
  onBooking = () => {
    this._router.navigate(['/product/booking']);
  };
}

export interface ITimeslot {
  endTime: string;
  name: string;
  startTime: string;
  uuid: string;
}

export interface IPerBooking {
  uuid: string;
  validFrom: any;
  validTo: any;
  addons: boolean;
  required: boolean;
  description: string;
  name: string;
  items: any;
  price: number;
  inputType: number;
}

export interface IPerBookingItem {
  label: string;
  price: number;
  value: string;
}
