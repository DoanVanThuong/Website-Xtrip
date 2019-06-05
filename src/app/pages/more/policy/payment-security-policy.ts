import {Component} from '@angular/core';
import {AppPage} from '../../../app.base';

@Component({
  selector: 'payment-security-policy',
  template: `
    <div class="policy">
      <app-header [back]="true" [heading]="'Chính sách bảo mật thanh toán'" [fixed]="true"></app-header>
      <div class="wrapper">
        <div class="container">
          <div class="row">
            <div class="container-fluid">
              <header class="text-center">
                <b>
                  <h3>CHÍNH SÁCH BẢO MẬT THANH TOÁN
                  </h3>
                </b>
              </header>
              <main>
                <div class="content">
                  <div class="title">1. Mục đích áp dụng
                  </div>
                  <p>
                    Hệ thống thanh toán trực tuyến bằng tài khoản ngân hàng trực tuyến trên website/ứng dụng thương mại điện
                    tử
                    <span class="hl">
								<span class="hl">XTRIP</span>
							</span> (sau đây gọi là
                    <span class="hl">XTRIP</span>) là hệ thống thanh toán được cung cấp bởi các đối tác là Cổng thanh toán đã
                    được cấp phép hoạt động hợp
                    pháp tại Việt Nam (“Đối Tác Cổng Thanh Toán”), theo đó, các tiêu chuẩn bảo mật thanh toán của
                    <span class="hl">XTRIP</span> đảm bảo tuân thủ theo các tiêu chuẩn bảo mật của Đối Tác Cổng Thanh Toán.
                    Ngoài ra,
                    <span class="hl">XTRIP</span> còn có các tiêu chuẩn bảo mật giao dịch thanh toán riêng để đảm bảo an toàn
                    các thông tin thanh toán
                    của Khách Hàng.
                  </p>
                  <div class="title">2. Quy định cụ thể</div>
                  <ul>
                    <li>
                      Chính sách giao dịch thanh toán đảm bảo tuân thủ các tiêu chuẩn bảo mật của các Đối Tác Cổng Thanh Toán
                      gồm:
                      <ul>
                        <li class="text-red">Payoo : COMODO RSA Domain Validation Secure Server CA</li>
                        <li class="text-red">Sacombank (Cybersource): Entrust Certification Authority - L1M
                        </li>
                        <li class="text-red">Napas: GlobalSign Organization Validation CA - SHA256 - G2</li>
                        <li>Các nguyên tắc và quy định bảo mật thông tin trong ngành tài chính ngân hàng theo quy định của
                          Ngân
                          hàng nhà nước
                          Việt Nam
                        </li>
                      </ul>
                    </li>
                    <li>
                      Chính sách bảo mật giao dịch trong thanh toán của
                      <span class="hl">XTRIP</span> áp dụng với khách hàng:
                      <ul>
                        <li>
                          Trừ trường hợp khách hàng lựa chọn tiện ích lưu giữ thông tin để sử dụng cho các lần thanh toán sau
                          bằng chức năng Cookies/
                          Cache của trình duyệt web, thông tin thanh toán của Bạn sẽ không lưu trữ trên hệ thống của
                          <span class="hl">XTRIP</span> mà được lưu giữ và bảo mật theo các tiêu chuẩn bảo mật riêng của các
                          Đối
                          Tác Cổng Thanh Toán (Bạn
                          phải liên hệ với Đối Tác Cổng Thanh Toán để được giải quyết mọi vấn đề phát sinh liên quan đến việc
                          bảo mật thông
                          tin thẻ thanh toán của khách hàng,
                          <span class="hl">XTRIP</span> cam kết hỗ trợ và phối hợp cùng các bên liên quan nhằm giải quyết vấn
                          đề
                          của Bạn một cách hợp lý).
                        </li>
                        <li>
                          <span class="hl">XTRIP</span> trang bị các thiết bị bảo mật gồm: tường lửa (firewall), chống thâm
                          nhập
                          (IPS), Antivirus, chống tấn
                          công (d-dos), và một số thiết bị chuyên dụng khác để mã hóa dữ liệu.
                        </li>
                        <li>
                          Hệ thống nội bộ giữa các modules của
                          <span class="hl">XTRIP</span> sử dụng các phương thức trao đổi mã hóa keys: Các hệ thống ứng dụng
                          trao
                          đổi dữ liệu nội bộ được mã
                          hoá bằng bộ khóa private và public key đảm bảo tính bảo mật và toàn vẹn dữ liệu.
                        </li>
                      </ul>
                      <p class="text-center">----------------------------------------------------------</p>
                    </li>
                  </ul>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PaymentSecurityPolicyComponent extends AppPage {
  constructor() {
    super();
  }
}