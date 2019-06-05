import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AppBase } from 'app/app.base';
import { TYPE } from 'app/components';

enum TYPE_PASSENGER {
    ADULT = 'adult',
    CHILD = 'children'
}

@Component({
    selector: 'room-passenger-input',
    templateUrl: './room-passenger-input.component.html',
    styleUrls: ['./room-passenger-input.component.less']
})
export class HotelRoomPassengerInputComponent extends AppBase {

    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() roomOccupancies: any[] = [
        {
            view: 1, //expand or collapse.
            data: [
                { title: 'Người lớn', description: 'Từ 12 tuổi trở lên', value: 1, type: TYPE_PASSENGER.ADULT, view: 1 },
                { title: 'Trẻ em', description: 'Dưới 11 tuổi', value: 0, type: TYPE_PASSENGER.CHILD, view: 1 }
            ],
        }
    ];

    passengers: any;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    ngOnChanges() {
        this.submit();
    }

    addRoom() {
        const roomPassenger = {
            view: 1,
            data: [
                { title: 'Người lớn', description: 'Từ 12 tuổi trở lên', value: 1, type: TYPE_PASSENGER.ADULT, view: 1 },
                { title: 'Trẻ em', description: 'Dưới 11 tuổi', value: 0, type: TYPE_PASSENGER.CHILD, view: 1 }
            ],
        }
        // những item trước đó colapase.
        this.roomOccupancies.map(item => item.view = 2);
        this.roomOccupancies.push(roomPassenger);

        this.submit();
    }

    onEditRoom(room: any) {
        // những item trước đó colapase
        this.roomOccupancies.map(item => item.view = 2);

        //switch view sang 1 của room đang chọn.
        room.view = 1;
    }

    onRemoveRoom(index: number) {
        this.roomOccupancies.splice(index, 1);
    }

    onChangePassenger(index: number, number: number, typePeople: TYPE_PASSENGER) {
        for (const key in this.roomOccupancies) {
            if (parseInt(key) === index) {
                this.roomOccupancies[key].data.filter((passenger: any) => passenger.type === typePeople)[0].value = number;
            }
        }

        this.submit();
    }

    getPassenger(item: any, type: string) {
        return item.data.map((data: any) => {
            if (type === data.type) {
                return data.value;
            }
        }).filter(Boolean)[0] || 0;
    }

    submit() {
        const data = this.roomOccupancies
            .map((room, key): any => room.data
                .map((item: any) => item.value))
            .map((data: any) => ({
                adults: data[0],
                children: data[1]
            }));

        this.onChange.emit(data);
    }
}
