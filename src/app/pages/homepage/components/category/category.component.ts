import {Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {PRODUCT_TYPE} from 'app/app.constants';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'home-category',
  templateUrl: './category.component.html',
  styleUrls: ['category.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeCategoryComponent extends AppPage {

  PRODUCT_TYPE = PRODUCT_TYPE;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _ele: ElementRef,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();
  }

  ngOnInit() {

  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {

    if (isPlatformBrowser(this.platformID)) {

      const ele = $(this._ele.nativeElement).find('.block-category');
      const subCat = $('.sub-category');
      const position = ele.offset().top + ele.outerHeight();

      subCat.css({
        top: $(window).scrollTop() >= position ? 0 : -100
      });
    }

  }
}
