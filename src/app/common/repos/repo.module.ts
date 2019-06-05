import {NgModule} from '@angular/core';
import {
  AuthRepo,
  BlogRepo,
  BookingRepo,
  CountryRepo,
  CouponRepo,
  FlightRepo,
  GlobalRepo,
  HotelRepo,
  MessageRepo,
  OverviewRepo,
  PaymentRepo,
  PlaneTicketRepo,
  TourRepo,
  PromotionRepo,
  PassengerRepo,
  ProductRepo
} from './index';

@NgModule({
  providers: [
    AuthRepo,
    BlogRepo,
    BookingRepo,
    CountryRepo,
    FlightRepo,
    GlobalRepo,
    HotelRepo,
    MessageRepo,
    OverviewRepo,
    PlaneTicketRepo,
    TourRepo,
    CouponRepo,
    PaymentRepo,
    PromotionRepo,
    PassengerRepo,
    ProductRepo
  ],
})
export class RepositoryModule {

}
