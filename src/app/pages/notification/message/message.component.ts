import {Component, ElementRef, HostListener, ViewEncapsulation} from '@angular/core';
import {Error, Message, MessageRepo} from '../../../common/index';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppForm} from '../../../app.form';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'messenger-detail',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent extends AppForm {

  code: string = '';
  isClosed: boolean = false;
  messages: Array<Message> = new Array<Message>();

  form: FormGroup;
  comment: AbstractControl;

  isSending: boolean = false;
  mediaPath: string = environment.API_MEDIA_URL;
  tempMessage: Message = null;

  constructor(private _fb: FormBuilder,
              private _ele: ElementRef,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _messageRepo: MessageRepo,
              private _toastr: ToastrService) {
    super();
  }

  ngOnInit() {

    this.onFormInit();

    this._activeRoute.params.subscribe((params) => {
      if (!!params) {
        this.code = params.code;

        this.getInboxDetail();
      }
    });
  }

  ngAfterViewInit() {

  }

  onFormInit = () => {
    this.form = this._fb.group({
      comment: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.comment = this.form.controls.comment;
  };

  // window event scroll to get new data
  @HostListener('window:scroll', ['$event'])
  onScroll = ($event: any) => {

    // scroll to bottom
    if ($(window).scrollTop() + $(window).innerHeight() === $(document).innerHeight()) {
      this.getInboxDetail();
    }
  };

  // fn scroll down
  onScrollDown = () => {
    return this.getInboxDetail();
  };

  // fn get messages
  getInboxDetail = () => {
    return this._messageRepo
      .getInboxDetail(this.code, this.messages.length, 10)
      .then(
        (res: any) => {

          if (res.data && res.data.status.toLowerCase() === 'closed') {
            this.isClosed = true;
          }

          this.messages = this.messages.concat(res.data.results.map(message => {

            if (!this.tempMessage && message.isCustomer) {
              this.tempMessage = new Message(message);
            }

            return new Message(message);
          }));
        }
      );
  };

  // fn submit comment-popup
  sendCommentTo = (data: any = {}) => {

    if (this.form.invalid || this.isSending || this.isClosed) {
      return;
    }

    this.isSending = false;
    return this._messageRepo
      .sendInboxComment(this.code, data)
      .then(
        (res: any) => {

          this.resetForm(this.form);

          this.tempMessage.comment = data.comment;
          this.tempMessage.createdDate = moment().format('YYYY-MM-DDTHH:mm');

          this.messages = this.messages.concat([
            new Message(this.tempMessage)
          ]);
          this.isSending = false;

          setTimeout(() => {
            this.scrollBottom();
          }, 500);
        },
        (errors: Array<Error>) => {
          this.isSending = false;
          this.handleError(errors);
        }
      );
  };

  // fn handle comment-popup
  handleComment = (comment: string = ''): string => {
    if (!!comment) {
      return comment.replace(/\n/g, '<br />');
    }

    return '';
  };

  // fn handle error
  handleError = (errors: Array<Error> = []) => {
    let message: string = 'Đã có lỗi xãy ra khi gửi comment-popup';

    if (errors.length) {
      message = errors[0].value;
    }

    this._toastr.error(message, 'Lỗi');
  };
}