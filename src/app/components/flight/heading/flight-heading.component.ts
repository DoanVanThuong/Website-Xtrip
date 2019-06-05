import {Component, Input} from '@angular/core';
import {AppPage} from '../../../app.base';

@Component({
  selector: 'flight-heading',
  templateUrl: './flight-heading.component.html'
})
export class FlightHeading extends AppPage {

  @Input('options') options: any = {};

  constructor() {
    super();
  }
}