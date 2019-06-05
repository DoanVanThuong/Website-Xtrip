import {BOOKING_STATUS, PAYMENT_METHOD} from '../../app.constants';
import * as moment from 'moment';
import {isArray} from 'rxjs/util/isArray';
import {isObject} from 'rxjs/util/isObject';
import * as _ from 'lodash';
import {environment} from '../../../environments/environment';

declare var $: any;

const domain: string = 'vietmaptravel.vn';

export class UtilityHelper {

  // fn detect vietmaptravel domain
  isVietmapTravel = (text: string = ''): boolean => {

    if (!text && !!window) {
      text = window.location.href;
    }

    return text.indexOf(domain) !== -1;
  };

  // fn get base url
  getBaseURL = (): string => {
    return `https://${environment.API_URL}`;
  };

  // redirect to path
  redirectTo = (path: string, params: any = {}) => {
    window.location.href = `${path}${!!params ? ('?' + $.param(params)) : ''}`;
  };

  // fn random with min/max
  random = (min: number = 0, max: number = 0): number => {
    return Math.round(Math.random() * (max - min) + min);
  };

  // swap
  swap(resource: any, target: any) {

    let temp = resource;
    resource = target;
    target = temp;

    return [target, resource];
  }

  // fn mark image size to scale
  markImageSize = (url: string = '', width: number = 400, height: number = 0, crop: boolean = false) => {
    if (!url) {
      return 'assets/images/no-thumbnail.png';
    }

    if (url.indexOf('?') === -1) {
      url += '?';
    }

    let params = {};
    if (!!width) {
      params['width'] = width;
    }

    if (!!height) {
      params['height'] = height;
    }

    if (!!crop) {
      params['crop'] = '1';
    }

    return url + this.jsonToQueryParams(params);
  };

  jsonToQueryParams = (object: any): string => {

    let queryParams: string = '';

    for (let key in object) {

      let item = object[key];

      if (item instanceof Array) {
        item = item.join(',');
      } else if (item instanceof Object) {
        item = this.jsonToQueryParams(item);
      }

      queryParams += `${key}=${item}&`;
    }

    if (!!queryParams.length) {
      queryParams = queryParams.substr(0, queryParams.length - 1);
    }

    return queryParams;
  };

  // fn detect null or undefined
  isNullOrUndefined(...args): boolean {
    let result = false;

    args.forEach(item => {
      if (typeof (item) === 'undefined' || item === '' || item === null || item === undefined) {
        result = true;
      } else {
        result = false;
      }
    });
    return result;
  }

  // fn convert currency with zero
  currencyConverterWithZero(money: string, locale: string = 'vn-VN'): string {
    if (typeof (money) === 'string') {
      money = this.currencyRemoveChar(money, ',');
    }
    let l10nEN = new Intl.NumberFormat(locale);
    if (money !== '') {
      return l10nEN.format(+money);
    }
    return '0';
  }

  // fn currency remove char
  currencyRemoveChar(money: string, char: string) {
    let result = '';
    switch (char) {
      case ',':
        result = money.replace(/,/g, '');
        break;
      case '.':
        result = money.replace(/./g, '');
        break;
      default:
        result = money;
        break;
    }
    return result;
  }

  // fn convert stars number
  convertNumberToArray = (number: number = 0) => {
    return Array.from(Array(number).keys()).map(i => i);
  };

  json2String = (data: any = Object) => {
    return JSON.stringify(data);
  };

  string2Json = (data: string = '') => {
    return JSON.parse(data);
  };

  // fn convert passenger
  convertPassenger = (adult: number = 0, child: number = 0, infant: number = 0) => {
    let passenger = !this.isNullOrUndefined(adult) && Number(adult) ? `${adult} người lớn` : '';

    passenger += !this.isNullOrUndefined(child) && Number(child) ? `, ${child} trẻ em` : '';
    passenger += !this.isNullOrUndefined(infant) && Number(infant) ? `, ${infant} em bé` : '';

    return passenger;
  };

  // fn passengers
  getPassengers = (passengers: any = '') => {

    let adults = 0;
    let chillren = 0;
    let infants = 0;

    if (typeof passengers === 'string') {
      return passengers;
    }

    for (let index in passengers) {
      let passenger = passengers[index];

      switch (passenger.passengerType) {
        case 'ADT': {
          adults++;
          break;
        }
        case 'CHD': {
          chillren++;
          break;
        }
        case 'INF': {
          infants++;
          break;
        }
      }
    }

    return ((adults > 0 ? `${adults} người lớn` : '') + (chillren > 0 ? `, ${chillren} trẻ em` : '') + (infants > 0 ? `, ${infants} em bé` : ''));
  };

