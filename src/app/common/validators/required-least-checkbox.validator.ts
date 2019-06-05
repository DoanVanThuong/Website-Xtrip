import {AbstractControl, FormArray, FormGroup, ValidatorFn} from '@angular/forms';

export class RequiredLeastCheckboxValidator {

  public static validate(group: FormGroup) {

    let checked = 0;

    Object.keys(group.controls).forEach((key: any) => {
      const control = group.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    return checked > 0 ? null : {
      check_invalid: true
    };
  }

  public static validateList(fieldName: string): ValidatorFn {
    return (array: FormArray) => {

      let checked = 0;

      Object.keys(array.controls).forEach((key: any) => {

        const control = array.controls[key].get(`${fieldName}-${key}`);

        if (control.value === true) {
          checked++;
        }
      });

      return checked > 0 ? null : {
        check_invalid: true
      };

      return null;
    };
  }

}
