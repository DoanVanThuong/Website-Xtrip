import {Component, ViewEncapsulation} from '@angular/core';
import {AccountInfoMobileComponent} from '../mobile/account-info-mobile.component';

@Component({
  selector: 'app-account-info-desktop',
  templateUrl: './account-info-desktop.component.html',
  styleUrls: ['./account-info-desktop.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class AccountInfoDesktopComponent extends AccountInfoMobileComponent {

  ngAfterViewInit() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }
}
