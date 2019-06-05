import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PopupBase } from '../../../../../components/popup/popup.base';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery';

@Component({
    selector: 'tour-gallery-popup',
    templateUrl: './tour-gallery.popup.html',
    styleUrls: ['./tour-gallery.popup.less'],
    encapsulation: ViewEncapsulation.None
})
export class TourGalleryPopup extends PopupBase {

    @Input() images: Array<any> = [];
    @Input() tour: any = null;

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
            imageDescription: true
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