  // fn hour format
  hourFormat = (time: number = 0) => {

    let hour = Math.floor(time / (60 * 60));
    let minute = Math.floor((time % (60 * 60)) / 60);
    let second = Math.floor((time % (60 * 60)) % 60);

    return this.pad(hour) + ':' + this.pad(minute) + ':' + this.pad(second);
  };

  // pad of number
  pad = (num: number = 0) => {
    return ('0' + num).slice(-2);
  };

  // fn get duration time
  durationTime(time: number) {

    if (!time) {
      return;
    }

    let hour = Math.floor(time / 60);
    let min = time % 60;
    if (!!hour) {
      return `${hour}h${min}p`;
    }
    return `${min}p`;
  }

  // convert Date by format
  convertDateWith(datetime: any = '', format: string = 'DD/MM/YYYY') {

    if (!format) {
      format = 'DD/MM/YYYY';
    }

    let date = moment(datetime);
    if (!date.isValid()) {
      date = moment(datetime, 'DD/MM/YYYY');
    }

    return date.format(format);
  }

  // fn calculate diff year
  diffDistanceYear(time: string = '', format: string = 'DD/MM/YYYY') {
    let date = moment(time, format);
    let now = moment();

    return now.diff(date, 'years', true);
  };

  // fn convert time
  convertTime = (time: number = 0): string => {
    let hour = Math.floor(time / 60);
    let min = time % 60;

    return (hour > 0 ? `${hour}h` : '') + (min > 0 ? `${min}p` : '');
  };

  // fn convert number to list number
  num2List = (number: number = 0) => {
    return Array.from(Array(number).keys()).map(i => i + 1);
  };

  // fn calculate range days
  calcDay = (dateIn: string = '', dateOut: string = '') => {
    return Math.abs(Math.ceil(moment(dateIn).diff(moment(dateOut)) / (60 * 60 * 24 * 1000)));
  };

  // fn get
  getNext12Months = (fromNow: boolean = true) => {

    let list = [];

    let now = moment();
    if (!fromNow) {
      now.add(1, 'month');
    }

    for (let i = 0; i < 12; i++) {
      let month = now.clone().add(i, 'month');

      list.push({
        display: `Tháng ${month.month() + 1}${month.year() !== now.year() ? (', ' + month.year()) : ''}`,
        value: month
      });
    }

    return list;
  };

  // fn get next night with
  getNextNightsWith = (now: any = null, days: number = 1, fromNow: boolean = true) => {

    let list = [];

    if (!now) {
      now = moment();
    }

    for (let i = 0; i < days; i++) {
      let date = now.clone().add(i, 'day');
      list.push({
        display: `${i + 1} đêm`,
        value: i + 1,
        date: date
      });
    }

    return list;
  };

  // fn detect is date format
  public static isDate(date?: any) {
    if (!date) {
      return null;
    }

    date = new Date(date);
    return (_.isDate(date) && !_.isNaN(date.getTime()));
  }

  //check exist item in list
  checkInListWith = (item: any = null, list: Array<any> = [], field: any): any => {
    for (let index in list) {
      if (item[field] === list[index][field]) {
        return true;
      }
    }
  };

  // fn count days
  public countDays = (date: any) => {
    return Math.abs(Math.round(moment(date).diff(moment()) / (60 * 60 * 24 * 1000)));
  };

  // fn find index in list
  findIndexBy = (target: any, list: Array<any> = [], key: string = 'code'): number => {
    if (this.isNullOrUndefined(target)) {
      return -1;
    }

    return _.findIndex(list, (item: any) => {
      if (typeof item === 'object') {
        return item[key] === target[key];
      }
      return item === target;
    });
  };

  // fn find item in list by key field
  /*findItemInListBy = (target: any = null, list: any[] = [], key: string = 'code'): any => {
    if (this.isNullOrUndefined(target)) {
      return null;
    }

    return _.find(list, (item: any) => {
      return item[key] === target;
    });
  };*/

  // fn find in list
  findInListBy = (target: any, list: Array<any> = [], key: string = 'code'): any => {
    if (this.isNullOrUndefined(target)) {
      return false;
    }

    for (let index in list) {
      if ((!!key && list[index][key] === target[key])) {
        return parseInt(index);
      }
    }

    return false;
  };

  // fn find in list by id
  findInListByID = (target: any, list: Array<any> = []) => {
    return this.findInListBy(target, list, 'id');
  };

  // fn find item in list with key field
  findInListWith = (field: any = null, list: Array<any> = [], key: string = 'code', keyField: string = 'code'): any => {

    if (this.isNullOrUndefined(field) || this.isNullOrUndefined(key)) {
      return false;
    }

    let result = _.find(list, (item: any) => {
      return item[key] === field;
    });

    return result ? (keyField ? result[keyField] : result) : '';
  };

