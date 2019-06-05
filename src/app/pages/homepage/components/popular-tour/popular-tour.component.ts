import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {TourRepo} from '../../../../common/repos/index';
import {DeviceService, StorageService} from '../../../../common/services/index';
import {Router} from '@angular/router';
import {Error, Tour} from '../../../../common/entities';

@Component({
  selector: 'home-popular-tour',
  templateUrl: './popular-tour.component.html',
  styleUrls: ['popular-tour.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomePopularTourComponent extends AppPage {

  @Input('international') isInternational: boolean = false;
  limit: number = 20;

  tours: Tour[] = [];

  itemsPerRow: number = 4;
  isLoading: boolean = false;


  constructor(private _router: Router,
              private _tourRepo: TourRepo,
              protected _device: DeviceService,
              private _storage: StorageService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {
    this.getTours();
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event: any) {

    const width = window.innerWidth;

    if (width < 992) {
      this.itemsPerRow = 2;
    } else if (width < 1200) {
      this.itemsPerRow = 3;
    } else {
      this.itemsPerRow = 4;
    }
  }

  // fn get tours
  getTours = (code: string = null): Promise<any> => {

    this.isLoading = true;

    return this._tourRepo
      .getPopularTours(this.isInternational ? 'international' : 'domestic', !!code ? {code} : null, 0, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;
          this.tours = res.data.map(tour => new Tour(tour));
        },
        (errors: Error[] = []) => {
          this.isLoading = false;
        });
  };
}
