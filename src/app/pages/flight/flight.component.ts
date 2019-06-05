import {Component} from '@angular/core';

@Component({
  selector: 'app-flight',
  template: `
    <app-seo></app-seo>
    <router-outlet>
    </router-outlet>
  `,
})
export class FlightComponent {

  constructor() {

  }

}
