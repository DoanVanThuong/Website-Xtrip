import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AppBase } from '../../../../../app.base';

@Component({
    selector: 'list-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ListNoteComponent extends AppBase {
    @Input() data: string = null;
    listNote: any[] = [];
    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    ngOnChanges() {
        if (!!this.data) {
            this.listNote = this.handlStringToArray(this.data).map(item => item.trim()).filter(i => !!i);
        }
    }

    handlStringToArray(str: string) {
        return str.trim().replace(/(?:\r\n|\r|\n|\\n|\\r|\- |\*)/g, '|').split('|');
    }
}