  // fn check valid date with format
  public validDateFormatWith = (datetime: string = '', format: string = 'DD/MM/YYYY') => {
    datetime = datetime.replace('_', '');

    if (datetime.length < format.length) {
      return false;
    }

    return moment(datetime, format).isValid();
  };

  // fn get day in week
  static getDayOfWeek(date: any = null) {

    if (!date) {
      date = moment();
    }

    let day = moment(date).day();
    return day == 0 ? 'CN' : `Thứ ${day + 1}`;
  }

  // fn get day in week
  static getDayOfWeekShortDate(date: any = null) {

    if (!date) {
      date = moment();
    }

    let day = moment(date).day();
    return day == 0 ? 'CN' : `T${day + 1}`;
  }

  // fn get payment method
  getPaymentMethod = (method: string = ''): string => {
    switch (method) {
      case PAYMENT_METHOD.STORE: {
        return 'Cửa hàng';
      }
      case PAYMENT_METHOD.TRANSFER: {
        return 'Chuyển khoản';
      }
      case PAYMENT_METHOD.COD: {
        return 'Thu hộ';
      }
      case PAYMENT_METHOD.OZD: {
        return 'Thanh toán 0 đồng';
      }
      case PAYMENT_METHOD.OFFICE: {
        return 'Văn phòng';
      }
      case PAYMENT_METHOD.CYBER:
      case PAYMENT_METHOD.VISA: {
        return 'Thẻ tín dụng';
      }
      case PAYMENT_METHOD.ATM: {
        return 'Cổng thanh toán ATM';
      }
    }
  };

  // get payment status text
  getPaymentStatusText = (status: number = -1): string => {
    switch (status) {
      case BOOKING_STATUS.PAID: {
        return 'Xuất vé thành công';
      }
      case BOOKING_STATUS.CANCEL: {
        return 'Đã hủy';
      }
      case BOOKING_STATUS.WAITING: {
        return 'Đang xuất vé';
      }
      case BOOKING_STATUS.PENDING: {
        return 'Đang xác thực';
      }
      case BOOKING_STATUS.UNPAID:
      default: {
        return 'Chưa thanh toán';
      }
    }
  };

  //get payment status color and icon
  getColorPaymentStatus(status) {
    switch (status) {
      case BOOKING_STATUS.SUCCESS:
      case BOOKING_STATUS.DEPOSIT: {
        return 'icon-success-white';
      }
      case BOOKING_STATUS.PENDING:
      case BOOKING_STATUS.WAITING: {
        return 'icon-pending-white';
      }
      case BOOKING_STATUS.CANCEL: {
        return 'icon-cancel-white';
      }
      default: {
        return 'icon-unpaid-gray';
      }
    }
  }

  getValueVocative = (title: string = ''): string => {
    switch (title.toLowerCase()) {
      case 'ông': {
        return 'Mr';
      }
      case 'bà': {
        return 'Mrs';
      }
      case 'cô': {
        return 'Mss';
      }
      case 'bé trai': {
        return 'Mstr';
      }
      case 'bé gái': {
        return 'Miss';
      }
    }
  };

  // get vocative of passenger
  static getVocative(title: string = '', type: string = '') {

    let data = {
      adult: {mr: 'Ông', mrs: 'Bà', miss: 'Cô'},
      child: {mstr: 'Bé trai', miss: 'Bé gái'},
      infant: {mstr: 'Bé trai', miss: 'Bé gái'}
    };

    for (let key in data) {
      if (type.toLowerCase() === key) {
        for (let subKey in data[key]) {
          if (title.toLowerCase() === subKey) {
            return data[key][subKey];
          }
        }
      }
    }

    return;
  }

