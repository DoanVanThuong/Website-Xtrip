import {Component, Inject, Input, PLATFORM_ID, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {Router} from '@angular/router';
import {AboutMePopup, QrCodePopup} from '../../../components/popup';
import {HttpClient} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import {GlobalRepo} from "../../../common/repos";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../../common/validators";
import {ToastrService} from "ngx-toastr";
import {Error} from "../../../common/entities";

@Component({
  selector: 'app-footer-desktop',
  templateUrl: './desktop-footer.component.html',
  styleUrls: ['../footer.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class FooterDesktopComponent extends AppPage {

  @ViewChild(AboutMePopup) aboutMePopup: AboutMePopup;
  @ViewChild(QrCodePopup) qrCodePopup: QrCodePopup;

  isVMTravel: boolean = false;
  payments: Array<any> = [];

  form: FormGroup;
  email: AbstractControl;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _http: HttpClient,
              private _globalRepo: GlobalRepo,
              private _toastr: ToastrService,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngOnInit() {
    this.onLoadServices();
    if (isPlatformBrowser(this.platformId)) {
      this.isVMTravel = this.utilityHelper.isVietmapTravel();
    }
    this.ngFormInit();
  }

  // fn form init
  ngFormInit = (): void => {
    this.form = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,
        EmailValidator.validate
      ])]
    });

    this.email = this.form.controls['email'];
  };

  // fn load service
  onLoadServices = () => {
    this._http.get('assets/json/service.json')
      .subscribe((data: any) => {
        this.payments = data;
      });
  };

  // fn open qr code popup
  openQRCodePopup = () => {
    this.qrCodePopup.show();
  };

  onSubmitNewsletter = (data: any = {}): Promise<any> => {

    this.form.reset();

    return this._globalRepo
      .subscribeNewsletter(data.email)
      .then(
        (res: any) => {
          this.form.reset();
          this._toastr.success('Bạn vừa đăng ký nhận thông tin thành công tại Xtrip.', 'Thông báo', {
            positionClass: 'toast-top-right'
          });
        },
        (errors: Error[] = []) => {
          let errorMessage = 'Đã có lỗi xãy ra. Vui lòng thử lại sau ít phút.';

          if (errors.length) {
            errorMessage = errors[0].errorMessage;
          }
          this._toastr.error(errorMessage, 'Lỗi', {
            positionClass: 'toast-top-right'
          });
        }
      )
  }
}
