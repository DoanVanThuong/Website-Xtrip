import {Directive, ElementRef, HostListener, Inject, Input, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

declare var window: any;

@Directive({
  selector: '[min-height]'
})
export class MinHeightDirective {

  @Input('min-height') minHeight: any = 'header';

  ele: any;

  constructor(private el: ElementRef,
              @Inject(PLATFORM_ID) private platformID: string) {
    this.ele = this.el.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.calculate();
  }

  ngOnDestroy() {

  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoadResize($event: any) {
    this.calculate();
  }

  // fn calculate wrapper min-height
  calculate() {
    if (isPlatformBrowser(this.platformID)) {

      const header: HTMLElement = document.querySelector('.header.header-mobile');
      const footer: HTMLElement = document.querySelector('.footer.footer-mobile');

      this.ele.style.minHeight = (window.outerHeight - ((header ? header.clientHeight : 0) + (footer ? footer.clientHeight : 0))) + 'px';
    }
  }
}
