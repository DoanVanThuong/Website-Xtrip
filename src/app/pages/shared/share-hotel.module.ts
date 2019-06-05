import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelRoomPopupComponent } from '../hotel/detail/components/popup/room/hotel-room.popup';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComponentsModule } from 'app/components/components.module';

@NgModule({
    declarations: [HotelRoomPopupComponent],
    imports: [
        CommonModule,
        ComponentsModule,
        ModalModule,
    ],
    exports: [
        HotelRoomPopupComponent
    ],
    providers: [],
})
export class ShareHotelModule { }