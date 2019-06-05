import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, Validators} from '@angular/forms';
import {AppBase} from '../../../app.base';
import {StorageService} from '../../../common/services';
import {CPATTERN, CSTORAGE} from '../../../app.constants';
import {Security} from "../../../common/security";
import {User} from "../../../common/entities";

@Component({
  selector: 'cod-form',
  templateUrl: './cod-form.component.html',
  styleUrls: ['./cod-form.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class CodFormComponent extends AppBase {

  @Input() delay: number = 0;
  @Input() contact: any = {FullName: '', FirstName: '', LastName: '', MobileNumber: '', Address: '', Note: ''};

  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  FullName: AbstractControl;
  MobileNumber: AbstractControl;
  Address: AbstractControl;
  Note: AbstractControl;

  timeout: any = null;

  constructor(private _formBuilder: FormBuilder,
              private _security: Security,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    this.getContactInfo();
    this.ngFormInit();
  }

  // handle contact info
  getContactInfo = (): void => {

    let contact = this._storage.getItem(CSTORAGE.CONTACT_INFO);

    if (!contact && this._security.isAuthenticated()) {
      let profile: User = this._security.getCurrentUser();

      contact = {
        FirstName: profile.firstName,
        LastName: profile.lastName,
        MobileNumber: profile.phone
      };
    }

    this.contact = Object.assign(this.contact, contact, {
      FullName: `${contact.LastName || ''} ${contact.FirstName || ''}`.trim()
    });
  };

  //fn init form
  ngFormInit = (): void => {
    this.form = this._formBuilder.group({
      'FullName': [this.contact.FullName || '', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      'MobileNumber': [this.contact.MobileNumber || '', Validators.compose([
        Validators.required,
        Validators.pattern(CPATTERN.PHONE_REGEX),
      ])],
      'Address': [this.contact.Address || '', Validators.compose([
        Validators.required,
      ])],
      'Note': [this.contact.Note || '', Validators.compose([])],
    });

    this.FullName = this.form.controls['FullName'];
    this.MobileNumber = this.form.controls['MobileNumber'];
    this.Address = this.form.controls['Address'];
    this.Note = this.form.controls['Note'];

    this.form.valueChanges.subscribe((form) => {

      if (!!this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.onChange(this.form);
      }, this.delay * 1000);

    });

    this.onChange(this.form);
  }

  // on changes
  onChange = (form: any): void => {
    this.changes.emit(form);
  };
}
