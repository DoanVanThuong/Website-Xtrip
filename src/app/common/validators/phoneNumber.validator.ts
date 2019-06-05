import {AbstractControl} from '@angular/forms';
import {CPATTERN} from '../../app.constants';

export class PhoneNumberValidator {
  public static validate(c: AbstractControl) {
    let regexp = CPATTERN.PHONE_REGEX;

    return regexp.test(c.value) ? null : {
      phone: true
    };
  }

  public static existNumber(c: AbstractControl) {
    let regex = CPATTERN.PHONE_REGEX;

    if (c.value.length) {
      return regex.test(c.value) ? null : {phone: true};
    }
    return null;
  }
}
