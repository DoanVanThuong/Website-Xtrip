import {Component, Inject, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../popup.base';
import {isPlatformBrowser, Location} from '@angular/common';

@Component({
  selector: 'app-intro-popup',
  templateUrl: './intro.popup.html',
  styleUrls: ['./intro.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class IntroPopup extends PopupBase {

  constructor(private _location: Location,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId) && this.utilityHelper.isVietmapTravel(window.location.href)) {
      this.show();
    }
  }
}
