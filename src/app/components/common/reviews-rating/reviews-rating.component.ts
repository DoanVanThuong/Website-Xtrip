import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-reviews-rating',
  template: `
    <span class="reviews-rating-component bg" *ngIf="rating>0 || reviews>0">
      <span class="font-13" *ngIf="rating > 0">
        <img class="m-b-0 m-t-n-3 size-14x14" cdn-src="assets/images/hotel/desktop/rating.svg" alt="img"/>
        {{rating | number: '1.1'}}
      </span>
      <span class="font-13 m-l-6" *ngIf="reviews > 0">
        <img class="m-b-0 m-t-n-3 size-14x14" cdn-src="assets/images/hotel/desktop/cmt.svg" alt="img"/>
        {{reviews}}
      </span>
    </span>
  `,
  styleUrls: ['./reviews-rating.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsRatingComponent {

  @Input() rating: number = 0;
  @Input() reviews: number = 0;

  constructor() {
  }
}
