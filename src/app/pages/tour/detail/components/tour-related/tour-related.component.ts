import {Component, Input, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {AppBase} from '../../../../../app.base';
import {Tour, TourSearch} from '../../../../../common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'tour-related',
  templateUrl: './tour-related.component.html',
  styleUrls: ['./tour-related.less'],
  encapsulation: ViewEncapsulation.None
})

export class TourRelatedDesktopComponent extends AppBase {

  @Input() tours: Tour[] = [];

  tourSearch: TourSearch = new TourSearch();
  carouselOptions: any = {
    items: 1,
    loop: false,
    navigation: false,
    nav: false,
    margin: 10,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    dots: false
  };

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    super();
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: any) => {
      this.tourSearch = new TourSearch(params);
    })
  };

  generateQueryParams = (): any => {
    return this.utilityHelper.buildQueryParams(Object.assign({}, this.tourSearch));
  };
}
