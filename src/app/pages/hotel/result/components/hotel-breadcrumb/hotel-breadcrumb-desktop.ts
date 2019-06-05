import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-breadcrumb',
  templateUrl: './hotel-breadcrumb-desktop.html',
  styleUrls: ['./hotel-breadcrumb-desktop.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelBreadcrumbDesktopComponent {

  @Input('params') params: any = null;
  @Input('step') step ?: string = '';
  @Input('hotel') hotel ?: any = {};

  constructor() { }

  ngOnInit() {
  }


}



