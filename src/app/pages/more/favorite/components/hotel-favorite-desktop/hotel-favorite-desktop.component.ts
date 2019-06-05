import { Component, ViewEncapsulation } from '@angular/core';
import { query, stagger, animateChild, trigger, transition, style, animate } from '@angular/animations';
import { FavoriteHotelMobileComponent } from '../../mobile/hotel/favorite-hotel-mobile.component';

@Component({
  selector: 'app-hotel-favorite-desktop',
  templateUrl: './hotel-favorite-desktop.component.html',
  styleUrls: ['./hotel-favorite-desktop.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('list', [
      transition(':enter', [
        
      ]),
    ]),
    trigger('item', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class FavoriteHotelDesktopComponent extends FavoriteHotelMobileComponent  {
  
}
