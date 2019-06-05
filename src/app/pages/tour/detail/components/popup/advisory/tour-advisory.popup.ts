import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PopupBase} from '../../../../../../components/popup';
import {Router} from '@angular/router';
import {EmailValidator, PhoneNumberValidator} from '../../../../../../common/validators';
import {Error, Tour, User} from '../../../../../../common/entities';
import {DeviceService} from '../../../../../../common/services';
import {Security} from '../../../../../../common/security';
import {TourRepo} from '../../../../../../common/repos';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'tour-advisory-popup',
  templateUrl: './tour-advisory.popup.html',
  styleUrls: ['./tour-advisory.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourAdvisoryPopup extends PopupBase {

  @Input() tour: Tour = new Tour();

  profile: User = new User();

  code: string = null;
  form: FormGroup;

  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  content: AbstractControl;

  constructor(private _router: Router,
              protected fb: FormBuilder,
              private _security: Security,
              private _tourRepo: TourRepo,
              private _toastr: ToastrService,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
    this.onInit = this.ngInit;
  }

  ngInit = (): void => {
    this.ngFormInit();
  };

  ngOnInit() {
    if (this._security.isAuthenticated()) {
      this.profile = this._security.getCurrentUser();
    }

    this.ngFormInit();
  }

  //init form
  ngFormInit = () => {
    this.form = this.fb.group({
      FullName: [this.profile.name || '', Validators.compose([Validators.required])],
      Email: [this.profile.email || '', Validators.compose([
        Validators.required,
        EmailValidator.validate
      ])],
      Phone: [this.profile.phone || '', Validators.compose([
        Validators.required,
        PhoneNumberValidator.validate
      ])],
      Content: ['', Validators.compose([
        Validators.required,
      ])],
    });

    this.name = this.form.controls.FullName;
    this.email = this.form.controls.Email;
    this.phone = this.form.controls.Phone;
    this.content = this.form.controls.Content;
  };

  //submit form
  onSubmit = (data: any): Promise<any> => {

    return this._tourRepo
      .sendAdviceTour(this.tour.code, data)
      .then(
        (res: any) => {
          this.hide();
          this._toastr.success('Yêu cầu tư vấn của bạn đã được tiếp nhận, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!', ' ', {
            positionClass: this.isDesktop ? 'toast-top-right' : 'toast-bottom-full-width'
          });
        },
        (errors: Error[] = []) => {
          let message = 'Đã có lỗi xãy ra. Vui lòng thử lại';

          if (!!errors.length) {
            message = errors[0].errorMessage;
          }

          this._toastr.error(message, null, {
            positionClass: this.isDesktop ? 'toast-top-right' : 'toast-bottom-full-width'
          });
        }
      );
  };
}
