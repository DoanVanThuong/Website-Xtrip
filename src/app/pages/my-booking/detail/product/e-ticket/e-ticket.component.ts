import {Component, ViewChild} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {TourRepo, BookingRepo} from '../../../../../common/repos';
import {Router, ActivatedRoute} from '@angular/router';
import {Spinner} from '../../../../../common/services';
import {ToastrService} from 'ngx-toastr';
import {Error, ProductReservation} from '../../../../../common';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

@Component({
  selector: 'booking-product-detail-e-ticket',
  templateUrl: './e-ticket.component.html'
})
export class BookingProductDetailETicketComponent extends AppPage {

  product: ProductReservation = new ProductReservation();

  isLoading: boolean = false;
  isViewMode: boolean = false;
  links: any[] = [];
  selectedLink: any = null;

  constructor(private _router: Router,
              private _spinner: Spinner,
              private _bookingRepo: BookingRepo,
              private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.onGetDetail(params.code);
    });

  }

  // fn get detail
  onGetDetail = (code: string = '') => {

    return this._bookingRepo
      .getBookedProductDetail(code)
      .then(
        (res: any) => {

          this.product = new ProductReservation(res.data);
          this.links = this.product.vouchers.map(item => {

            let sub = item.split('/');

            return {
              name: sub[sub.length - 1].split('.')[0],
              link: item
            };
          });

          if (this.links.length === 1) {
            this.isViewMode = true;
          }

          if (!!this.links.length) {
            this.selectedLink = this.links[0];
          }
        }
      );
  };

  onSelectLink = (link: any = null) => {
    this.selectedLink = link;
    this.isViewMode = true;
  };

  onLoadPDF = (type: string = ''): void => {
    switch (type) {
      case 'loading': {
        this.isLoading = true;
        break;
      }
      case'end': {
        this.isLoading = false;
        break;
      }
    }
  };
}