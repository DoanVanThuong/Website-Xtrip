import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-introduction',
  templateUrl: 'introduction.component.html',
  styleUrls: ['introduction.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class IntroductionComponent extends AppPage {

  constructor(private _router: Router,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit(): void {

    if (this.isMobile) {
      this._router.navigate(['/']);
    }
  }
}