import { Component, Input, ViewEncapsulation, ViewChild, } from '@angular/core';
import { AppBase } from '../../../../../app.base';
import { ProductGalleryPopupComponent } from '../popup/product-gallery/product-gallery.popup';

@Component({
    selector: 'product-carousel',
    templateUrl: './product-carousel.component.html',
    styleUrls: ['./product-carousel.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ProductCarouselDesktopComponent extends AppBase {
    @ViewChild(ProductGalleryPopupComponent) productGallery: ProductGalleryPopupComponent;
    @Input() images: any[] = [];
    @Input() height: number = 0;
    @Input() data: any = null
    isFavorite: boolean = false;

    carouselOptions: any = {
        items: 1,
        navigation: true,
        nav: true,
        navText: ["<span><img class='m-b-0 size-36x36' src='assets/images/hotel/desktop/nav-left.svg'></span>", "<span><img src='assets/images/hotel/desktop/nav-right.svg'></span>"],
        navClass: ['owl-prev', 'owl-next'],
        loop: true,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        margin: 0,
        dots: true,
        lazyLoad: true,
        animateOut: 'fadeOut'
    };

    constructor() {
        super()
    }



    //on open popup image
    onOpenPopupImages = (category: any = {}) => {
        this.images = category.map((item: { small: any; medium: any; big: any; }, index: number) => {
            return {
                index: Number(index + 1),
                small: item.small,
                medium: item.medium,
                big: item.big,
                description: `${Number(index + 1) + "/" + category.length}`
            };
        })
        this.productGallery.show({
            backdrop: 'static'
        });
    };


}
