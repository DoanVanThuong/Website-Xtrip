import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AppBase} from '../../app.base';

@Component({
  selector: 'app-back',
  template: `
    <a class="back-to"
       (click)="backTo()">
      <img class="m-b-none m-t-5 size-16x16"
           [class.size-24x24]="version == 2"
           [src]="version == 2 ? 'assets/images/icon/icon-back.svg' : 'assets/images/icon-back.png'"
           alt="icon"/>
    </a>
  `
})
export class BackTo extends AppBase{

  @Input() version: number = 1;
  @Input() url: string = null;
  @Input() queryParams: any = {};

  constructor(private location: Location,
              private _route: Router) {
    super();
  }

  // fn back event
  backTo = () => {

    if (!!this.url) {
      this._route.navigate([this.url], {queryParams: this.queryParams});
    } else {
      // this.location.back();
      window.history.back();
    }
  };
}