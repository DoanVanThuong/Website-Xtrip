import {Component} from '@angular/core';
import {AppPage} from '../../../../app.base';

@Component({
  selector: 'more-guide-mobile',
  templateUrl: './guide.component.html'
})
export class GuideMobileComponent extends AppPage {

  tab: string = 'flight';

  constructor() {
    super();
  }

  // ng on select tab
  onSelectTab = ($event: any, tab: string = '') => {
    this.tab = tab;
  };
}