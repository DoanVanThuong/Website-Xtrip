import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class GlobalState {

  protected _data = new Subject<Object>();
  protected _dataStream$ = this._data.asObservable();

  protected _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  // notify data changed
  notifyDataChanged(event: string = 'event', value: any = null) {

    let current = this._data[event];

    //if (current !== value) {
    this._data[event] = value;

    this._data.next({
      event: event,
      data: this._data[event]
    });
    //}
  }

  // push notify to event
  notifyTo = (events: any = '', value: any = null) => {

    switch (typeof events) {
      case 'string': {
        this._data[events] = value;

        this._data.next({
          event: events,
          data: this._data[events]
        });
        break;
      }
      case 'object': {
        events.map((event) => {
          this._data[event] = value;

          this._data.next({
            event: event,
            data: this._data[event]
          });
        });
        break;
      }
    }
  };

  // fn push event to subscribe
  /*subscribe(event: string, callback: Function) {
    let subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }*/

  // fn call event
  subscribe = (events: any = '', callback: Function) => {

    switch (typeof events) {
      case 'string': {
        let subscribers = this._subscriptions.get(events) || [];
        subscribers.push(callback);

        this._subscriptions.set(events, subscribers);
        break;
      }
      case 'object': {
        events.map((event) => {
          let subscribers = this._subscriptions.get(events) || [];
          subscribers.push(callback);

          this._subscriptions.set(event, subscribers);
        });
        break;
      }
    }
  };

  // fn push event
  _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
