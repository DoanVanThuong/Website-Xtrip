import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Security} from '../../../common/security';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EqualPasswordsValidator} from '../../../common/validators';
import {ToastrService} from 'ngx-toastr';
import {AppForm} from '../../../app.form';
import {AuthRepo} from '../../../common/repos';

@Component({
  selector: 'authentication-reset-password',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.less'],

})
export class ResetPasswordComponent extends AppForm {

  form: FormGroup;
  password: AbstractControl;
  confirmPassword: AbstractControl;

  isReset: boolean = false;
  token: string = '';

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _toastr: ToastrService,
              private _activateRoute: ActivatedRoute,
              private _authRepo: AuthRepo,
              private _security: Security) {
    super();
  }

  ngOnInit() {
    this.onFormInit();

    this._activateRoute.params.subscribe((params) => {
      if (params.token) {
        // detect expire token
        this.token = params.token;
        this.onDetectToken(this.token);
        this.isReset = true;
      }
    });
  }

  ngAfterViewInit(): void {

  }

  // form initital
  onFormInit = () => {
    this.form = this._fb.group({
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])],
        confirmPassword: ['', Validators.compose([])]
      },
      {
        validator: EqualPasswordsValidator.validate
      });

    this.password = this.form.controls.password;
    this.confirmPassword = this.form.controls.confirmPassword;
  };

  // fn on detect token
  onDetectToken = (token: string = '') => {
    return this._authRepo
      .checkExpiredToken(token)
      .then(
        (res: any) => {

        },
        (errors: any) => {
          this.isReset = false;

          let message = 'Đã có lỗi xãy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.';
          if (errors.length && !!errors[0]) {
            message = 'Yêu cầu đặt lại mật khẩu đã quá hạn. Vui lòng thử lại sau.';
          }

          this._toastr.error(message, 'Đặt lại mật khẩu', {
            positionClass: this.isDesktop ? 'toastr-top-right' : 'toast-bottom-full-width'
          });
        }
      );
  };

  // fn on submit
  onSubmit = (params) => {

    return this._security
      .resetPassword(Object.assign(params, {
        ResetId: this.token
      }))
      .then(
        (res: any) => {

          let message = 'Đã thay đổi mật khẩu thành công.';

          if (this.isDesktop) {

            this._router.navigate(['/']);

            setTimeout(() => {
              this._toastr.success(message, 'Đặt lại mật khẩu', {
                positionClass: 'toast-top-right'
              });
            }, 2000);

          } else {
            this._router.navigate(['/authentication']);
            this._toastr.success(message, 'Đặt lại mật khẩu');
          }


        },
        (errors: any) => {
          this._toastr.error(errors[0].value || 'Đã có lỗi xãy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.', 'Lỗi', {
            positionClass: 'toast-top-right'
          });
        }
      );
  };

}
