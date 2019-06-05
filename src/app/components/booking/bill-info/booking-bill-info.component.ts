import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {RequiredWithValidator} from '../../../common/validators';
import {AppForm} from '../../../app.form';

@Component({
  selector: 'booking-bill-info',
  templateUrl: './booking-bill-info.component.html',
  styleUrls: ['./booking-bill-info.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingBillInfoComponent extends AppForm {

  @Input('title') title: string;
  @Input('data') data: any = {
    companyName: '',
    taxIndentificationNo: '',
    companyAddress: '',
    isVAT: false
  };
  @Output('changes') changes: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  isShowVAT = false;

  companyName: AbstractControl;
  taxIdentificationNo: AbstractControl;
  companyAddress: AbstractControl;
  isVAT: AbstractControl;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.onFormInit();
  }

  ngOnChanges() {
    if (!!this.data) {
      this.isShowVAT = this.data.isVAT;
      this.onChangeSwitchBill(this.data.isVAT);
    }
  }

  //init form
  onFormInit = () => {

    this.form = this.fb.group({
      companyName: [this.data.companyName || '', Validators.compose([
        RequiredWithValidator.validate(this.isShowVAT)
      ])],
      taxIdentificationNo: [this.data.taxIdentificationNo || '', Validators.compose([
        RequiredWithValidator.validate(this.isShowVAT)
      ])],
      companyAddress: [this.data.companyAddress || '', Validators.compose([
        RequiredWithValidator.validate(this.isShowVAT)
      ])],
      isVAT: [this.isShowVAT, Validators.compose([])],
    });

    this.companyName = this.form.controls.companyName;
    this.taxIdentificationNo = this.form.controls.taxIdentificationNo;
    this.companyAddress = this.form.controls.companyAddress;
    this.isVAT = this.form.controls.isVAT;

    this.form.valueChanges.subscribe((form) => {
      this.onChanges(this.form);
    });

    this.onChanges(this.form);
  };

  //on change switch button
  onChangeSwitchBill(value: boolean = false) {
    this.isShowVAT = value;

    this.onFormInit();

    this.onChanges(this.form);
  }

  // fn on change
  onChanges = (data: any) => {
    this.changes.emit(data);
  };
}