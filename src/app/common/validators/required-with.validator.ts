import {AbstractControl} from '@angular/forms';

export class RequiredWithValidator {

  public static validate(flag: boolean = false) {

    return (c: AbstractControl) => {
      return (flag && (c.value === null
        || c.value === undefined
        || typeof c.value === 'undefined'
        || c.value === '')) ? {required: true} : null;
    };
  }
}
