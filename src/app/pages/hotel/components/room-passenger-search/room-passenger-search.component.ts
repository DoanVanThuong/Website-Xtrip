import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AppBase } from 'app/app.base';

enum TYPE_ROOM {
    YOUR_SELF = 'your-self',
    COUPLE = 'couple',
    FAMILY = 'family',
    FRIENDS = 'friends',
    WORK = 'work'
}
@Component({
    selector: 'room-passenger-search',
    templateUrl: './room-passenger-search.component.html',
    styleUrls: ['./room-passenger-search.component.less']
})
export class HotelRoomPassengerSearchComponent extends AppBase {

    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Input() selectedRoomType: IRoomType;
    @Input() type: string;

    roomTypes: IRoomType[] = [
        { title: 'Đi một mình', value: null, subTitle: '1 phòng 1 người', type: TYPE_ROOM.YOUR_SELF },
        { title: 'Cặp đôi', value: null, subTitle: '1 phòng 2 người', type: TYPE_ROOM.COUPLE },
        { title: 'Theo gia đình', value: null, subTitle: null, type: TYPE_ROOM.FAMILY },
        { title: 'Đi theo nhóm bạn', value: null, subTitle: null, type: TYPE_ROOM.FRIENDS },
        { title: 'Đi công tác', value: null, subTitle: null, type: TYPE_ROOM.WORK },
    ];
    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    selectTypeRoom(typeRoom: IRoomType) {
        this.selectedRoomType = typeRoom;
        this.type = this.selectedRoomType.type;

        switch (typeRoom.type) {
            case TYPE_ROOM.YOUR_SELF: {
                this.onSelect.emit(Object.assign({}, this.selectedRoomType, { value: [{ adults: 1, children: 0 }] }));
                break;
            }
            case TYPE_ROOM.COUPLE: {
                this.onSelect.emit(Object.assign({}, this.selectedRoomType, { value: [{ adults: 2, children: 0 }] }));
                break;
            }
            default:
                this.onSelect.emit(this.selectedRoomType);
                break;
        }
    }
}

interface IRoomType {
    title: string;
    value: any;
    subTitle: string;
    type: TYPE_ROOM
}
