import { AppPage } from './app.base';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export abstract class AppForm extends AppPage {

  constructor() {
    super();
  }

  showValid: boolean = false;
  file: any = null;

  /*** Reset validator form ***/
  resetForm(form: FormGroup, cleanFields: boolean = true, cleanValidate: boolean = true): void {

    if (cleanFields) {
      form.reset();
    }


    _.forEach(form.controls, function (control, name) {

      if (cleanValidate) {
        control.setErrors(null);
      }
      control.markAsUntouched({ onlySelf: true });
      control.markAsPristine({ onlySelf: true });

      if (control instanceof FormGroup) {
        if (name == 'passwords') {
          control.reset();
        }
      } else if (control instanceof FormControl) {

      }
    });
  }

  resetFormWithFeilds(form: FormGroup, fields: Array<string>): void {

    _.forEach(form.controls, (control, name) => {

      if (control instanceof FormControl && fields.indexOf(name) !== -1) {
        control.setErrors(null);
        control.reset();
        control.markAsUntouched({ onlySelf: true });
        control.markAsPristine({ onlySelf: true });
      }
    });
  }
}
