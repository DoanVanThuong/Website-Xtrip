import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Error, ProductOption, ProductPerBooking, ProductPerPax} from '../../../../../common/entities';
import {CPATTERN, CSTORAGE, MOBISCROLL_CONFIG} from '../../../../../app.constants';
import {GlobalState} from '../../../../../global.state';
import {AppBase} from '../../../../../app.base';
import {DeviceService, Spinner, StorageService} from '../../../../../common/services';
import {UploadOutput} from 'ngx-uploader';
import * as _ from 'lodash';
import {ProductRepo} from '../../../../../common/repos';
import {ToastrService} from 'ngx-toastr';
import {RequiredLeastCheckboxValidator} from '../../../../../common/validators';

@Component({
  selector: 'booking-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AdditionalInfoComponent extends AppBase {

  @Input() class: string = '';
  @Input() delay: number = 0; // 1s
  @Input('invalid') isInvalid: boolean = false;

  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  requestId: string = '';
  combo: ProductOption = new ProductOption();
  perBooking: ProductPerBooking[] = [];
  file: any = null;

  info: any[] = [];
  timeout: any;

  // dynamic scroll option
  scrollOption: any = Object.assign({}, MOBISCROLL_CONFIG, {
    display: 'bottom',
    minWidth: 300,
    wheels: [
      [{
        circular: false,
        data: [],
        label: ''
      }]
    ],
    formatValue: (data) => {
      return data[0];
    }
  });

  constructor(protected _fb: FormBuilder,
              private _state: GlobalState,
              private _storage: StorageService,
              private _spinner: Spinner,
              private _toastr: ToastrService,
              private _productRepo: ProductRepo,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.requestId = this._storage.getItem(this.CSTORAGE.PRODUCT_REQUEST_ID) || null;
    this.combo = new ProductOption(this._storage.getItem(CSTORAGE.PRODUCT_COMBO) || {});

    if (this.combo) {
      this.perBooking = _.filter(this.combo.options.perBooking, (perBooking: ProductPerBooking) => {
        return !perBooking.addons;
      });
    }

    this.file = null;
    this.ngFormInit();
  }

  //init form
  ngFormInit = () => {
    let group: any = {};

    this.perBooking = this.perBooking.map((item: any, index) => {

      switch (Number(item.inputType)) {
        case 1: {

          item.option = Object.assign({}, this.scrollOption, {
            wheels: [[{
              circular: false,
              data: this.perBooking[index].items.map(item => {
                return {
                  display: item.label,
                  value: item.value
                };
              }),
              label: this.perBooking[index].description || this.perBooking[index].name
            }]]
          });

          break;
        }
        case 2: {
          item.subItems = this._fb.array(
            item.items.map((subItem: any, index: number) => {
              return this.createFormControlItem(`${item.uuid}-${index}`, item.value || '');
            }),
            Validators.compose(item.required ? [RequiredLeastCheckboxValidator.validateList(item.uuid)] : [])
          );
          break;
        }
        case 5: { // boolean
          item.value = false;
          break;
        }
      }

      if (!!item.subItems) {
        group[item.uuid] = item.subItems;
      } else {
        group[item.uuid] = [
          item.value,
          Validators.compose(item.required ? [Validators.required] : [])
        ];
      }

      return item;
    });

    this.form = this._fb.group(group);
    this.onChange(this.form);

    this.form.valueChanges.subscribe((form) => {

      if (!!this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = window.setTimeout(() => {
        this.onChange(this.form);
      }, this.delay || 0);
    });
  };

  // fn create item in list
  createFormControlItem = (name: string, value: any = '', configs: any = []): FormGroup => {

    let item: any = {};

    item[name || 'subItem'] = [value, Validators.compose(configs)];

    return this._fb.group(item);
  };

  // fn on select dropdown
  onSelectDropdown = (uuid: string = '', $event: any) => {
    this.form.controls[uuid].setValue($event.value);
  };

  // fn on select value
  onSelectValue = (item: ProductPerPax, value: any) => {
    const field = _.find(this.info, (field: any) => {
      return item.uuid === field.uuid;
    });

    // not found
    if (!field) {
      return;
    }

    field.value = value;
    this.form.controls[field.uuid].setValue(value);
  };

  // fn on select file to upload
  onSelectFile = (item: ProductPerPax, output: UploadOutput,): void => {

    const field = _.find(this.info, (field: any) => {
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

  // fn on change
  onChange = (form: any) => {
    this.changes.emit(this.form);
  };

  // fn find in list
  findInList = (uuid: string = '', list: any[] = []) => {
    return this.utilityHelper.findInListWith(this.form.controls[uuid].value, list, 'value', 'label');
  };
}
