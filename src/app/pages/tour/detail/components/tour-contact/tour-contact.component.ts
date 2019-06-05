import { Component } from '@angular/core';
import { AppBase } from '../../../../../app.base';

@Component({
    selector: 'tour-contact',
    templateUrl: './tour-contact.component.html',
    styleUrls: ['./tour-contact.component.less']
})

export class TourContactDesktopComponent extends AppBase {
    constructor() { super(); }

    ngOnInit(): void { }
}
