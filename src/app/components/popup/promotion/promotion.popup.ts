import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PopupBase} from '../popup.base';
import {Router} from '@angular/router';
import {PromotionRepo, Spinner, Promotion} from '../../../common';
import {ToastrService} from 'ngx-toastr';
import {PromotionResultPopup} from '../promotion-result-popup/promotion-result-popup.component';

@Component({
  selector: 'promotion-popup',
  templateUrl: './promotion.popup.html',
  styleUrls: ['./promotion.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class PromotionPopup extends PopupBase {

  //@ViewChild(RewardPointPopup) rewardPointPopup: RewardPointPopup;
  @ViewChild(PromotionResultPopup) promotionResultPopup: PromotionResultPopup;

  constructor(
    private _router: Router,
    private _promotionRepo: PromotionRepo,
    private _spinner: Spinner,
    private _toastr: ToastrService,
    protected fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.ngFormInit();
  }

  ngAfterViewInit() {
  }

  data: Promotion = new Promotion();
  errorMessage = '';

  code: AbstractControl;
  form: FormGroup;

  //init form
  ngFormInit = () => {
    this.form = this.fb.group({
      code: ['', Validators.compose([Validators.required])]
    });
    this.code = this.form.controls.code;
  };

  //submit form
  onSubmit() {
    this.activePromotionCodeService(this.code.value);

  }

  //service active promotion code
  activePromotionCodeService(code) {
    return this._promotionRepo
      .postPromotionCode(code)
      .then(
        (res: any) => {
          switch (res.code.toLowerCase()) {
            case 'success': {
              this.data = new Promotion(res.data);

              this.hide();
              this.promotionResultPopup.show();
            }
            case 'fail': {
              this.handleError(res.errors);
            }
          }
        },
        (errors: Error[] = []) => {
          this._spinner.hide();
          this.handleError(errors);
        }
      );
  };

  // fn handle error
  handleError = (errors: any = []) => {
    let message = 'Đã có lỗi xảy ra.';

    if (errors.length) {
      message = errors[0].value || message;
    }

    this.errorMessage = message;
  };

  //on change code event
  onChangeCode = ($event: any = null): void => {
    this.errorMessage = '';
  }

  //cancel popup
  onCancel = () => {
    this.code.clearValidators();
    this.code.setValue('');
    this.hide();
  }


}
