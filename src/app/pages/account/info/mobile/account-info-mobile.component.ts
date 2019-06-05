import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthRepo, PhoneNumberValidator, RequiredWithValidator, Spinner} from '../../../../common/index';
import {Security} from '../../../../common/security';
import {User, Error} from '../../../../common/entities';
import {AppForm} from '../../../../app.form';
import {ToastrService} from 'ngx-toastr';
import {ChangePasswordPopup} from '../../../../components/popup';

@Component({
  selector: 'app-account-info-mobile',
  templateUrl: './account-info-mobile.component.html',
  styleUrls: ['./account-info-mobile.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class AccountInfoMobileComponent extends AppForm {

  @ViewChild(ChangePasswordPopup) confirmChangePasswordPopup: ChangePasswordPopup;

  form: FormGroup;
  FirstName: AbstractControl;
  LastName: AbstractControl;
  PhoneNumber: AbstractControl;
  CurrentPassword: AbstractControl;
  NewPassword: AbstractControl;

  profile: User = new User();
  isPassword: boolean = false;
  isLocalUser: boolean = false;

  constructor(private _fb: FormBuilder,
              protected _router: Router,
              protected _security: Security,
              protected _authRepo: AuthRepo,
              protected _toastr: ToastrService,
              protected _spinner: Spinner) {

    super();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    if (this._security.isAuthenticated()) {
      this.profile = this._security.getCurrentUser();

      this.onFormInit();
    } else {
      this._router.navigate(['/authentication']);
    }
  }

  ngOnDestroy() {
    if (!this._security.isAuthenticated() && !this.isClickedPopup) {
      this._router.navigate(['/']);
    }
  }

  // fn form init
  onFormInit = () => {

    this.form = this._fb.group({
      FirstName: [this.profile.firstName, Validators.compose([
        Validators.required
      ])],
      LastName: [this.profile.lastName, Validators.compose([
        Validators.required
      ])],
      PhoneNumber: [this.profile.phone, Validators.compose([
        Validators.required,
        PhoneNumberValidator.validate
      ])],
      CurrentPassword: [, Validators.compose([
        RequiredWithValidator.validate(this.isPassword),
        Validators.minLength(6)
      ])],
      NewPassword: [, Validators.compose([
        RequiredWithValidator.validate(this.isPassword),
        Validators.minLength(6)
      ])],
    });

    this.FirstName = this.form.controls.FirstName;
    this.LastName = this.form.controls.LastName;
    this.PhoneNumber = this.form.controls.PhoneNumber;
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
      .updateProfile(params)
      .then(
        (res: any) => {
          if (this.isPassword) {
            this.confirmChangePasswordPopup.show({
              backdrop: 'static'
            });

            this.isPassword = false;
            this.resetFormWithFeilds(this.form, ['NewPassword', 'CurrentPassword']);

            // reset token
            this._security.removeToken();

          } else {

            this.getProfile(() => {
              this._toastr.success('Cập nhật thành công');
            });
          }

          this._spinner.hide();
        },
        (errors: any) => {
          this.handleError(errors);
          this._spinner.hide();

        }
      );

  };

  // fn get profile
  getProfile = (callback: any = {}) => {
    return this._authRepo
      .auth()
      .then(
        (res: any) => {

          if (typeof callback === 'function') {
            this._security.setCurrentUser(new User(res));
            callback();
          }
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

    this._router.navigate(['/authentication'], {
      queryParams: {
        url: '/'
      }
    });
  };

  // fn handle error message
  handleError = (errors: Array<any>) => {
    let message: string = 'Đã có lỗi xãy ra khi cập nhật thông tin tài khoản';

    if (errors.length) {
      message = errors[0].value;
    }

    this._toastr.error(message, 'Lỗi');
  };


}
