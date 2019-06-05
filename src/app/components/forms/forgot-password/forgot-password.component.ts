import {Component, EventEmitter, Output} from "@angular/core";
import {AppForm} from "../../../app.form";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthRepo, EmailValidator, Security, StorageService} from "../../../common/index";
import {GlobalState} from "../../../global.state";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'forgot-password-form',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordFormComponent extends AppForm {

  @Output('close') close: EventEmitter<any> = new EventEmitter<any>();

  email: AbstractControl;

  form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _global: GlobalState,
              private _authRepo: AuthRepo,
              private _security: Security,
              private _toastr: ToastrService,
              private _storage: StorageService) {
    super();
  }


  ngOnInit() {
    this.ngFormInit();

  }

  ngAfterViewInit() {

  }

  ngFormInit() {

    this.form = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,
        EmailValidator.validate
      ])]
    });

    this.email = this.form.controls['email'];
  }

  // fn on sign in
  onResetPassword = (params) => {

    return this._authRepo
      .forgot(params)
      .then(
        (res: any) => {

          this._toastr.success('Mật khẩu đã gửi về email của bạn', 'Quên mật khẩu', {
            positionClass: 'toast-top-right'
          });

          this.resetForm(this.form);
        },
        (errors: any) => {
          this.handleError(errors);
        });
  };

  // fn callback after signed in
  onClose() {
    this.close.emit(false);
  }

  // fn handle error message
  handleError = (errors: Array<any>) => {
    let message: string = 'Đã có lỗi xãy ra khi yêu cầu cài đặt lại mật khẩu';

    if (errors.length) {
      message = errors[0].value;
    }

    switch (errors[0].code) {
      case 3007: {
        message = 'Địa chỉ Email không tồn tại.'
      }
    }

    this._toastr.error(message, 'Lỗi', {
      positionClass: 'toast-top-right'
    });
  }
}