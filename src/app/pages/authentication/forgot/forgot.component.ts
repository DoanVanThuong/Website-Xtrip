import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppForm} from '../../../app.form';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator, AuthRepo, Spinner} from '../../../common/index';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {GlobalState} from '../../../global.state';

@Component({
  selector: 'authentication-forgot-password',
  templateUrl: './forgot.component.html',
  styleUrls: ['./../index/index.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class ForgotPasswordComponent extends AppForm {

  form: FormGroup;
  email: AbstractControl;

  redirectTo: string = '';

  constructor(private _fb: FormBuilder,
              private _state: GlobalState,
              private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _toastr: ToastrService,
              private _spinner: Spinner,
              private _authRepo: AuthRepo,
              private _location: Location) {
    super();
  }

  ngOnInit() {
    this.ngFormInit();

    this._activateRoute.queryParams.subscribe((params) => {
      this.redirectTo = params.redirectTo;
    });
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
    });

    this.email = this.form.controls['email'];
  };

  // fn go back previous page
  goBack() {
    this._location.back();
  }

  // fn on submit
  onSubmit = (params: any = {}) => {
    this._spinner.show();

    return this._authRepo
      .forgot(params)
      .then(
        (res: any) => {
          this._toastr.success('Mật khẩu đã gửi về email của bạn', 'Quên mật khẩu');
          this.resetForm(this.form);

          this._spinner.hide();
        },
        (errors: any) => {
          this.handleError(errors);
          this._spinner.hide();
        });
  };

  handleError = (errors: Array<any>) => {
    let message: string = 'Đã có lỗi xãy ra khi yêu cầu cài đặt lại mật khẩu';

    if (errors.length) {
      message = errors[0].value;
    }

    switch (errors[0].code) {
      case 3007: {
        message = 'Địa chỉ Email không tồn tại.';
      }
    }

    this._toastr.error(message, 'Lỗi');
  };
}
