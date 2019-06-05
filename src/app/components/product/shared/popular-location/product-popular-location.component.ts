import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';

import { AppBase } from 'app/app.base';
import { ProductRepo, Destination } from 'app/common';

import { DeviceService } from '../../../../common';

@Component({
  selector: 'app-product-popular-location',
  templateUrl: './product-popular-location.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProductPopularLocationComponent extends AppBase {

  @Input('title') title: string = '';
  @Input('type') type: string = '';

  itemsPerRow: number = 4;
  destinations: Array<Destination> = [];

  constructor(
    private _productRepo: ProductRepo,
    private _device: DeviceService
  ) { super (); this.setDeviceMode(this._device); }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event) {

    const width = window.innerWidth;
    if (width < 576) {
      this.itemsPerRow = 1;
    } else if (width < 768) {
      this.itemsPerRow = 2;
    } else if (width < 992) {
      this.itemsPerRow = 3;
    } else {
      this.itemsPerRow = 4;
    }
  }

  ngOnInit(): void {
    this.getPopularDestinations(this.type);
  }

  // fn get popular location
  getPopularDestinations = (type: string): Promise<any> => {
    
    return this._productRepo
      .getPopularDestinations(type)
      .then(
        (res: any) => {
          this.destinations = (res.data || []).map((destination: any) => new Destination(destination));
        });
  };

}
