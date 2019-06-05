import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd, Event} from '@angular/router';
import {filter} from "rxjs/operators";
import {AppBase} from "../../../app.base";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent extends AppBase {
  breadcrumbs: Array<Object>;

  constructor(private router: Router,
    private route: ActivatedRoute) {

    super();

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.breadcrumbs = [];
        let currentRoute = this.route.root,
          url = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          let tempBreadcrumb: string;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              const routeSnapshot = routes.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
              if (routes.snapshot.data.breadcrumb !== undefined) {
                let status = true;
                if (routes.snapshot.data.status !== undefined) {
                  status = routes.snapshot.data.status;
                }

                let icon = false;
                if (routes.snapshot.data.icon !== undefined) {
                  icon = routes.snapshot.data.icon;
                }
                if (tempBreadcrumb !== routes.snapshot.data.breadcrumb) {
                  this.breadcrumbs.push({
                    label: routes.snapshot.data.breadcrumb,
                    icon: icon,
                    status: status,
                    url: url
                  });
                }
                tempBreadcrumb = routes.snapshot.data.breadcrumb;
              }
              currentRoute = routes;
            }
          });
        } while (currentRoute);
      });
  }
}
