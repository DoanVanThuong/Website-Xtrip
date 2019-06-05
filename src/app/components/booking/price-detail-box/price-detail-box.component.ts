import {Component, Input, ViewEncapsulation, EventEmitter, Output, HostListener, ElementRef} from '@angular/core';
import {AppBase} from '../../../app.base';
import {Payment} from 'app/common';

@Component({
  selector: 'price-detail-box',
  templateUrl: 'price-detail-box.component.html',
  styleUrls: ['price-detail-box.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PriceDetailBoxComponent extends AppBase {

  @Input() summaryPrice: any;
  @Input() totalPrice: number = 0;
  @Input() point: number = 0;
  @Input() disabled: boolean = true;
  @Input('book') isBook: boolean = true;
  @Input('pay') isPay: boolean = false;
  @Input() fee ?: Payment = new Payment();

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() book: EventEmitter<any> = new EventEmitter<any>();
  @Output() pay: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _ele: ElementRef) {
    super();
  }

  ngOnInit() {
    if (!!this.isPay) {
      this.isBook = false;
    } else {
      this.isBook = true;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll = ($event: any) => {

    const ele = $(this._ele.nativeElement);
    const box = ele.find('.price-detail-box');

    if ($(window).scrollTop() > box.parent().offset().top - 30 && $(window).width() > 992) {
      let top = $(window).scrollTop() - box.parent().offset().top + 30;

      box.parent().css({
        position: 'relative',
        width: '100%',
        height: '100%'
      });
      box.css({
        position: 'absolute',
        left: 0,
        right: 0,
        top: top + box.innerHeight() < box.parent().innerHeight() ? (top + 'px') : 'auto',
        bottom: top + box.innerHeight() > box.parent().innerHeight() ? (10 + 'px') : 'auto'
      });
    } else {
      box.parent().removeAttr('style');
      box.removeAttr('style');
    }
  };

  // fn on submit
  onSubmit = (): void => {
    this.submit.emit();
  };

  // fn on book
  onBook = (): void => {
    this.book.emit();
  };

  // fn on pay
  onPay = (): void => {
    this.pay.emit();
  };
}
