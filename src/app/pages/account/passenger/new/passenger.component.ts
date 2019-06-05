import {Component, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {DeviceService, PassengerRepo, StorageService} from '../../../../common/index';
import {Passenger} from '../../../../common/entities/passenger.entity';
import {CPATTERN, CSTORAGE, CVOCATIVE} from '../../../../app.constants';
import {Location} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppForm} from '../../../../app.form';

@Component({
  selector: 'app-passenger-new',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerNewComponent extends AppForm {

  mask: any = CPATTERN.DATE_MASK;

  form: FormGroup;
  identityForm: FormGroup;
  passportForm: FormGroup;

  firstname: AbstractControl;
  lastname: AbstractControl;
  dateOfBirth: AbstractControl;


  isUpdate: boolean = false;
  passenger: Passenger = new Passenger();

  vocatives: Array<string> = CVOCATIVE.ADULT.concat(CVOCATIVE.CHILD);
  title: string = null;

  constructor(private _fb: FormBuilder,
              private _location: Location,
              private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _passengerRepo: PassengerRepo,
              private _storage: StorageService,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngAfterViewInit() {

  }

  ngOnInit() {

    this._activateRoute.params.subscribe(params => {
      if (params.id) {

        let passenger = this._storage.getItem(CSTORAGE.PASSENGER);
        if (!!passenger) {

          this.isUpdate = true;
          this.passenger = new Passenger(passenger);

          // set title
          const index = this.vocatives.findIndex(title => title === this.utilityHelper.getPassengerTitle(this.passenger.title, this.passenger.type));
          if (index !== -1) {
            this.title = this.vocatives[index];
          }
          else {
            this.title = passenger.title;
          }
        }
      }

      this.onFormInit();
    });

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

    this.form.valueChanges.subscribe((form) => {
      let now = moment();

      if (form.dateOfBirth) {

        // date of birth must less than now
        let valid = this.utilityHelper.validDateFormatWith(form.dateOfBirth);
        let date = moment(form.dateOfBirth, 'DD/MM/YYYY');

        this.dateOfBirth.setErrors((!valid || now.diff(date) < 0) ? {date: true} : null);
      }
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
          if (res.code.toLowerCase() === 'success') {
            this._location.back();
          } else {
          }
        }
      );
  };

  // fn on create passenger
  onUpdate = (params: any) => {
    return this._passengerRepo
      .update(this.passenger.id, params)
      .then(
        (res: any) => {
          if (res.code.toLowerCase() === 'success') {
            this._location.back();
          } else {
          }
        }
      );
  };

  // fn detect disable button
  detectDisableButton = () => {
    return this.form.invalid || this.identityForm.invalid || this.passportForm.invalid || !this.title;
  };
}
