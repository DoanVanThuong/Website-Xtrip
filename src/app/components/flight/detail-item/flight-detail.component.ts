import {Component, Input} from '@angular/core';
import {AppPage} from '../../../app.base';
import {Carrier, Flight} from '../../../common/entities';

@Component({
  selector: 'flight-detail-item',
  templateUrl: 'flight-detail.component.html'
})
export class FlightDetailItem extends AppPage {

  @Input('') flight: Flight = new Flight();
  @Input() carriers: Carrier[] = [];
  @Input('type') isRoundTrip: any;

  carrier: any = {};

  constructor() {
    super();
  }

  ngOnInit() {
    this.findCarrier(this.flight.carrier);
  }

  // fn find carrier
  findCarrier = (code: string = '') => {

    for (let i = 0; i < this.carriers.length; i++) {

      let carrier = this.carriers[i];

      if (carrier.code === code) {
        this.carrier = this.carriers[i];
        return;
      }
    }
  };

}