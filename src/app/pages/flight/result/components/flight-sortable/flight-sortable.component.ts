import {AppPage} from '../../../../../app.base';
import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FLIGHT_FILTER} from '../../../../../app.constants';
import {FlightFilterOptions} from '../../../../../common/entities';

@Component({
  selector: 'app-flight-sortable',
  templateUrl: './flight-sortable.component.html',
  styleUrls: ['./flight-sortable.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightSortableComponent extends AppPage {

  @Input('title') title: string = 'Chuyến bay chiều đi';
  @Input('sort') sortIndex: any = null;
  @Output('select') select: EventEmitter<any> = new EventEmitter<any>();

  filterOptions: FlightFilterOptions = new FlightFilterOptions({
    sorts: [
      {
        index: FLIGHT_FILTER.sort.price,
        name: 'Giá thấp nhất'
      },
      {
        index: FLIGHT_FILTER.sort.depart,
        name: 'Bay sớm nhất'
      },
      {
        index: FLIGHT_FILTER.sort.landing,
        name: 'Đến sớm nhất'
      },
      {
        index: FLIGHT_FILTER.sort.duration,
        name: 'Bay ngắn nhất'
      }
    ]
  });

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  ngAfterViewInit() {

  }

  // fn on select sort index
  onSelect = ($event: any): void => {

    if (this.sortIndex === $event) {
      this.sortIndex = null;
    } else {
      this.sortIndex = $event;
    }
    this.select.emit(this.sortIndex);
  };
}