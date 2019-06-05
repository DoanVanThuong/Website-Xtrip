import {Component, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {TourRepo, TourSearch, StorageService} from '../../../../common/index';
import {CSTORAGE} from '../../../../app.constants';
import {AppBase} from '../../../../app.base';
import * as moment from 'moment';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-tour-date-selector',
  templateUrl: './tour-date.component.html',
  styleUrls: ['./tour-date.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class TourDateSelectorComponent extends AppBase {

  date: any = null;

  selected: any = {start: null, end: null};

  dateOptions = {
    single: false,
    startOfWeek: 1
  };

  params: any = {};

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _tourRepo: TourRepo,
              private _location: Location,
              protected _storage: StorageService
  ) {

    super();
  }

  ngOnInit(): void {
    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((param: any): void => {

        this.params = param;
        this.initial();
      });

  }

  ngOnChanges() {
    this.initial();
  }

  initial = () => {
    if (!this._storage.getItem(CSTORAGE.TOUR_DATE_SEARCH)) {
      this.selected = {
        start: null,
        end: null
      };
    } else {
      this.selected = this._storage.getItem(CSTORAGE.TOUR_DATE_SEARCH);
    }
  };

  back = () => {
    this._location.back();
  };

  // fn on disable submit button
  onDisableSubmit = (): boolean => {
    return !this.selected.start || !this.selected.end;
  };

  // date change
  onChange = ($event: any) => {
    this.selected = $event;
  };

  // fn on submit
  onSubmit = ($event: any): void => {
    this._storage.setItem(CSTORAGE.TOUR_DATE_SEARCH, this.selected);
    let queryParams = {
      arrival: this.params.code,
      title: this.params.title,
      from: !this.selected.start ? moment().format('YYYY-MM-DD') : moment(this.selected.start).format('YYYY-MM-DD'),
      to: !this.selected.end ? moment().add('month', 6).format('YYYY-MM-DD') : moment(this.selected.end).format('YYYY-MM-DD'),
      type: this.params.type
    };
    this._router.navigate(['/tour/result'], {
      queryParams: new TourSearch(Object.assign({}, queryParams))
    });
  };

}
