import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {Error, Tour, TourSearch} from '../../../../../common/entities';
import {TourArrivalMobileComponent} from '../mobile/tour-arrival-mobile.component';
import {TOUR_TYPE} from '../../../../../app.constants';
import {isPlatformBrowser} from '@angular/common';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-tour-arrival-desktop',
  templateUrl: './tour-arrival-desktop.component.html',
  styleUrls: ['./tour-arrival-desktop.component.less',],
  encapsulation: ViewEncapsulation.None
})

export class TourArrivalDesktopComponent extends TourArrivalMobileComponent {

  tours: Tour[] = [];

  itemsPerRow: number = 4;
  navigationSubscription: any = null;

  ngOnInit() {

    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((params: any): void => {

        this.offset = 0;
        this.tours = [];

        this.params = params;
        this.tourSearch = new TourSearch(params);

        this.getArrivals();
        this.getTours();
      });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event) {

    if (isPlatformBrowser(this.platformID)) {
      const width = window.innerWidth;

      if (width < 768) {
        this.itemsPerRow = 1;
      } else if (width < 992) {
        this.itemsPerRow = 2;
      } else if (width < 1200) {
        this.itemsPerRow = 3;
      } else {
        this.itemsPerRow = 4;
      }
    }
  }

  // fn infinite scroll down
  onScrollDown = () => {
    if (!this.isLoading && this.tours.length > 0) {
      this.offset += this.limit;
      this.getTours();
    }
  };

  // fn detect domestic type
  isDomestic = () => {
    return this.tourSearch.type === TOUR_TYPE.DOMESTIC;
  };

  // fn get popular tours
  getTours = (): Promise<any> => {

    this.isLoading = true;
    return this._tourRepo
      .getPopularTours(this.tourSearch.type, null, this.offset, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;
          this.tours = this.tours.concat(res.data.map(tour => new Tour(tour)));

          if (!res.data.length) {
            this.offset -= this.limit;
          }
        },
        (errors: Error[] = []) => {
          this.isLoading = false;
          this.offset -= this.limit;
        }
      );
  };
}
