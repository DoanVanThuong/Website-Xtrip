import {FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import {UtilityHelper} from '../helpers';
import * as moment from 'moment';
import {CAPP, DATE_FORMAT} from '../../app.constants';
import {DATE} from 'ngx-bootstrap/chronos/units/constants';

export class PassportExpiryValidator {

  public static validate(control: AbstractControl) {

    const now = moment();
    const utilityHelper = new UtilityHelper();

    if (!!control.value) {

      let valid = true;
      if (typeof control.value === 'string') {
        valid = utilityHelper.validDateFormatWith(control.value, DATE_FORMAT.DATE);
      }

      const date = moment(control.value, DATE_FORMAT.DATE);

      if (!valid || now.diff(date) > 0) {
        return {
          date_invalid: true
        };
      } else {
        return Math.abs(now.diff(date, 'months', true)) > 6 ? null : {
          passport_less: true
        };
      }
    }

    return null;
  }
}
