import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppForm} from '../../../app.form';
import {Security} from '../../../common/security';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../../common/validators';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {GlobalState} from '../../../global.state';
import {Spinner} from '../../../common/services';
import {EVENT, CPATTERN} from '../../../app.constants';
import {Error} from '../../../common/entities';

@Component({
  selector: 'authentication-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../index/index.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent extends AppForm {

  form: FormGroup;
  username: AbstractControl;
  password: AbstractControl;

  isPassword: boolean = true;

  timeout: any = null;

  error: any = {
    username: false
  };

  constructor(private _fb: FormBuilder,
              private _state: GlobalState,
              private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _toastr: ToastrService,
              private _spinner: Spinner,
              private _security: Security,
              private _location: Location) {
    super();
  }

  ngOnInit() {
    this.ngFormInit();
  }

  ngAfterViewInit(): void {
  }

  // fn form initial
  ngFormInit = (): void => {
    this.form = this._fb.group({
      username: ['', Validators.compose([
        Validators.required,
        this.isProduction ? EmailValidator.validate : null
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];

    // detect email or phone changes
    this.form.get('username').valueChanges.subscribe((username) => {

      clearTimeout(this.timeout);

      if (!username) {
        this.error.email = false;
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

  };

  // fn go back previous page
  goBack() {
    this._location.back();
  }

  // fn on submit
  onSubmit = (params: any = {}): Promise<any> => {

    this._spinner.show();

    return this._security
      .signIn(params.username, params.password)
      .then(
        (res: any) => {

          if (this._security.isLoggedIn()) {
            this.onRequestProfile();
          }

          this._spinner.hide();
        },
        (errors: any) => {
          this._spinner.hide();
          this.handleError(errors);
        });
  };

  // fn on request account
  onRequestProfile = (): Promise<any> => {
    return this._security
      .requestCurrentUser()
      .then(
        (res: any) => {
          if (this._security.isAuthenticated()) {

            this._state.notifyTo(EVENT.LOGGED_IN, true);
            this._state.notifyTo(EVENT.USER_REQUESTED, res);
            window.history.go(-2);
          }
        }
      );
  };

  // fn handle error message
  handleError = (errors: Error[] = []) => {
    let message: string = 'Đã có lỗi xãy ra khi đăng nhập';

    if (errors.length) {
      message = errors[0].value;
    }

    this._toastr.error(message, 'Lỗi');
  };
}
