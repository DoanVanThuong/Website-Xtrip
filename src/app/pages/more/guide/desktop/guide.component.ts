import { Component } from '@angular/core';
import { AppPage } from '../../../../app.base';

import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'more-guide-desktop',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.less']
})
export class GuideDesktopComponent extends AppPage {

  title: string = 'Hướng dẫn đặt vé máy bay';

  selectedGuide: any = {
    display: 'đặt vé máy bay',
    value: 'guide-flight'
  };
  params: any = {
    type: 'guide'
  };

  constructor(private _activateRoute: ActivatedRoute, private _router: Router) {
    super();
  }

  ngOnInit(): void {
    this._activateRoute.queryParams.subscribe(params => {
      if (params.guide) {
        this.selectedGuide.value = params.value || 'guide-flight';
        this.selectedGuide.display = params.guide || 'Đặt vé máy bay';
        this.params = {
          type: 'guide',
          key: this.selectedGuide.value || 'guide-flight'
        }
        this.title = 'Hướng dẫn ' + _.lowerFirst(this.selectedGuide.display);
      }
    })

  }

  onChangeGuide(guide: any) {
    this.selectedGuide = guide;
    this.title = 'Hướng dẫn ' + _.lowerFirst(this.selectedGuide.display);
  }

  //fn on change faq item
  onChangeFaq(faq: any) {
    this._router.navigate(['/more/faq'], {
      queryParams: {
        faq: faq
      }
    });
  }

}