import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthRepo, PhoneNumberValidator, Spinner} from '../../../../../common/index';
import {Security} from '../../../../../common/security';
import {User} from '../../../../../common/entities';
import {AppForm} from '../../../../../app.form';
import {ToastrService} from 'ngx-toastr';
import {GlobalState} from '../../../../../global.state';

@Component({
  selector: 'personal-info-box',
  templateUrl: './personal-info-box.component.html',
  styleUrls: ['./personal-info-box.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class PersonalInfoBoxComponent extends AppForm {

  form: FormGroup;
  FirstName: AbstractControl;
  LastName: AbstractControl;
  PhoneNumber: AbstractControl;

  profile: User = new User();

  constructor(private _fb: FormBuilder,
              protected _router: Router,
              private _state: GlobalState,
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
    }
  }

  ngOnDestroy() {

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
    });

    this.FirstName = this.form.controls.FirstName;
    this.LastName = this.form.controls.LastName;
    this.PhoneNumber = this.form.controls.PhoneNumber;
  };


  // fn on submit
  onSubmit = (params: any = {}) => {

    this._spinner.show('Đang cập nhật...');

    return this._authRepo
      .updateProfile(params)
      .then(
        (res: any) => {
          this._spinner.hide();
          this.getProfile(() => {
            this._toastr.success('Cập nhật thông tin thành công', '', {
              positionClass: 'toast-top-right'
            });
          });
        },
        (errors: any) => {
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

  // fn get profile
  getProfile = (callback: any = {}) => {
    return this._authRepo
      .auth()
      .then(
        (res: any) => {

          this._spinner.hide();

          if (typeof callback === 'function') {
            this._security.setCurrentUser(new User(res));
            this._state.notifyDataChanged('profile:updated', this._security.getCurrentUser());
            callback();
          }
        }
      );
  };
}
