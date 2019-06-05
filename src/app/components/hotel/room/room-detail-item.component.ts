import {Component, EventEmitter, Input, Output, ViewEncapsulation, ViewChild, forwardRef} from '@angular/core';
import * as _ from 'lodash';
import {AppBase} from '../../../app.base';
import {Room} from '../../../common/entities';
import { Router } from '@angular/router';

@Component({
  selector: 'room-detail-item',
  templateUrl: './room-detail-item.component.html',
  styleUrls: ['./room-detail-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RoomDetailItemComponent extends AppBase {

  @Input() param: any = {};
  @Input() room: Room = new Room();
  @Input() night: number = 0;
  @Output('booking') bookHotel: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _router: Router
  ) {
    super();
  }

  // fn active go booking hotel
  onBookingHotel() {
    this.bookHotel.emit();
  }

  onClickMoreService = (room: Room): void => {
    let queryParams = Object.assign({}, this.param, {selectedValue: room.selectedValue})
    this._router.navigate([`hotel/${this.param.code}/room-detail`], {queryParams: queryParams})
  };
}