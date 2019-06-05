import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../popup.base';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions} from 'ngx-gallery';

@Component({
  selector: 'gallery-popup',
  templateUrl: './gallery.popup.html',
  styleUrls: ['./gallery.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryPopup extends PopupBase {

  @Input('images') images: Array<any> = [];
  @Input() name: string = '';
  category: any = {};
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '600px',
      height: '90%',
      thumbnailsColumns: 8,
      imageAnimation: NgxGalleryAnimation.Fade,
      imageSize: NgxGalleryImageSize.Contain,
      preview: false,
      previewDescription: false,
      previewSwipe: true,
      imageSwipe: true,
      imageArrows: true,
      thumbnailsArrows: false,
      thumbnailsSwipe: true,
      imageDescription: false,
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '80vh',
      imagePercent: 80,
      thumbnailsPercent: 10,
      thumbnailsMargin: 2,
      thumbnailMargin: 2,
    },
    // max-width 800
    {
      breakpoint: 1920,
      width: '100%',
      height: '80vh',
      imagePercent: 100,
      thumbnailsPercent: 10,
      thumbnailsMargin: 2,
      thumbnailMargin: 2,
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false,
      imageArrows: true,
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
