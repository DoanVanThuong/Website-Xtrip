import {Component, Input, Inject, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {AppBase} from "../../../app.base";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent extends AppBase {

  @Input() backgroundColor = '#00BF8F';

  isSpinnerVisible: boolean = true;

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document) {

    super();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isSpinnerVisible = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isSpinnerVisible = false;
      }
    }, () => {
      this.isSpinnerVisible = false;
    });
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
