import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {Security, User, AuthRepo, PhoneNumberValidator, EmailValidator, DeviceService} from '../../../common';
import {AppBase} from '../../../app.base';
import {GlobalState} from '../../../global.state';
import {CVOCATIVE, EVENT} from '../../../app.constants';

@Component({
  selector: 'contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: [
    './contact-info.component.less',
    './../booking.less'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ContactInfoComponent extends AppBase {

  @Input() heading: string = 'Thông tin liên hệ';
  @Input() class: string = '';
  @Input() version: number = 1;
  @Input() data: any = {
    FirstName: '',
    LastName: '',
    MobileNumber: '',
    Email: ''
  };
  @Input('invalid') isInvalid: boolean = false;

  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  lastName: AbstractControl;
  firstName: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;

  profile: User = new User();
  vocatives: string[] = CVOCATIVE.ADULT;
  title: string = this.vocatives[0];

  isEdit: boolean = false;
  isLoggedIn: boolean = false;

  constructor(protected fb: FormBuilder,
              private _state: GlobalState,
              protected _device: DeviceService,
              protected _security: Security) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {

    //get profile if logged in
    if (this._security.isAuthenticated()) {
      this.isLoggedIn = this._security.isAuthenticated();
      this.profile = this._security.getCurrentUser();

      this.isEdit = !this.onDetectFullProfileInfo();
    }

    this._state.subscribe(EVENT.LOGGED_IN, () => {
      if (this._security.isAuthenticated()) {
        this.isLoggedIn = this._security.isAuthenticated();
        this.profile = this._security.getCurrentUser();

        this.isEdit = !this.onDetectFullProfileInfo();
      }

      this.ngFormInit();
    });

    this.ngFormInit();
  }

  //init form
  ngFormInit = () => {
    this.form = this.fb.group({
      title: [this.title, Validators.compose([])],
      LastName: [this.data.LastName || this.profile.lastName, Validators.compose([Validators.required])],
      FirstName: [this.data.FirstName || this.profile.firstName, Validators.compose([Validators.required])],
      MobileNumber: [this.data.MobileNumber || this.profile.phone, Validators.compose([
        Validators.required,
        PhoneNumberValidator.validate
      ])],
      Email: [this.data.Email || this.profile.email, Validators.compose([
        Validators.required,
        EmailValidator.validate
      ])]
    });

    this.firstName = this.form.controls.FirstName;
    this.lastName = this.form.controls.LastName;
    this.email = this.form.controls.Email;
    this.phone = this.form.controls.MobileNumber;

    this.form.valueChanges.subscribe((form) => {
      this.onChanges(this.form);
    });

    this.onChanges(this.form);
  };

  // fn on select vocative
  onSelectVocative = (string: any): void => {
    this.title = string;
    this.form.controls.title.setValue(this.title);
    this.onChanges(this.form);
  };

  // fn on detect profile information
  onDetectFullProfileInfo = (): boolean => {
    return !!this.profile.firstName && !!this.profile.lastName && !!this.profile.email && !!this.profile.phone;
  };

  // fn on submit - changes
  onChanges = (form: any): void => {
    this.changes.emit(form);
  };
}
