import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {AuthRepo, RewardPoint, Security, User} from '../../../../common/index';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RewardPointPopup} from '../../../../components/popup';
import * as moment from 'moment';

const POINT_TYPE: any = {
  PENDING: 0,
  AVAILABLE: 1,
  USED: 2,
  CANCELLED: 3,
  RETURN: 4
};

@Component({
  selector: 'app-reward-point-mobile',
  templateUrl: './reward-point-mobile.component.html',
  styleUrls: ['./reward-point-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileMyPointMobileComponent extends AppPage {

  @ViewChild('owlElement') owlElement: OwlCarousel;
  @ViewChild(RewardPointPopup) rewardPointPopup: RewardPointPopup;

  isLoggedIn: boolean = false;
  profile: User = new User();

  // point information
  points: RewardPoint[] = new Array<RewardPoint>();

  POINT_TYPE: any = POINT_TYPE;
  available: number = 0;
  pending: number = 0;


  sliders: Array<any> = [
    {
      title: 'Cách tính điểm',
      content: 'Tích điểm càng lớn, nhận ưu đãi càng nhiều',
      link: '#',
      url: 'assets/images/profile/cash-in-box.png'
    },
    {
      title: 'Cách quy đổi',
      content: 'Cứ mỗi 10.000đ chi tiêu bạn sẽ nhận được 1 điểm',
      link: '#',
      url: 'assets/images/profile/exchange-point.png'
    }
  ];

  // carousel
  carouselOptions: any = {
    items: 2,
    navigation: true,
    nav: false,
    loop: true,
    margin: 0,
    dots: true,
    responsive: {
      0: {items: 1},
      600: {items: 1},
      1000: {items: 1}
    }
  };

  isLoading: boolean = false;

  constructor(protected _security: Security,
              private _authRepo: AuthRepo) {
    super();
  }

  ngOnInit() {

    if (this._security.isAuthenticated()) {
      this.onLoadPoints();
    }
  }

  ngAfterViewInit() {

  }

  // fn load point
  onLoadPoints() {
    this.isLoading = true;
    return this._authRepo
      .getRewardPoints(this.offset, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;

          this.pending = res.rewardPoints.pending || 0;
          this.available = res.rewardPoints.available || 0;

          this.points = this.points.concat((res.results || []).map(point => new RewardPoint(point)));

        },
        (errors: any) => {
          this.points = Array<RewardPoint>();
        }
      );
  }

  // fn open nitification popup
  openNotificationPopup = () => {
    this.rewardPointPopup.show();
  };

  //fn scroll get more data
  onScrollDown() {
    if (!this.isLoading) {
      this.offset += this.limit;
      this.onLoadPoints();
    }
  }
}