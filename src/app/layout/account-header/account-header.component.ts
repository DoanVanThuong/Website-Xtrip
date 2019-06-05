import {Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {Security} from '../../common/security';
import {User} from '../../common/entities';
import {AppBase} from '../../app.base';
import {MessageRepo} from '../../common/repos';
import {GlobalState} from '../../global.state';
import {EVENT} from '../../app.constants';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['../header/header.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AccountHeaderComponent extends AppBase {

  @Input('target-hidden') target: string = '.block-category';

  ele: HTMLElement;
  isLoggedIn: boolean = false;
  profile: User = new User();

  notificationBadge: number = 0;

  constructor(private _security: Security,
              private _state: GlobalState,
              private _ele: ElementRef,
              private _messageRepo: MessageRepo,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();
    this.ele = <HTMLElement>this._ele.nativeElement;
  }

  ngOnInit() {

    this.isLoggedIn = this._security.isAuthenticated();
    this.profile = this._security.getCurrentUser();

    this.getNotificationCheck();

    this._state.subscribe(EVENT.NOTIFICATION_CHANGED, (num: number = 0) => {
      this.getNotificationCheck();
    });

    this._state.subscribe('badge:updated', (num: number = 0) => {
      this.getNotificationCheck();
    });

  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    if (isPlatformBrowser(this.platformID)) {

      const banner = $('.smart-banner');
      const ele = $('.account-header');
      const wrapper = $('.wrapper');

      const target = $(this.target);

      if ($(window).scrollTop() > (banner.outerHeight() || 0)) {
        
        ele.addClass('fixed-top');

        let offset = target.offset().top + target.innerHeight() - ele.outerHeight();
        ele.css({
          top: target && $(window).scrollTop() > offset ? -100 : 0
        });

        wrapper.css({
          marginTop: ele.outerHeight()
        });

      } else {
        ele.removeClass('fixed-top');
        wrapper.removeAttr('style');
      }
    }
  }

  // fn get notification check
  getNotificationCheck() {
    return this._messageRepo
      .check()
      .then(
        (res: any) => {

          if (res.data.hasItems) {
            this.notificationBadge = res.data.inboxTotal + res.data.generalTotal;
          } else {
            this.notificationBadge = 0;
          }
        }
      );
  }
}
