import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-hotel-sort-desktop',
  templateUrl: './hotel-sort-desktop.html',
  styleUrls: ['./hotel-sort-desktop.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelSortDesktopComponent {

  @Input('nights') nights: number = null;
  @Input('params') params: any = {};
  @Input('data') data: any = {};

  @Output('submit') submit: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
  }

  onSelectSort(e) {
    this.submit.emit(e);
  }

}



