import {Component, Input, ViewChild} from '@angular/core';
import {AppBase} from 'app/app.base';
import {FullScreenMap} from 'app/components/popup';

declare var require: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [`
    .map-wrapper {
      overflow: hidden;
    }
  `]
})
export class MapComponent extends AppBase {
  @ViewChild(FullScreenMap) fullMap: FullScreenMap;
  @Input() data: any;
  @Input() height: number = 130;
  mapStyles = require('./../../../../assets/maps/map-style.json');

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  openFullMap() {
    this.fullMap.show();
  }
}
