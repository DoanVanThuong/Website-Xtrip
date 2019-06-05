import {Directive, ElementRef, HostListener} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective {

  ele: HTMLElement;

  constructor(private el: ElementRef) {
    this.ele = this.el.nativeElement;
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  @HostListener('window:load', ['$event'])
  onLoad() {

  }
}
