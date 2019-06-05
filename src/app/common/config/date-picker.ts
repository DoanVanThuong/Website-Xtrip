import { CMONTHS, CWEEKS_SHORT } from '../../app.constants';
import * as moment from 'moment';

//Flight
export const LOCALEDATEFLIGHT = {
  format: 'DD/MM/YYYY',
  applyLabel: 'Chọn ngày này',
  cancelLabel: 'Bỏ qua',
  separator: ' - ',
  daysOfWeek: CWEEKS_SHORT,
  monthNames: CMONTHS
};

export const SINGLEDATEPICKER: any = {
  singleDatePicker: true,
  locale: LOCALEDATEFLIGHT,
  opens: 'center',
  minDate: moment(),
  autoApply: false,
};

export const RANGEDATEPICKER: any = {
  singleDatePicker: false,
  locale: LOCALEDATEFLIGHT,
  opens: 'center',
  minDate: moment(),
  autoApply: false
};