import {Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {PRODUCT_TYPE, TOUR_TYPE} from '../../../../../app.constants';
import {ProductRepo, TourRepo} from '../../../../../common/repos/index';
import {Destination, ProductSearch, TourArrival, TourSearch} from '../../../../../common/entities/index';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-top-header',
  templateUrl: 'top-header.component.html',
  styleUrls: ['top-header.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('showAnimate', [
      state('show', style({
        overflow: 'hidden',
        height: '*'
      })),
      state('hide', style({
        opacity: 0,
        overflow: 'hidden',
        height: 0,
        padding: 0
      })),
      transition('show <=> hide', animate('400ms ease-in-out'))
    ])
  ]
})
export class TopHeaderComponent extends AppPage {

  isDownloadShow: boolean = false;

  constructor() {
    super();
  }
}
