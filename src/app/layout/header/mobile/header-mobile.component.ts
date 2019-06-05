import {Component, ContentChild, ElementRef, Inject, Input, PLATFORM_ID, TemplateRef, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['../header.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderMobileComponent extends AppBase {

  @Input() version: number = 1;
  @Input() theme: string = 'default'; // white
  @Input() heading: string = '';
  @Input() description: string = '';

  @Input() back: any = false;
  @Input() confirm: any = false;
  @Input() queryParams: any = null;
  @Input('fixed') isFixed: boolean = false;
  @Input() filter: any = false;
  @Input() shadow: boolean = true;

  @Input() type ?: string = ''; //back; close

  @ContentChild('') headerTitle: TemplateRef<any>;
  @ContentChild('headerDescription') headerDescription: TemplateRef<any>;
  @ContentChild('headerConformBack') headerConfirmBack: TemplateRef<any>;
  @ContentChild('headerFilter') headerFilter: TemplateRef<any>;

  isBack: boolean = false;
  isConfirm: boolean = false;
  isFilter: boolean = false;

  ele: HTMLElement;
  backUrl: string = '';

  constructor(private _ele: ElementRef,
              private _router: Router,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();

    this.ele = this._ele.nativeElement;
  }

  ngOnInit() {

    if (!!this.back) {
      this.isBack = true;
    }

    if (typeof (this.back) === 'string') {
      this.backUrl = this.back;
    }

    if (!!this.confirm) {
      this.isConfirm = true;
    }

    if (!!this.filter) {
      this.isFilter = true;
    }
  }

  ngAfterViewInit() {
    if (this.isFixed) {

      this.onFixedHeader();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformID)) {
      const body: HTMLElement = document.querySelector('body');
      body.classList.remove('fixed-header');
    }
  }

  ngOnChanges() {
    if (this.isFixed) {
      this.onFixedHeader();
    }

    if (this.theme.indexOf('theme') === -1) {
      this.theme = ('theme-' + this.theme);
    }
  }

  // fn back
  backTo = (): void => {
    if (!!this.backUrl) {
      this._router.navigate([this.backUrl], {queryParams: this.queryParams});
    } else {
      // this.location.back();
      window.history.back();
    }
  };

  // fn fixed header top
  onFixedHeader = (): void => {

    if (isPlatformBrowser(this.platformID)) {
      setTimeout(() => {
        const body = $('body');
        body.addClass('fixed-header');

        const header = $('.header.header-mobile');
        const wrapper = $('.wrapper');

        wrapper.css({
          marginTop: header ? header.innerHeight() : 0
        });
      }, 100);
    }

  };
}

@Component({
  selector: 'header-confirm-back',
  template: `
    <ng-content></ng-content>
  `
})
export class HeaderConfirmBack extends AppBase {

  constructor() {
    super();
  }
}

@Component({
  selector: 'header-filter',
  template: `
    <div class="header-filter">
      <ng-content></ng-content>
    </div>
  `
})
export class HeaderFilter extends AppBase {

  constructor() {
    super();
  }
}

@Component({
  selector: 'header-title',
  template: `
    <ng-content></ng-content>
  `
})
export class HeaderTitle extends AppBase {

  constructor() {
    super();
  }
}

@Component({
  selector: 'header-description',
  template: `
    <ng-content></ng-content>
  `
})

export class HeaderDescription extends AppBase {

  constructor() {
    super();
  }
}
