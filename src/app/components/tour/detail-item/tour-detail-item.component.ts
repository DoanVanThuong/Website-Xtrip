import {Component, EventEmitter, Input, Output, ViewEncapsulation, Inject, PLATFORM_ID} from '@angular/core';
import {AppBase} from '../../../app.base';
import {Tour, TourSearch} from '../../../common/entities';
import {DeviceService} from '../../../common/services';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'tour-detail-item',
  templateUrl: './tour-detail-item.component.html',
  styleUrls: ['./tour-detail-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourDetailItem extends AppBase {

  @Input() tour: Tour = new Tour();
  @Input() mode?: string = ''; // list/carousel

  innerWidth: number = 0;
  tourSearch: TourSearch = new TourSearch();

  constructor(private _activatedRoute: ActivatedRoute,
              private _device: DeviceService,
              private _toastr: ToastrService,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();
    this.setDeviceMode(this._device);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }

    this._activatedRoute.queryParams.subscribe((params: any) => {
      this.tourSearch = new TourSearch(this.tourSearch.getKeys(params));
    });
  }

  // fn ge query prams
  generateQueryParams = (): any => {
    return this.utilityHelper.buildQueryParams(Object.assign({}, this.tourSearch.setKeys(this.tourSearch)))
  };

  // fn on clipboard
  onClipboardSuccess = (content: any) => {
    this._toastr.success(content, 'Thông báo');
  };
}
