import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faq-index-desktop',
  templateUrl: './faq-index-page.component.html',
  styleUrls: ['./faq-index-page.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FaqIndexPageComponent {

  params: any = {};

  constructor(
    private _activateRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._activateRoute.queryParams.subscribe((params) => {
      this.params = params;
    });
  }
}
