import { Component, Input } from '@angular/core';
import { AppPage } from '../../../app.base';

@Component({
  selector: 'flight-stop',
  templateUrl: './stop-label.component.html'
})

export class FlightStop extends AppPage {

  @Input() stop: number = 0;
  @Input() duration: string = '';
  @Input() isStop: boolean = true;
  @Input() lock: boolean = true;

  constructor() {
    super();
  }
}