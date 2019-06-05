import {Component, Input, Output, EventEmitter, HostListener, ElementRef} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {Tour} from '../../../../../common';

@Component({
  selector: 'tour-detail-price',
  templateUrl: './tour-price-detial.component.html',
  styleUrls: ['./touir-price-detail.component.less']
})
export class TourPriceDetailDesktopComponent extends AppBase {

  @Input() priceSummary: any = null;
  @Input() disabled: boolean = true;
  @Input() tour: Tour = new Tour();
  @Input() point: number = 0;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  data: any = null;

  @HostListener('window:scroll', ['$event'])
  onScroll = ($event: any) => {

    const ele = $(this._ele.nativeElement);
    const box = ele.find('.price-box-wp');

    if ($(window).scrollTop() > box.parent().offset().top && $(window).width() > 992) {

      let top = $(window).scrollTop() - box.parent().offset().top;

      box.parent().css({
        position: 'relative',
        width: '100%',
        height: '100%'
      });
      box.css({
        position: 'absolute',
        left: 0,
        right: 0,
        top: top + box.innerHeight() < box.parent().innerHeight() ? top : 'auto',
        bottom: top + box.innerHeight() > box.parent().innerHeight() ? 10 : 'auto'
      });
    } else {
      box.parent().removeAttr('style');
      box.removeAttr('style');
    }
  };

  constructor(private _ele: ElementRef) {
    super();
  }

  ngOnChanges() {
    if (!!this.priceSummary || !!this.tour) {
      this.data = this.priceSummary;
    }
  }

  ngOnInit() {
  }

  //fn submit
  onSubmitBook() {
    this.onSubmit.emit();
  }
}
