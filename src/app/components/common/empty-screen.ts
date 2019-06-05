import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-empty-screen',
  template: `
    <div *ngIf="isShow" class="container-empty-screen">
      <div class="container-data-empty-screen">
        <div class="row">
          <div class="container-fluid text-center">
            <div class="">
              <img class="mx-w-200" cdn-src="assets/images/empty-screen.png" alt="image"/>
            </div>
            <div class=" m-t-20">
              <strong>{{ heading }}</strong>
            </div>
            <div class="text-center">
              {{ description}}
            </div>
            <div class="m-t-10" *ngIf="isRetry">
              <button (click)="onRetry()" class="btn btn-main">{{ retryLabel || 'Thử lại'}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EmptyScreen {

  @Input('show') isShow: boolean = false;
  @Input('heading') heading: string = 'Không có dữ liệu';
  @Input('description') description: string = 'Bạn nên quay lại & thử tìm nhập từ khoá khác';
  @Input('retryLabel') retryLabel: string = '';
  @Input('isRetry') isRetry: boolean = true;
  @Output('retry') retry: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  // fn retry
  onRetry = () => {
    this.retry.emit();
  };
}
