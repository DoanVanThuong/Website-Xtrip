import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {DeviceService, GlobalRepo, PassportExpiryValidator, StorageService} from '../../../common';
import {CAPP, CPATTERN, CSTORAGE, DATE_FORMAT, MOBISCROLL_CONFIG} from '../../../app.constants';
import {AppBase} from '../../../app.base';
import {Passenger} from '../../../common/entities/passenger.entity';
import * as moment from 'moment';
import {BsDatepickerConfig, defineLocale, BsLocaleService} from 'ngx-bootstrap';
import {viLocale} from '../../../../assets/localize/vi';

defineLocale('vi', viLocale);

@Component({
  selector: 'booking-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PassportComponent extends AppBase {

  @Input() passenger: Passenger = new Passenger();
  @Input() delay: number = 0; // default is 0ms
  @Input('invalid') isInvalid: boolean = false; // default is 0ms
  @Output() passportChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  passportNumber: AbstractControl;
  passportCountry: AbstractControl;
  passportExpiry: AbstractControl;
  national: AbstractControl;

  countries: Array<string> = [];
  mask = CPATTERN.DATE_MASK;
  scrollerOptions: any = Object.assign({}, MOBISCROLL_CONFIG, {
    wheels: [
      [{
        circular: false,
        data: [],
        label: 'Chọn quốc gia'
      }]
    ],
    minWidth: 250,
    maxWidth: 320,
    formatValue: (data) => {
      return data[0];
    }
  });

  timeout: any = null;

  locale = 'vi';

  datePickerOptions: Partial<BsDatepickerConfig> = {
    minDate: new Date(),
    containerClass: 'theme-orange theme-custom',
    dateInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false
  };

  constructor(private _fb: FormBuilder,
              private _globalRepo: GlobalRepo,
              private _localeService: BsLocaleService,
              private _storage: StorageService,
              private _device: DeviceService) {
    super();
    this._localeService.use(this.locale);
    this.setDeviceMode(_device);
  }

  ngOnInit(): void {
    this.onFormInit();
    this.getCountries();
  }

  ngOnChanges(): void {

    this.onFormInit();

    /*
    if (!!this.form && !!this.passenger.id) {
      this.form
        .patchValue(Object.assign({}, this.passenger, {
          passportExpiry: !!this.passenger.passportExpiry ? (
              this.utilityHelper.isDateWith(this.passenger.passportExpiry, DATE_FORMAT.DATE)
                ? this.passenger.passportExpiry
                : this.utilityHelper.convertDateWith(this.passenger.passportExpiry, DATE_FORMAT.DATE))
            : '',
          passportCountry: this.passenger.passportCountry || this.countries.length ? this.countries[0] : '',
          national: this.passenger.national || this.countries.length ? this.countries[0] : ''
        }));

      for (let key in this.form.value) {
        this.form.controls[key].markAsTouched({
          onlySelf: true
        });
      }
    }*/
  };

  // fn form init
  onFormInit = () => {

    this.form = this._fb.group({
      passportNumber: [this.passenger.passportNumber, Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(20)
      ])],
      passportCountry: [this.passenger.passportCountry || this.countries.length ? this.countries[0] : '', Validators.compose([
        Validators.required
      ])],
      passportExpiry: [!!this.passenger.passportExpiry ? (
          this.utilityHelper.isDateWith(this.passenger.passportExpiry, DATE_FORMAT.DATE)
            ? this.passenger.passportExpiry
            : this.utilityHelper.convertDateWith(this.passenger.passportExpiry, DATE_FORMAT.DATE))
        : '', Validators.compose([
        Validators.required,
        PassportExpiryValidator.validate
      ])],
      national: [this.passenger.national || this.countries.length ? this.countries[0] : '', Validators.compose([
        Validators.required
      ])],
    });

    this.passportNumber = this.form.controls.passportNumber;
    this.passportCountry = this.form.controls.passportCountry;
    this.national = this.form.controls.national;
    this.passportExpiry = this.form.controls.passportExpiry;

    this.form
      .valueChanges
      .subscribe((form) => {

        // detect validate
        /*if (!this.utilityHelper.isNullOrUndefined(form.passportExpiry)) {
          if (typeof form.passportExpiry !== 'string') {
            form.passportExpiry = moment(form.passportExpiry).format(CAPP.DATE_FORMAT);
          }

          let now = moment();
          const valid = this.utilityHelper.validDateFormatWith(form.passportExpiry, CAPP.DATE_FORMAT);
          const date = moment(form.passportExpiry, CAPP.DATE_FORMAT);

          // expiry date must greater than now
          if (!valid || now.diff(date) > 0) {
            this.passportExpiry.setErrors({date: true});
          } else if (Math.abs(now.diff(date, 'months', true)) < 6) {
            // passport is less than now least 6months
            this.passportExpiry.setErrors({less: true});
          } else {
            this.passportExpiry.setErrors(null);
          }
        }*/

        /// ============================ on changes ===============================
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.onChange(this.form);
        }, Number(this.delay) || 0);
      });

    this.onChange(this.form);
  };

  // fn get country
  getCountries = () => {

    let countries = this._storage.getItem(CSTORAGE.COUNTRIES) || [];

    if (!countries.length) {
      return this._globalRepo.getCountries()
        .then(
          (res: any) => {
            this.countries = res.map(country => country.name);
            this._storage.setItem(CSTORAGE.COUNTRIES, this.countries);

            this.scrollerOptions.wheels[0][0].data = this.countries;
          }
        );
    } else {
      this.countries = countries;
      this.scrollerOptions.wheels[0][0].data = this.countries;

      this.passportCountry.setValue(this.countries[0]);
      this.national.setValue(this.countries[0]);
    }
  };

  // fn on change
  onChange = (form: any) => {

    this.passportChange.emit(form);
    this.changes.emit(form);
  };

  // fn on select date for desktop
  onSelectDate = ($event: any) => {
    // this.passportExpiry.setValue(moment($event).format(CAPP.DATE_FORMAT));
  };

}
