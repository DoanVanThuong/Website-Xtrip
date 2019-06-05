import {AbstractControl} from '@angular/forms';
import {CPATTERN} from "../../app.constants";

export class PriceValidator {

  public static validate(c: AbstractControl) {
    let regexp = CPATTERN.PRICE;

    return regexp.test(c.value) ? null : {
        validatePrice: {
          valid: false
        }
      };
  }
}
