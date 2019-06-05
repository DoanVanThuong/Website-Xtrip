import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Passenger} from '../../../common/entities/passenger.entity';
import {AppForm} from '../../../app.form';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalRepo} from '../../../common/repos';
import {StorageService} from '../../../common/services';
import {CSTORAGE} from '../../../app.constants';
import * as moment from 'moment';

@Component({
  selector: 'passenger-identity',
  templateUrl: './passenger-identity.component.html',
  styleUrls: ['./passenger-identity.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerIdentityComponent extends AppForm {

  @Input('passenger') passenger: Passenger = new Passenger();
  @Output('identityChange') identityChange: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  identityCard: AbstractControl;
  identityCardCountry: AbstractControl;
  identityCardDate: AbstractControl;

  isShow: boolean = false;
  countries: Array<string> = [];
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  scrollerOptions: any = {
    theme: 'mobiscroll',
    lang: 'vi',
    display: 'center',
    rows: 3,
    wheels: [
      [{
        circular: false,
        data: [],
        label: 'Chọn quốc gia'
      }]
    ],
    buttons: [
      {
        text: 'Hủy',
        handler: 'cancel',
        cssClass: 'btn btn-cancel-outline'
      },
      {}, //
      {
        text: 'Đồng ý',
        handler: 'set',
        cssClass: 'btn btn-main'
      },
    ],
    cssClass: 'mbsc-custom',
    showLabel: true,
    minWidth: 250,
    maxWidth: 320,
    formatValue: (data) => {
      return data[0];
    }
  };

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _globalRepo: GlobalRepo,
              private _storage: StorageService) {
    super();
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

  ngOnDestroy() {

  }

  // fn form init
  onFormInit = () => {

    this.form = this._fb.group({
      identityCard: [this.passenger.identityCard, Validators.compose([])],
      identityCardCountry: [this.passenger.identityCardCountry, Validators.compose([])],
      identityCardDate: [!!this.passenger.identityCardDate ? moment(this.passenger.identityCardDate).format('DD/MM/YYYY') : '', Validators.compose([])],
    });

    this.identityCard = this.form.controls.identityCard;
    this.identityCardCountry = this.form.controls.identityCardCountry;
    this.identityCardDate = this.form.controls.identityCardDate;

    this.onChange(this.form);

    // detect form changes
    this.form.valueChanges.subscribe((form) => {
      let now = moment();

      if (form.identityCard) {
        this.identityCard.setErrors((form.identityCard.length < 9 || form.identityCard.length > 12) ? {length: true} : null);
      }

      if (form.identityCardDate) {
        // date must less than now

        let valid = this.utilityHelper.validDateFormatWith(form.identityCardDate);
        let date = moment(form.identityCardDate, 'DD/MM/YYYY');
        this.identityCardDate.setErrors((!valid || now.diff(date) < 0) ? {date: true} : null);
      }

      if (form.identityCardExpiry) {
        // expiry date must greater than now

        let valid = this.utilityHelper.validDateFormatWith(form.identityCardExpiry);
        let date = moment(form.identityCardExpiry, 'DD/MM/YYYY');
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
    this.identityChange.emit(form);
  };
}