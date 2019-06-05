import { Component, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ScrollToTopComponent {
  
  isShow: boolean;
  topPosToStartShowing = 100;
  
  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    scrollPosition >= this.topPosToStartShowing ? this.isShow = true : this.isShow = false
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  //on click outside
  // onClickedOutside(e) {
  //   console.log(e);
  // }
  
}
