import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {
  FlightBaggage,
  FlightSegment,
  PassengerRepo,
  RequiredWithValidator,
  Security,
  StorageService
} from '../../../common/index';
import {CAPP, CPATTERN, CVOCATIVE, DATE_FORMAT, EVENT} from '../../../app.constants';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Passenger} from '../../../common/entities/passenger.entity';
import * as moment from 'moment';
import {AppBase} from '../../../app.base';
import {GlobalState} from '../../../global.state';
import {defineLocale, BsLocaleService} from 'ngx-bootstrap';
import {viLocale} from '../../../../assets/localize/vi';

defineLocale('vi', viLocale);

@Component({
  selector: 'passenger-item',
  templateUrl: './passenger-item.component.html',
  styleUrls: ['./passenger-item.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class PassengerItemComponent extends AppBase {

  @Input() passenger: Passenger = null;
  @Input() segments: FlightSegment[] = [];
  @Input() delay: number = 2000; // default is 2000ms
  @Input('international') isInternational: boolean = false;
  @Input('invalid') isInvalid: boolean = false;

  @Input('range-age') rangeAge: any = {
    from: 0,
    to: 0
  };

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  passengers: Array<Passenger> = [];

  heading: string = '';
  passengerIndex: number = 0;
  mask = CPATTERN.DATE_MASK;

  carriers: Array<any> = [];
  airports: Array<any> = [];

  vocatives: Array<any> = CVOCATIVE.ADULT;
  title: any = null;

  selectedBaggages: Array<any> = [];

  passportForm: FormGroup;
  form: FormGroup;
  lastName: AbstractControl;
  firstName: AbstractControl;
  dateOfBirth: AbstractControl;

  isDOBShow: boolean = false;
  isBaggageShow: boolean = false;

  timeout: any = null;

  maxDate: any = new Date();
  datePickerOptions: any = {
    containerClass: 'theme-orange theme-custom',
    dateInputFormat: 'DD/MM/YYYY'
  };

  locale = 'vi';

  constructor(private _fb: FormBuilder,
              private router: Router,
              private _security: Security,
              private _passengerRepo: PassengerRepo,
              private _localeService: BsLocaleService,
              private _storage: StorageService,
              private _state: GlobalState) {
    super();
    this._localeService.use(this.locale);
  }

  ngOnInit() {

    if (this._security.isAuthenticated()) {
      this.getPassengers();
    }

    this._state.subscribe(EVENT.LOGGED_IN, () => {
      if (this._security.isAuthenticated()) {
        this.getPassengers();
      }
    });

    this.onFormInit();
    this.onHandleBaggage();
    this.onHandlePassenger();
  }

  ngOnChanges() {

    this.onHandleBaggage();
    this.onHandlePassenger();
    // this.onFormInit();

    if (!!this.form && !!this.passenger.id) {
      this.form
        .patchValue(Object.assign({}, this.passenger, {
          dateOfBirth:
            !!this.passenger.dateOfBirth ? (
                this.utilityHelper.isDateWith(this.passenger.dateOfBirth, DATE_FORMAT.VALUE)
                  ? this.passenger.dateOfBirth
                  : this.utilityHelper.convertDateWith(this.passenger.dateOfBirth, DATE_FORMAT.VALUE))
              : ''
        }));

      for (let key in this.form.value) {
        this.form.controls[key].markAsTouched({
          onlySelf: true
        });
      }
    }
  };

  // fn form init
  onFormInit = () => {

    this.passportForm = this._fb.group({});
    this.form = this._fb.group({
      firstName: [this.passenger.firstName || '', Validators.compose([Validators.required])],
      lastName: [this.passenger.lastName || '', Validators.compose([Validators.required])],
      dateOfBirth: [
        !!this.passenger.dateOfBirth ? (
            this.utilityHelper.isDateWith(this.passenger.dateOfBirth, DATE_FORMAT.VALUE)
              ? this.passenger.dateOfBirth
              : this.utilityHelper.convertDateWith(this.passenger.dateOfBirth, DATE_FORMAT.VALUE))
          : '',
        Validators.compose([
          RequiredWithValidator.validate((['child', 'infant']).indexOf(this.passenger.type) !== -1)
        ])],
    });

    this.firstName = this.form.controls.firstName;
    this.lastName = this.form.controls.lastName;
    this.dateOfBirth = this.form.controls.dateOfBirth;

    // date of birth change
    this.dateOfBirth
      .valueChanges
      .subscribe((value: any) => {

        if (value && this.passenger.type !== 'adult') {
          if (this.utilityHelper.isNullOrUndefined(value)) {
            return;
          }

          if (typeof value !== 'string') {
            value = moment(value).format(CAPP.DATE_FORMAT);
          }

          let now = moment(new Date(), 'MM/DD/YYYY');
          let valid = this.utilityHelper.validDateFormatWith(value);
          let date = moment(value, 'DD/MM/YYYY');

          if (!valid || now.diff(date) < 0) {
            this.dateOfBirth.setErrors({date: true});
            return;
          }

          switch (this.passenger.type) {
            case 'child':
            case 'infant': {

              let duration = moment(now.format('MM/DD/YYYY')).diff(date, 'years', true);

              if (this.rangeAge.from > duration || duration >= this.rangeAge.to) {
                this.dateOfBirth.setErrors({range_age: true});
                return;
              }

              break;
            }
          }
        }

        this.dateOfBirth.setErrors(null);
      });

    this.form
      .valueChanges
      .subscribe((form: any) => {

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.onChange();
        }, Number(this.delay) || 0);
      });
  };

  // fn get passenger
  getPassengers = (): Promise<any> => {
    return this._passengerRepo
      .fetchAll()
      .then(
        (res: any) => {
          this.passengers = res.map(passenger => new Passenger(passenger));
        }
      );
  };

  // on handle baggage
  onHandleBaggage = (): void => {

    this.selectedBaggages = this.segments.map((segment, index) => {
      7
      if (!segment.baggages[0].price) {
        return segment.baggages[0];
      }

      return {
        weight: 0,
        price: 0,
        unit: 'kg'
      }
    });

  };

  // fn handle passenger to binding
  onHandlePassenger = (): void => {

    switch (this.passenger.type) {
      default:
      case 'adult': {
        this.vocatives = CVOCATIVE.ADULT;
        this.isDOBShow = false;
        this.isBaggageShow = true;
        break;
      }
      case 'child': {
        this.vocatives = CVOCATIVE.CHILD;
        this.isDOBShow = true;
        this.isBaggageShow = true;

        break;
      }
      case 'infant': {
        this.vocatives = CVOCATIVE.CHILD;
        this.isDOBShow = true;
        this.isBaggageShow = false;

        break;
      }
    }

    // push baggage
    for (let index in this.passenger.baggages) {
      this.selectedBaggages[Number(index)] = this.passenger.baggages[Number(index)];
    }

    // detect vocative
    this.title = this.passenger.title || null;
    if (this.utilityHelper.isNullOrUndefined(this.title)) {
      this.title = this.vocatives[0];
    }
    // set content
    this.heading = `Hành khách ${this.passenger.type == 'adult' ? 'người lớn' : this.passenger.type == 'child' ? 'trẻ em' : 'em bé'} ${!!this.passengerIndex ? this.passengerIndex : ''}`;
  };

  // fn on select vocative
  onSelectVocative = (vocative: string = 'Ông') => {
    if (this.title === vocative) {
      return;
    }

    this.title = vocative;
    this.onChange();
  };

  // fn on select baggage
  onSelectBaggage = (baggage: any, segment: number) => {

    if (this.utilityHelper.equalObject(baggage, this.selectedBaggages[segment])) {
      return;
    }

    this.selectedBaggages[segment] = baggage;
    this.onChange();
  };

  // fn on select date of birth
  onSelectDate = ($event: any) => {
    this.dateOfBirth.setValue(moment($event).format(CAPP.DATE_FORMAT));
  };

  // fn passport change
  onPassportChange = ($event: any) => {

    this.passportForm = $event;

    if (!this.utilityHelper.equalObject(this.passportForm.value, this.passenger)) {
      this.onChange();
    }
  };

  // fn on change
  onChange = () => {

    this.changes.emit(Object.assign(this.form.value, this.passportForm.value, {
      type: this.passenger.type,
      title: this.title,
      baggages: this.selectedBaggages,
      isValid: !this.onDetectDisable()
    }));
  };

  // fn on select passenger - from auto complete
  onSelectPassengerDropdown = ($event: any): void => {
    if ($event.item) {
      this.onSelectPassenger($event.item);
    }
  };

  // fn on select passgenr -- from popup
  onSelectPassenger = (passenger: Passenger): void => {

    this.passenger = Object.assign(passenger, {type: this.passenger.type});
    this.title = this.onSelectTitle(passenger.title);

    this.form
      .patchValue(Object.assign({}, passenger, {
        dateOfBirth: !!this.passenger.dateOfBirth ? (
            this.utilityHelper.isDateWith(passenger.dateOfBirth, DATE_FORMAT.DATE)
              ? passenger.dateOfBirth
              : this.utilityHelper.convertDateWith(passenger.dateOfBirth, DATE_FORMAT.DATE))
          : ''
      }));

    for (let key in this.form.value) {
      this.form.controls[key].markAsTouched({
        onlySelf: true
      });
    }
  };

  // fn on select title
  onSelectTitle = (title: string = ''): any => {

    if (!!title) {
      let index = this.vocatives.indexOf(title);
      if (index !== -1) {
        return this.vocatives[index];
      }
    }

    return this.vocatives[0];
  };

  // fn detect disable apply
  onDetectDisable = () => {
    return this.form.invalid || this.passportForm.invalid || !this.title;
  };
}
