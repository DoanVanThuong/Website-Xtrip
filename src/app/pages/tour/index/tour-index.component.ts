import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {TourRepo} from '../../../common/repos';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-tour-index',
  templateUrl: './tour-index.component.html',
  styleUrls: ['./tour-index.component.less',],
  encapsulation: ViewEncapsulation.None
})

export class TourIndexComponent extends AppPage {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _tourRepo: TourRepo,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this._router.navigate(['/404']);
  }
}
