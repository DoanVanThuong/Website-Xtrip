import {Directive, ElementRef, Input, SimpleChange, SimpleChanges} from '@angular/core';
import {environment} from '../../../environments/environment';

@Directive({
  selector: '[cdn-src]'
})
export class CdnSrcDirective {

  @Input('cdn-src') src: string = '';
  ele: any;

  constructor(private el: ElementRef) {
    this.ele = this.el.nativeElement;
  }

  ngOnInit(): void {
    this.onHandleSrc();
  }

  ngOnChanges = (changes: SimpleChanges) => {
    this.onHandleSrc();
  };

  // fn on handle src for init and change
  onHandleSrc = (): void => {

    if (this.src.length && this.src[0] === '/') {
      this.src = this.src.substr(1, this.src.length);
    }

    if (this.src.indexOf('http') !== -1 || this.src.indexOf('//') !== -1) {
      this.ele.src = this.src;
      return;
    }

    this.ele.src = `${environment.CDN_ASSETS}/${this.src}`;
  }
}
