import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class Spinner {

  protected _selector: string = '#spinner';
  protected _ele: HTMLElement;

  queues: Array<string> = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this._ele = document.querySelector(this._selector);
    }
  }

  public find(data: any) {
    return this.queues.indexOf(data);
  }

  public push(data): Spinner {
    this.queues.push(data);

    return this;
  }

  public splice(index: number = 0, length: number = 1): Spinner {
    this.queues.splice(index, 1);

    return this;
  }

  public show(message: string = 'Đang xử lý ...'): void {

    this._ele.querySelector('.spinner-message').innerHTML = message;
    this._ele.style.display = 'block';
  }

  public hide(delay: number = 0): void {
    this._ele.style.display = 'none';
    this._ele.querySelector('.spinner-message').innerHTML = '';

    /*$(this._element).hide(delay);
    $(this._element).find('.spinner-message').html('');*/
  }
}
