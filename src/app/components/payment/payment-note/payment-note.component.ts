import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';
import {Bank, Error, Payment, Transfer} from '../../../common/entities/index';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentRepo} from '../../../common/repos/index';
import {PAYMENT_METHOD} from '../../../app.constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Spinner} from '../../../common/services/index';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'payment-note',
  templateUrl: './payment-note.component.html',
  styleUrls: ['./payment-note.component.less',],
  encapsulation: ViewEncapsulation.None
})
export class PaymentNoteComponent extends AppBase {

  @Input() time?: string;

  constructor() {
    super();
  }
}
