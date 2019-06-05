import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Room, StorageService} from '../../../../../common';
import {Router} from '@angular/router';
import {AppBase} from '../../../../../app.base';

@Component({
  selector: 'hotel-instruction',
  templateUrl: 'hotel-instruction.component.html',
  styleUrls: ['hotel-instruction.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelInstructionComponent extends AppBase {

  @Input() room: Room = new Room();

  constructor(private _storage: StorageService,
              private _router: Router) {
    super();
  }

  ngOnInit() {

  }
}
