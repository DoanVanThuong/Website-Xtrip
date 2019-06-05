import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionModule, TabsModule } from 'ngx-bootstrap';

import { routing } from './notification.routing';
import { CommonModule as AppCommonModule } from '../../common/common.module';
import { ComponentsModule as AppComponentModule } from '../../components/components.module';
import { LayoutModule } from '../../layout/layout.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NotificationComponent } from './notification.component';
import { NotificationMobileComponent } from './index/notification-index.component';
import { NotificationGeneralComponent } from './components/general/general.component';
import { NotificationInboxComponent } from './components/inbox/inbox.component';
import { MessageComponent } from './message/message.component';


@NgModule({
  exports: [],
  imports: [
    AppCommonModule,
    AppComponentModule,
    LayoutModule,
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    routing,

    InfiniteScrollModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [
    NotificationComponent,
    NotificationMobileComponent,
    NotificationGeneralComponent,
    NotificationInboxComponent,
    MessageComponent,
  ]
})
export class NotificationModule {
}
