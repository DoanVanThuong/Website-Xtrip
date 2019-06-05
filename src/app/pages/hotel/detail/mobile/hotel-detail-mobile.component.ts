import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, HostListener } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser, Location } from '@angular/common';

import { AppPage } from '../../../../app.base';
import { SeoService, Spinner, DeviceService, StorageService } from '../../../../common/services';
import { Error, Hotel, HotelRepo, HotelSearch, Photo, RoomGroup, HotelStayInfo } from '../../../../common';

import { GalleryPopup, SocialSharing, HotelDatePickerPopup } from '../../../../components/popup';
import { HotelRoomPopupComponent } from '../components/popup/room/hotel-room.popup';
import { HotelFalityPopupComponent } from '../components/popup/facility/hotel-facility.popup';
import { HotelDetailMapPopupComponent } from '../components/popup/map/hotel-detail-map.popup';
import { HotelDescriptionPopupComponent } from '../components/popup/description/hotel-detail-description.popup';
import { HotelHotPlacePopupComponent } from '../components/popup/hot-place/hotel-hot-place.popup';

import 'rxjs/add/observable/throw';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, forkJoin, } from 'rxjs';
import { map, takeUntil, catchError, finalize } from 'rxjs/operators';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import * as moment from 'moment';
import { CSTORAGE } from 'app/app.constants';

enum TYPE_PASSENGER {
    ADULT = 'adult',
    CHILD = 'children'
}
@Component({
    selector: 'app-hotel-detail-mobile',
    templateUrl: './hotel-detail-mobile.component.html',
    styleUrls: ['./hotel-detail-mobile.component.less'],
})
export class HotelDetailMobileComponent extends AppPage {

    @ViewChild(GalleryPopup) galleryPopup: GalleryPopup;
    @ViewChild(SocialSharing) socialSharingPopup: SocialSharing;
    @ViewChild(HotelDetailMapPopupComponent) fullScreenMap: HotelDetailMapPopupComponent;
    @ViewChild(HotelRoomPopupComponent) roomPopup: HotelRoomPopupComponent;
    @ViewChild(HotelFalityPopupComponent) facilityPopup: HotelFalityPopupComponent;
    @ViewChild(HotelDescriptionPopupComponent) descriptionPopup: HotelDescriptionPopupComponent;
    @ViewChild(HotelHotPlacePopupComponent) hotPlacePopup: HotelHotPlacePopupComponent;
    @ViewChild(HotelDatePickerPopup) datePopup: HotelDatePickerPopup;

    code: string = null; // hotel code
    isFavorite: boolean = false;
    isExpired: boolean = false;

    params: any = {};

    hotel: Hotel = new Hotel();
    roomGroups: RoomGroup[] = [];

    selectedDate: IDate = {
        start: moment().add(1, 'day'),
        end: moment().add(2, 'day')
    };
    nights: number = 1;
    passengers: number = 1;
    rooms: number = 1;
    roomOccupancies: any[] = [];
    stayInfo: HotelStayInfo = new HotelStayInfo();
    facilities: IFacility[] = [];

    hotelSearch: HotelSearch = new HotelSearch();
    searchInfo: any = {};
    imageCategory: any = {};
    galleryImages: Array<any> = [];

    equivalentHotels: Array<any> = [];
    breadcrumbs: any[] = [];

    mapStyles: any = {};
    isLoading: boolean = false;

    carouselOptions: any = {
        items: 1,
        loop: false,
        navigation: true,
        autoplay: false,
        autoplayTimeout: 7000,
        autoplaySpeed: 1000,
        margin: 0,
        dots: false,
        onDragged: (event: any) => {
            this.currentItemImage = event.item.index + 1;
        },
    };
    currentItemImage: number = 1;
    sliceItemFacility: number = 4;
    iconMapUrl: string = 'assets/images/hotel/icon-map.svg';

    constructor(protected _ele: ElementRef,
        protected _router: Router,
        protected _activatedRoute: ActivatedRoute,
        protected _hotelRepo: HotelRepo,
        protected _location: Location,
        protected _spinner: Spinner,
        private _seo: SeoService,
        private _toastr: ToastrService,
        private _device: DeviceService,
        @Inject(PLATFORM_ID) private platformId: string,
        private _storage: StorageService,
        protected _scrollToService: ScrollToService) {
        super();
        this.setDeviceMode(this._device);
        this.carouselOptions = Object.assign(this.carouselOptions, {
            navigation: !this.isMobile,
            nav: !this.isMobile,
            margin: this.isMobile ? 0 : 20,
            items: !this.isMobile ? 6 : 1
        });
    }

    @HostListener('window:scroll', ['$event'])
    scrollTo($event: any) {
        const action: HTMLElement = document.querySelector('.hotel-heading-action');
        const header: HTMLElement = document.querySelector('.hotel-heading');
        if (isPlatformBrowser(this.platformId)) {
            if (window.scrollY > 0) {
                header.classList.add('scroll');
                header.classList.add('shadow');
                if (window.scrollY >= 650) {
                    action.style.display = 'block';
                }
                else {
                    action.style.removeProperty('display');
                }

            } else {
                header.classList.remove('scroll');
                header.classList.remove('shadow');
            }
        }
    };

