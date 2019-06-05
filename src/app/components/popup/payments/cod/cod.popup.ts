import {Component, EventEmitter, Output, ViewEncapsulation, Input} from '@angular/core';
import {PopupBase} from '../../popup.base';
import {FormGroup, FormBuilder, AbstractControl, Validators} from '@angular/forms';
import {StorageService} from '../../../../common';
import {CPATTERN, CBOOKING} from '../../../../app.constants';

@Component({
  selector: 'cod-popup',
  templateUrl: './cod.popup.html',
  styleUrls: ['./cod.popup.less'],
  encapsulation: ViewEncapsulation.None
})

export class PaymentCODPopup extends PopupBase {

  heading: string = 'Thanh toán qua thu hộ';
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  contact: any = {FullName: '', LastName: '', MobileNumber: '', Address: '', Note: '',};

  form: FormGroup;
  FullName: AbstractControl;
  MobileNumber: AbstractControl;
  Address: AbstractControl;
  Note: AbstractControl;

  constructor(private _formBuilder: FormBuilder, private _storage: StorageService) {
    super();
  }

  ngOnInit() {
    this.contact = this._storage.getItem(this.CSTORAGE.CONTACT_INFO) || {};
    this.initForm();
  }

  //fn init form
  initForm() {
    this.form = this._formBuilder.group({
      'FullName': [(this.contact.LastName || '') + ' ' + (this.contact.FirstName || ''), Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      'MobileNumber': [this.contact.MobileNumber || '', Validators.compose([
        Validators.required,
        Validators.pattern(CPATTERN.PHONE_REGEX),
      ])],
      'Address': ['', Validators.compose([
        Validators.required,
      ])],
      'Note': ['', Validators.compose([])],
    });

    this.FullName = this.form.controls['FullName'];
    this.MobileNumber = this.form.controls['MobileNumber'];
    this.Address = this.form.controls['Address'];
    this.Note = this.form.controls['Note'];
  }

  //fn comfirm payment
  onSubmit = ($event: any): void => {
    this.confirm.emit(this.form);
    this.hide();
  }
}
