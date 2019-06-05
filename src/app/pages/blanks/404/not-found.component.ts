import {Component, Inject, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from '../../../app.base';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-404',
  templateUrl: 'not-found.component.html',
  styleUrls: ['not-found.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class NotFoundComponent extends AppPage {

  isVMTravel: boolean = false;

  constructor(private _router: Router,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.isVMTravel = this.utilityHelper.isVietmapTravel();
    }

  }
}