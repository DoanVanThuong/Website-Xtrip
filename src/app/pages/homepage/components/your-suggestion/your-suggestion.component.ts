import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {StorageService} from '../../../../common/services/index';
import {Router} from '@angular/router';
import {Error, Product, Tour} from '../../../../common/entities';
import {ProductRepo} from '../../../../common/repos/product.repo';

@Component({
  selector: 'home-your-activities',
  templateUrl: './your-suggestion.component.html',
  styleUrls: ['your-suggestion.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeYourSuggestionComponent extends AppPage {

  isLoading: boolean = false;
  products: Product[] = [];
  limit: number = 20;

  constructor(private _router: Router,
              private _productRepo: ProductRepo) {
    super();
  }

  ngOnInit() {
    this.getYourSuggestions();
  }

  // fn scroll down to load more
  onScrollDown = () => {
    if (!this.isLoading && !!this.products.length) {
      this.offset += this.limit;
      this.getYourSuggestions();
    }
  };

  // fn get your activities
  getYourSuggestions = (): Promise<any> => {

    this.isLoading = true;

    return this._productRepo
      .getYourSuggestions(null, this.offset, this.limit)
      .then(
        (res: any) => {
          this.products = this.products.concat(res.data.results.map(product => new Product(product)));
          this.isLoading = false;

          if (!res.data.results.length) {
            this.offset--;
          }
        }
      ).catch((errors: Error[] = []) => {
        this.offset--;
        this.isLoading = false;
      });
  };
}