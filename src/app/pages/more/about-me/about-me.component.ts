import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {AppPage} from '../../../app.base';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'more-about-me',
  templateUrl: './about-me.component.html'
})
export class AboutMeComponent extends AppPage {

  isVMTravel: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platfrmID: string) {
    super();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platfrmID)) {
      this.isVMTravel = this.utilityHelper.isVietmapTravel();
    }
  }
}
