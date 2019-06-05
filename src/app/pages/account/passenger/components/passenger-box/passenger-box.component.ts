import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {AuthRepo, PassengerRepo, StorageService} from '../../../../../common/index';
import {Passenger} from '../../../../../common/entities/passenger.entity';
import {CAPP, CVOCATIVE} from '../../../../../app.constants';
import {Location} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppForm} from '../../../../../app.form';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap';

@Component({
  selector: 'passenger-box',
  templateUrl: './passenger-box.component.html',
  styleUrls: ['./passenger-box.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class PassengerBoxComponent extends AppForm {

  @Input() passenger: Passenger = new Passenger();
  @Input('invalid') isInvalid: boolean = false;

  @Output() create: EventEmitter<any> = new EventEmitter<any>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  identityForm: FormGroup;
  passportForm: FormGroup;

  firstname: AbstractControl;
  lastname: AbstractControl;
  dateOfBirth: AbstractControl;

  datePickerOptions: Partial<BsDatepickerConfig> = {
    showWeekNumbers: false,
    maxDate: new Date(),
    containerClass: 'theme-orange theme-custom',
    dateInputFormat: 'DD/MM/YYYY'
  };

  isUpdate: boolean = false;

  vocatives: Array<string> = CVOCATIVE.ADULT.concat(CVOCATIVE.CHILD);
  title: string = this.vocatives[0];

  constructor(private _fb: FormBuilder,
              private _location: Location,
              private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _authRepo: AuthRepo,
              private _passengerRepo: PassengerRepo,
              private _storage: StorageService,
              private localService: BsLocaleService) {
    super();
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
    if (!this.utilityHelper.isNullOrUndefined(this.passenger)
      && !this.utilityHelper.isNullOrUndefined(this.passenger.id)) {

      this.isUpdate = true;

      // set title
      const index = this.vocatives.findIndex(title => title === this.utilityHelper.getPassengerTitle(this.passenger.title, this.passenger.type));
      if (index !== -1) {
        this.title = this.vocatives[index];
      }
      else {
        this.title = this.passenger.title;
      }

      this.onFormInit();
    }
  }

  ngOnInit() {
    this.onFormInit();
  }

  // fn form init
  onFormInit = () => {

    this.identityForm = this._fb.group({});
    this.passportForm = this._fb.group({});

    this.form = this._fb.group({
      firstname: [this.passenger.firstName, Validators.compose([
        Validators.required
      ])],
      lastname: [this.passenger.lastName, Validators.compose([
        Validators.required
      ])],
      dateOfBirth: [!!this.passenger.dateOfBirth ? moment(this.passenger.dateOfBirth).format('DD/MM/YYYY') : '', Validators.compose([
        Validators.required
      ])],
    });

    this.firstname = this.form.controls.firstname;
    this.lastname = this.form.controls.lastname;
    this.dateOfBirth = this.form.controls.dateOfBirth;

    this.dateOfBirth.valueChanges.subscribe((value) => {
      if (this.utilityHelper.isNullOrUndefined(value)) {
        return;
      }

      if (typeof value !== 'string') {
        value = moment(value).format(CAPP.DATE_FORMAT);
      }

      let now = moment();

      // date of birth must less than now
      let valid = this.utilityHelper.validDateFormatWith(value);
      let date = moment(value, 'DD/MM/YYYY');

      this.dateOfBirth.setErrors((!valid || now.diff(date) < 0) ? {date: true} : null);
    });

  };

  // fn on select vocative
  onSelectVocative = (vocative: string) => {
    this.title = vocative;
  };

  // fn identity update
  onIdentityChange = (form: any) => {
    this.identityForm = form;
  };

  // fn identity update
  onPassportChange = (form: any) => {
    this.passportForm = form;
  };

  // fn on submit
  onSubmit = (params: any = {}) => {

    params = Object.assign(params, this.identityForm.value, this.passportForm.value, {title: this.title});

    params.dateOfBirth = !!params.dateOfBirth ? moment(params.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
    params.identityCardDate = !!params.identityCardDate ? moment(params.identityCardDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
    params.identityCardExpiry = !!params.identityCardExpiry ? moment(params.identityCardExpiry, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
    params.passportExpiry = !!params.passportExpiry ? moment(params.passportExpiry, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';

    if (this.isUpdate) {
      this.onUpdate(params);
    } else {
      this.onCreate(params);
    }
  };

  // fn on create passenger
  onCreate = (params: any) => {

    return this._passengerRepo
      .create(params)
      .then(
        (res: any) => {
          this._location.back();
        }
      );
  };

  // fn on create passenger
  onUpdate = (params: any) => {
    return this._passengerRepo
      .update(this.passenger.id, params)
      .then(
        (res: any) => {
          this.update.emit(this.passenger);
        }
      );
  };

  // fn cancel
  onCancel = (): void => {
    this.cancel.emit();
  };

  // fn detect disable button
  detectDisableButton = () => {
    return this.form.invalid || this.identityForm.invalid || this.passportForm.invalid || !this.title;
  };
}
