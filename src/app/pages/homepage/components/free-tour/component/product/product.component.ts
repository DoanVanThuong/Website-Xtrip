import {Component, HostListener, Inject, Input, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {AppPage} from "../../../../../../app.base";
import {FreeTourActivityItem, Hotel} from "../../../../../../common/entities";
import {DeviceService} from "../../../../../../common/services";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'home-product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeProductComponent extends AppPage {

  @Input() products: FreeTourActivityItem[] = [];
  @Input() heading: string = '';
  @Input() description: string = '';
  @Input() checkIn: string = '';
  @Input() checkOut: string = '';
  @Input() params: any = {};

  constructor(protected _device: DeviceService,
              @Inject(PLATFORM_ID) private _platformID: string) {
    super();
    this.setDeviceMode(_device);
  }

  ngOnChanges(): void {
    if (!!this.products.length) {
      this.products = this.products.map(product => {
        if (!(product instanceof FreeTourActivityItem)) {
          return new FreeTourActivityItem(product);
        }

        return product;
      })
    }
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event) {

    if (isPlatformBrowser(this._platformID)) {
      const width = $(window).innerWidth();

      if (width < 992) {
        this.itemsPerRow = 2;
      } else if (width < 1200) {
        this.itemsPerRow = 3;
      } else {
        this.itemsPerRow = 4;
      }
    }
  }

  // generate query params
  generateQueryParams = (activity: FreeTourActivityItem = null): any => {
    return this.utilityHelper.buildQueryParams(Object.assign({}, {
      destination: this.params.destinationCode,
      type: this.params.destinationType
    }, {
      name: activity ? activity.name : this.params.destinationName
    }));
  }
}
