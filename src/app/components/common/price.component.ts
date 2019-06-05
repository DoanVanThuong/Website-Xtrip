import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-price',
  template: `
    <div class="d-inline-block {{ class }}">
      {{ price | currencyMoney:'' }} <span class="text-underline">{{ currency || 'đ' }}</span>
    </div>
  `
})
export class PriceComponent {

  @Input() class: string = '';
  @Input() price: number = 0;
  @Input() currency: string = '';

  constructor() {
  }

  ngOnChanges() {
    this.price = Number(this.price) || 0;
  }
}
