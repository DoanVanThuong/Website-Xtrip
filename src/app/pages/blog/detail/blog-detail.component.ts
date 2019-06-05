import {Component, Inject, PLATFORM_ID, ViewEncapsulation,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppPage} from '../../../app.base';
import {BlogRepo, Blog, Error, DeviceService} from '../../../common';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent extends AppPage {

  params: any = {code: '', alias: ''};
  blog: Blog = new Blog();
  titleBlog: string = '';

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _blogRepo: BlogRepo,
              private _device: DeviceService,
              @Inject(PLATFORM_ID) private platformId: string,) {
    super();
    this.setDeviceMode(_device);
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.params = params;
    });
  }

  ngAfterViewInit() {
    this.onLoadBlog();

  }

  // fn on load blog detail
  onLoadBlog() {
    return this._blogRepo
      .getBlogDetail(this.params.code, this.params.alias)
      .then(
        (res: any) => {

          if(!res.data && isPlatformBrowser(this.platformId)){
            this._router.navigate(['/404']);
          }

          this.blog = new Blog(res.data);
          this.titleBlog = this.blog.name || 'Vi vu cùng Xtrip';


        }, (errors: Error[] = []) => {
          this._router.navigate(['/404']);
        });
  }
}