  numberFormat = (price: any, char: string = '.') => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, char)}`;
  };

  // fn detect date format
  isDateWith = (date: any = null, format: any = 'DD/MM/YYYY') => {

    if (!date) {
      return false;
    }

    return moment(date, format).isValid();
  };

  //fn get passenger title
  getPassengerTitle(title: string, type: string) {
    switch (title.toLowerCase()) {
      case 'mr':
        return 'Ông';
      case 'mrs':
        return 'Bà';
      case 'miss':
        return type.toLowerCase() === 'adt' || !type ? 'Cô' : 'Bé gái';
      case 'mstr':
        return 'Bé trai';
      default:
        return title;
    }
  }

  // fn get passenger type with
  getPassengerTypeWith = (type: string = ''): string => {
    switch (type.toLowerCase()) {
      default:
      case 'adult': {
        return 'ADT';
      }
      case 'child': {
        return 'CHD';
      }
      case 'infant': {
        return 'INF';
      }
    }
  };

  // fn get passenger label by type
  getPassengerTypeLabel = (type: string = ''): string => {
    switch (type) {
      case 'ADT': {
        return 'người lớn';
      }
      case 'CHD': {
        return 'trẻ em';
      }
      case 'INF': {
        return 'em bé';
      }
      case 'SNR': {
        return 'người cao tuổi';
      }
      default: {
        return '';
      }
    }
  };

  // fn removeVNI
  removeVNI(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  }

  // fn merge recursive objects
  mergeRecursive(target: any = {}, source: any = {}) {

    if (this.isNullOrUndefined(target)) {
      target = {};
    }

    for (let key in source) {
      try {
        if (source[key].constructor == Object) {
          target[key] = this.mergeRecursive(target[key], source[key]);
        } else {
          target[key] = source[key];
        }

      } catch (e) {
        target[key] = source[key];
      }
    }

    return target;
  };

  // fn convert an object to query params (object)
  convertObjectToQueryParams = (source: any = {}) => {
    let params = {};

    for (let key in source) {

      if (isArray(source[key])) {
        params[key] = source[key].join(',');
      } else if (isObject(source[key])) {

        for (let subKey in source[key]) {

          let keyField = `${subKey}`;

          if (isArray(source[key][subKey])) {
            params[keyField] = source[key][subKey].join(',');
          } else {
            params[keyField] = source[key][subKey];
          }
        }
      } else {
        params[key] = source[key];
      }
    }

    return params;
  };

  // fn build query params to submit
  buildQueryParams = (source: any = {}) => {

    let params = {};

    let exceptions = ['object', 'function'];

    for (let key in source) {
      if (exceptions.indexOf(typeof source[key]) !== -1) {
        continue;
      } else if (!!source[key]) {
        params[key] = source[key];
      }
    }

    return params;
  };

  // fn comparison objects
  equalObject = (source: any, target: any) => {

    if (source === target) {
      return true;
    }

    for (let key in source) {
      switch (typeof source[key]) {
        case 'object': {

          if (!this.equalObject(source[key], target[key])) {
            return false;
          }
          break;
        }
        case 'function': {
          if (typeof (source[key]) == 'undefined'
            || (key != 'equals' && source[key].toString() != source[key].toString())) {
            return false;
          }
          break;
        }
        default: {
          if (source[key] !== target[key]) {
            return false;
          }
          break;
        }
      }
    }

    for (let key in target) {
      if (typeof target[key] === 'undefined') {
        return false;
      }
    }

    return true;
  };

  // sum list
  sumList = (list: Number[] = []): number => {
    return _.sum(list);
  };

  // fn find in list
  findInList = (item: any, list: any[]): boolean => {
    return !!(list.indexOf(item) !== -1);
  };

  // fn find item not belong to list
  findNotInList = (item: any, list: any[]): boolean => {
    return !!(list.indexOf(item) == -1);
  };

  // fn format number to price currency
  formatCurrency = (number: number = 0, char: string = '.'): any => {
    return (this.isNullOrUndefined(number) ? 0 : Number(number)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, char);
  };

  // fn break string
  breakString = (str: string = ''): Array<string> => {
    return _.filter(str.split(/(?:\r\n|\r|\n|\\n|\\r)/g), (text: any) => {
      return !!text;
    });
  };

  isUrlify = (text: string = ''): boolean => {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    return urlRegex.test(text);
  };

  getTextPaymentByCode(text: string = '') {
    switch (text.toLowerCase()) {
      case 'transfer': {
        return 'Thanh toán chuyển khoản';
      }
      case 'office': {
        return 'Thanh toán tại văn phòng Xtrip';
      }
      case 'store': {
        return 'Thanh toán tại cửa hàng tiện dụng';
      }
      case 'atm': {
        return 'Thanh toán ATM nội địa';
      }
      case 'visa': {
        return 'Thanh toán thẻ tín dụng';
      }
      case 'cod': {
        return 'Thanh toán thu hộ';
      }
      default: {
        return '';
      }
    }
  };

  //hasing Room Occupancies to query params
  hashingRoomOccupanciesToParams = (roomOcc: any) => {
    if(!!roomOcc) {
      let result = '';
      for(let i = 0; i < roomOcc.length; i++) {
        result += `${i != 0 ? ',' : ''}${roomOcc[i].adults.toString()}-${roomOcc[i].children.toString()}`
      }
      return result;
    }
    else {
      return '1-0';
    }
  };

  // fn replace formatter
  replaceFormatter = (text: string = '', ...args: any) => {
    for (let index in args) {
      text = text.replace(`{${index}}`, args[index]);
    }
    return text;
  };

};
