import { Component, ViewEncapsulation } from '@angular/core';
import { PopupBase } from '../popup.base';
import { PromotionRepo } from '../../../common';

@Component({
    selector: 'app-promotion-survey-popup',
    templateUrl: './promotion-survey-popup.component.html',
    styleUrls: ['./promotion-survey-popup.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class PromotionSurveyPopup extends PopupBase {

  carouselOptions: any = {
    items: 1,
    navigation: false,
    loop: false,
    autoplay: false,
    autoplaySpeed: 1000,
    margin: 0,
    dots: true,
    lazyLoad: true
  };

  constructor(
    private _promotionRepo: PromotionRepo
  ) {
    super();
  }

  serveyItems = [
    {
      img: '../../../../../assets/images/more/promotion-survey/step1.png', 
      title: 'Ứng dụng du lịch toàn diện cho một trải nghiệm hoàn hảo.',
      description: [
        'Xtrip tích hợp một hệ sinh thái du lịch trên cùng một ứng dụng: Đặt vé máy bay, phòng khách sạn, tour du lịch và các dịch vụ khác'
      ]
    },
    {
      img: '../../../../../assets/images/more/promotion-survey/step2.png', 
      title: 'Nổi bật với các tính năng:',
      description: [
        'Thông báo khi có giá tốt',
        'Săn vé giá rẻ',
        'Nhắc nhở thời điểm khởi hành',
        'Tích và đổi điểm trên mỗi giao dịch'
      ]
    },
    {
      img: '../../../../../assets/images/more/promotion-survey/step3.png', 
      title: 'Phương thức thanh toán đa dạng',
      description: [
        'Tiện lợi và tiết kiệm với các Phương thức thanh toán đa dạng & các Chương trình khuyến mãi hấp dẫn.'
      ]
    },
    {
      img: '../../../../../assets/images/more/promotion-survey/step4.png', 
      title: 'Chăm sóc khách hàng 24/7',
      description: [
        'Tiện lợi và tiết kiệm với các Phương thức thanh toán đa dạng & các Chương trình khuyến mãi hấp dẫn.'
      ]
    },
    {
      img: '../../../../../assets/images/more/promotion-survey/step5.png', 
      title: 'Bắt đầu trải nghiệm',
      description: [
        'Tiện lợi và tiết kiệm với các Phương thức thanh toán đa dạng & các Chương trình khuyến mãi hấp dẫn.'
      ]
    },
  ];
  
  checkingPos(index) {
    if(index === 2 || index === 3 || index === 4) {
      return "p-0-46"
    }
    else {
      return ""
    }
  };

  //open link server
  openLinkServey = () => {
    return this._promotionRepo
    .getLinkServey('UserSurvey')
    .then(
      (res: any) => {
        switch(res.code.toLowerCase()) {
          case 'success': {
            if(res.data.nextAction != null) {
              window.open(res.data.nextAction.value, '_blank');
            }
          }
          case 'fail': {
            this.handleError(res.errors);
          }
        };
        this.hide();
      },
      (errors: Error[] = []) => {
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
  };
}
