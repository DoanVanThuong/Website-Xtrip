import {Component, ViewEncapsulation, Input} from '@angular/core';
import {RequestSupportMobileComponent} from '../../../request-support/mobile/request-support-mobile.component';

@Component({
  selector: 'app-request-ticket-desktop',
  templateUrl: './request-ticket.component.html',
  styleUrls: ['./request-ticket.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RequestTicketComponent extends RequestSupportMobileComponent {

  @Input('title') title: string = '';
  @Input() showTypes ?:boolean = false;

  //select type
  onSelectType(type) {
    this.type.setValue(type);
  }

}
