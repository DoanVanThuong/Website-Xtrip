import {Component, EventEmitter, Input, Output, ViewEncapsulation, ViewChild, OnChanges} from '@angular/core';
import {FlightSegment, RequiredWithValidator, Security, StorageService} from '../../../common/index';
import {CAPP, CPATTERN, CVOCATIVE, DATE_FORMAT, MOBISCROLL_CONFIG} from '../../../app.constants';
import {Router} from '@angular/router';
import {PopupBase} from '../popup.base';
import {PassengerSelectorPopup} from '../passenger-selector/passenger-selector.popup';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Passenger} from '../../../common/entities/passenger.entity';
import * as moment from 'moment';

@Component({
  selector: 'passenger-info-popup',
  templateUrl: './passenger-info.popup.html',
  styleUrls: ['./passenger-info.popup.less'],
  encapsulation: ViewEncapsulation.None
})

export class PassengerInfoPopup extends PopupBase implements OnChanges {

  @ViewChild(PassengerSelectorPopup) passengerSelectorPopup: PassengerSelectorPopup;

  @Input() passenger: Passenger = new Passenger();
  @Input() segments: FlightSegment[] = [];

  @Input('range-age') rangeAge: any = {
    from: 0,
    to: 0
  };
  @Input('invalid') isInValid: boolean = false;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  heading: string = '';
  passengerIndex: any = '';
  mask = CPATTERN.DATE_MASK;

  carriers: Array<any> = [];
  airports: Array<any> = [];

  vocatives: Array<any> = CVOCATIVE.ADULT;

  selectedBaggages: Array<any> = [];

  passportForm: FormGroup;
  form: FormGroup;
  title: AbstractControl;
  lastName: AbstractControl;
  firstName: AbstractControl;
  dateOfBirth: AbstractControl;

  isDOBShow: boolean = false;
  isBaggageShow: boolean = false;

  isInternational = false;

  scrollTitleOptions: any = Object.assign({}, MOBISCROLL_CONFIG, {
    display: 'bottom',
    minWidth: 300,
    wheels: [
      [{
        circular: false,
        data: [],
        label: 'Chọn danh xưng'
      }]
    ],
    formatValue: (data) => {
      return data[0];
    }
  });

  baggageOptions: any[] = [];
  scrollBaggageOption: any = Object.assign({}, MOBISCROLL_CONFIG, {
    display: 'bottom',
    minWidth: 300,
    wheels: [
      [{
        circular: false,
        data: [],
        label: 'Chọn hành lý'
      }]
    ],
    formatValue: (data) => {
      return data[0];
    }
  });

  constructor(private _fb: FormBuilder,
              private router: Router,
              private _security: Security) {
    super();

  }

  onInit = (): void => {
    this.onHandleBaggage();
    this.onHandlePassenger();
    this.onFormInit();
  };

  ngOnInit() {

    this.onHandleBaggage();
    this.onHandlePassenger();
    this.onFormInit();

  }

  ngOnChanges() {

    this.onHandleBaggage();
    this.onHandlePassenger();

    if (!!this.form && !!this.passenger.id) {
      this.form
        .patchValue(Object.assign({}, this.passenger, {
          dateOfBirth: !!this.passenger.dateOfBirth ? (
              this.utilityHelper.isDateWith(this.passenger.dateOfBirth, DATE_FORMAT.VALUE)
                ? this.passenger.dateOfBirth
                : this.utilityHelper.convertDateWith(this.passenger.dateOfBirth, DATE_FORMAT.VALUE))
            : ''
        }));

      for (let key in this.form.value) {
        this.form.controls[key].markAsTouched({
          onlySelf: true
        });
      }
    }
  };


  // fn form init
  onFormInit = () => {
    this.passportForm = this._fb.group({});

    this.form = this._fb.group({
      title: [this.passenger.title || '', Validators.compose([Validators.required])],
      firstName: [this.passenger.firstName || '', Validators.compose([Validators.required])],
      lastName: [this.passenger.lastName || '', Validators.compose([Validators.required])],
      dateOfBirth: [this.passenger.dateOfBirth || '', Validators.compose([
        RequiredWithValidator.validate((['child', 'infant']).indexOf(this.passenger.type) !== -1)
      ])],
    });

    this.title = this.form.controls.title;
    this.firstName = this.form.controls.firstName;
    this.lastName = this.form.controls.lastName;
    this.dateOfBirth = this.form.controls.dateOfBirth;

    // date of birth change
    this.dateOfBirth.valueChanges.subscribe((value) => {
      if (value && this.passenger.type !== 'adult') {
        let now = moment();

        let valid = this.utilityHelper.validDateFormatWith(value);
        let date = moment(value, 'DD/MM/YYYY');

        if (!valid || now.diff(date) < 0) {
          this.dateOfBirth.setErrors({date: true});
          return;
        }

        switch (this.passenger.type) {
          case 'child':
          case 'infant': {

            let duration = moment(now.format('MM/DD/YYYY')).diff(date, 'years', true);

            if (this.rangeAge.from > duration || duration >= this.rangeAge.to) {
              this.dateOfBirth.setErrors({range_age: true});
              return;
            }
            break;
          }
        }
      }

      this.dateOfBirth.setErrors(null);
    });
  };

