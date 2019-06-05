import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../popup/popup.base';
import {Hotel} from "../../../common/entities";

declare var require: any

@Component({
  selector: 'app-hotel-mapview-popup',
  templateUrl: './hotel-mapview-popup.html',
  styleUrls: ['./hotel-mapview-popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelMapViewPopup extends PopupBase {

  @Input() hotel: Hotel = new Hotel();

  lat: number = 51.678418;
  lng: number = 7.809007;
  mapStyles = require('../../../../assets/maps/map-style.json');

  constructor() {
    super();
  }

  // on initial
  ngOnInit() {
  }

  ngOnChanges() {
  }
}
