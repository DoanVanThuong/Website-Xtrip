import {Component, ViewEncapsulation, Input, EventEmitter, Output, HostListener, ElementRef} from '@angular/core';
import {StorageService} from '../../../../../common';
import {Router} from '@angular/router';
import {CSTORAGE} from '../../../../../app.constants';
import {AppBase} from '../../../../../app.base';

@Component({
  selector: 'hotel-price-detail',
  templateUrl: 'hotel-price-detail.html',
  styleUrls: ['hotel-price-detail.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelPriceDetail extends AppBase {

  @Input('priceSummary') priceSummary?: any = {};
  @Input('title') title?: string = '';
  @Input('disabled') disabled ?: boolean = false;
  @Input() point: number = 0;

  @Output('submit') submit: EventEmitter<any> = new EventEmitter<any>();

  room: any = {};
  ele: HTMLElement;

  constructor(private _storage: StorageService,
              private router: Router,
              private _ele: ElementRef) {
    super();

    this.ele = this._ele.nativeElement;
  }

  ngOnInit(): void {
    this.room = this._storage.getItem(CSTORAGE.ROOM) || this.router.navigate(['/hotel/search']);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll = ($event: any) => {

    const box: HTMLElement = this.ele.querySelector('.hotel-price-detail');

    if (window.scrollY > box.parentElement.offsetTop) {

      let top = window.scrollY - box.parentElement.offsetTop;

      const parentStyles = {
        position: 'relative',
        width: '100%',
        height: '100%'
      };
      const styles = {
        position: 'absolute',
        left: 0,
        right: 0,
        top: top + box.clientHeight < box.parentElement.clientHeight ? (top + 'px') : 'auto',
        bottom: top + box.clientHeight > box.parentElement.clientHeight ? '0px' : 'auto'
      };

      for (let key in parentStyles) {
        box.parentElement.style[key] = parentStyles[key];
      }

      for (let key in styles) {
        box.style[key] = styles[key];
      }
    } else {
      box.parentElement.removeAttribute('style');
      box.removeAttribute('style');
    }
  };

  //book hotel now
  bookHotel() {
    this.submit.emit();
  }


}
