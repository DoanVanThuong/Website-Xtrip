import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AppPage} from '../../../app.base';

@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',

})
export class SettingComponent extends AppPage {
  
  notifycationsetting = {
    cheapTickets: false,
    supportMessage: false,
    bookingStatus: false,
    promotionInformation: false,
    noticeChange: false

  };
  test1 = false;
  value = false;
  onText = 'Mở';
  offText = 'Tắt';
  onColor = 'green';
  offColor = 'default';
  size = 'small';
  auto: 'auto';

  constructor(private _router: Router,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  ngAfterViewInit() {
    //initswitchbootstrap();
  }

  ngOnInit() {

    /*if (this.authenticationService.isloggedIn()) {
      this.getNotificationActionSetting();
    }*/
  }

  clickBackPopupVisibleNotifSet() {
    this._router.navigate(['user']);
  }

  onFlagChange(e, optiontest) {
    switch (optiontest) {
      case 'cheapTickets':
        this.notifycationsetting.cheapTickets = e;
        break;
      case 'supportMessage':
        this.notifycationsetting.supportMessage = e;
        break;
      case 'bookingStatus':
        this.notifycationsetting.bookingStatus = e;
        break;
      case 'promotionInformation':
        this.notifycationsetting.promotionInformation = e;
        break;
      case 'noticeChange':
        this.notifycationsetting.noticeChange = e;
        break;

    }
    /*this.userService.UpdateNotifycationSetting(this.notifycationsetting, response => {
      this.notifycationsetting = response.json().data;
      toggleslow();
    });*/
  }

  getNotificationActionSetting() {
    /*this.userService.GetNotifycationSetting(response => {
      this.notifycationsetting = response.json().data;
    });*/
  }
}
