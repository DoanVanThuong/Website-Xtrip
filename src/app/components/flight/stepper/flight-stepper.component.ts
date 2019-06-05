import { Component, Input } from '@angular/core';
import { AppPage } from '../../../app.base';

@Component({
  selector: 'flight-steps',
  templateUrl: './flight-stepper.component.html'
})

export class FlightStepperComponent extends AppPage {

  @Input('step') step: number = 0;

  constructor() {
    super();
  }
}