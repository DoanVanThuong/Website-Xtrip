import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-booking-empty-screen',
  template: `
    <div *ngIf="isShow" class="container-booked-empty-screen">
      <div class="container-data-empty-screen">
        <div class="text-center img">
          <img [src]=" image || 'assets/images/booked-tour-empty.png'"/>
        </div>
        <div class="text-center title">
          <strong>{{ title || 'Ban không đặt thông tin nào ở đây'}}</strong>
        </div>
        <div class="text-center description">
          {{ description || 'Khám quá thêm thông tin bổ biến' }}
        </div>
        <div class="text-center m-t-10" *ngIf="!!retry">
          <button (click)="onRetry()"
                  class="btn btn-retry btn-main">
            Bắt đầu tìm kiếm
          </button>
        </div>
      </div>
    </div>
  `
})
export class BookingTourEmptyScreen {

  @Input('show') isShow: boolean = false;
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Input('image') image: string = '';

  @Output() retry: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  // fn retry
  onRetry = () => {
    this.retry.emit();
  };
}