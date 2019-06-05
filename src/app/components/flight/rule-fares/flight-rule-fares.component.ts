import { Component, Input } from '@angular/core';
import { AppPage } from '../../../app.base';
import { Flight } from '../../../common/entities';

@Component({
  selector: 'flight-rule-fare-item',
  templateUrl: './flight-rule-fares.component.html',
  styleUrls: ['./rule-fares.less']
})
export class FlightRuleFareItemComponent extends AppPage {

  @Input('flight') flight: Flight;

  rules: Array<any> = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.handleRulefare();
  }

  handleRulefare = () => {
    for (let i in this.flight) {
      for (let j in this.flight[i].ruleFares) {
        if (!this.utilityHelper.checkInListWith(this.flight[i].ruleFares[j], this.rules, 'carrier')) {
          this.rules.push(this.flight[i].ruleFares[j]);
        }
      }
    }
  }

}