    ngOnInit() {
        combineLatest(this._activatedRoute.params, this._activatedRoute.queryParams)
            .pipe(
                map(([params, qParams]) => ({ ...params, ...qParams })),
                catchError(this.catchError),
                takeUntil(this.ngUnsubscribe),
            )
            .subscribe((param: any): void => {

                if (!param.code) {
                    this.back();
                }

                this.code = param.code;
                this.params = param;

                //get roomOccupancies from queryParam with format: "roomOccupancies = adults-children,adult-children"
                const roomOccupancies: string = this.params.roomOccupancies || '1-0';
                const paramRoomOccupancies = (roomOccupancies.split(",") || []).map((item: string) => item.split("-")).map(item => item.map(data => parseInt(data)));

                // mapping cho chọn phòng, chọn số khách
                this.roomOccupancies = paramRoomOccupancies.map((item: any[]) => item.map((data, index) => (
                    this.mapDataPassengerAndRoom((index === 0 ? TYPE_PASSENGER.ADULT : TYPE_PASSENGER.CHILD), data)
                )));

                // update stayInfo 
                this.stayInfo.roomOccupancies = this.mapRomOccupancies(this.roomOccupancies);
                this.selectedDate = { start: moment(this.params.checkIn, "YYYY-MM-DD"), end: moment(this.params.checkOut, "YYYY-MM-DD") };
                this.stayInfo.checkIn = this.selectedDate.start.format("YYYY-MM-DD");
                this.stayInfo.checkOut = this.selectedDate.end.format("YYYY-MM-DD");
                this.stayInfo.rooms = parseInt(this.params.rooms) || this.rooms;

                // update tổng số phòng, số khách, số đêm
                this.rooms = parseInt(this.params.rooms);
                this.nights = this.selectedDate.end.diff(this.selectedDate.start, 'days');
                this.passengers = paramRoomOccupancies.map((item: any[]) => item.reduce((acc, cur) => acc + cur)).reduce((acc, cur) => acc + cur);

                // get data detail (ks yêu thích, detail, group phòng)
                this.getDataDetail();
            });
    }

    getDataDetail() {
        this.isLoading = true;
        const action: HTMLElement = document.querySelector('.hotel-heading-action');
        action.style.removeProperty('display');

        forkJoin(
            this._hotelRepo.getDetailVersion2_5(this.code, this.stayInfo),
            this._hotelRepo.getFavouriteHotel(this.code),
            this._hotelRepo.getRoomGroup(this.code, this.stayInfo),
            this._hotelRepo.getFacilitiesVersion2_5(this.code)
        )
            .pipe(
                takeUntil(this.ngUnsubscribe),
                catchError(this.catchError),
                finalize(() => { this.isLoading = false }),
            )
            .subscribe(
                ([dataHotel, isFavorite, dataRoomGroups, dataFacilities]: any) => {
                    this.hotel = new Hotel(dataHotel.data.hotel);
                    this.isFavorite = isFavorite.data;
                    this.roomGroups = ((dataRoomGroups.data || []).roomGroups || []).map((item: any) => new RoomGroup(item));
                    this.facilities = (dataFacilities.data || []).map((item: IFacility) => {
                        return {
                            name: item.name,
                            photo: item.photo,
                            facilities: item.facilities
                        }
                    })
                },
                // error
                (errs: any) => {
                    this.handleErrors(errs);
                },
                // complete
                () => { }
            );
    }

    // fn detect unavailable hotel
    detectHotelUnavailable = (): void => {

        this.isExpired = this.hotel.isSoldOut;
        /*
        let data = this._storage.getItem(CSTORAGE.BEST_HOTEL);
    
        if (!this.utilityHelper.isNullOrUndefined(data)) {
          let now = moment();
          if ((Number(data.available) <= 0 || now.diff(moment(data.checkIn)) > 0) && data.code === this.code) {
            this.isExpired = true;
          }
        }*/
    };

