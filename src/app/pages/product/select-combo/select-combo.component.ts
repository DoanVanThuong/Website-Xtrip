import {Component, ViewChild, HostListener} from '@angular/core';
import {AppBase} from '../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductRepo} from '../../../common/repos/product.repo';
import {ToastrService} from 'ngx-toastr';
import {Error, StorageService} from '../../../common';
import {DateSelectorPopup} from '../../../components/popup';

import * as moment from 'moment';
import {CSTORAGE} from '../../../app.constants';

@Component({
  selector: 'app-select-combo',
  templateUrl: './select-combo.component.html',
  styleUrls: ['./select-combo.component.less']
})
export class SelectComboMobileComponent extends AppBase {

  @ViewChild(DateSelectorPopup) dateSelectorPopup: DateSelectorPopup;

  productId: string = '';
  requestId: string = '';

  date: string = '';

  combos: any[] = [];

  isLoading: boolean = false;

  selectedDate: any = {
    start: null,
    end: null
  };
  dateOptions: any = {
    single: true,
    startOfWeek: 1
  };

  constructor(private _activatedRoute: ActivatedRoute,
              private _productRepo: ProductRepo,
              private _toastService: ToastrService,
              private _router: Router,
              private _storage: StorageService) {
    super();
  }

  @HostListener('window:scroll', ['$event'])
  scrollTo($event: any) {
      const header: HTMLElement = document.querySelector('.product-heading');

      if (window.scrollY > 0) {
        header.classList.add('scroll');
      } else {
        header.classList.remove('scroll');
      }
  };

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((param) => {
      this.productId = param.get('id');

      this._activatedRoute.params.subscribe((params:any) => {
        if(this.isDesktop){
          this._router.navigate([`/product/${this.productId}/detail`]);
          return;
        }
      });

      this.date = moment(param.get('date'), 'YYYY-MM-DD').format('DD/MM/YYYY');

      this.getCombo(this.productId, this.date);
    });
  }

  //fn get combo
  async getCombo(id: string, date: string) {
    this.isLoading = true;
    const data = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    try {
      const response: any = await this._productRepo.getOption(id, data);
      if (response.status) {
        this.combos = response.data || [];
      }
      else {
        this.handleError(response.errors[0]);
      }
      this.isLoading = false;

    } catch (error) {
      this.handleError(error);
    }
  }

  //fn handle error
  handleError(error: any) {
    this._toastService.error(`${new Error(error).value}`, 'Có lỗi xảy ra');
    this._router.navigate(['/']);
    this.isLoading = false;
  }

  onShowDatePicker() {
    this.dateSelectorPopup.show();
  }

  //fn select date
  onSelectDate(date: any) {
    this._router.navigate([`product/${this.productId}/detail/${moment(date.start).format('YYYY-MM-DD')}/combo`]);
  }

  //fn select combo
  async onSelectCombo(combo: any) {
    this.isLoading = true;
    try {
      const body = {
        productTypeId: combo.id,
        timeslotId: null,
        date: moment(this.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        seniors: combo.allowSeniors ? combo.minSeniors : 0,
        adults: combo.minPax,
        children: combo.allowChildren ? combo.minChildren : 0,
        infants: 0
      };

      const response: any = await this._productRepo.generateRequestID(body);
      if (response.code === 'Success') {
        this.requestId = response.data.requestId;
        this._router.navigate([`product/${this.productId}/detail/${body.date}/option`]);

        this._storage.setItem(CSTORAGE.PRODUCT_COMBO, combo);
        this._storage.setItem(CSTORAGE.PRODUCT_REQUEST_ID, this.requestId);
      }
      else {
        this.handleError(response.errors[0]);
      }

    } catch (error) {
      this.handleError(error);
    }
    finally{
      this.isLoading = false;
    }
  }

  back() {
    window.history.back();
  }

}


