import {Component, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../app.base';
import {CAPP} from '../../../../app.constants';
import {DeviceService} from '../../../../common/services';
import {GlobalRepo} from "../../../../common/repos";
import {Photo, Error} from "../../../../common/entities";

@Component({
  selector: 'home-more-question',
  templateUrl: './more-question.component.html',
  styleUrls: ['./more-question.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MoreQuestionComponent extends AppBase {

  carouselOptions: any = {
    items: 1,
    navigation: false,
    nav: false,
    loop: !this.isMobile,
    autoplay: !this.isMobile,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    autoWidth: this.isMobile,
    margin: this.isMobile ? 15 : 0,
    dots: !this.isMobile,
    lazyLoad: true
  };

  isLoading: boolean = false;
  knowledges: IKnowledge[] = [];

  constructor(protected _device: DeviceService,
              private _globalRepo: GlobalRepo) {
    super();

    this.setDeviceMode(this._device);

    this.carouselOptions = Object.assign(this.carouselOptions, {
      loop: !this.isMobile,
      autoplay: !this.isMobile,
      autoWidth: this.isMobile,
      margin: this.isMobile ? 15 : 0,
      dots: !this.isMobile
    });
  }

  ngOnInit(): void {
    this.getFAQ();
  }

  // fn get support info
  getFAQ = (): Promise<any> => {
    this.isLoading = true;

    return this._globalRepo
      .getFAQ()
      .then(
        (res: any) => {
          this.isLoading = false;
          this.knowledges = res.data.map(item => new Object(item) as IKnowledge);
        },
        (errors: Error[] = []) => {
          this.isLoading = false;
        }
      )
  };
}

export interface IKnowledge {
  code: string;
  name: string;
  subtext: string;
  url: string;
  photo: Photo;
}
