import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {TourRepo} from '../../../../common/repos/index';
import {DeviceService, StorageService} from '../../../../common/services/index';
import {Router} from '@angular/router';
import {Tour} from '../../../../common/entities';
import {TOUR_TYPE} from "../../../../app.constants";

@Component({
  selector: 'home-flashdeal-tour',
  templateUrl: './last-tour.component.html',
  styleUrls: ['last-tour.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeLastTourComponent extends AppPage {

  @Input() heading: string = 'Tour hạn chót';

  limit: number = 9;
  tours: Tour[] = [];
  carouselOptions: any = {
    items: 1,
    dots: true,
    margin: 20,
    autoHeight: true,
    autoHeightClass: 'owl-height',
    responsiveClass: true,
    responsive: {
      992: {
        autoHeight: false
      }
    }
  };

  constructor(private _router: Router,
              private _tourRepo: TourRepo,
              protected _device: DeviceService,
              private _storage: StorageService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {
    this.getTours()
  }

  // fn get tours
  getTours = (): Promise<any> => {
    return this._tourRepo
      .getFlashDealTour(this.offset, this.limit)
      .then(
        (res: any) => {
          this.heading = res.data.title;
          this.tours = res.data.items.map(tour => new Tour(tour));
        });
  };

  // fn generate query params
  generateQueryParams = (tour: Tour): any => {
    return {
      /*title: tour.arrivalPlace,
      arrival: tour.arrivalCode,
      departure: tour.departCode,
      sortIndex: 0,
      type: tour.isInternational ? TOUR_TYPE.INTERNATIONAL : TOUR_TYPE.DOMESTIC*/
    };
  };

  pushListWith = (list: any[] = [], len: number = 1): any[] => {

    let results: any[] = [];
    for (let i in list) {

      let index = Math.floor(Number(i) / len);
      if (!(Number(i) % len)) {
        results.push([list[i]]);
      } else {
        results[index].push(list[i]);
      }
    }

    return results;
  }
}
