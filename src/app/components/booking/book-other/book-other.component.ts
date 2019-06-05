import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {RequiredWithValidator} from '../../../common';
import {AppForm} from '../../../app.form';
import {AppBase} from '../../../app.base';
import { DeviceService } from '../../../common';


@Component({
  selector: 'book-other',
  templateUrl: './book-other.component.html',
  styleUrls: ['./book-other.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookOther extends AppForm {

  @Input() data: string = '';
  @Input('invalid') isInvalid: boolean = false;
  @Input() title ?: string = '';

  @Output('changes') changes: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  representer: AbstractControl;
  isShow: boolean = false;

  constructor(private fb: FormBuilder, private _device: DeviceService) {
    super();
    this.setDeviceMode(this._device);
  }

  ngOnInit() {
    this.onFormInit();
  }

  ngOnChanges() {
    if (!!this.data) {
      this.onSelectBookTo(!!this.data);
    }
  }

  //init form
  onFormInit = () => {
    this.form = this.fb.group({
      representer: [this.data || '', Validators.compose([
        RequiredWithValidator.validate(this.isShow)
      ])]
    });

    this.representer = this.form.controls.representer;

    this.form.valueChanges.subscribe((form) => {
      this.onChanges(this.form);
    });

    this.onChanges(this.form);
  };

  // fn on select booking to other
  onSelectBookTo = (value: boolean = false): void => {
    this.isShow = value;

    this.onFormInit();

    this.onChanges(this.form);
  };

  // fn on submit - changes
  onChanges = (form: any) => {
    this.changes.emit(form);
  };
}