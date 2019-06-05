import {Routes, RouterModule, UrlSegment, UrlMatchResult, UrlMatcher} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TourBookingComponent} from './booking/tour-booking.component';
import {TourDetailComponent} from './detail/tour-detail.component';
import {TourDateSelectorComponent} from './search/tour-date-picker/tour-date.component';
import {TourComponent} from './tour.component';
import {TourGroupComponent} from './group/tour-group.component';
import {TourResultComponent} from './result/tour-result.component';
import {TourCustomComponent} from './custom-page/tour-custom.component';
import {TourArrivalComponent} from './search/arrival/tour-arival.component';
import {TourIndexComponent} from './index/tour-index.component';
import {TourRecommendComponent} from "./recommend/tour-recommend.component";
import {TourArrivalResolver} from "./tour.resolver";

export function TourDetailMatcher(url: UrlSegment[]): UrlMatchResult | null {

  return !!url.length && url[0].path.endsWith('.html') ? ({
    consumed: url,
    posParams: {
      alias: url[0]
    }
  }) : null;
}

export const routes: Routes = [
  {
    path: '',
    component: TourComponent,
    children: [
      {
        path: '',
        component: TourIndexComponent
      },

      {
        path: 'recommend/:code',
        component: TourRecommendComponent
      },
      {
        path: 'arrival/:type',
        component: TourArrivalComponent,
        resolve: {
          data: TourArrivalResolver
        }
      },
      {
        path: 'group',
        component: TourGroupComponent
      },
      {
        path: ':code/date',
        component: TourDateSelectorComponent
      },
      {
        path: 'result',
        component: TourResultComponent
      },
      {
        path: ':arrival/result',
        component: TourResultComponent
      },
      {
        path: ':arrival/tim-kiem',
        component: TourResultComponent
      },
      {
        path: ':code/detail',
        component: TourDetailComponent,
      },
      {
        path: 'booking',
        component: TourBookingComponent
      },
      {
        path: ':alias',
        matcher: TourDetailMatcher,
        component: TourDetailComponent
      },
      {
        path: ':page',
        component: TourCustomComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
