import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppForm} from '../../../app.form';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Security, EmailValidator, EqualPasswordsValidator, AuthRepo, PhoneNumberValidator} from '../../../common/index';
import {Location} from '@angular/common';
import {GlobalState} from '../../../global.state';
import {EVENT} from '../../../app.constants';

@Component({
  selector: 'authentication-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../index/index.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent extends AppForm {

  form: FormGroup;
  email: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  //confirmPassword: AbstractControl;

  redirectTo: string = '';
  isPassword: boolean = true;
  isConfirmPassword: boolean = true;

  timeout: any = null;
  error: any = {
    email: false,
    phone: false,
    password: false,
    // confirmPassword: false
  };

  constructor(private _fb: FormBuilder,
              private _state: GlobalState,
              private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _toastr: ToastrService,
              private _authRepo: AuthRepo,
              private _security: Security,
              private _location: Location) {
    super();
  }

  ngOnInit(): void {

    this._activateRoute.queryParams.subscribe((params) => {
      this.redirectTo = params.url;
    });

    this.ngFormInit();
  }

  ngAfterViewInit(): void {
  }

  // fn form initial
  ngFormInit = () => {
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
        Validators.minLength(6),
      ])],
      //confirmPassword: ['', Validators.compose([])]
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
                if(res.status) {
                  this.email.setErrors({'existingEmail': true});
                }
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

  };

  // fn go back previous page
  goBack() {
    this._location.back();
  }

  // fn on submit
  onSubmit = (params: any = {}) => {
    return this._security
      .signUp(params)
      .then(
        (res: any) => {
          if (this._security.isLoggedIn()) {
            this.onRequestProfile();
          }
        },
        (errors: Array<any>) => {
          this.handleError(errors);
        });
  };

  // fn on detect disable
  onDisable = () => {
    return this.form.invalid || !!this.error.email || !!this.error.phone;
  };

  // fn on request account
  onRequestProfile() {
    this._security
      .requestCurrentUser()
      .then(
        (res: any) => {
          if (this._security.isAuthenticated()) {
            this._state.notifyTo(EVENT.LOGGED_IN, true);
            this._state.notifyDataChanged(EVENT.USER_REQUESTED, res);

            if (!!this.redirectTo && this.redirectTo !== '/') {
              this._router.navigate([`${this.redirectTo}`]);
            } else {
              this._router.navigate(['/account/fill-info']);
            }
          }
        }
      );
  };

  // fn handle error message
  handleError = (errors: Array<any>) => {
    let message: string = 'Đã có lỗi xãy ra khi đăng ký tài khoản mới';

    if (errors.length) {
      message = errors[0].value;
    }

    this._toastr.error(message, 'Lỗi');
  };
}
