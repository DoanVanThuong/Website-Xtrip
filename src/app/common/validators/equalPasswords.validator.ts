import {AbstractControl, FormGroup} from '@angular/forms';

export class EqualPasswordsValidator {

  public static euqalWith(firstField: string, secondField: string, flag: boolean = false) {
    return (c: FormGroup) => {

      return (flag && (c.controls
        && c.controls[firstField].value == c.controls[secondField].value)) ? {
        equalPassword: true
      } : null;
    };
  }

  public static validate(c: AbstractControl) {

    let password = c.get('password').value; // to get value in input tag
    let confirmPassword = c.get('confirmPassword').value; // to get value in input tag

    if (password != confirmPassword) {
      c.get('confirmPassword').setErrors({
        equalPassword: true
      });
    } else {
      return null;
    }

    /*return (c: FormGroup) => {

      return (c.controls && c.controls[firstField].value == c.controls[secondField].value) ? null : {
        passwordEqual: {
          valid: false
        }
      };
    }*/
  }
}
