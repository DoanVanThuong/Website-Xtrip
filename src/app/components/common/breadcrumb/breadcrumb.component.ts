import {Component, ViewEncapsulation, Input} from '@angular/core';
import {AppBase} from '../../../app.base';

@Component({
  selector: 'app-breadcrumb-desktop',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BreadCrumbDesktopComponent extends AppBase {

  @Input() items: IBreadCrumb[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {

  }

  ngOnChanges() {
  }
}


interface IBreadCrumb {
  title: string;
  link: string;
  queryParams?: string
}