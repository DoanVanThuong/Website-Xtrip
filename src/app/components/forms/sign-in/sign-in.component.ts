import {Component, EventEmitter, Output} from '@angular/core';
import {AppForm} from '../../../app.form';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthRepo, EmailValidator, Security, StorageService} from '../../../common/index';
import {GlobalState} from '../../../global.state';
import {ToastrService} from 'ngx-toastr';
import {EVENT, CPATTERN} from '../../../app.constants';

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in.component.html'
})
export class SignInFormComponent extends AppForm {

  @Output('callback') callback: EventEmitter<any> = new EventEmitter<any>();
  @Output('forgot') forgot: EventEmitter<any> = new EventEmitter<any>();

  username: AbstractControl;
  password: AbstractControl;

  form: FormGroup;

  timeout: any = null;

  isPassword: boolean = true;
  error: any = {
    username: false
  };

  constructor(private _fb: FormBuilder,
              private _toastr: ToastrService,
              private _state: GlobalState,
              private _security: Security) {
    super();
  }


  ngOnInit() {
    this.ngFormInit();

  }

  ngFormInit() {

    this.form = this._fb.group({
      username: ['', Validators.compose([
        Validators.required,
        this.isProduction ? EmailValidator.validate : null
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];

    // detect username or phone changes
    this.form.get('username').valueChanges.subscribe((username) => {

      clearTimeout(this.timeout);

      if (!username) {
        this.error.username = false;
      }

      this.timeout = setTimeout(() => {
        if (username.length && !this.isProduction) {
          if (_.isNaN(Number(username))) {//case là text
            let regexEmail = CPATTERN.EMAIL_REGEX;
            if (!regexEmail.test(username.toLowerCase())) {
              this.username.setErrors({'isNotEmail': true});
            }
          } else {//case là số điện thoại
            let regexPhone = CPATTERN.PHONE_REGEX;
            if (!regexPhone.test(username.toLowerCase())) {
              this.username.setErrors({'isNotPhone': true});
            }
          }
        }
      }, 500);
    });

  }

  // fn on sign in
  onSignIn = (params) => {

    return this._security
      .signIn(params.username, params.password)
      .then(
        (res: any) => {

          if (this._security.isLoggedIn()) {
            this.onRequestProfile();
          }

          this.onCallback();
        },
        (errors: Array<any>) => {
          this.handleError(errors);
        });
  };

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


  // fn callback after signed in
  onCallback() {
    this.callback.emit(true);
  }

  // fn open forgot password
  openForgotPassword = () => {
    this.forgot.emit(true);
  };

  // fn handle error message
  handleError = (errors: Array<any>) => {
    let message: string = 'Đã có lỗi xãy ra khi đăng nhập';

    if (errors.length) {
      message = errors[0].value;
    }

    this._toastr.error(message, 'Lỗi', {
      positionClass: 'toast-top-right'
    });
  };
}