import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { AppBase } from 'app/app.base';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.less']
})
export class SocialLinkComponent extends AppBase {

  showSocial: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    super();
  }

  onClickOutSide() {
    if(this.showSocial) {
      this.showSocial = false;
    } else {
      return;
    }
    
  }

}
