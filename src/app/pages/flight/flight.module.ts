import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {MatInputModule} from '@angular/material';
import {ClickOutsideModule} from 'ng4-click-outside';
import {MbscModule} from 'mobiscroll-angular';
import {BsDatepickerModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {NouisliderModule} from 'ng2-nouislider';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';
import {LayoutModule} from '../../layout/layout.module';
import {routing} from './flight.routing';

import {FlightComponent} from './flight.component';
import {FlightGroupComponent} from './group/flight-group.component';
import {FlightIndexComponent} from './index/flight-index.component';
import {FlightSearchComponent} from './search/flight-search.component';
import {FlightCheapSearchComponent} from './cheap/search/flight-cheap-search.component';
import {FlightCheapResultComponent} from './cheap/result/flight-cheap-result.component';
import {FlightBookingComponent} from './booking/flight-booking.component';
import {FlightBookingMobileComponent} from './booking/mobile/flight-booking-mobile.component';
import {FlightPreviewComponent} from './preview/flight-preview.component';
import {FlightPreBookingComponent} from './pre-booking/flight-pre-booking.component';
import {FlightResultComponent} from './result/flight-result.component';
import {FlightResultDesktopComponent} from './result/desktop/flight-result-desktop.component';
import {FlightResultMobileComponent} from './result/mobile/flight-result-mobile.component';
import {FlightResultWay2Component} from './result-two-way/flight-result.component';
import {ProgressBar} from './components/progress-bar/progress-bar.component';
import {FlightSearchBarComponent} from './result/components/flight-search-bar/flight-search-bar.component';
import {FlightFilterComponent} from './result/components/flight-filter/flight-filter.component';
import {FlightItemComponent} from './result/components/flight-item/flight-item.component';
import {FlightSortableComponent} from './result/components/flight-sortable/flight-sortable.component';
import {FlightTicketComponent} from './booking/components/flight-ticket/flight-ticket.component';
import {FlightBookingDesktopComponent} from './booking/desktop/flight-booking-desktop.component';
import {FlightDetailPopup} from './booking/components/flight-detail-popup/flight-detail.popup';


@NgModule({
  imports: [
    routing,
    AppCommonModule,
    AppComponentModule,
    LayoutModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MbscModule,
    TextMaskModule,
    InfiniteScrollModule,
    ClickOutsideModule,
    PerfectScrollbarModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    NouisliderModule
  ],
  providers: [],
  declarations: [
    FlightComponent,
    FlightIndexComponent,
    FlightSearchComponent,


    FlightResultComponent,
    FlightResultDesktopComponent,
    FlightResultMobileComponent,
    FlightResultWay2Component,

    FlightBookingComponent,
    FlightBookingMobileComponent,
    FlightBookingDesktopComponent,

    FlightPreBookingComponent,
    FlightBookingComponent,
    FlightPreviewComponent,
    FlightCheapSearchComponent,
    FlightCheapResultComponent,
    FlightGroupComponent,
    ProgressBar,

    // components
    FlightSearchBarComponent,
    FlightItemComponent,
    FlightFilterComponent,
    FlightSortableComponent,
    FlightTicketComponent,
    FlightDetailPopup
  ]
})

export class FlightModule {
}
