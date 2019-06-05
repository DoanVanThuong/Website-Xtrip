import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppPage} from '../../../../app.base';

@Component({
  selector: 'app-favorite-mobile',
  templateUrl: './favorite-mobile.component.html',
  styleUrls: ['./favorite-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FavoriteMobileComponent extends AppPage {

  tab: string = 'hotel';

  constructor(private _router: Router,
              private _location: Location) {
    super();
  }

  // fn on select tab
  onSelectTab = ($event: any, tab: string): void => {
    this.tab = tab;
  };
}
