import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../popup/popup.base';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions} from 'ngx-gallery';
import {Hotel, Room} from '../../../common/entities';

@Component({
  selector: 'app-hotel-gallery-popup',
  templateUrl: './hotel-gallery.popup.html',
  styleUrls: ['./hotel-gallery.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelGalleryPopup extends PopupBase {

  @Input() images: Array<any> = [];
  @Input('mode') mode?: string = ''; //input: hotel, room
  @Input() hotel?: Hotel = new Hotel;
  @Input('code') code?: string = '';

  @Input() room?: Room = new Room();

  category: any = {};
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '600px',
      height: '90%',
      thumbnailsColumns: 12,
      imageAnimation: NgxGalleryAnimation.Fade,
      imageSize: NgxGalleryImageSize.Contain,
      preview: false,
      previewDescription: true,
      previewSwipe: true,
      imageSwipe: true,
      imageArrows: true,
      thumbnailsArrows: true,
      thumbnailsSwipe: true,
      imageDescription: true,
      arrowPrevIcon: 'custom-icon pre-icon',
      arrowNextIcon: 'custom-icon next-icon'
    },
    // max-width 1366
    {
      breakpoint: 1366,
      width: '100%',
      height: '92vh',
      imagePercent: 90,
      thumbnailsPercent: 10,
      thumbnailsMargin: 2,
      thumbnailMargin: 2,
      thumbnailsSwipe: true
    },
    // max-width 1600
    {
      breakpoint: 1600,
      width: '100%',
      height: '93vh',
      imagePercent: 100,
      thumbnailsPercent: 10,
      thumbnailsMargin: 0,
      thumbnailMargin: 2,
      thumbnailsSwipe: true
    },
    // max-width 1920
    {
      breakpoint: 1920,
      width: '100%',
      height: '94vh',
      imagePercent: 100,
      thumbnailsPercent: 10,
      thumbnailsMargin: 0,
      thumbnailMargin: 2,
      thumbnailsSwipe: true
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false
    }
  ];
  galleryImages: NgxGalleryImage[] = [];

  constructor() {
    super();
  }

  // on initial
  ngOnInit() {
    this.galleryImages = this.images;
  }

  ngOnChanges() {
    this.galleryImages = this.images;
  }
}
