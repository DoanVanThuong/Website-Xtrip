import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from '../../../app.base';
import {Blog, BlogRepo, DeviceService} from '../../../common/index';
import {StorageService} from '../../../common/services';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BlogListComponent extends AppPage {

  isLoading: boolean = false;
  limit: number = 5;
  blogs: Blog[] = new Array<Blog>();

  constructor(private _router: Router,
              private _storage: StorageService,
              private _blogRepo: BlogRepo,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.onLoadBlogs();
  }

  // scroll down
  onScrollDown() {
    if (!this.isLoading && !!this.blogs.length) {
      this.offset += this.limit;
      this.onLoadBlogs();
    }
  }

  // fn on load blogs list
  onLoadBlogs = (): Promise<any> => {
    this.isLoading = true;
    return this._blogRepo
      .getBlogs(this.offset, this.limit)
      .then(
        (res: any) => {
          this.blogs = this.blogs.concat(res.data.map(blog => new Blog(blog)));

          if (!res.data.length) {
            this.offset -= this.limit;
          }

          this.isLoading = false;
        }, (errors: Error[] = []) => {
          this.offset -= this.limit;
          this.isLoading = false;
        }
      );
  };
}
