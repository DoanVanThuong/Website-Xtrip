import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Country, Error, ProductOption, ProductPerPax} from '../../../../../common/entities';
import {CSTORAGE, MOBISCROLL_CONFIG} from '../../../../../app.constants';
import {PopupBase} from '../../../../../components/popup';
import {Spinner, StorageService} from '../../../../../common/services';
import {GlobalRepo, ProductRepo} from '../../../../../common/repos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {UploaderOptions, UploadInput, UploadOutput} from 'ngx-uploader';
import {ToastrService} from 'ngx-toastr';

const TYPE: any = {
  SELECTOR: 1,
  SELECT_MUTIPLE: 2,
  NUMBER_VALIDATOR: 3,
  STRING_VALIDATOR: 4,
  BOOLEAN: 5,
  DATE: 6,
  FILE: 7,
  FILE_VALIDATOR: 8,
  ADDRESS: 9,
  TIME: 10,
  DATETIME: 11,
  STRING: 12,
  STRING_NO: 14,
  RADIO: 15
};

@Component({
  selector: 'booking-passenger-info-popup',
  templateUrl: './passenger-info.popup.html',
  styleUrls: ['./passenger-info.popup.less'],
  encapsulation: ViewEncapsulation.None
})

export class BookingPassengerInfoPopup extends PopupBase {

  @Input() passenger: { options } = {options: []};
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  TYPE: any = TYPE;

  countries: Country[] = [];
  requestId: string = '';
  combo: ProductOption = new ProductOption();
  perPax: ProductPerPax[] = [];

  form: FormGroup;
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
      return data[0].value;
    }
  });
  file: any;

  constructor(private _router: Router,
              private _storage: StorageService,
              private _fb: FormBuilder,
              private _globalRepo: GlobalRepo,
              private _productRepo: ProductRepo,
              private _spinner: Spinner,
              private _toastr: ToastrService) {
    super();

    this.onInit = this.ngInit;
  }

  ngInit = () => {
    this.requestId = this._storage.getItem(this.CSTORAGE.PRODUCT_REQUEST_ID) || null;
    this.combo = new ProductOption(this._storage.getItem(CSTORAGE.PRODUCT_COMBO) || {});

    if (this.combo) {
      this.perPax = this.combo.options.perPax;
    }

    this.file = null;
    this.ngFormInit();
  };

  ngOnInit() {

    this.getCountries();
    this.ngFormInit();
  }

  // fn form init
  ngFormInit = () => {

    let group: any = {};
    this.passenger.options.map((item, index) => {

      switch (this.perPax[index].inputType) {
        case 1: { // select feature

          // set options to data
          if (!item.value) {
            item.value = this.perPax[index].items[0].value;
          }
          this.passenger.options[index].option = Object.assign({}, this.scrollOption, {
            wheels: [[
              {
                circular: false,
                data: this.perPax[index].items.map(item => {

                  let display = item.label;

                  if (!!item.price) {
                    display += ' - ' + this.utilityHelper.formatCurrency(item.price) + ' đ';
                  }

                  return {
                    display: display,
                    value: item.value
                  };
                }),
                label: this.perPax[0].description || 'Chọn một danh mục'
              }
            ]],
            formatValue: (data) => {

              const perPax = _.find(this.perPax, (item: any) => {
                return item.inputType === 1;
              });

              if (!perPax) {
                return data[0];
              }

              const result = _.find(perPax.items, (item: any) => {
                return item.value === data[0];
              });

              if (!result) {
                return data[0];
              }

              if(!!result.price ){
                return result.label + ' - ' + this.utilityHelper.formatCurrency(result.price) + ' đ';
              }

              return result.label;
            }
          });
          break;
        }
        case 5: {
          if (!item.value) {
            item.value = false;
          } else {
            item.value = !!item.value;
          }
          break;
        }
        case 7:
        case 8: { // file upload
          // upload hình ảnh
          if (!!item.value && !this.file) {
            this.file = {
              src: item.value
            };
          }
          break;
        }
        case 12: {
          if (!item.value) {
            item.value = this.countries[0].name;
          }
          this.passenger.options[index].option = Object.assign({}, this.scrollOption, {
            wheels: [[
              {
                circular: false,
                data: this.countries.map((country: Country) => {
                  return {
                    display: country.name,
                    value: country.name
                  };
                }),
                label: this.perPax[index].description || 'Chọn quốc gia'
              }
            ]],
            formatValue: (data) => {
              return data[0];
            }
          });
          break;
        }
        case 15: {
          if (!item.value) {
            item.value = this.perPax[index].items[0].value;
          }
          break;
        }
      }

      group[item.uuid] = [
        item.value,
        Validators.compose(this.perPax[index].required ? [Validators.required] : [])
      ];
    });

    this.form = this._fb.group(group);

    this.form.valueChanges.subscribe((form) => {

    });
  };

  // fn on get country
  getCountries = () => {
    return this._globalRepo
      .getCountries()
      .then(
        (res: any) => {
          this.countries = res.map(country => new Country(country));
        }
      );
  };

  // fn set value into scroller
  onSelectScroller = ($event: any, item: ProductPerPax) => {
    this.onSelectValue(item, $event.inst._wheelArray[0]);
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

  // fn on disable submit
  onDisabledSubmit = () => {
    return this.form.invalid;
  };

  // on submit
  onSubmit = () => {
    this.hide();

    let options = [];
    for (let key in this.form.value) {
      options.push({
        uuid: key,
        value: this.form.value[key]
      });
    }

    this.submit.emit(options);
  };

  uploadInput: EventEmitter<UploadInput>;
  uploaderOptions: UploaderOptions = {
    concurrency: 1,
    maxUploads: 1
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
}
