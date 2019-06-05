import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Passenger} from '../../../common/entities/passenger.entity';
import {AppForm} from '../../../app.form';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalRepo} from '../../../common/repos';
import {DeviceService, StorageService} from '../../../common/services';
import {CAPP, CSTORAGE, MOBISCROLL_CONFIG} from '../../../app.constants';
import * as moment from 'moment';
import {BsDatepickerConfig} from 'ngx-bootstrap';

@Component({
  selector: 'passenger-passport',
  templateUrl: './passenger-passport.component.html',
  styleUrls: ['./passenger-passport.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerPassportComponent extends AppForm {

  @Input('passenger') passenger: Passenger = new Passenger();
  @Input('collapsed') collapsed: boolean = true;
  @Output('passportChange') passportChange: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  passportNumber: AbstractControl;
  passportCountry: AbstractControl;
  passportExpiry: AbstractControl;
  national: AbstractControl;

  isShow: boolean = false;
  country: any = null;
  countries: Array<string> = [];
  mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  scrollerOptions: any = Object.assign({}, MOBISCROLL_CONFIG, {
    minWidth: 250,
    maxWidth: 320,
    wheels: [
      [{
        data: []
      }]
    ],
    formatValue: (data) => {
      return data[0];
    }
  });

  datePickerOptions: Partial<BsDatepickerConfig> = {
    showWeekNumbers: false,
    minDate: new Date(),
    containerClass: 'theme-orange theme-custom',
    dateInputFormat: 'DD/MM/YYYY',
  };

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _globalRepo: GlobalRepo,
              private _storage: StorageService,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.onFormInit();
    this.getCountries();
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
    if (!!this.passenger) {
      this.onFormInit();
    }
  };

  // fn form init
  onFormInit = () => {

    this.form = this._fb.group({
      passportNumber: [this.passenger.passportNumber, Validators.compose([])],
      passportCountry: [this.passenger.passportCountry || '', Validators.compose([])],
      passportExpiry: [!!this.passenger.passportExpiry ? moment(this.passenger.passportExpiry).format('DD/MM/YYYY') : '', Validators.compose([])],
      national: [this.passenger.national || '', Validators.compose([])],
    });

    this.passportNumber = this.form.controls.passportNumber;
    this.passportCountry = this.form.controls.passportCountry;
    this.national = this.form.controls.national;
    this.passportExpiry = this.form.controls.passportExpiry;

    this.onChange(this.form);

    this.passportExpiry.valueChanges.subscribe((value) => {
      if (this.utilityHelper.isNullOrUndefined(value)) {
        return;
      }

      if (typeof value !== 'string') {
        value = moment(value).format(CAPP.DATE_FORMAT);
      }

      let now = moment();

      const valid = this.utilityHelper.validDateFormatWith(value);
      const date = moment(value, 'DD/MM/YYYY');

      // expiry date must greater than now
      this.passportExpiry.setErrors((!valid || now.diff(date) > 0) ? {date: true} : null);
    });

    this.form.valueChanges.subscribe((form) => {
      const now = moment();

      if (form.passportNumber) {
        this.passportNumber.setErrors((form.passportNumber.length < 7 || form.passportNumber.length > 100) ? {length: true} : null);
      }

      this.onChange(this.form);
    });
  };

  // fn get country
  getCountries = () => {

    let countries = this._storage.getItem(CSTORAGE.COUNTRIES);
    if (!countries) {
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
    }
  };

  // open form
  showForm = () => {
    this.isShow = !this.isShow;

    if (!this.isShow) {
      this.onFormInit();
    }
  };

  // fn on change
  onChange = (form: any) => {
    this.passportChange.emit(form);
  };
}
