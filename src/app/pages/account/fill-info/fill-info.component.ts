import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthRepo, PhoneNumberValidator, RequiredWithValidator, StorageService} from '../../../common/index';
import {Location} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Security} from '../../../common/security';
import {User} from '../../../common/entities';
import {AppForm} from '../../../app.form';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account-info',
  templateUrl: './fill-info.component.html',
  styleUrls: [
    './fill-info.component.less',
    './../info/mobile/account-info-mobile.component.less'
  ],
  encapsulation: ViewEncapsulation.None

})
export class AccountFillInfoComponent extends AppForm {

  form: FormGroup;
  FirstName: AbstractControl;
  LastName: AbstractControl;
  // PhoneNumber: AbstractControl;

  profile: User = new User();

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _security: Security,
              private _authRepo: AuthRepo,
              private _location: Location,
              private _toastr: ToastrService) {
    super();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {

    if (this.isDesktop) {
      this._router.navigate(['/account/information']);
      return;
    }

    if (this._security.isAuthenticated()) {
      this.profile = this._security.getCurrentUser();
      this.onFormInit();

    } else {
      this._router.navigate(['/authentication']);
      return;
    }
  }

  // fn form init
  onFormInit = () => {

    this.form = this._fb.group({
      FirstName: [this.profile.firstName, Validators.compose([])],
      LastName: [this.profile.lastName, Validators.compose([])],
      // PhoneNumber: [this.profile.phone, Validators.compose([
      //   PhoneNumberValidator.existNumber
      // ])]
    });

    this.FirstName = this.form.controls.FirstName;
    this.LastName = this.form.controls.LastName;
    // this.PhoneNumber = this.form.controls.PhoneNumber;
  };

  // fn on submit
  onSubmit = (params: any = {}) => {
    return this._authRepo
      .updateProfile(params)
      .then(
        (res: any) => {
          if (res.code.toLowerCase() === 'success') {
            this.getProfile(() => {
              this._toastr.success('Cập nhật thành công');
              this._router.navigate(['/account']);
            });
          }
        },
        (errors: any) => {
          this.handleError(errors);
        }
      );
  };

  // fn get profile
  getProfile = (callback: any) => {
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

  // fn detext data info
  detectDataInfo = () => {

    if (this.utilityHelper.isNullOrUndefined(this.FirstName.value)
      && this.utilityHelper.isNullOrUndefined(this.LastName.value)
      // && this.utilityHelper.isNullOrUndefined((this.PhoneNumber.value))
      ) {
      return false;
    }

    return true;
  };

  // fn detect disable
  detectDisableButton = () => {
    return this.form.valid && this.detectDataInfo();
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
