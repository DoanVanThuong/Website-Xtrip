import { Component, ViewEncapsulation } from '@angular/core';
import { ProductActivitiesMobileComponent } from '../mobile/product-activities-mobile.component';

@Component({
  selector: 'app-product-activities-desktop',
  templateUrl: './product-activities-desktop.component.html',
  styleUrls: ['../../free-n-easy/desktop/product-free-n-easy-desktop.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class ProductActivitiesDesktopComponent extends ProductActivitiesMobileComponent {
  
}
