import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotelRepo } from 'app/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-hotel-history-search',
  templateUrl: './hotel-history-search.component.html',
  styleUrls: ['./hotel-history-search.component.less']
})
export class HotelHistorySearchComponent implements OnInit {

  @Input() title: string = '';
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  
  history: any = null;

  constructor(
    private _hotelRepo: HotelRepo,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSearchHistory();
  }

  getSearchHistory = () => {
    this._hotelRepo.getSearchHistory().pipe().subscribe(
      (success: any) => {
        this.history = success.data.histories;
      },
      (errors: any) => {
        this.handleErrors(errors);
      }
    )
  };

  //fn handle error
  handleErrors(error: any) {
    if (error instanceof HttpErrorResponse) {
      this._toastr.error(`${error.message}`, '', { timeOut: 3000 });
    }
    else {
      this._toastr.error(`Có lỗi xảy ra, Vui lòng kiểm tra lại`, '', { timeOut: 3000 });
    }
  };

  //on select emit location
  selectLocation(loc: any, checkin: string = '', checkout: string = '') {
    let emitData: any = loc;
    emitData['checkIn'] = checkin;
    emitData['checkOut'] = checkout;
    this.select.emit(emitData);
  }

}
