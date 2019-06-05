import {Component, EventEmitter, Output} from '@angular/core';
import {AppForm} from '../../../app.form';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthRepo, EmailValidator, EqualPasswordsValidator, Security, StorageService, PhoneNumberValidator} from '../../../common/index';
import {GlobalState} from '../../../global.state';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EVENT} from '../../../app.constants';

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up.component.html'
})
export class SignUpFormComponent extends AppForm {

  @Output('callback') callback: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  email: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  //confirmPassword: AbstractControl;

  isPassword: boolean = true;
  isConfirmPassword: boolean = true;

  timeout: any = null;
  error: any = {
    email: false,
    phone: false,
    password: false,
    //confirmPassword: false
  };

  constructor(private _fb: FormBuilder,
              private _state: GlobalState,
              private _security: Security,
              private _authRepo: AuthRepo,
              private _toastr: ToastrService) {
    super();
  }


  ngOnInit() {
    this.ngFormInit();
  }

  ngFormInit() {

    this.form = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,
        EmailValidator.validate
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        PhoneNumberValidator.validate
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      // confirmPassword: ['', Validators.compose([
      //   // need review
      //   //EqualPasswordsValidator.bind(this)
      // ])]
    });

    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.password = this.form.controls['password'];
    //this.confirmPassword = this.form.controls['confirmPassword'];

    // detect email changes
    this.form.get('email').valueChanges.subscribe((email: string) => {

      clearTimeout(this.timeout);

      if (!email) {
        this.error.email = false;
      }

      this.timeout = setTimeout(() => {
        if (email.length) {
          return this._authRepo
            .checkEmail(email)
            .then(
              (res: any) => {
                this.error.email = 'Email đã tồn tại';
              },
              (errors: Array<any>) => {
                this.error.email = false;
              }
            );
        }
      }, 500);
    });

    // detect phone number changes
    this.form.get('phone').valueChanges.subscribe((phone: string) => {

      clearTimeout(this.timeout);

      if (!phone) {
        this.error.phone = false;
      }

      this.timeout = setTimeout(() => {
        if (phone.length) {
          return this._authRepo
            .checkPhone(phone)
            .then(
              (res: any) => {
                if(res.status) {
                  this.phone.setErrors({'existingPhone': true});
                }
              },
              (errors: Array<any>) => {
                this.error.phone = false;
              }
            );
        }
      }, 500);
    });

  }

  // fn on request profile info
  onRequestProfile() {
    this._security
      .requestCurrentUser()
      .then(
        (res: any) => {
          if (this._security.isAuthenticated()) {
            this._state.notifyTo(EVENT.LOGGED_IN, true);
            this._state.notifyDataChanged(EVENT.USER_REQUESTED, res);
          }
        }
      );
  }

  // fn on sign in
  onSubmit = (params) => {

    return this._security
      .signUp(params)
      .then(
        (res: any) => {
          if (this._security.isLoggedIn()) {
            this.onRequestProfile();
            this.onCallback();
          }
        },
        (errors: any) => {

          this.handleError(errors);
        }
      );
  };

  // fn on detect disable sign up
  onDisabled = () => {
    return this.form.invalid || !!this.error.email || !!this.error.phone;
  };

  // fn callback after signed in
  onCallback() {
    this.callback.emit(false);
  }

  // fn handle error message
  handleError = (errors: Array<any>) => {
    let message: string = 'Đã có lỗi xãy ra khi đăng ký tài khoản mới';

    if (errors.length) {
      message = errors[0].value;
    }

    this._toastr.error(message, 'Lỗi', {
      positionClass: 'toast-top-right'
    });
  };
}