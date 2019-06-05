import {Component, ElementRef, HostListener, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../app.base';

declare var document: any;
declare var window: any;

@Component({
  selector: 'app-navigator',
  templateUrl: 'navigator.component.html',
  styleUrls: ['navigator.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class NavigatorComponent extends AppPage {

  ele: HTMLElement;

  constructor(private _ele: ElementRef) {
    super();


    this.ele = this._ele.nativeElement;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll = ($event: any) => {

    const ele = $(this._ele.nativeElement);
    const box = ele.find('.navigator');

    if ($(window).scrollTop() > (box.parent().offset().top - 20) && $(window).width() > 992) {
      const top = $(window).scrollTop() - box.parent().offset().top + 20;
      box.parent().css({
        position: 'relative',
        width: '100%',
        height: '100%'
      });
      setTimeout(() => {
        box.css({
          position: 'absolute',
          left: 0,
          right: 0,
          top: top + box.height() < box.parent().height() ? (top + 'px') : 'auto',
          bottom: top + box.height() > box.parent().height() ? '0px' : 'auto'
        });
      }, 500);

    } else {
      box.parent().removeAttr('style');
      box.removeAttr('style');
    }
  };

}
