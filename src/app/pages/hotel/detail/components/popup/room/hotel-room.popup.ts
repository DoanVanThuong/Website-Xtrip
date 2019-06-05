import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PopupBase } from 'app/components/popup';
import * as _ from 'lodash';
import { DeviceService } from 'app/common';
enum TYPE_PASSENGER {
    ADULT = 'adult',
    CHILD = 'children'
}
@Component({
    selector: 'hotel-room-popup',
    templateUrl: './hotel-room-popup.html',
    styleUrls: ['./hotel-room.popup.less']
})


export class HotelRoomPopupComponent extends PopupBase {
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() roomOccupancies: any[] = [
        [
            { title: 'Người lớn', description: 'Từ 12 tuổi trở lên', value: 1, type: TYPE_PASSENGER.ADULT },
            { title: 'Trẻ em', description: 'Dưới 11 tuổi', value: 0, type: TYPE_PASSENGER.CHILD }
        ]
    ];

    currentRoom: number = 1;
    roomPassenger: IRoomPassenger[] = [];

    constructor(private _device: DeviceService, ) {
        super();
        this.setDeviceMode(this._device);

    }

    ngOnInit(): void {
        this.currentRoom = this.roomOccupancies.length;
    }

    ngOnChanges() {
    }

    onChangeRoom(room: number) {
        if (room > this.currentRoom) {
            const roomPassenger = [
                { title: 'Người lớn', description: 'Từ 12 tuổi trở lên', value: 1, type: TYPE_PASSENGER.ADULT },
                { title: 'Trẻ em', description: 'Dưới 11 tuổi', value: 0, type: TYPE_PASSENGER.CHILD }
            ]
            this.roomOccupancies.push(roomPassenger)
        } else {
            this.roomOccupancies.splice(this.roomOccupancies.length - 1, 1);

        }
        this.currentRoom = room;
    }

    onChangePassenger(index: number, number: number, typePeople: TYPE_PASSENGER) {
        for (const key in this.roomOccupancies) {
            if (parseInt(key) === index) {
                this.roomOccupancies[key].filter((passenger: IRoomPassenger) => passenger.type === typePeople)[0].value = number;
            }
        }
    }

    confirm() {
        const data = this.roomOccupancies
            .map((room, key): any => room
                .map((item: any) => item.value))
            .map((data: any) => ({
                adults: data[0],
                children: data[1]
            }));
        this.onChange.emit(data);
        this.hide();
    }

}

export interface IRoomOccupancies {
    rooms: IRoomPassenger[]
}

export interface IRoomPassenger {
    type: TYPE_PASSENGER;
    value: number,
    title: string,
    description: string
}


