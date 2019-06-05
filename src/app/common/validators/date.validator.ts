import {FormGroup, AbstractControl} from '@angular/forms';
import {UtilityHelper} from "../helpers";
import * as moment from "moment";

export class DateValidator {

  public static validate(input: AbstractControl) {

    return (!input.value || (!!input.value && UtilityHelper.isDate(input.value))) ? null : {
      validateDate: {
        valid: false
      }
    };
  }

  public static validateNewer(startDate, endDate) {
    return (c: FormGroup) => {
      if (!c.controls[startDate].value || !c.controls[endDate].value) {
        return null;
      }
      if (!UtilityHelper.isDate(c.controls[startDate].value) || !UtilityHelper.isDate(c.controls[startDate].value)) {
        return null;
      }

      let start = new Date(c.controls[startDate].value).getTime();
      let end = new Date(c.controls[endDate].value).getTime();

      return (start <= end) ? null : {
        validateNewer: {
          valid: false
        }
      };
    }
  }

  public static validateLatest(input: AbstractControl) {
    if (!input.value || !UtilityHelper.isDate(input.value)) {
      return null;
    }

    let time = new Date(moment(new Date(input.value)).format('YYYY-MM-DD')).getTime();
    let current = new Date(moment(new Date()).format('YYYY-MM-DD')).getTime();

    return (time >= current) ? null : {
      validateLatest: {
        valid: false
      }
    };
  }
}
