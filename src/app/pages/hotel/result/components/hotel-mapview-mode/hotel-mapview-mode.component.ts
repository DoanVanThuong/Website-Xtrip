import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { HotelResultMobileComponent } from '../../mobile/hotel-result-mobile.component';
import { OwlCarousel } from 'ngx-owl-carousel';
import { AgmMap } from '@agm/core';
import { Hotel, HotelLocation } from 'app/common';
import { MAP_POINT } from 'app/app.constants';


@Component({
  selector: 'app-hotel-mapview-mode',
  templateUrl: './hotel-mapview-mode.component.html',
  styleUrls: ['./hotel-mapview-mode.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelMapViewModeComponent extends HotelResultMobileComponent {

  @ViewChild('owlElement') owlElement: OwlCarousel;
  @ViewChild(AgmMap) myMap: any;

  lat: number = MAP_POINT.LAT;
  lng: number = MAP_POINT.LNG;
  zoom: number = MAP_POINT.ZOOM;
  timeout: any;

  owlOptions: any = {
    items: 1, 
    dots: false, 
    navigation: false,
    onDragged: (event: any) => {
      this.getMarkerByIndex(event.item);
    }
  };
  
  //on click maker
  clickedMarker = (e: any = {}, index: any = 0) => {
    this.selectedMarker = e;
    this.triggerCenterMap(this.selectedMarker.latitude, this.selectedMarker.longitude);
    setTimeout(() => {
      this.owlElement.trigger('to.owl.carousel', [index]);
    }, 1);
  };

  //map click
  onMapClick(e) {
    this.selectedMarker = null;
  }

  //get type icon maker
  iconUrl(e) {
    return `assets/images/trans.png`;
  };

  //get item maker by index
  getMarkerByIndex(currentItem: any = {}) {
    this.selectedMarker = this.hotels[currentItem.index];
    this.triggerCenterMap(this.selectedMarker.latitude, this.selectedMarker.longitude);
  };

  //goto center of map
  triggerCenterMap(lat, lng) {
    this.myMap.triggerResize()
      .then(() => this.myMap._mapsWrapper.setCenter({ lat: lat, lng: lng }));
  };
  
  //zoom change
  zoomChange(e) {
    this.zoom = e;
    this.reGetMarkerItems(this.lat, this.lng)
  };

  //map end
  mapReady(e){
    e.addListener('dragend', () => {
      this.selectedMarker = null;
      this.reGetMarkerItems(e.center.lat(), e.center.lng());
    })
  }

  //reget marker
  reGetMarkerItems = (lat, lng) => {

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.hotelSearch.destination = new HotelLocation({
        destinationType: 'CENTER_POINT',
        latitude: lat,
        longitude: lng,
        zoom: this.zoom
      });
      return this._hotelRepo
        .search(Object.assign({}, this.hotelSearch, {
          sortIndex: !!this.filter.sortIndex ? this.filter.sortIndex : 0,
          filterOptions: this.filter
        }), -1, -1).pipe().subscribe(
          (success: any) => {
            this.hotels = _.uniqBy(this.hotels.concat(success.data.hotels.map(hotel => new Hotel(hotel))), 'code');
          },
          (error: any) => {
          }
        )
    }, 1000);
  };


}
