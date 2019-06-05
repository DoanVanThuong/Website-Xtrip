import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Tour, TourSearch} from 'app/common';
import {AppBase} from '../../../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'tour-item-desktop',
  templateUrl: './tour-item-desktop.component.html',
  styleUrls: ['./tour-item-desktop.component.less'],
  encapsulation: ViewEncapsulation.None,

})
export class TourItemDesktopComponent extends AppBase {

  @Input() tour: Tour;
  params: any = {};
  tourSearch: TourSearch = new TourSearch();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: any) => {
      this.params = params;

      this.tourSearch = new TourSearch(this.tourSearch.getKeys(params));
    });
  };

  // fn gen query params
  generateQueryParams = (tour: Tour): any => {

    return this.utilityHelper.buildQueryParams(Object.assign({}, {
      from: this.params.from || '',
      to: this.params.to || ''
    }));
  };

}
