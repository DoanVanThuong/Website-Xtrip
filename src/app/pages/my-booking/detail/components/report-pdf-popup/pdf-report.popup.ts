import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../../../../components/popup';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmailValidator} from '../../../../../common/validators';
import {Security} from '../../../../../common/security';
import {Error, User} from '../../../../../common/entities';
import {BookingRepo} from '../../../../../common/repos';
import {ToastrService} from 'ngx-toastr';
import {DeviceService} from '../../../../../common/services';

@Component({
  selector: 'booking-pdf-report-popup',
  templateUrl: './pdf-report.popup.html',
  styleUrls: ['./pdf-report.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingPdfReportPopup extends PopupBase {

  @Input() code: string = null;
  @Input() module: string = null;
  @Input() heading: string = '';
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  email: AbstractControl;

  profile: User = new User();

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _security: Security,
              private _booking: BookingRepo,
              private _toastr: ToastrService,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);

  }

  onInit = (): void => {
    this.ngFormInit();
  };

  ngOnInit() {


    if (this._security.isAuthenticated()) {
      this.profile = this._security.getCurrentUser();
    }

    this.ngFormInit();
  }

  ngFormInit = () => {
    this.form = this._fb.group({
      email: [this.profile.email || '', Validators.compose([
        Validators.required,
        EmailValidator.validate
      ])]
    });

    this.email = this.form.controls.email;
  };

  // submit review
  onSubmit = (params: any) => {

    if (!!this.module) {

      return this._booking
        .sendTicket(this.module, Object.assign({}, params, {
          orderCode: this.code
        }))
        .then(
          (res: any) => {
            this._toastr.success('Vé đã được gửi vào hộp thư của bạn.', null, {
              positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
            });

            this.hide();
            this.resetForm(this.form);

          }, (errors: Error[] = []) => {

            let message = 'Đã có lỗi xãy ra. Vui lòng thử lại';

            if (!!errors.length) {
              message = errors[0].errorMessage;
            }

            this._toastr.error(message, null, {
              positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
            });
          }
        );
    }
  };

}
