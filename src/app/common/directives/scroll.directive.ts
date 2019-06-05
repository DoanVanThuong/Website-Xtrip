import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective {

  @Input('scroll-limit') scrollLimit: number = 0;
  ele: HTMLElement;

  constructor(private _ele: ElementRef) {
    this.ele = this._ele.nativeElement;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const banner: HTMLElement = document.querySelector('.smart-banner');

    if (window.scrollY > (banner ? banner.clientHeight : 0)){
      this.ele.classList.add('scroll');
    } else {
      this.ele.classList.remove('scroll');
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }
}

