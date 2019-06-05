import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hotel-view-mode',
  templateUrl: './hotel-view-mode-desktop.html',
  styleUrls: ['./hotel-view-mode-desktop.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelViewModeDesktopComponent {

  @Output('submitSwitchBtn') submit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit() { }

  onSwitchBtn() {
    this.submit.emit(2);
  }


}



