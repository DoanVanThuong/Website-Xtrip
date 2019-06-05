import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { query, stagger, animateChild, trigger, transition, style, animate } from '@angular/animations';
import { AppBase } from '../../../../../app.base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faq-navigator',
  templateUrl: './faq-navigator.component.html',
  styleUrls: ['./faq-navigator.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@item', stagger(80, animateChild()), { optional: true })
      ]),
    ]),
    trigger('item', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class FaqNavigatorComponent extends AppBase {

  @Input('params') params: any = null;
  @Output() onChangeGuide: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeFaq: EventEmitter<any> = new EventEmitter<any>();

  selectedGuide: any;
  selectedFaq: any;

  faqItems = [
    { display: 'Vé máy bay', value: 'flight' },
    { display: 'Khách sạn', value: 'hotel' },
    { display: 'Tour', value: 'tour' },
    { display: 'Tour trong ngày, vé tham quan, vui chơi', value: 'activities' },
    { display: 'Thanh toán', value: 'payment' },
    { display: 'Mã khuyến mãi', value: 'coupon' },
    { display: 'Điểm thưởng của tôi', value: 'my-point' },
    { display: 'Ứng dụng Xtrip', value: 'app' }
  ]

  guideItems = [
    { display: 'Đặt vé máy bay', value: 'guide-flight' },
    { display: 'Đặt khách sạn', value: 'guide-hotel' },
    { display: 'Đặt tour', value: 'guide-tour' },
  ]

  isLoading: boolean = true;

  constructor(private _activateRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!!this.params && this.params.type === 'guide') {
      this.selectedGuide = this.guideItems.filter(item => item.value === this.params.key)[0] || this.guideItems[0];
    }

    if (!!this.params && this.params.type === 'faq') {
      this.selectedFaq = this.faqItems.filter(item => item.value === this.params.key)[0] || {};
    }


  }
  //fn select guild item
  onSelectGuide(item: any) {
    this.selectedGuide = item;
    this.onChangeGuide.emit(this.selectedGuide);
  }

  //fn on select faq item
  onSelectFaqItem(faq: any) {
    this.selectedFaq = faq;
    this.onChangeFaq.emit(faq.value);
  }

}
