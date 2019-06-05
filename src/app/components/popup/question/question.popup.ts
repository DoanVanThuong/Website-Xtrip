import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../popup.base';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator, GlobalRepo, PhoneNumberValidator, Security} from '../../../common';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {User} from '../../../common/entities';

@Component({
  selector: 'question-popup',
  templateUrl: './question.popup.html',
  styleUrls: ['./question.popup.less'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionPopup extends PopupBase {

  @Input('type') type: string = '';
  @Input('target') target: string = '';
  @Input('description') description: string = 'Hãy để lại câu hỏi của bạn, chúng tôi sẽ giải đáp mọi thắc mắc để bạn an tâm hơn.';

  @Output('submit') submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  fullName: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  content: AbstractControl;

  profile: User = new User();

  isLoggedIn: boolean = false;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _security: Security,
              private _globalRepo: GlobalRepo,
              private _toastr: ToastrService,
              private _location: Location) {
    super();
  }


  ngOnInit() {

    if (this._security.isAuthenticated()) {
      this.isLoggedIn = this._security.isAuthenticated();
      this.profile = this._security.getCurrentUser();
    }

    this.onFormInit();

    this.onInit = this.onFormInit;
  }

  ngOnChanges() {
    this.onFormInit();
  };

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
      Content: ['', Validators.compose([
        Validators.required
      ])],
    });

    this.fullName = this.form.controls.FullName;
    this.email = this.form.controls.Email;
    this.phone = this.form.controls.Phone;
    this.content = this.form.controls.Content;
  };

  // fn on submit
  onSubmit = (params) => {
    this.submit.emit(params);
  };

  /*onSubmit2 = (params) => {
    params = Object.assign({Type: this.type}, params);

      return
        this._globalRepo
          .postSupportTicket(params)
          .then(
            (res: any) => {
              this._toastr.success('Cảm ơn bạn đã gửi câu hỏi. Xtrip sẽ phản hồi đến bạn trong thời gian sớm nhất.', 'Yêu cầu hỗ trợ');
              this.hide();
            },
            (errors: any) => {
              this._toastr.error('Đã có lỗi xãy ra khi gửi yêu cầu chỗ trợ', 'Yêu cầu hỗ trợ');
            }
          );
    };*/
}