import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-support-desktop',
  templateUrl: './request-support-desktop.component.html',
  styleUrls: ['./request-support-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RequestSupportDesktopComponent {

  params: any = {};

  constructor(
    private _activateRoute: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.params = { type: 'request-support' }
  }

  onChangeGuide(guideItem: any) {
    this._router.navigate(['/more/guide'], {
      queryParams: {
        value: guideItem.value,
        guide: guideItem.display
      }
    });
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
