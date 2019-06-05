import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AppBase } from '../../../../../app.base';
import { Router } from '@angular/router';

@Component({
    selector: 'app-faq-banner',
    templateUrl: './faq-banner.component.html',
    styleUrls: ['./faq-banner.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class FaqBannerComponent extends AppBase {
    @Input() keyword: string = '';

    constructor(private _router: Router) {
        super();
    }

    ngOnInit() {

    }

    //fn on search
    onSearch(data: any) {
        this.keyword = data.value.keyword;
        // this.keyword = this.keyword.replace(/[^a-zA-Z0-9 ]/g, "");
        if (!!this.keyword) {
            this._router.navigate(['/more/faq'], {
                queryParams: {
                    faq: 'search',
                    key: this.keyword
                }
            })
        }
        else
            return;

    }
}
