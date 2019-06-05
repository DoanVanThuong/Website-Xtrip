import {Component, Inject, Input, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {DeviceService} from '../../../../common/services/index';
import {Tour, TourRepo} from '../../../../common';
import {AppPage} from '../../../../app.base';
import {GlobalState} from '../../../../global.state';
import {EVENT} from '../../../../app.constants';

@Component({
  selector: 'home-hot-tour',
  templateUrl: './hot-tour.component.html',
  styleUrls: ['./hot-tour.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeHotTourComponent extends AppPage {

  @Input() class: string = '';

  isLoading: boolean = false;

  tours: Tour[] = [];
  limit: number = 20;

  carouselOptions: any = {
    item: 1,
    navigation: !this.isMobile,
    nav: !this.isMobile,
    navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    margin: 10,
    dots: false,
  };

  constructor(private _state: GlobalState,
              protected _device: DeviceService,
              private _tourRepo: TourRepo,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();

    this.setDeviceMode(this._device);
    this.carouselOptions = Object.assign(this.carouselOptions, {
      navigation: !this.isMobile,
      nav: !this.isMobile,
      margin: !this.isMobile ? 20 : 10,
      onChange: this.onChangeCarousel
    });
  }

  ngOnInit() {
    this.getTours();
  }

  // fn get tours
  async getTours() {
    try {
      const res = await this._tourRepo.getCheapTours(0, this.limit);
      this.tours = res.data.map((tour: any) => new Tour(tour));
    } catch (error) {
    }
  }

  // mini hack
  onChangeCarousel = () => {
    this._state.notifyTo(EVENT.SLIDE_CHANGED, true);
  };
}
