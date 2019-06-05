import {Component, Input} from '@angular/core';

@Component({
  selector: 'error-notifications',
  template: `
    <div class="alert alert-danger">
      <p *ngFor="let error of errors">{{ error.errorMessage }}</p>
    </div>
  `,
})

export class ErrorNotifications {
  @Input() errors: Array<any> = [];
}
