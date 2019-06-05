import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../app.base';
import {Album, DeviceService, Photo, TourRepo,} from '../../../../common';
import {GalleryPopup} from '../../../../components/popup';

@Component({
  selector: 'home-tour-album',
  templateUrl: './album-tour.component.html',
  styleUrls: ['./album-tour.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeTourAlbumComponent extends AppBase {

  @ViewChild(GalleryPopup) galleyPopup: GalleryPopup;

  isLoading: boolean = false;
  album: Album = new Album();
  albums: Album[] = [];

  images: any[] = [];
  limit: number = 4;

  carouselOptions: any = {
    items: 4,
    nav: !this.isMobile,
    navigation: !this.isMobile,
    navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    margin: this.isMobile ? 15 : 25,
    dots: this.isMobile
  };

  constructor(protected _tourRepo: TourRepo,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
    this.carouselOptions = Object.assign(this.carouselOptions, {
      nav: !this.isMobile,
      navigation: !this.isMobile,
      margin: this.isMobile ? 15 : 25,
      dots: this.isMobile
    });
  }

  ngOnInit(): void {
    this.getAlbums();
  }

  // fn get albums
  async getAlbums() {
    this.isLoading = true;
    try {
      const res: any = await this._tourRepo.getAlbum(this.offset, this.limit);
      this.albums = res.data.map(album => new Album(album));
    } catch (error) {

    } finally {
      this.isLoading = false;
    }
  }

  // fn on select album
  async onSelectAlbum(item: Album) {
    try {
      const res: any = await this._tourRepo.getDetailAlbum(item.code);

      this.album = new Album(res.data);

      let size = this.isMobile ? '?width=350' : '';

      this.images = this.album.photos.map((item, index) => {
        return {
          index: Number(size + 1),
          small: item.src,
          medium: item.src + size,
          big: item.src + size,
          url: item.src + size,
          description: `${Number(index + 1) + '/' + res.data.photos.length}`
        };
      });

      this.galleyPopup.show({
        backdrop: 'static'
      });
    } catch (error) {
      this.galleyPopup.hide();
    }
  }
}

interface IAlbum {
  code: string;
  name: string;
  alias: string;
  description: string;
  photo: Photo;
}