  // on handle baggage
  onHandleBaggage = (): void => {

    this.baggageOptions = [];

    this.selectedBaggages = this.segments.map((segment, index) => {

      this.baggageOptions.push(Object.assign({}, this.scrollBaggageOption, {
        wheels: [
          [{
            circular: false,
            data: segment.baggages.map((baggage: any, index: number) => {
              return {
                value: baggage.id,
                display: `${baggage.weight}${baggage.unit} (+${baggage.price} đ)`
              };
            }),
            label: 'Chọn hành lý'
          }]
        ]
      }));

      return segment.baggages[0];
    });
  };

  // fn handle passenger to binding
  onHandlePassenger = (): void => {

    switch (this.passenger.type) {
      default:
      case 'adult': {
        this.vocatives = CVOCATIVE.ADULT;
        this.isBaggageShow = true;
        this.isDOBShow = false;

        break;
      }
      case 'child':
      case 'infant': {
        this.vocatives = CVOCATIVE.CHILD;
        this.isDOBShow = true;
        this.isBaggageShow = false;

        if (this.passenger.type === 'child') {
          this.isBaggageShow = true;
        }

        break;
      }
    }

    this.scrollTitleOptions.wheels[0][0].data = this.vocatives; // this.getVocativesBy();

    // push baggage
    this.passenger.baggages.map((baggage, index) => {
      this.onSelectBaggage(baggage, Number(index));
    });

    // set content
    this.heading = `Hành khách ${this.passenger.type == 'adult' ? 'người lớn' : this.passenger.type == 'child' ? 'trẻ em' : 'em bé'} ${this.passengerIndex}`;
  };

  getVocativesBy = (vocatives: string[] = []): Array<any> => {
    return vocatives.map(item => {
      return {
        display: item,
        value: this.utilityHelper.getValueVocative(item)
      };
    });
  };

  // fn on set baggage
  onSetBaggage = ($event: any, segmentIndex: number) => {
    const baggage = this.utilityHelper.findInListWith($event.valueText, this.segments[segmentIndex].baggages, 'id', null);

    this.onSelectBaggage(baggage, segmentIndex);
  };

  // fn on select baggage
  onSelectBaggage = (baggage: any, segmentIndex: number) => {
    this.selectedBaggages[segmentIndex] = baggage;
  };

  // fn passport change
  onPassportChange = ($event: any) => {
    this.passportForm = $event;
  };

  // fn on detect disablw submit
  detectDisabledSubmit = () => {
    return this.form.invalid || this.passportForm.invalid;
  };

  // fn on submit
  onSubmit() {
    this.hide();

    let passenger = Object.assign(this.form.value, this.passportForm.value, {
      type: this.passenger.type,
      title: this.title.value,
      baggages: this.selectedBaggages
    });

    this.submit.emit(passenger);
  }

  // fn on select passgenr
  onSelectPassenger = (passenger: Passenger): void => {

    this.firstName.setValue(passenger.firstName);
    this.lastName.setValue(passenger.lastName);
    this.title.setValue(this.onSelectTitle(passenger.title));

    if (this.isDOBShow) {
      this.dateOfBirth.setValue(!!passenger.dateOfBirth ? (
          this.utilityHelper.isDateWith(passenger.dateOfBirth, DATE_FORMAT.DATE)
            ? this.passenger.dateOfBirth
            : this.utilityHelper.convertDateWith(passenger.dateOfBirth, DATE_FORMAT.DATE))
        : '');
    }

    // fn set
    this.passenger = Object.assign(passenger, {type: this.passenger.type});
  };

  // fn on select title
  onSelectTitle = (title: string = ''): any => {

    if (!!title) {
      let index = this.vocatives.indexOf(title);
      if (index !== -1) {
        return this.vocatives[index];
      }
    }

    return null;
  };

  //check open form passenger
  onOpenFormPassenger() {
    if (this._security.isAuthenticated()) {
      this.passengerSelectorPopup.show();
    } else {
      this.router.navigate(['/authentication']);
    }
  }

}
