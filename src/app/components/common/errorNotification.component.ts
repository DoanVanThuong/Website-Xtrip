import {Component, Input} from '@angular/core';

@Component({
  selector: 'error-notification',
  template: `
    <div class="text-danger" *ngIf="!!error">{{ error }}</div>
  `,
})

export class ErrorNotification {
  @Input() error: any = null;
}
