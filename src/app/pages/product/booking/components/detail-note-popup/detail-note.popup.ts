import { Component, Input } from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
    selector: 'detail-note-popup',
    templateUrl: './detail-note.popup.html',
    styleUrls: ['./detail-note.popup.less']
})
export class DetailNotePopupComponent extends PopupBase {

    @Input() combo: any;
    @Input() notes: any[];

    constructor() {
        super();
    }

    ngOnInit(): void { }
}
