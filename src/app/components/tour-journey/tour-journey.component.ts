import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../app.base';
import {TourJourney, DeviceService} from '../../common';

import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';


@Component({
  selector: 'tour-journey',
  templateUrl: './tour-journey.component.html',
  styleUrls: ['./tour-journey.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourJourneyDesktopComponent extends AppBase {

  @Input() journey: Partial<TourJourney> = null;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  newUI: boolean = false;

  constructor(private _device: DeviceService, private _scrollToService: ScrollToService) {
    super();
    this.setDeviceMode(this._device);
  }

  ngOnChanges() {
    if (!!this.journey.details.length) {
      this.journey.details = this.journey.details.map((item: any) => {
        return {
          idx: item.idx,
          name: item.name,
          items: item.items,
          title: item.title,
          options: item.options,
          isShow: false
        };
      });

      if (!_.isNull(this.journey.details[0].options)) {
        this.newUI = true;
      }
    }
  }

  showDetail(index ?: number) {
    this.submit.emit(index);
  };

  //scroll to title after collapse journey
  triggerScrollTo = (index: string = '') => {
    setTimeout(() => {
      const config: ScrollToConfigOptions = {
        target: 'id'+index,
        offset: (window.innerHeight + 70)
      };
      this._scrollToService.scrollTo(config);
    }, 10);
    
  }

}

