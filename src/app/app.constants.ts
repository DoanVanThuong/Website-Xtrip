export const BASE_SEO_URL: string = '//devapi.xtrip.vn';

export const CVOCATIVE = {
  ADULT: ['Ông', 'Bà', 'Cô'],
  CHILD: ['Bé trai', 'Bé gái']
};

export const DATE_FORMAT = {
  DATE: 'DD/MM/YYYY',
  VALUE: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY hh:mm:ss'
};

export const EVENT: any = {
  REGISTERED: 'security:registered',
  LOGGED_IN: 'security:logged-in',
  LOGGED_OUT: 'security:logged-out',
  BOOKING_SYNCED: 'booking:synced',
  OPTIONAL_CHANGED: 'optional:changed',
  USER_REQUESTED: 'user:requested',
  NOTIFICATION_CHANGED: 'notification:changed',
  UNAUTHORIZED: 'unauthorized',
  OFFLINE: 'network:offline',
  SLIDE_CHANGED: 'slide:changed'
};

export const MOBISCROLL_CONFIG = {
  theme: 'mobiscroll',
  lang: 'vi',
  display: 'center',
  cssClass: 'mbsc-custom',
  minWidth: 90,
  showLabel: true,
  rows: 3,
  buttons: [
    {text: 'Hủy', handler: 'cancel', cssClass: 'btn btn-cancel-outline mn-w-120'},
    {},
    {text: 'Đồng ý', handler: 'set', cssClass: 'btn btn-main mn-w-120'}
  ]
};

export const CAPP = {
  PROJECT_NAME: 'Xtrip',
  UNIT_POINT: 100, // unit to exchange from point to money (vnd)
  MIN_POINT: 0, // min point use to payment
  ASSETS_PLACEHOLDER: 'assets/images/default-account-square.png',
  DATE_FORMAT: 'DD/MM/YYYY',
  DATE_SHORT_FORMAT: 'DD/MM/YYYY',
  DATE_FORMAT_VALUE: 'YYYY-MM-DD',
  LATITUDE: -25.363,
  LONGITUDE: 131.044,
  FEE: 0,
  IMAGE_MAX_SIZE: 1080,
  IMAGE_LIMIT: 5,
  IMAGE_CHAT_LIMIT: 4,

  PENDING: 5, // pending request 5s

  INFANT_OLD: 2,
  CHILD_OLD: 12,
  VNA_WEIGHT: 20,

  INFANT_OLD_TOUR: 2,
  CHILD_OLD_TOUR: 11,

  HOTLINE: '1800 6782',
  SUPPORT_CENTER: '1800 6782',
  EMAIL: 'support@xtrip.vn',
  ADDRESS: '136 Nguyễn Duy Dương, Phường 9, Quận 5, Thành phố Hồ Chí Minh.',

  IOS_APP_ID: '1380598007',
  ANDROID_APP_ID: 'com.xtrip.production',

  MESSENGER_LINK: 'https://m.me/xtrip.vn',
  ZALO_LINK: 'https://zalo.me/2318658324264498333',
  APP_LINK: 'https://xtrip.vn/go',
  ANDROID_LINK: 'https://xtrip.vn/app/android',
  IOS_LINK: 'https://xtrip.vn/app/iOS',
  FACEBOOK_LINK: 'https://www.facebook.com/xtrip.vn/',
  YOUTUBE_LINK: 'https://www.youtube.com/channel/UC9o3Svw0CGopaCX9qrEWzkg',
  INSTAGRAM_LINK: 'https://www.instagram.com/xtrip.vn/',
};

export const CMONTHS = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
export const CMONTHS_SHORT = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];

export const CWEEKS = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
export const CWEEKS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export const CSECURITY = {
  tokenName: 'auth_token',
  refreshToken: 'refresh_token',
  expiresIn: 'expires_in'
};

export const CPATTERN = {
  EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE_REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,5}$/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NUMBER: /^\d+$/,
  PHONE_NUMBER: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
  SSN: /^(\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX)$/,
  DATE: /[0-9]{2}/,
  MONTH: /[0-9]{2}/,
  YEAR: /[0-9]{4}/,
  AGE: /^[1-9]+[0-9]*$/,
  PRICE: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/,
  maskDOB: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  TIME_MASK: [/\d/, /\d/, ':', /\d/, /\d/],
  DATE_MASK: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  DATETIME_MASK: [/\d/, /\d/, ':', /\d/, /\d/, ' ', /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  NUMBER_MASK: [/^\d+$/]
};

