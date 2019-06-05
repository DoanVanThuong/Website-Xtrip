import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppPage} from '../../app.base';

@Component({
  selector: 'app-notification',
  template: `
    <app-seo></app-seo>
    <router-outlet>
      <!--<app-spinner></app-spinner>-->
    </router-outlet>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class NotificationComponent extends AppPage {

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {

  }
}