import { Component, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { AppBase } from '../../../app.base';
import { HotelMapMaker, HotelSearch } from '../../../common/entities/index';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { StorageService } from '../../../common';
declare var require: any

@Component({
  selector: 'app-hotel-map-view',
  templateUrl: './hotel-map-view-desktop.html',
  styleUrls: ['./hotel-map-view-desktop.less'],
  encapsulation: ViewEncapsulation.None
})

export class MapViewDesktopComponent extends AppBase {

  @Input('hotels') hotels: any = {};
  @Input('nights') nights: number = null;
  @Input('isLoading') isLoading: boolean = false;
  @Input('filterHeight') filterHeight: number = 0;
  @Output('submitListView') submit: EventEmitter<any> = new EventEmitter<any>();
  @Input('params') params: any = {};

  markers: HotelMapMaker[] = [];

  mapStyles = require('../../../../assets/maps/map-style.json');

  lat: number = 51.678418;
  lng: number = 7.809007;

  selectedMarker: any = {};

  constructor(
    private _router: Router,
    private _storage: StorageService
  ) {
    super();
  }

  ngOnInit() { }

  ngOnChanges() {
    this.onCalcListLocations(this.hotels);
  }

  //swith to list
  switchtoList() {
    this.submit.emit(1);
  }

  //get type icon maker
  iconUrl(e) {
    return `assets/images/hotel/desktop/pricing${!!e ? "-sold-out" : ""}.png`;
  }

  //calculate list location for aker maps
  onCalcListLocations(hotels) {
    this.markers = [];
    for (let i = 0; i < hotels.length; i++) {
      this.markers.push({
        data: hotels[i],
        lat: hotels[i].latitude,
        lng: hotels[i].longitude,
        price: hotels[i].salePrice
      })
    }
    if (this.markers.length > 0) {
      [this.lat, this.lng] = [this.markers[0].lat, this.markers[0].lng];
    }
  }

  //on click maker
  clickedMarker(item, index) {
    this.selectedMarker = item;
  }

  //map click
  onMapClick(e) {
    this.selectedMarker = {};
  }

  onClickDetail(hotel) {
    if (!hotel.isSoldOut) {
      this._storage.setItem(this.CSTORAGE.HOTEL, hotel);
      this._router.navigate([`/hotel/${hotel.code}/detail`], {
        queryParams: new HotelSearch(this.params)
      });
    }
  }


}

