import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthRepo, Error, RequiredWithValidator, Spinner} from '../../../../../common/index';
import {Security} from '../../../../../common/security';
import {User} from '../../../../../common/entities';
import {AppForm} from '../../../../../app.form';
import {ToastrService} from 'ngx-toastr';
import {ChangePasswordPopup} from '../../../../../components/popup';
import {GlobalState} from '../../../../../global.state';
import {EVENT} from '../../../../../app.constants';

@Component({
  selector: 'account-info-box',
  templateUrl: './account-info-box.component.html',
  styleUrls: ['./account-info-box.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class AccountInfoBoxComponent extends AppForm {

  @ViewChild(ChangePasswordPopup) confirmChangePasswordPopup: ChangePasswordPopup;

  form: FormGroup;
  CurrentPassword: AbstractControl;
  NewPassword: AbstractControl;

  profile: User = new User();

  isPassword: boolean = false;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _state: GlobalState,
              private _security: Security,
              private _authRepo: AuthRepo,
              private _toastr: ToastrService,
              private _spinner: Spinner) {

    super();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    if (this._security.isAuthenticated()) {
      this.profile = this._security.getCurrentUser();
      this.onFormInit();
    }
  }

  ngOnDestroy() {

    if (!this._security.isAuthenticated() && !this.isClickedPopup) {

      this._router.navigate(['/'], {
        queryParams: {
          type: 'login'
        }
      });
    }
  }

  // fn form init
  onFormInit = () => {

    this.form = this._fb.group({
      CurrentPassword: ['', Validators.compose([
        RequiredWithValidator.validate(this.isPassword),
        Validators.minLength(6)
      ])],
      NewPassword: ['', Validators.compose([
        RequiredWithValidator.validate(this.isPassword),
        Validators.minLength(6)
      ])],
    });

    this.CurrentPassword = this.form.controls.CurrentPassword;
    this.NewPassword = this.form.controls.NewPassword;

    this.form.valueChanges.subscribe((form) => {

      // need review
      if ((!!form.NewPassword && form.NewPassword.length >= 6)
        && (!!form.CurrentPassword && form.CurrentPassword.length >= 6)) {
        this.NewPassword.setErrors(form.CurrentPassword === form.NewPassword ? {equalPassword: true} : null);
      }
    });
  };

  // fn on submit
  onSubmit = (params: any = {}) => {

    this._spinner.show('Đang cập nhật...');

    return this._authRepo
      .changePassword(params)
      .then(
        (res: any) => {

          this._spinner.hide();

          this.confirmChangePasswordPopup.show({
            backdrop: 'static'
          });

          this.isPassword = false;
          this.resetFormWithFeilds(this.form, ['NewPassword', 'CurrentPassword']);

          this._security.removeToken();
          this._state.notifyTo(EVENT.LOGGED_OUT, true);
        },
        (errors: Error[] = []) => {
          this._spinner.hide();

          let message: string = 'Đã có lỗi xãy ra khi cập nhật thông tin tài khoản';

          if (errors.length) {
            message = errors[0].value;
          }

          this._toastr.error(message, 'Lỗi', {
            positionClass: 'toast-top-right'
          });

        }
      );

  };

  // fn detect change password
  detectChangePassword = () => {

    let cPassword = this.form.get('CurrentPassword');
    let nPassword = this.form.get('NewPassword');

    if (this.isPassword
      && (this.utilityHelper.isNullOrUndefined(cPassword.value)
        || this.utilityHelper.isNullOrUndefined(nPassword.value))) {
      return false;
    }

    return true;
  };

  // fn detect disable
  detectDisableButton = () => {
    return this.form.valid && this.detectChangePassword();
  };

  // redirect to login page
  isClickedPopup: boolean = false;
  redirectTo = () => {
    // mini hack
    this.isClickedPopup = true;
    this._router.navigate(['/'], {
      queryParams: {
        type: 'login',
        url: this._router.url
      }
    });
  };
}
