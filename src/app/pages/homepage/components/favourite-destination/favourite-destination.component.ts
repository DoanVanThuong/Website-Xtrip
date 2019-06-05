import {Component, ElementRef, HostListener, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {Router} from '@angular/router';
import {TourRepo, Destination, Tour, DeviceService} from 'app/common';

@Component({
  selector: 'home-favourite-destination',
  templateUrl: './favourite-destination.component.html',
  styleUrls: ['favourite-destination.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeFavouriteDestinationComponent extends AppPage {

  width: number = 160;
  destinations: Array<Destination> = [];

  ele: HTMLElement;
  distance: number = 6;

  constructor(private _tourRepo: TourRepo,
              private _ele: ElementRef,
              private _router: Router,
              private _device: DeviceService) {
    super();

    this.ele = this._ele.nativeElement;
    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.getFavouriteDestinations();
  }

  ngAfterViewInit() {
    this.onLoadResize();
  }

  @HostListener('window:resize', ['$event'])
  onLoadResize($event: any = null) {

    const width = (this.ele.clientWidth || (window.outerWidth - 30)) - this.distance;
    this.width = width / 2;
  }

  // fn get hotels
  getFavouriteDestinations = (): Promise<any> => {
    return this._tourRepo
      .getFavouriteDestinations(0, 6)
      .then(
        (res: any) => {
          this.destinations = res.data.map((destination: any) => new Destination(destination));
        });
  };

  // fn gen params
  generateParams = (tour: Tour): any => {
    return {
      title: tour.name,
      arrival: tour.code,
      departure: 'ALL',
      sortIndex: 0,
      id: tour.id
    };
  };

  //fn search destination
  onSearch(destination: Destination) {
    this._router.navigate([`tour/${destination.code}/date`], {
      queryParams: {title: destination.name, type: destination.type}
    });
  }
}
