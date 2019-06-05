import { Component, ViewEncapsulation } from '@angular/core';
import { StorageService } from '../../../../../common';
import { Router } from '@angular/router';
import { CSTORAGE } from '../../../../../app.constants';

@Component({
    selector: 'hotel-room-remaining',
    templateUrl: 'hotel-room-remaining.html',
    styleUrls: ['hotel-room-remaining.less'],
    encapsulation: ViewEncapsulation.None
})
export class HotelRoomRemaining {
  
  room: any = {};

  constructor(
    private _storage: StorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.room = this._storage.getItem(CSTORAGE.ROOM) || this.router.navigate(['/hotel/search']);
  }
}
