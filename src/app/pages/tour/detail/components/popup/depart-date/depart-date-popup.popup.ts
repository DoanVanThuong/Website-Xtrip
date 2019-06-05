import {Component, Input, Output, EventEmitter} from '@angular/core';
import {PopupBase} from '../../../../../../components/popup';
import {Tour} from "../../../../../../common/entities";

@Component({
  selector: 'depart-date-popup',
  templateUrl: './depart-date-poup.popup.html',
  styleUrls: ['./depart-date-popup.popup.less'],
})
export class TourDepartDatePopupComponent extends PopupBase {

  @Input() data: Tour[] = [];
  @Input() date: any = null;
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  selectedDate: Tour = new Tour();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (!!this.data && !!this.data.length) {
      this.selectedDate = this.data.filter(d => d.departDate === this.date)[0];
    }
  }

  // fn on select depart date
  onSelectDepartDate = (item: any): void => {
    this.popup.hide();
  };

  // fn on submit select depart date
  onSubmit = (): void => {
    this.onSelect.emit(this.selectedDate);
    this.hide();
  };

  genQueryParams = (tour: Tour): any => {
    return this.utilityHelper.buildQueryParams({});
  }
}
