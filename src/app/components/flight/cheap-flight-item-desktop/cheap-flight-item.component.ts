import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from '../../../app.base';
import {CheapFlight} from '../../../common/entities';

@Component({
  selector: 'cheap-flight-item-desktop',
  templateUrl: './cheap-flight-item.component.html',
  styleUrls: ['cheap-flight-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CheapFlightItemDesktopComponent extends AppPage {

  @Input() flight: CheapFlight = new CheapFlight();

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _router: Router) {
    super();
  }

  onSelect = ($event: any): void => {
    this.select.emit($event);
  };
}