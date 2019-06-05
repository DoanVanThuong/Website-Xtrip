import {Component, ViewEncapsulation} from '@angular/core';
import {Blog, BlogRepo, DeviceService} from '../../../../common/index';
import {AppPage} from '../../../../app.base';

@Component({
  selector: 'home-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeDiscoverComponent extends AppPage {

  blogs: Blog[] = [];

  carouselOptions: any = {
    items: 1,
    navigation: true,
    autoplay: false,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    lazyLoad: true
  };

  constructor(private _blogRepo: BlogRepo,
              protected _device: DeviceService) {
    super();
    this.setDeviceMode(this._device);

    this.carouselOptions = Object.assign(this.carouselOptions, {
      loop: !this.isMobile,
      margin: this.isMobile ? 15 : 0,
      autoWidth: this.isMobile,
      dots: !this.isMobile
    });
  }

  ngOnInit() {
    this.getBlogs();
  }

  ngOnChanges() {
  }

  // fn get blogs
  getBlogs = (): any => {

    return this._blogRepo
      .getBlogs(0, 5)
      .then(
        (res: any) => {
          this.blogs = res.data.map((blog) => new Blog(blog));
        }
      );
  };
}
