import {ViewChild, OnChanges} from '@angular/core';
import {ModalDirective, ModalOptions} from 'ngx-bootstrap';
import {AppForm} from '../../app.form';
import {environment} from '../../../environments/environment';

export abstract class PopupBase extends AppForm {

  @ViewChild('popup') popup: ModalDirective;
  options: ModalOptions = {
    animated: false
  };

  title: any = 'Thông báo';
  message: string = '';
  isClose: boolean = false;
  btnAcceptLabel: string = 'Đồng ý';
  btnCancelLabel: string = 'Hủy';
  staticURL = environment.API_STATIC_URL + '/payment/';
  event: any = {
    accept: function () {
    },
    cancel: function () {
    }
  };

  onInit: any = null;

  constructor() {
    super();
  }


  // fn set options
  setOptions = (options?: any): any => {
    this.options = Object.assign(this.options, options);
    return this;
  };

  // fn set config to handle
  setSettings = (options?: any): any => {
    let self = this;
    if (_.isObject(options) || _.isArray(options)) {
      _.each(options, function (val, key) {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });
    }

    return this;
  };

  // show poup
  show = (options?: any): any => {

    this.setOptions(Object.assign(this.options, options));

    if (!this.popup.isShown) {

      this.autofocus();

      if (this.onInit instanceof Function) {
        this.onInit();
      }

      this.popup.config = this.options;
      this.popup.show();
    }

    return this;
  };

  // fn open popup
  open = (settings?: any, options?: any): any => {

    this.setSettings(settings || {})
      .setOptions(options || {});

    if (!this.popup.isShown) {
      this.popup.show();
    }

    return this;
  };

  // close popup
  hide = (): any => {
    this.popup.hide();
    return this;
  };

  autofocus = () => {
    // $(this.ele).find('input[type=text], input[type=result], input[type=password] input[type=number]').first().focus();
  };


}
