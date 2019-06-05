import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute, Event} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-title',
  template: '<span></span>'
})
export class TitleComponent {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private titleService: Title) {

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd)
      )
      .subscribe(($event: any) => {


        let currentRoute = this.route.root;
        let title = '';

        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              title = routes.snapshot.data.title;
              currentRoute = routes;
            }
          });
        } while (currentRoute);

        this.titleService.setTitle(title || '');
      });
  }
}
