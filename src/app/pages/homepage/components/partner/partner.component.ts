import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {Router} from '@angular/router';
import {DeviceService} from '../../../../common/services';

const urlImagesPayment = 'assets/images/homepage/logo-payment';
const urlImagesPartner = 'assets/images/homepage/logo-partner';

@Component({
  selector: 'home-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomePartnerComponent extends AppPage {

  mPayments: Array<any> = [
    'assets/images/home/napas.png',
    'assets/images/home/payoo.png',
    'assets/images/home/visa.png'
  ];

  payments: Array<any> = [
    `${urlImagesPayment}/napas.png`,
    `${urlImagesPayment}/payoo.png`,
    `${urlImagesPayment}/visa.png`,
    `${urlImagesPayment}/vietcombank.png`,
    `${urlImagesPayment}/acb.png`,
    `${urlImagesPayment}/sacombank.png`,
    `${urlImagesPayment}/family-mart.png`,
    `${urlImagesPayment}/bs-mart.png`,
    `${urlImagesPayment}/cho-lon.png`,
    `${urlImagesPayment}/fpt.png`,
    `${urlImagesPayment}/hnam-mobile.png`,
    `${urlImagesPayment}/nguyenkim.png`,
    `${urlImagesPayment}/thegioididong.png`,
    `${urlImagesPayment}/vienthonga.png`,
    `${urlImagesPayment}/circle-k.png`,
    `${urlImagesPayment}/satra-mart.png`,
    `${urlImagesPayment}/pharmacity.png`,
    `${urlImagesPayment}/lotte-mart.png`,
    `${urlImagesPayment}/guardian.png`,
    `${urlImagesPayment}/citimart.png`
  ];

  partners = [
    `${urlImagesPartner}/vietject-air.png`,
    `${urlImagesPartner}/vietnam-airline.png`,
    `${urlImagesPartner}/jetstar.png`,
    `${urlImagesPartner}/asia-air.png`,
    `${urlImagesPartner}/cathay-pacific.png`,
    `${urlImagesPartner}/eva-air.png`,
    `${urlImagesPartner}/malindo-air.png`,
    `${urlImagesPartner}/nok-air.png`,
    `${urlImagesPartner}/china-airline.png`,
    `${urlImagesPartner}/thai.png`,
    `${urlImagesPartner}/singapore-airline.png`,
    `${urlImagesPartner}/philippine-airline.png`,
    `${urlImagesPartner}/malaysia-airline.png`,
    `${urlImagesPartner}/bangkok-airway.png`,
    `${urlImagesPartner}/ana.png`,
    `${urlImagesPartner}/asiana-airline.png`,
    `${urlImagesPartner}/cambodia-angkor-air.png`,
    `${urlImagesPartner}/jeju-air.png`,
    `${urlImagesPartner}/korea-air.png`,
    `${urlImagesPartner}/qantas.png`,
  ];

  carouselOptionsPay: any = {
    items: 6,
    navigation: true,
    nav: true,
    navText: [
      '<span><img class=' + 'left-arrow' + ' src=' + 'assets/images/right-arrow.svg' + ' /></span>',
      '<span><img class=' + 'right-arrow' + ' src=' + 'assets/images/right-arrow.svg' + ' /></span>'
    ],
    navClass: ['owl-prev', 'owl-next'],
    loop: false,
    margin: 0,
    dots: false,
    lazyLoad: true,
    responsive: {
      400: {items: 2},
      768: {item: 3},
      800: {item: 4},
      900: {items: 4},
      1024: {items: 6}
    }
  };

  carouselOptionsCarrier: any = {
    items: 8,
    navigation: true,
    nav: true,
    navText: [
      '<span><img class="left-arrow" src="assets/images/right-arrow.svg"/></span>',
      '<span><img class="right-arrow" src="assets/images/right-arrow.svg"/></span>'
    ],
    navClass: ['owl-prev', 'owl-next'],
    loop: false,
    margin: 0,
    dots: false,
    lazyLoad: true,
    responsive: {
      400: {items: 2},
      768: {item: 3},
      800: {item: 4},
      900: {items: 4},
      1024: {item: 8}
    }
  };

  constructor(private _router: Router,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }
}
