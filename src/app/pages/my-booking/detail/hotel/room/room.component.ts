import {ActivatedRoute, Router} from '@angular/router';
import {Component, Inject, PLATFORM_ID, ViewChild, ViewEncapsulation} from '@angular/core';
import {Error, HotelReservation, HotelSearch, Room} from '../../../../../common/entities';
import {BookingRepo} from '../../../../../common/repos';
import {DeviceService, Spinner} from '../../../../../common/services';
import {AppBase} from '../../../../../app.base';
import {isPlatformBrowser, Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {BOOKING_STATUS, DATE_FORMAT, MODULE} from '../../../../../app.constants';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import * as moment from 'moment';
import {HotelGalleryPopup} from '../../../../../components';
import {BookingFlightReportPopup} from "../../components/report-popup/report.popup";
import {BookingPdfReportPopup} from "../../components/report-pdf-popup/pdf-report.popup";

const HOTEL: any = makeStateKey('BOOKING_HOTEL');

@Component({
  selector: 'app-hotel-booked-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingHotelRoomComponent extends AppBase {

  @ViewChild(BookingFlightReportPopup) reportPopup: BookingFlightReportPopup = new BookingFlightReportPopup();
  @ViewChild(BookingPdfReportPopup) pdfPopup: BookingPdfReportPopup;
  @ViewChild(HotelGalleryPopup) galleryPopup: HotelGalleryPopup = new HotelGalleryPopup();

  code: string = '';
  hotel: HotelReservation = null;
  isLoading: boolean = false;
  roomImages: Array<any> = [];
  room: Room = new Room();

  STATUS: any = BOOKING_STATUS;
  MODULE: any = MODULE;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _transferState: TransferState,
              private _bookingRepo: BookingRepo,
              private _device: DeviceService,
              private _spinner: Spinner,
              private _toastr: ToastrService,
              private _location: Location,
              @Inject(PLATFORM_ID) private platformId: Object) {
    super();

    this.setDeviceMode(_device);
  }


  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.code = params.code;
      this.getHotel(this.code);
    });
  }

  back = (): void => {
    this._location.back();
  };

  // fn get flight detail
  getHotel = (code: string = null): Promise<any> => {

    const hotel = this._transferState.get(HOTEL, null);

    if (!!hotel) {
      this.hotel = new HotelReservation(hotel);
    } else {

      this.isLoading = true;

      return this._bookingRepo
        .getBookedHotelDetail(this.code)
        .then(
          (res: any) => {

            if (isPlatformBrowser(this.platformId) && !res.data) {
              this._router.navigate(['/404']);
              return;
            }
            this.isLoading = false;
            this.hotel = new HotelReservation(res.data);

          },
          (errors: any) => {
            this.isLoading = false;
            this.handleError(errors);
          }
        );
    }
  };

  // fn handle error
  handleError = (errors: Error[] = []): void => {
    const error: Error = new Error(errors[0]);
    this._toastr.error(error.value);

    if (isPlatformBrowser(this.platformId)) {
      this._router.navigate(['/']);
    }
  };

  // fn generate query params
  generateQueryParams = () => {

    const now = moment();

    return this.utilityHelper.buildQueryParams(new HotelSearch({
      checkIn: now.format(DATE_FORMAT.VALUE),
      checkOut: now.add(1, 'day').format(DATE_FORMAT.VALUE),
      code: this.hotel.hotelCode,
      name: this.hotel.hotelName,
      title: '',
      nights: 1
    }));
  };


  // fn open gallery
  onOpenGallery = () => {

    this.room = new Room(Object.assign({}, this.hotel, {
      cancellationPolicies: this.hotel.cancellationPolicies,
      limitedAdults: this.hotel.roomMaxAdults,
      roomPreferences: this.hotel.characteristic.map(item => {
        return {
          name: item
        };
      }),
      facilityGroups: {
        mainFacilityGroup: this.hotel.popularFacility,
        roomFacilityGroup: this.hotel.generalFacility,
        refundPolicyGroup: {
          facilities: this.hotel.refundPolicies.map(item => {
            return {
              name: item
            };
          })
        }
      }
    }));
    this.roomImages = this.hotel.roomPhotos.map((photo, index) => {

      return {
        index: Number(index + 1),
        small: this.utilityHelper.markImageSize(photo.src, 500),
        medium: this.utilityHelper.markImageSize(photo.src, 700),
        big: this.utilityHelper.markImageSize(photo.src, 900),
        description: photo.name
      };
    });

    this.galleryPopup.show();
  };

  // fn on open report
  onOpenReport = (): void => {
    this.reportPopup.show();
  };

  // fn on slect report
  onSelectReport = (type: string): void => {
    switch (type) {
      case 'pdf': {
        this.onOpenRequestEmail();
        break;
      }
    }
  };

  // fn on open send ticket via email
  onOpenRequestEmail = (): void => {
    this.pdfPopup.show();
  };
}



