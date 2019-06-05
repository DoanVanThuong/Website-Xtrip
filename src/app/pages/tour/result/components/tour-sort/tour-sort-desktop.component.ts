import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {ISort, Tour, TourSearch} from "../../../../../common/entities";

@Component({
  selector: 'sort-tour-desktop',
  templateUrl: './tour-sort-desktop.component.html',
  styleUrls: ['./tour-sort-desktop.less']
})
export class TourSortDesktopComponent extends AppBase {

  @Input() sorts: ISort[] = [];
  @Input() params: TourSearch = new TourSearch();
  @Input() keyword: string = '';

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  selectedSortIndex: number = 0;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.selectedSortIndex = Number(this.params.sortIndex || 0);
  }

  // fn on select sort item
  onSelectSort = (sortItem: number): void => {
    if (this.selectedSortIndex === sortItem) {
      return;
    } else {
      this.selectedSortIndex === sortItem;
    }

    this.onChange.emit(sortItem);
    this.select.emit(sortItem);
  }
}
