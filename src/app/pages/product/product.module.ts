import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NouisliderModule} from 'ng2-nouislider';
import {ClickOutsideModule} from 'ng4-click-outside';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';

import {ComponentsModule as AppComponentModule} from '../../components/components.module';
import {CommonModule as AppCommonModule} from '../../common/common.module';
import {LayoutModule} from '../../layout/layout.module';
import {ProductComponent} from './product.component';
import {routing} from './product.routing';

import {ShareProductModule} from '../shared/share-product.module';
import {ModalModule, TypeaheadModule, BsDropdownModule, BsDatepickerModule, AccordionModule} from 'ngx-bootstrap';
import {ProductActivitiesComponent} from './activities/product-activities.component';
import {ProductActivitiesMobileComponent} from './activities/mobile/product-activities-mobile.component';
import {ProductActivitiesDesktopComponent} from './activities/desktop/product-activities-desktop.component';
import {ProductBookingComponent} from './booking/product-booking.component';
import {ProductBookingMobileComponent} from './booking/mobile/product-booking-mobile.component';
import {ProductBookingDesktopComponent} from './booking/desktop/product-booking-desktop.component';
import {ProductComboInfoComponent} from './booking/components/combo-info/combo-info.component';
import {BookingPickUpComponent} from './booking/components/pick-up/pick-up.component';
import {BookingPassengerBoxComponent} from './booking/components/passenger-box/passenger-box.component';
import {BookingPassengerInfoPopup} from './booking/components/passenger-info-popup/passenger-info.popup';
import {DetailNotePopupComponent} from './booking/components/detail-note-popup/detail-note.popup';
import {AdditionalInfoComponent} from './booking/components/additional-info/additional-info.component';
import {PassengerInfoItemComponent} from './booking/components/passenger-info-item/passenger-info-item.component';
import {OwlModule} from 'ngx-owl-carousel';
import {NgxGalleryModule} from 'ngx-gallery';
import {MatInputModule, MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION, MatSelectModule} from '@angular/material';
import {MbscModule} from 'mobiscroll-angular';
import {NgxUploaderModule} from 'ngx-uploader';
import {NgxMaskModule} from 'ngx-mask';
import {ProductGalleryPopupComponent} from './detail/components/popup/product-gallery/product-gallery.popup';
import {ProductDetailComponent} from './detail/product-detail.component';
import {ProductDetailMobileComponent} from './detail/mobile/product-detail-mobile.component';
import {ProductDetailDesktopComponent} from './detail/desktop/product-detail-desktop.component';
import {SelectComboMobileComponent} from './select-combo/select-combo.component';
import {SelectOptionProductMobileComponent} from './select-option/select-option.component';
import {ComboMobileComponent} from './detail/components/combo/combo.component';
import {ListNoteComponent} from './detail/components/note/note.component';
import {ProductPerBookingItemComponent} from './detail/components/product-perbooking-item/product-perbooking-item.component';
import {ProductInfoDesktopComponent} from './detail/components/product-info/product-info.component';
import {ProductCarouselDesktopComponent} from './detail/components/product-carousel/product-carousel.component';
import {ProductFreeAndEasyDesktopComponent} from './free-n-easy/desktop/product-free-n-easy-desktop.component';
import {ProductFreeAndEasyComponent} from './free-n-easy/product-free-n-easy.component';
import {ProductFreeAndEasyMobileComponent} from './free-n-easy/mobile/product-free-n-easy-mobile.component';
import {ProductResultComponent} from './result/product-result.component';
import {ProductResultMobileComponent} from './result/mobile/product-result-mobile.component';
import {ProductResultDesktopComponent} from './result/desktop/product-result-desktop.component';
import {ProductResultItemComponent} from './result/components/product-result-item/product-result-item.component';
import {ProductSwitchTypeComponent} from './result/components/product-switch-type/product-switch-type.component';
import {ProductEmptyScreenComponent} from './result/components/product-empty-screen/product-empty-screen.component';
import {ProductSortableDesktopComponent} from './result/components/product-sortable/product-sortable.component';
import {ProductFilterDesktopComponent} from './result/components/product-filter/product-filter.component';
import {ProductFilterPopup} from './result/components/popup/product-filter/product-filter.popup';
import {UiSwitchModule} from 'ngx-ui-switch';
import {ProductResolver} from "./product.resolver";


@NgModule({
  imports: [
    CommonModule,
    AppComponentModule,
    AppCommonModule,
    FormsModule,
    LayoutModule,
    routing,
    ScrollToModule.forRoot(),
    ShareProductModule,
    ModalModule,
    OwlModule,
    NgxGalleryModule,
    MatInputModule,
    MatCheckboxModule,
    MbscModule,
    NgxUploaderModule,
    TypeaheadModule,
    NgxMaskModule.forRoot(),
    InfiniteScrollModule,
    BsDropdownModule.forRoot(),
    NouisliderModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    MatSelectModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    UiSwitchModule.forRoot({
      defaultBgColor: '#D1D1D6',
      color: '#00bf8f'
    })
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'},
    ProductResolver
  ],
  declarations: [
    ProductComponent,

    ProductActivitiesComponent,
    ProductActivitiesMobileComponent,
    ProductActivitiesDesktopComponent,
    ProductBookingComponent,
    ProductBookingMobileComponent,
    ProductBookingDesktopComponent,

    ProductComboInfoComponent,
    BookingPickUpComponent,
    BookingPassengerBoxComponent,
    BookingPassengerInfoPopup,
    DetailNotePopupComponent,
    AdditionalInfoComponent,
    PassengerInfoItemComponent,
    ProductDetailComponent,
    ProductDetailMobileComponent,
    ProductDetailDesktopComponent,
    SelectComboMobileComponent,
    SelectOptionProductMobileComponent,
    ComboMobileComponent,
    ListNoteComponent,
    ProductPerBookingItemComponent,
    ProductInfoDesktopComponent,
    ProductCarouselDesktopComponent,
    ProductGalleryPopupComponent,
    ProductFreeAndEasyComponent,
    ProductFreeAndEasyMobileComponent,
    ProductFreeAndEasyDesktopComponent,
    ProductResultComponent,
    ProductResultMobileComponent,
    ProductResultDesktopComponent,
    ProductResultItemComponent,
    ProductSwitchTypeComponent,
    ProductEmptyScreenComponent,
    ProductSortableDesktopComponent,
    ProductFilterDesktopComponent,
    ProductFilterPopup
  ]
})

export class ProductModule {
}