    getRoomGroup(code: string, params: HotelStayInfo) {
        this.isLoading = true;
        this._hotelRepo.getRoomGroup(code, params)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                catchError(this.catchError),
                finalize(() => { this.isLoading = false }),
            )
            .subscribe(
                (res: any) => {
                    this.roomGroups = ((res.data || []).roomGroups || []).map((item: any) => new RoomGroup(item));
                    console.log(this.roomGroups);
                },
                // error
                (errors) => { this.handleErrors(errors); },
                // complete
                () => { }
            )
    }

    // fn open galery popup
    openGalleryWith = (photo: Photo[]) => {
        this.galleryImages = photo.map((photo: Photo) => {
            return {
                small: photo.src,
                medium: photo.src,
                big: photo.src,
                description: `${photo.description}`
            };
        });
        this.galleryPopup.show();
    };

    onFavourite(code: string) {
        this.isLoading = true;
        this._hotelRepo.postFavoriteHotel(code)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                catchError(this.catchError),
                finalize(() => { this.isLoading = false }),
            )
            .subscribe(
                (res: any) => {
                    if (res.code === 'Success') {
                        this.isFavorite = res.data;
                    } else this.handleErrors(new Error(res.errors[0]));
                },
                // error
                (errs: any) => {
                    this.handleErrors(errs);
                },
                // complete
                () => {
                }
            )
    };

    getHotelFavourite() {
        this._hotelRepo.getFavouriteHotel(this.code)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                catchError(this.catchError),
                finalize(() => { this.isLoading = false }),
            )
            .subscribe(
                (res: any) => {
                    if (res.code === 'Success') {
                        this.isFavorite = res.data;
                    } else this.handleErrors(new Error(res.errors[0]));
                },
                // error
                (errs: any) => {
                    this.handleErrors(errs);
                },
                // complete
                () => {
                }
            )
    }

    openPopup(popup: string) {
        switch (popup) {
            case 'description': {
                this.descriptionPopup.show();
                break;
            }
            case 'facility': {
                this.facilityPopup.show();
                break;
            }
            case 'map': {
                this.fullScreenMap.show();
                break;
            }
            case 'share': {
                this.socialSharingPopup.show();
                break;
            }
            case 'room': {
                this.roomPopup.show();
                break;
            }
            case 'place': {
                this.hotPlacePopup.show();
                break;
            }
            case 'calendar': {
                this.datePopup.show();
                break;
            }
            default:
                break;
        }
    }

    onChangeDateCheckInCheckOut(dates: IDate) {
        this.selectedDate = dates;
        this.nights = this.selectedDate.end.diff(this.selectedDate.start, 'days');

        //update search param
        this.stayInfo.checkIn = this.selectedDate.start.format("YYYY-MM-DD");
        this.stayInfo.checkOut = this.selectedDate.end.format("YYYY-MM-DD");

        // this.getRoomGroup(this.code, this.stayInfo);
        this._router.navigate([`hotel/${this.code}/detail`], { queryParams: Object.assign({}, this.params, { checkIn: this.stayInfo.checkIn, checkOut: this.stayInfo.checkOut }) });

    }

    onChangeRoomNumber(data: any[]) {
        //update search param
        this.rooms = data.length;
        this.stayInfo.rooms = this.rooms;
        this.stayInfo.roomOccupancies = data;

        this.passengers = data.map((item: any) => Object.keys(item).map(key => item[key]))
            .map((item: any[]) => item.reduce((acc, cur) => acc + cur))
            .reduce((acc, cur) => acc + cur);

        // update query param
        this._router.navigate([`hotel/${this.code}/detail`], { queryParams: Object.assign({}, this.params, { rooms: this.rooms, roomOccupancies: this.hashingRoomOccupanciesToParams(data) }) })

        // this.getRoomGroup(this.code, this.stayInfo);
    }

    //hash object roomOccupancies -> params search roomOccupancies (format: 1-1,2-0)
    hashingRoomOccupanciesToParams = (roomOcc: any[]) => {
        if (!!roomOcc) {
            let result = '';
            for (let i = 0; i < roomOcc.length; i++) {
                result += `${i != 0 ? ',' : ''}${roomOcc[i].adults.toString()}-${roomOcc[i].children.toString()}`
            }
            return result;
        }
        else {
            return '1-0';
        }
    }

    mapDataPassengerAndRoom(type: TYPE_PASSENGER, data) {
        return {
            title: (type === TYPE_PASSENGER.ADULT ? 'Người lớn' : 'Trẻ em'), value: data, description: (type === TYPE_PASSENGER.ADULT ? 'Từ 12 tuổi trở lên' : 'Dưới 11 tuổi'), type: (type === TYPE_PASSENGER.ADULT ? 'adult' : 'children')
        }
    }

    mapRomOccupancies(data: any[]): any[] {
        return data.map((room, key): any => room
            .map((item: any) => item.value))
            .map((data: any) => ({
                adults: data[0],
                children: data[1]
            }));
    }

    onBookHotel(room: RoomGroup) {
        this._storage.setItem(CSTORAGE.ROOM_BOOKING, room);
        this._router.navigate(['hotel/booking']);
    }

    //fn handle error
    handleErrors(error: any) {

        if (error instanceof HttpErrorResponse) {
            this._toastr.error(`${error.message}`, '', { timeOut: 3000 });
        }
        else if (error instanceof Error) {
            this._toastr.error(`${!!error.value ? error.value : 'Có lỗi xảy ra, Vui lòng kiểm tra lại'}`, '', { timeOut: 3000 });
        }
        else {
            this._toastr.error(`Có lỗi xảy ra, Vui lòng kiểm tra lại`, '', { timeOut: 3000 });
        } error
        this._spinner.hide();
    }

}

interface IDate {
    start?: moment.Moment,
    end?: moment.Moment
}

interface IFacility {
    code: string;
    name: string;
    photo: Photo;
    facilities: string[]
}
