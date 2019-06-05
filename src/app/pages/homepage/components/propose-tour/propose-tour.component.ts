import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {TourRepo} from '../../../../common/repos/index';
import {DeviceService, StorageService} from '../../../../common/services/index';
import {Router} from '@angular/router';
import {TourPropose, TourSearch} from '../../../../common/entities';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'home-propose-tour',
  templateUrl: './propose-tour.component.html',
  styleUrls: ['propose-tour.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeProposeTourComponent extends AppPage {

  heading: string = 'Tour đề xuất';
  tours: TourPropose[] = [];

  carouselOptions: any = {
    items: 3,
    loop: false,
    margin: 20,
    dots: false,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    navClass: ['owl-prev', 'owl-next'],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dots: true,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
        nav: true,
        navigation: true,
      }
    }
  };

  constructor(private _router: Router,
              private _tourRepo: TourRepo,
              protected _device: DeviceService,
              private _http: HttpClient) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {

    this.getRecommendTours();
  }

  // fn get recommend tours
  getRecommendTours = (): Promise<any> => {

    return this._tourRepo
      .getRecommendTour()
      .then(
        (res: any) => {
          this.heading = res.data.title;
          this.tours = res.data.items.map(tour => new TourPropose(tour));
        });
  };

  // fn generate query params
  generateQueryParams = (tour: TourPropose): any => {
    return this.utilityHelper.buildQueryParams(new TourSearch({
      /*arrival: tour.code,
      title: tour.name,
      type: tour.type,*/
      name:tour.name
    }));
  }
}
