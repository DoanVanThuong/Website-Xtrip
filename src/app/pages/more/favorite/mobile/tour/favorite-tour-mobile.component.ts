import {Component, ViewEncapsulation} from '@angular/core';
import {Spinner, StorageService, TourRepo} from '../../../../../common/index';
import {Router} from '@angular/router';
import {AppPage} from '../../../../../app.base';
import {CSTORAGE} from './../../../../../app.constants';

@Component({
  selector: 'favorite-tour-mobile',
  templateUrl: './favorite-tour-mobile.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FavoriteTourMobileComponent extends AppPage {

  tours: Array<any> = [];
  isLoading: boolean = false;

  constructor(private _tourRepo: TourRepo,
              private _router: Router,
              private _spinner: Spinner,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {
    this.onLoadTour();
  }

  ngOnChanges() {
  }

  // fn on scroll down
  onScrollDown() {
    if (!this.isLoading) {
      this.offset += this.limit;
      this.onLoadTour();
    }
  }

  // fn load favorite tours
  onLoadTour = (): any => {
    return this._tourRepo
      .getFavouriteTours(this.offset, this.limit)
      .then(
        (res: any) => {
          this.tours = this.tours.concat(res.data.items.map(tour => tour));
        }
      )
      .catch(() => {
        this._spinner.hide();
        this.isLoading = false;
      });
  };

  //delete a tour from list favorite
  onSelectFavorite(data: any, index: number = -1) {
    return this._tourRepo
      .postFavoriteTour(data.code)
      .then(
        (res: any) => {
          this.tours.splice(index, 1);
        }
      );
  }

  //get best price tour
  onOpenFavoriteItem(tour: any) {

    return this._tourRepo
      .getBestPriceTour(tour.code)
      .then(
        (res: any) => {

          this._storage.setItem(CSTORAGE.BEST_TOUR, res.data);

          this._router.navigate([`tour/${res.data.code}/detail`], {
            queryParams: {
              code: res.data.code
            }
          });
        }
      );
  }
}