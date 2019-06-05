import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {TourRepo} from '../../../../common/repos/index';
import {DeviceService} from '../../../../common/services/index';
import {Router} from '@angular/router';
import {Tour} from '../../../../common/entities';

@Component({
  selector: 'home-cheap-tour',
  templateUrl: './cheap-tour.component.html',
  styleUrls: ['./cheap-tour.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeCheapTourComponent extends AppPage {

  tours: Tour[] = [];
  carouselOptions: any = {
    navigation: !this.isMobile,
    nav: !this.isMobile,
    navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    margin: this.isMobile ? 15 : 20,
    dots: false
  };
  limit: number = 20;

  constructor(private _router: Router,
              private _tourRepo: TourRepo,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
    this.carouselOptions = Object.assign(this.carouselOptions, {
      navigation: !this.isMobile,
      nav: !this.isMobile,
      margin: this.isMobile ? 15 : 20,
    })
  }

  ngOnInit() {
    this.getTours();
  }

  // fn get tours
  getTours() {

    return this._tourRepo
      .getCheapTours(0, this.limit)
      .then(
        (res: any) => {
          this.tours = res.data.map(tour => new Tour(tour));
        });
  }
}
