import {Component} from '@angular/core';
import {PopupBase} from '../../../../components/popup/popup.base';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video.popup.html',
  styleUrls: ['./video.popup.less']
})
export class VideoPopup extends PopupBase {

  private player;
  private ytEvent;
  videoId: string = 'mM-rxdLPI7A';
  playerVars = {
    cc_lang_pref: 'vi'
  };

  constructor() {
    super();
    this.onInit = this.init;
  }

  init = () => {
    this.playVideo();
  };

  // custom hidden
  hide = (): any => {
    this.pauseVideo();
    this.popup.hide();
    return this;
  };

  onStateChange(event): void {
    this.ytEvent = event.data;
  }

  savePlayer(player: any): void {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }
}
