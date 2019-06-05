import { Component, ViewEncapsulation, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class ProgressBar {

  @Input('text') text: string = '';

  isRunning: boolean = false;

  speed: number = 500;
  show: boolean = false;
  interval: any = null;
  limit: number = 90;
  progress: number = 0;
  options: any = {};

  constructor(private _ele: ElementRef) {
  }

  ngOnInit() {
  }

  // fn start progress bar
  start = () => {

    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.show = true;
    this.progress = 0;
    this.limit = this.genNumber(70, 95);
    this.running();
  };

  complete = () => {

    this.progress = 100;

    setTimeout(() => {

      this.isRunning = false;
      this.show = false;
      this.progress = 0;
    }, 500);
  };

  // set time
  set = (progress: number = 0) => {

    if (typeof progress !== 'number') {
      progress = 0;
    }

    this.progress = progress;

    if (this.progress > 100) {
      this.complete();
    }

  };

  //start progress bar
  private running() {

    const progress = this.genNumber(10, 20);

    if ((this.progress + progress) > this.limit && !!this.interval) {
      clearTimeout(this.interval);
    } else {

      this.interval = setTimeout(() => {

        this.set(this.progress + progress);

        this.running();
      }, this.genNumber(500, 1500));
    }
  }

  //get random interger
  private genNumber(min: number = 0, max: number = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
