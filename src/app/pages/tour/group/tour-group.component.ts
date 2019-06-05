import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TourRepo} from '../../../common/repos';
import {AppBase} from '../../../app.base';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {Error} from '../../../common/entities';
import {Location} from '@angular/common';
import {MOBISCROLL_CONFIG} from "../../../app.constants";

@Component({
  selector: 'app-group-booking-tour',
  templateUrl: './tour-group.component.html',
  styleUrls: ['./tour-group.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class TourGroupComponent extends AppBase {

  form: FormGroup;
  contactForm: FormGroup;

  departPlace: AbstractControl;
  arrivalPlace: AbstractControl;
  estimatedcost: AbstractControl;
  localDate: AbstractControl;

  months: Array<any> = [];
  selectedMonth: any = null;

  scrollOptions: any = Object.assign(MOBISCROLL_CONFIG, {
    wheels: [
      [{
        circular: false,
        data: this.months,
        label: 'Tháng khởi hành'
      }]
    ],
    minWidth: 250,
    maxWidth: 320,
    formatValue: (data: any) => {
      let month = moment(data[0]);
      return `Tháng ${month.month() + 1}, ${month.year()}`;
    }
  });

  constructor(private _fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _tourRepo: TourRepo,
              private _toastr: ToastrService,
              private _location: Location) {
    super();
  }

  // fn on init
  ngOnInit() {
    this.getMonths();
    this.onFormInit();
  }

  // fn after view init
  ngAfterViewInit() {
  }

  // fn form init
  onFormInit = () => {
    this.contactForm = this._fb.group({});

    this.form = this._fb.group({
      departPlace: ['', Validators.compose([
        Validators.required
      ])],
      arrivalPlace: ['', Validators.compose([
        Validators.required
      ])],
      estimatedcost: [, Validators.compose([
        Validators.required
      ])],
      localDate: [this.months[0].display, Validators.compose([
        Validators.required
      ])]
    });

    this.departPlace = this.form.controls.departPlace;
    this.arrivalPlace = this.form.controls.arrivalPlace;
    this.estimatedcost = this.form.controls.estimatedcost;
    this.localDate = this.form.controls.localDate;
  };

  // fn get months
  getMonths = () => {
    let now = moment();

    for (let i = 0; i < 12; i++) {
      let month = moment(now).add(i, 'month');
      this.months.push({
        value: month,
        display: `Tháng ${month.month() + 1}, ${month.year()}`
      });

      if (i === 0) {
        //this.localDate.setValue(months[i + 1].display);
      }
    }

    this.scrollOptions.wheels[0][0].data = this.months;
  };

  // fn on submit
  onSubmit = (params: any = {}) => {

    params = Object.assign(params, {
      departMonth: this.selectedMonth ? (moment(this.selectedMonth).month() + 1) : '',
      departYear: this.selectedMonth ? moment(this.selectedMonth).year() : '',
      contact: this.contactForm.value
    });

    return this._tourRepo
      .bookGroup(params)
      .then(
        (res: any) => {
          this._toastr.success('Đã gửi yêu cầu thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất', 'Đặt tour theo đoàn');
          this._location.back();
        },
        (errors: Array<Error> = []) => {
          let message = 'Đã có lổi xãy ra khi đăng kí thông tin đặt tour theo đoàn. Vui lòng thử lại sau.';

          if (!!errors.length) {
            message = errors[0].value;
          }
          this._toastr.error(message, 'Đặt tour theo đoàn');
        }
      );

  };

  // ng contact change
  onContactChange = (event: any) => {
    this.contactForm = event;
  };

  // ng set month
  onSetMonth = (event: any) => {
    let month = _.find(this.months, (item) => {
      return item.display === event.valueText;
    });

    if (month) {
      this.selectedMonth = moment(month.value);
    } else {
      this.selectedMonth = null;
    }
  };
}
