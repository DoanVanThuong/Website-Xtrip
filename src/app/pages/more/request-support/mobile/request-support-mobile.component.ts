import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AppForm} from '../../../../app.form';
import {User} from '../../../../common/entities';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Security, GlobalRepo, PhoneNumberValidator, EmailValidator} from '../../../../common/index';
import {SuccessRequestPopup} from '../../../more/desktop/components/success-request-popup/success-request-popup.component';
import {MODULE, EVENT} from "../../../../app.constants";
import { DeviceService } from '../../../../common';
import { GlobalState } from 'app/global.state';


const SCROLLER_THEME = 'mobiscroll';
const MOBISCROLLER_BUTTON: any = [
  {text: 'Hủy', handler: 'cancel', cssClass: 'btn btn-cancel-outline mn-w-90'},//Cancel Button
  {}, //Clear Button (not using in this)
  {text: 'Đồng ý', handler: 'set', cssClass: 'btn btn-main mn-w-90'} //Accept Button
];
const MOBISCROLLER_BUTTON_DESKTOP: any = [
  {text: 'Đồng ý', handler: 'set', cssClass: 'btn btn-main-v2 font-medium p-10 w-200'} //Accept Button
];

@Component({
  selector: 'app-request-support-mobile',
  templateUrl: './request-support-mobile.component.html',
  styleUrls: ['./request-support-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RequestSupportMobileComponent extends AppForm {

  @ViewChild(SuccessRequestPopup) successRequestPopup: SuccessRequestPopup;

  form: FormGroup;

  fullName: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  type: AbstractControl;
  content: AbstractControl;

  profile: User = new User();

  types: Array<string> = [];

  isLoggedIn: boolean = false;

  params: any = {};

  scrollerOptions: any = {
    theme: SCROLLER_THEME,
    lang: 'vi',
    display: 'center',
    rows: 3,
    wheels: [
      [{
        circular: false,
        data: [],
        label: 'Loại hỗ trợ'
      }]
    ],
    buttons: MOBISCROLLER_BUTTON,
    showLabel: true,
    minWidth: 90,
    cssClass: 'md-daterange',
    formatValue: (data) => {
      return data[0];
    }
  };

  scrollerOptionsDesktop: any = {
    theme: SCROLLER_THEME,
    lang: 'vi',
    display: 'bubble',
    rows: 5,
    wheels: [
      [{
        circular: false,
        data: [],
        label: ''
      }]
    ],
    buttons: MOBISCROLLER_BUTTON_DESKTOP,
    showLabel: true,
    minWidth: 140,
    cssClass: 'md-daterange',
    formatValue: (data) => {
      return data[0];
    }
  };

  constructor(private _fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private _router: Router,
              private _security: Security,
              protected _state: GlobalState,
              private _globalRepo: GlobalRepo,
              private _toastr: ToastrService,
              private _device: DeviceService,
              private _location: Location) {
    super();
    this.setDeviceMode(this._device);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      if (this._security.isAuthenticated()) {
        this.isLoggedIn = this._security.isAuthenticated();
        this.profile = this._security.getCurrentUser();
      }
      this.onFormInit();
      this.onLoadSupportTypes();
    });
    this._state.subscribe(EVENT.LOGGED_IN, () => {
      if (this._security.isAuthenticated()) {
        this.isLoggedIn = this._security.isAuthenticated();
        this.profile = this._security.getCurrentUser();
        this.onFormInit();
      }
    });
  }

  ngAfterViewInit() {

  }

  // fn form init
  onFormInit = () => {
    this.form = this._fb.group({
      FullName: [this.profile.fullName || '', Validators.compose([
        Validators.required
      ])],
      Email: [this.profile.email || '', Validators.compose([
        Validators.required,
        EmailValidator.validate
      ])],
      Phone: [this.profile.phone || '', Validators.compose([
        PhoneNumberValidator.existNumber
      ])],
      Type: ['', Validators.compose([
        Validators.required
      ])],
      Content: ['', Validators.compose([
        Validators.required
      ])],
    });

    this.fullName = this.form.controls.FullName;
    this.email = this.form.controls.Email;
    this.phone = this.form.controls.Phone;
    this.type = this.form.controls.Type;
    this.content = this.form.controls.Content;

  };

  // fn on load support ticket types
  onLoadSupportTypes = () => {
    return this._globalRepo
      .getSupportTickets()
      .then(
        (res: any) => {
          this.types = res.map(type => type.name);

          if (this.isDesktop) {
            this.scrollerOptionsDesktop.wheels[0][0].data = this.types;
          }
          else {
            this.scrollerOptions.wheels[0][0].data = this.types;
          }

          this.type.setValue(this.types[0]);
        },
        (errors: any) => {
          this.types = [];
        }
      );
  };

  //do not show choose type when go to from my booking
  isShowWith = () => {

    let types = [];
    for (let key of MODULE) {
      types.push(MODULE[key]);
    }

    if (types.indexOf(this.params.type) !== -1) {
      return false;
    }
    return true;
  };

  // fn on submit
  onSubmit = (params) => {
    //case my booking: check module and fill data

    let types = [];
    for (let key of MODULE) {
      types.push(MODULE[key]);
    }

    if (types.indexOf(this.params.type) !== -1) {

      switch (this.params.type) {
        case MODULE.FLIGHT: {
          params.Type = 'Vé máy bay';
          break;
        }
        case MODULE.HOTEL: {
          params.Type = 'Vé máy bay';
          break;
        }
        case MODULE.FLIGHT: {
          params.Type = 'Khách sạn';
          break;
        }
        case MODULE.TOUR: {
          params.Type = 'Tour';
          break;
        }
        case MODULE.PRODUCT: {
          params.Type = 'Vui chơi & tham quan';
          break;
        }
      }
    } else {
      params = Object.assign({Type: this.type}, params);
    }
    if(!!this.params.code) {
      return this._globalRepo
      .postSupportTicketMyBooking(this.params.type, this.params.code, _.omit(params, 'Type'))
      .then(
        (res: any) => {
          if (this.isMobile) {
            this._toastr.success('Cảm ơn bạn đã gửi câu hỏi. Xtrip sẽ phản hồi đến bạn trong thời gian sớm nhất.', 'Yêu cầu hỗ trợ');
            this._location.back();
          }
          else {
            this.successRequestPopup.show();
            if (this.isLoggedIn) {
              this.content.setValue('');
            }
            else {
              this.fullName.clearValidators();
              this.fullName.setValue('');

              this.email.clearValidators();
              this.email.setValue('');

              this.phone.setValue('');
              this.content.setValue('');
            }
          }
        },
        (errors: any) => {
          this._toastr.error('Đã có lỗi xãy ra khi gửi yêu cầu chỗ trợ', 'Yêu cầu hỗ trợ');
        }
      );
    }
    else {
      return this._globalRepo
      .postSupportTicket(Object.assign({}, _.omit(params, 'Type')))
      .then(
        (res: any) => {
          if (this.isMobile) {
            this._toastr.success('Cảm ơn bạn đã gửi câu hỏi. Xtrip sẽ phản hồi đến bạn trong thời gian sớm nhất.', 'Yêu cầu hỗ trợ');
            this._location.back();
          }
          else {
            this.successRequestPopup.show();
            if (this.isLoggedIn) {
              this.content.setValue('');
            }
            else {
              this.fullName.clearValidators();
              this.fullName.setValue('');

              this.email.clearValidators();
              this.email.setValue('');

              this.phone.setValue('');
              this.content.setValue('');
            }
          }
        },
        (errors: any) => {
          this._toastr.error('Đã có lỗi xãy ra khi gửi yêu cầu chỗ trợ', 'Yêu cầu hỗ trợ');
        }
      );
      
    }
    

  };

  showType = () => {
    return true;
  }
}


