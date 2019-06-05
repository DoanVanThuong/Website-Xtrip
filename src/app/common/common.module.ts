import {NgModule, ModuleWithProviders} from '@angular/core';

import {ServiceModule} from './services/service.module';
import {SecurityModule} from './security/security.module';
import {RepositoryModule} from './repos/repo.module';

import {
  CapitalizePipe,
  PadPipe,
  MomentPipe,
  NewlinePipe,
  TextEllipsisPipe,
  CurrencyMoneyPipe,
  DepartDatePipe,
  SearchBank,
  VocativePipe,
  Highlight,
  DurationPipe,
  StartTimePipe,
  EqualErrorPipe,
  HideEmailAddressPipe,
  DistancePipe,
  TransportPipe,
  ReturnDatePipe,
  TimePipe, ResizeImage, ReversePipe, DataFilterPipe, ResizePipe, SafeHtmlPipe,
  PnrPipe,
  KeysPipe, PeopleNumberPipe, PriceTextPipe, HotelLocationTypePipe, DateOfWeekPipe
} from './pipes/index';

import {
  EmailValidator,
  EqualPasswordsValidator,
  DateValidator,
  PhoneNumberValidator,
  PriceValidator,
  PassportExpiryValidator, RequiredLeastCheckboxValidator
} from './validators/index';

import {
  MinHeightDirective,
  ScrollDirective,
  SuffixMaskDirective,
  ExpandHeightDirective,
  AutofocusDirective,
  LetDirective,
  FixedScrollDirective,
  CdnSrcDirective,
  BookingStepDirective
} from './directives/index';

// validations
const APP_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator,
  DateValidator,
  PhoneNumberValidator,
  PriceValidator,
  PassportExpiryValidator,
  RequiredLeastCheckboxValidator
];

// pipes
const APP_PIPES = [
  Highlight,
  CapitalizePipe,
  PadPipe,
  MomentPipe,
  NewlinePipe,
  TextEllipsisPipe,
  CurrencyMoneyPipe,
  DepartDatePipe,
  VocativePipe,
  SearchBank,
  DurationPipe,
  StartTimePipe,
  EqualErrorPipe,
  HideEmailAddressPipe,
  DistancePipe,
  TransportPipe,
  ReturnDatePipe,
  TimePipe,
  ResizeImage, ResizePipe,
  ReversePipe,
  DataFilterPipe,
  SafeHtmlPipe,
  PnrPipe,
  KeysPipe, PeopleNumberPipe,
  PriceTextPipe, HotelLocationTypePipe, DateOfWeekPipe
];

const APP_DIRECTIVES = [
  SuffixMaskDirective,
  ScrollDirective,
  MinHeightDirective,
  ExpandHeightDirective,
  AutofocusDirective,
  LetDirective,
  FixedScrollDirective,
  CdnSrcDirective,
  BookingStepDirective
];

@NgModule({
  declarations: [
    ...APP_PIPES,
    ...APP_DIRECTIVES
  ],
  imports: [
    ServiceModule,
    SecurityModule,
    RepositoryModule,
  ],
  providers: [
    ...APP_VALIDATORS
  ],
  exports: [
    ...APP_PIPES,
    ...APP_DIRECTIVES,
  ]
})

export class CommonModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CommonModule,
      providers: [],
    };
  }
}
