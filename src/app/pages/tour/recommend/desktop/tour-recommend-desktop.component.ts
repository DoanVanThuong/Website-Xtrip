import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {TourRecommendMobileComponent} from "../mobile/tour-recommend-mobile.component";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-tour-recommend-desktop',
  templateUrl: './tour-recommend-desktop.component.html',
  styleUrls: ['./tour-recommend-desktop.component.less',],
  encapsulation: ViewEncapsulation.None
})

export class TourRecommendDesktopComponent extends TourRecommendMobileComponent {

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event) {

    if (isPlatformBrowser(this.platformID)) {
      const width = window.innerWidth;

      if (width < 768) {
        this.itemsPerRow = 1;
      } else if (width < 992) {
        this.itemsPerRow = 2;
      } else if (width < 1200) {
        this.itemsPerRow = 3;
      } else {
        this.itemsPerRow = 4;
      }
    }
  }

}
