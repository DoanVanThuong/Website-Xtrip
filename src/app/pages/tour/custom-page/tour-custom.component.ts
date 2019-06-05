import {Router, ActivatedRoute} from '@angular/router';
import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {TourSearch} from '../../../common/index';

@Component({
  selector: 'app-tour-custom',
  // templateUrl: './tour-custom.component.html',
  template: `
    <div class="tour-custom-link"><!-- redirect with special links --></div>
  `,
  styleUrls: ['./tour-custom.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourCustomComponent extends AppPage {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe((params) => {

      let mode: string = 'search';
      let queryParams = new TourSearch({
        // from: moment().format('YYYY-MM-DD'),
        // to: moment().add(6, 'month').format('YYYY-MM-DD'),
      });

      if (!!params.page) {
        switch (params.page.toLowerCase()) {
          default: {
            return this._router.navigate(['/404']);
          }
          case 'dulichdailoan': {
            queryParams = Object.assign({}, queryParams, {
              arrival: 'TW',
              title: 'Đài Loan',
              type: 'international'
            });
            break;
          }
          case 'dulichhanquoc': {
            queryParams = Object.assign({}, queryParams, {
              arrival: 'KR',
              title: 'Hàn Quốc',
              type: 'international'
            });
            break;
          }
          case 'dulichnhatban': {
            queryParams = Object.assign({}, queryParams, {
              arrival: 'JP',
              title: 'Nhật Bản',
              type: 'international'
            });
            break;
          }
          case 'dulichthailan': {
            queryParams = Object.assign({}, queryParams, {
              arrival: 'TH',
              title: 'Thái Lan',
              type: 'international'
            });
            break;
          }
          case 'nuocngoai': {
            mode = 'international';
            break;
          }
          case 'trongnuoc': {
            mode = 'domestic';
            break;
          }
        }
      }

      switch (mode) {
        case 'search': {
          this._router.navigate(['/tour/result'], {
            queryParams: this.utilityHelper.buildQueryParams(queryParams)
          });
          break;
        }
        default: {
          this._router.navigate(['/tour/arrival', mode]);
          break;
        }
      }
    });

  }

  ngAfterViewInit() {

  }
}



