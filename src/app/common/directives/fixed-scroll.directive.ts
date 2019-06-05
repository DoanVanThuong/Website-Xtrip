import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[fixed-scroll]'
})
export class FixedScrollDirective {

  @Input('fixed-scroll') isFixedScroll: boolean = false;
  ele: any;

  constructor(private el: ElementRef) {
    this.ele = this.el.nativeElement;
  }

  ngAfterViewInit() {
    if(this.isFixedScroll){

    }
  }

  ngOnChanges = () => {
  };

  ngOnDestroy() {

  }
}
