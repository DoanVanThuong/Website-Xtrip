import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Error, ProductOption, ProductPerPax} from '../../../../../common/entities';
import {GlobalRepo, ProductRepo} from '../../../../../common/repos';
import {DeviceService, Spinner, StorageService} from '../../../../../common/services';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {UploaderOptions, UploadInput, UploadOutput} from 'ngx-uploader';
import {AppBase} from '../../../../../app.base';
import {CPATTERN, CSTORAGE} from '../../../../../app.constants';

@Component({
  selector: 'passenger-info-item',
  templateUrl: './passenger-info-item.component.html',
  styleUrls: ['./passenger-info-item.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class PassengerInfoItemComponent extends AppBase {

  @Input() passenger: { options } = {options: []};
  @Input() delay: number = 0;
  @Input('invalid') isInvalid: boolean = false;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  requestId: string = '';
  combo: ProductOption = new ProductOption();
  perPax: ProductPerPax[] = [];

  countries: string[] = [];
  form: FormGroup;
  file: any;

  timeout: any;
  uploadInput: EventEmitter<UploadInput>;
  uploaderOptions: UploaderOptions = {
    concurrency: 1,
    maxUploads: 1
  };

  constructor(private _router: Router,
              private _storage: StorageService,
              private _fb: FormBuilder,
              private _globalRepo: GlobalRepo,
              private _productRepo: ProductRepo,
              private _spinner: Spinner,
              private _toastr: ToastrService,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.requestId = this._storage.getItem(this.CSTORAGE.PRODUCT_REQUEST_ID) || null;
    this.combo = new ProductOption(this._storage.getItem(CSTORAGE.PRODUCT_COMBO) || {});

    this.perPax = this.combo.options.perPax;

    this.perPax = this.combo.options.perPax;

    this.getCountries();
    this.ngFormInit();
  }

  ngOnChanges(): void {
    if (!!this.perPax.length && !!this.passenger.options.length) {
      this.ngFormInit();
    }
  }

  // fn form init
  ngFormInit = () => {

    let group: any = {};

    this.passenger.options.map((item: any, index: number) => {

      switch (this.perPax[index].inputType) {
        case 1: {
          if (!!item.value) {
            this.perPax[index].selectedValue = this.utilityHelper.findInListWith(item.value, this.perPax[index].items, 'value', null);
          }
          break;
        }
        case 7:
        case 8: {
          // upload hình ảnh
          if (!!item.value && !this.file) {
            this.file = {
              src: item.value
            };
          }
          break;
        }
        case 15: {
          // giới tính
          if (!item.value) {
            item.value = this.perPax[index].items[0].value;
          }
          break;
        }
      }

      group[item.uuid] = [
        item.value || '',
        Validators.compose(this.perPax[index].required ? [Validators.required] : [])
      ];

      return item;
    });

    this.form = this._fb.group(group);
    this.form
      .valueChanges
      .subscribe((values: any) => {

        if (this.form.valid) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.onChange();
          }, Number(this.delay) || 0);
        }
      });
  };

  // fn on get country
  getCountries = () => {
    return this._globalRepo
      .getCountries()
      .then(
        (res: any) => {
          this.countries = res.map(country => country.name);
        }
      );
  };

  // fn on select dropdown
  onSelectDropdown = (uuid: string = '', $event: any) => {

    this.form.controls[uuid].setValue($event.value);

    const perPax = this.utilityHelper.findInListWith(uuid, this.perPax, 'uuid', null);
    if (!!perPax) {
      perPax.selectedValue = $event;
    }
  };

  // fn on select value
  onSelectValue = (item: ProductPerPax, value: any) => {
    const field = _.find(this.passenger.options, (field: any) => {
      return item.uuid === field.uuid;
    });

    // not found
    if (!field) {
      return;
    }

    field.value = value;
    this.form.controls[field.uuid].setValue(value);
  };

  // on submit
  onSubmit = () => {
    this.submit.emit(this.passenger.options);
  };

  // fn on select file to upload
  onSelectFile = (item: ProductPerPax, output: UploadOutput,): void => {

    const field = _.find(this.passenger.options, (field: any) => {
      return item.uuid === field.uuid;
    });

    // not found
    if (!field) {
      return;
    }

    if (output.file && output.file.nativeFile) {
      let file = output.file.nativeFile;

      this._spinner.show();

      this._productRepo
        .uploadPassengerFile(field.uuid, {
          file,
          requestId: this.requestId
        })
        .then(
          (res: any) => {
            this.file = res.data;
            this.onSelectValue(item, res.data.src);
            this._spinner.hide();
          },
          (errors: Error[] = []) => {
            this._toastr.error(errors[0].value);
            this._spinner.hide();
          }
        );
    }
  };

  // fn on upload image
  onRemoveImage = (item: ProductPerPax) => {
    if (!!this.file) {
      this.file = null;
      this.onSelectValue(item, '');

    }
  };

  // fn data change
  onChange = () => {

    let options = [];
    for (let key in this.form.value) {
      options.push({
        uuid: key,
        value: this.form.value[key]
      });
    }

    this.changes.emit(options);
  };

  // fn get passenger title
  getPassengerTitle = (passenger: any = {}) => {

    switch (passenger.paxType) {
      case 'SNR': {
        return 'người cao tuổi';
      }
      case 'ADT': {
        return 'người lớn';
      }
      case 'CHD': {
        return 'trẻ em';
      }
      case 'INF': {
        return 'em bé';
      }
      default: {
        return '';
      }
    }
  };

  findInList = (uuid: string = '', list: any[] = []) => {
    return this.utilityHelper.findInListWith(this.form.controls[uuid].value, list, 'value', 'label');
  };
}
