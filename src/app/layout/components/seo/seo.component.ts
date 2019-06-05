import {Component} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {Router, ActivatedRoute, NavigationEnd, Event} from '@angular/router';
import {SeoService} from '../../../common/services';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-seo',
  template: '<span></span>'
})
export class SeoComponent {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _seo: SeoService,
              private _title: Title,
              private _meta: Meta) {

    this._router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd)
      )
      .subscribe(($event) => {

        let currentRoute = this._activatedRoute.root;
        let info: any = currentRoute.snapshot.data || {};

        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              if (!!Object.keys(routes.snapshot.data).length) {
                info = routes.snapshot.data;
              }
              currentRoute = routes;
            }
          });
        } while (currentRoute);

        if (!!info.title) {
          this._seo.setTitle(info.title || 'Xtrip');
        }

        if (!!info.description) {
          this._seo.updateTag({
            name: 'description',
            content: info.description
          });
        }

        if (!!info.keywords) {
          this._seo.updateTag({
            name: 'keywords',
            content: info.keywords
          });
        }
      });
  }
}
