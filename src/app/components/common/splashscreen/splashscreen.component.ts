import {Component,  ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SplashscreenComponent extends AppBase {

  constructor() {
    super();
  }
}
