import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[expand-height]'
})
export class ExpandHeightDirective {

  ele: any;

  constructor(private el: ElementRef) {
    this.ele = this.el.nativeElement;
  }

  ngAfterViewInit() {
    this.ele.classList.add('text-expand');
  }

  ngOnChanges = () => {
  };

  ngOnDestroy() {
    this.ele.classList.remove('text-expand');
  }

  @HostListener('document:keypress', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    this.autoResize();
  }

  // fn auto resize
  autoResize = () => {

    this.ele.style.height = this.ele.scrollHeight;
    this.ele.style.paddin = 0;

    /*$(this.ele).css({
      height: 'auto',
      padding: 0
    });

    $(this.ele).css({
      height: this.ele.scrollHeight
    });*/
  };

}
