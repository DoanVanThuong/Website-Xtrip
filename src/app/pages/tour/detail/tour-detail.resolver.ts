import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {TourRepo} from '../../../common/repos';
import {Observable} from 'rxjs';
import {SeoService} from '../../../common/services';
import {Tour} from '../../../common/entities';
import {UtilityHelper} from '../../../common/helpers';
import {Meta, Title} from '@angular/platform-browser';

@Injectable()
export class TourDetailResolver implements Resolve<any> {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _tourRepo: TourRepo,
              private _title: Title,
              private _meta: Meta,
              private _seo: SeoService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
  ): Observable<any | Promise<any>> | any {

    const utilityHelper = new UtilityHelper();

    return this._tourRepo
      .getDetailTour(route.params.code)
      .then(
        (res: any) => {
          const tour: Tour = new Tour(res.data);

          this._seo
            .setTitle(tour.name)
            .updateTags([
              {name: 'description', content: tour.name},
              {name: 'keywords', content: tour.name},
              {property: 'og:image', content: utilityHelper.markImageSize(tour.photo.src)},
              {property: 'og:description', content: tour.name},
              {property: 'og:title', content: tour.name},
              {property: 'og:url', content: this._router.url},
            ]);

          this._title.setTitle(tour.name);
          this._meta.updateTag({property: 'og:title', content: tour.name});
          this._meta.updateTag({property: 'og:description', content: tour.name});

          return tour;
        },
        (errors: Error[] = []) => {
          return null;
        }
      );
  }
}
