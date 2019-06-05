import { Component, ViewEncapsulation } from '@angular/core';
import { ProductFreeAndEasyMobileComponent } from '../mobile/product-free-n-easy-mobile.component';

@Component({
  selector: 'app-product-free-n-easy-desktop',
  templateUrl: './product-free-n-easy-desktop.component.html',
  styleUrls: ['./product-free-n-easy-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductFreeAndEasyDesktopComponent extends ProductFreeAndEasyMobileComponent {
  
}
