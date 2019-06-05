import {Component, Input} from '@angular/core';

@Component({
  selector: 'hotel-star',
  styles: [
      `
      .hotel-star {
        line-height: 1
      }`,
      `
      .hotel-star > img {
        margin-right: 5px;
        margin-bottom: 0;
      }`,
      `
      .hotel-star.ver-2 {
        color: #ffffff;
        font-size: 13px;
        font-weight: 500;
        padding: 1px 3px;
        border-radius: 3px;
      }`,
      `
      .hotel-star.ver-2 > img {
        margin: 0;
      }`,
  ],
  template: `
    <div class="hotel-star"
         *ngIf="version === 1 && !!stars">
      <img class="star {{isDesktop ? 'size-16x16' : ''}}"
           *ngFor="let item of numbers" cdn-src="assets/images/icon/icon-star-orange.svg">
    </div>
    <div class="hotel-star ver-2 d-inline-block text-white bg-gradient-green"
         *ngIf="version === 2 && !!stars">
      {{ stars }} <img class="size-10x10 m-t-n-3" cdn-src="assets/images/icon/icon-star-white.svg" alt="star"/>
    </div>

  `
})
export class HotelStars {

  @Input() stars: number = 0; // star number
  @Input() isDesktop: boolean = false;
  @Input() version: number = 1;

  numbers: Array<any> = [];

  constructor() {
  }

  ngOnInit() {

    if (!!this.version) {
      this.version = Number(this.version);
    }

    this.numbers = Array.from(Array(this.stars).keys()).map(i => i + 1);
  }

  ngOnChanges() {
    this.numbers = Array.from(Array(this.stars).keys()).map(i => i + 1);
  }
}
