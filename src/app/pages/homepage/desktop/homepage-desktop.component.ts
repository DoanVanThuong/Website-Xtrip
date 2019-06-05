import {Component, ViewChild} from '@angular/core';
import {HomepageMobileComponent} from '../mobile/homepage-mobile.component';
import {VideoPopup} from '../components/video-popup/video.popup';

@Component({
  selector: 'app-homepage-desktop',
  templateUrl: './homepage-desktop.component.html',
})

export class HomepageDesktopComponent extends HomepageMobileComponent {

  @ViewChild(VideoPopup) videoPopup: VideoPopup;

  // fn open video-popup popup
  onOpenVideoPopup = (): void => {
    this.videoPopup.show();
  };
}