export const CSTORAGE = {

  BANNER_SETTING: 'xtrip:banner.setting',

  // common
  COUNTRIES: 'xtravel:countries',
  DEVICE: 'xtravel:device.id',
  PASSENGER: 'xtravel:passenger',
  BOOKED_TOUR: 'xtravel:tour.booked',
  BOOKED_HOTEL: 'xtravel:hotel.booked',
  BOOKED_FLIGHT: 'xtravel:flight.booked',
  AIRPORT: 'xtravel:airport',
  CARRIER: 'xtravel:carrier',
  LOGINROUTERSTATE: 'xtravel:login.router.state',
  RESERVATION_CODE: 'xtravel:booking.code',
  BEST_HOTEL: 'xtravel:hotel.best.price',
  BEST_TOUR: 'xtravel:tour.best.price',
  CONTACT_INFO: 'xtravel:cod.contact',
  // tour
  TOUR: 'xtravel:tour.detail',
  TOUR_BOOKING: 'xtravel:booking.tour',
  TOUR_ARRIVAL: 'xtravel:tour.arrival',
  TOUR_DEPARTURE: 'xtravel:tour.departure',
  TOUR_PRICE_SUMMARY: 'xtravel:tour.price.summary',
  TOUR_REQUEST_ID: 'xtrip:tour.request.id',
  TOUR_DATE_SEARCH: 'xtrip:tour.date.search',

  // flight
  FLIGHT_SEARCH_2: 'xtravel:flight.search2',
  FLIGHT_PASSENGER: 'xtravel:flight.passenger',
  FLIGHT_LOCATION: 'xtravel:flight.location',
  FLIGHT_START: 'xtravel:flight.start',
  FLIGHT_END: 'xtravel:flight.end',
  FLIGHT_START_DATE: 'xtravel:flight.start.date',
  FLIGHT_END_DATE: 'xtravel:flight.end.date',
  FLIGHT_CHEAP: 'xtravel:flight.cheap',
  FLIGHT_SEARCH: 'xtravel:flight.search',
  FLIGHT_BOOKING_PAY: 'xtravel:booking.flight.prices',
  FLIGHT_BOOKING: 'xtravel:booking.flight',
  FLIGHT_BOOKING_MODE: 'xtravel:booking.flight.mode',
  FLIGHT_1WAY: 'xtravel:flight.1way',
  FLIGHT_2WAY1: 'xtravel:flight.2way1',
  FLIGHT_2WAY2: 'xtravel:flight.2way2',
  FILTER_DATA: 'xtravel:flight.filter',
  FILTER_HISTORY: 'xtravel:flight.filter.history',
  FLIGHT_ISSEARCH: 'xtravel:flight.issearch',
  FLIGHT_PRICE_SUMMARY: 'xtravel:flight.price.summary',
  FLIGHT_REQUEST_ID: 'xtrip:flight.request.id',

  // hotel
  HOTEL_LOCATION: 'xtravel:hotel.location',
  HOTEL_SEARCH: 'xtravel:hotel.search',
  HOTEL: 'xtravel:hotel.detail',
  ROOM: 'xtravel:room.detail',
  HOTEL_BOOKING: 'xtravel:booking.hotel',
  ROOM_BOOKING: 'xtravel:booking.room',
  ROOM_BOOKING_INFO: 'xtravel:booking.room.info',
  HOTEL_BOOKER: 'xtravel:booker',
  HOTEL_DESTINATION: 'xtravel:hotel.search.destination',
  HOTEL_PRICE_SUMMARY: 'xtravel:hotel.price.summary',
  HOTEL_REQUEST_ID: 'xtrip:hotel.request.id',

  // product
  PRODUCT_DESTINATION: 'xtrip:product.destination',
  PRODUCT_LOCATION: 'xtrip:product.search.location',
  PRODUCT_COMBO: 'xtrip:product.combo',
  PRODUCT_REQUEST_ID: 'xtrip:product.request.id',
  PRODUCT_BOOKING: 'xtrip:product.booking',

  // payment
  PAYMENT_METHOD: 'xtravel:payment.method',
  PAYMENT_OFFER: 'xtrip:payment.offer',
  PAYMENT_VAT: 'xtrip:payment.vat.form',
  PAYMENT_INFO: 'xtrip:payment.info'
};

export const CBOOKING = {
  FLIGHT: 'flight',
  TOUR: 'tour',
  HOTEL: 'hotel',
  PRODUCT: 'product' // activities
};

export const FLIGHT_FILTER: any = {
  sort: {
    price: 0,
    depart: 1,
    landing: 2,
    duration: 3,
  },
  stop: {
    all: 0,
    stop0: 1,
    stop1: 2,
    more: 3,
  }
};

export const TRANSPORT_TYPE: any = {
  CAR: 'Car',
  FLIGHT: 'Flight',
  YATCH: 'Yatch',
  TRAIN: 'Train',
};

export const PAYMENT_METHOD = {
  TRANSFER: 'Transfer',
  VISA: 'Visa',
  OFFICE: 'Office',
  STORE: 'Store',
  ATM: 'ATM',
  COD: 'COD',
  OZD: 'OZD',
  CYBER: 'Cyber'
};

export const BOOKING_STATUS: any = {
  DEPOSIT: 4,// đặt cọc
  WAITING: 1, // đang xuất vé
  UNPAID: 2, // chưa thanh toán
  UNSUCCESSFUL: 2, // thanh toán thất bại
  CANCEL: 3, // hủy
  ERROR: 3, // lỗi
  SUCCESS: 5,
  PAID: 5, // thanh toán thành công / xuất vé thành công
  PENDING: 7 // chờ xác thực
};

export const MODULE: any = {
  FLIGHT: 'flight',
  TOUR: 'tour',
  HOTEL: 'hotel',
  PRODUCT: 'product'
};

export const BOOKING_MODULE: any = {
  FLIGHT: 'flight',
  TOUR: 'tour',
  HOTEL: 'hotel',
  PRODUCT: 'product'
};

//product type
export const PRODUCT_TYPE = {
  ALL: 'all',
  FREE_AND_EASY: 'daytour',
  ACTIVITIES: 'activities'
};

//product type alias from api
export const PRODUCT_TYPE_API: any = {
  FREE_AND_EASY: 'daytour',
  ACTIVITIES: 'activities'
};

//tour type
export const TOUR_TYPE: any = {
  DOMESTIC: 'domestic',
  INTERNATIONAL: 'international'
};

export const PASSENGER_TYPE: any = {
  ADULT: 'ADT',
  CHILDREN: 'CHD',
  INFANT: 'INF'
};

export const MAP_POINT: any = {
  LAT: 10.7584337,
  LNG: 106.6712336,
  ZOOM: 15
};

