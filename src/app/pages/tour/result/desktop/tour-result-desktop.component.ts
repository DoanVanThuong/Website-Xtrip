import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {trigger, transition, style, animate, query, stagger, animateChild} from '@angular/animations';
import {TourResultMobileComponent} from '../mobile/tour-result-mobile.component';

@Component({
  selector: 'app-tour-result-desktop',
  templateUrl: './tour-result-desktop.component.html',
  styleUrls: ['./tour-result-desktop.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@item', stagger(80, animateChild()), {optional: true})
      ]),
    ]),
    trigger('item', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px'
          }))
      ])
    ])
  ],

})

export class TourResultDesktopComponent extends TourResultMobileComponent {

  limit: number = 10;

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const ele = this._ele.nativeElement;
    const bar = ele.querySelector('.bg-search-bar');
    const body: HTMLElement = document.querySelector('.main-body');

    if (window.scrollY > document.querySelector('.header').clientHeight) {
      bar.classList.add('fixed');
      body.style.marginTop = bar.innerHeight + 'px';
    } else {
      bar.classList.remove('fixed');
      body.style.marginTop = null;
    }
  };

  // fn reset filter
  onResetFilter = (): void => {
    this.updateParamsToRoute();
  }


}
