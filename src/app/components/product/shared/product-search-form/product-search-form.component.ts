import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ProductSearchBarComponent } from 'app/pages/product/result/components/product-search-bar/product-search-bar.component';

@Component({
  selector: 'app-product-search-form',
  templateUrl: './product-search-form.component.html',
  styleUrls: ['./product-search-form.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductSearchForm extends ProductSearchBarComponent {
  
  @Input('title') title: string = '';
  @Input('type') type: string = '';

  isDestinationShow: boolean = false;
  isFocus: boolean = false;

  ngOnInit(): void {
    this.destination.name = '';
    this.params.type = this.type;
    this.listFavoriteLocation();
    this.getHistory();
  }

}
 