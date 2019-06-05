import {Component} from '@angular/core';
import {AppPage} from '../../../app.base';

@Component({
  selector: 'information-security-policy',
  template: `
    <div class="policy">
      <app-header [back]="'true'" [heading]="'Chính sách bảo mật thông tin'" [fixed]="true"></app-header>
      <div class="wrapper">
        <div class="container">
          <div class="row">
            <div class="container-fluid">
              <header class="text-center">
                <b>
                  <h3>CHÍNH SÁCH BẢO MẬT THÔNG TIN
                  </h3>
                </b>
              </header>
              <main>
                <div class="content">
                  <p>Những điều khoản này áp dụng khi truy cập và sử dụng một số chức năng có yêu cầu cung cấp thông tin cá
                    nhân trên website/ứng
                    dụng thương mại điện tử
                    <span class="hl">XTRIP</span> – là website/ứng dụng được thiết lập và quản lý bởi:
                    <span>
								<b>Công ty Cổ Phần Du Lịch Xtravel (
									<span class="hl">XTRIP</span>) cho Bạn (Người sử dụng).</b>
							</span>
                  </p>
                  <div class="title">1. Mục đích thu thập thông tin</div>
                  <p>
                    <span class="hl">XTRIP</span> có thể thu thập thông tin về số lần viếng thăm, bao gồm số trang Bạn xem, số
                    links (liên kết) bạn click,
                    những thông tin khác liên quan đến việc kết nối đến website/ứng dụng
                    <span class="hl">XTRIP</span> và các thông tin mà trình duyệt Web (Browser) Bạn sử dụng mỗi khi truy cập
                    vào
                    <span class="hl">XTRIP</span> gồm: địa chỉ IP, loại Browser, ngôn ngữ sử dụng, thời gian và những địa chỉ
                    mà Browser truy xuất đến.
                  </p>
                  <p>Bạn có thể được yêu cầu điền vào những mẫu (form) thông tin cá nhân, bao gồm: Họ tên, Ngày sinh, Email,
                    Địa chỉ, Số
                    điện thoại liên lạc… khi sử dụng một số chức năng tại trang web
                    <span class="hl">XTRIP</span>.
                  </p>
                  <div class="title">2. Phạm vi sử dụng thông tin</div>
                  <span class="hl">XTRIP</span> sử dụng thông tin Bạn cung cấp để:
                  <ul>
                    <li>Hỗ trợ Bạn khi sử dụng dịch vụ tại website/ứng dụng
                      <span class="hl">XTRIP</span>
                    </li>
                    <li>Giải đáp thắc mắc, góp ý
                    </li>
                    <li>Cung cấp thông tin mới nhất trên Website/ứng dụng của
                      <span class="hl">XTRIP</span>, thực hiện các khảo sát khách hàng, các hoạt động quảng bá liên quan đến
                      các sản phẩm và dịch vụ của
                      <span class="hl">XTRIP</span>
                      <u>chỉ khi</u> Bạn có yêu cầu đăng ký nhận email thông báo
                    </li>
                  </ul>
                  <div class="title">3. Thời gian lưu trữ thông tin</div>
                  <p>Dữ liệu cá nhân của bạn, cũng như các thông tin trao đổi giữa Bạn và
                    <span class="hl">XTRIP</span>, đều được lưu giữ và bảo mật bởi hệ thống của
                    <span class="hl">XTRIP</span>, riêng thông tin tài khoản ngân hàng trực tuyến của Bạn sẽ do các đối tác
                    cổng thanh toán của
                    <span class="hl">XTRIP</span> (đã đáp ứng điều kiện hoạt động theo quy định pháp luật Việt Nam) bảo mật
                    theo các tiêu chuẩn bảo mật
                    riêng (tiêu chuẩn quốc tế PCI DSS, Tiêu chuẩn mã hóa MD5 128 bit, và các tiêu chuẩn theo quy định của Ngân
                    hàng Nhà
                    nước Việt Nam)
                  </p>
                  <p>Dữ liệu cá nhân của Bạn sẽ được lưu trữ tại máy chủ của
                    <span class="hl">XTRIP</span> cho đến khi Bạn có yêu cầu hủy bỏ. </p>
                  <div class="title">4. Chia sẻ thông tin cá nhân:</div>
                  <p>
                    <span class="hl">XTRIP</span> không cung cấp Thông tin cá nhân của Bạn cho bất kỳ bên thứ ba nào trừ
                    trường hợp phải thực hiện theo
                    yêu cầu của các cơ quan Nhà nước có thẩm quyền, hoặc theo quy định của pháp luật, hoặc khi việc cung cấp
                    thông tin
                    đó là cần thiết để
                    <span class="hl">XTRIP</span> cung cấp dịch vụ/tiện ích cho Khách Hàng (ví dụ: phối hợp cung cấp thông tin
                    cần thiết cho các đơn vị
                    cổng thanh toán để thực hiện thanh toán trực tuyến …).</p>
                  <div class="title">5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</div>
                  <ul>
                    <div class="title">CÔNG TY CỔ PHẦN DU LỊCH XTRAVEL
                    </div>
                    <p>Địa chỉ: 136 Nguyễn Duy Dương, Phường 9, Quận 5, Thành phố Hồ Chí Minh Email: support@xtravel.vn
                    </p>
                  </ul>
                  <div class="title">6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình.
                  </div>
                  Bạn có quyền yêu cầu
                  <span class="hl">XTRIP</span> thực hiện việc kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân
                  của Bạn bằng cách sử dụng
                  chức năng Quản lý tài khoản cá nhân hoặc gọi điện thoại đến Tổng đài hỗ trợ
                  <b>(1800 6782) </b>hoặc gửi email
                  <i>(support@xtravel.vn)</i> đến
                  <span class="hl">XTRIP</span>.

                  <div class="title">7. Cam kết bảo mật thông tin cá nhân</div>
                  <p>Thông tin cá nhân của Bạn được
                    <span class="hl">XTRIP</span> cam kết bảo mật theo chính sách bảo vệ thông tin cá nhân của
                    <span class="hl">XTRIP</span> bằng mọi cách thức có thể. Việc thu thập và sử dụng thông tin của Bạn chỉ
                    được thực hiện khi có sự đồng
                    ý của Bạn trừ những trường hợp pháp luật có quy định khác.</p>
                  <p>
                    <span class="hl">XTRIP</span> sẽ không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên
                    quan đến quyền lợi của Bạn
                    nếu xét thấy thông tin cá nhân của Bạn cung cấp khi đăng ký ban đầu là không chính xác hoặc trong trường
                    hợp có sự
                    truy cập trái phép thông tin cá nhân của Bạn (ví dụ: Bạn tự ý chia sẻ thông tin với người khác… )</p>
                  <div class="title">8. Thay đổi về chính sách</div>
                  <p>
                    <span class="hl">XTRIP</span> hoàn toàn có thể thay đổi nội dung trong trang này mà không cần phải thông
                    báo trước, để phù hợp với
                    các nhu cầu của
                    <span class="hl">XTRIP</span> cũng như nhu cầu và sự phản hồi từ khách hàng nếu có. Khi cập nhật nội dung
                    chính sách này,
                    <span class="hl">XTRIP</span> sẽ chỉnh sửa lại thời gian “Cập nhật lần cuối” bên dưới.
                  </p>
                  <p>Vì vậy, bạn đã đồng ý rằng, khi bạn sử dụng website/ứng dụng của
                    <span class="hl">XTRIP</span> sau khi chỉnh sửa nghĩa là bạn đã thừa nhận, đồng ý tuân thủ cũng như tin
                    tưởng vào sự chỉnh sửa này.
                    Do đó,
                    <span class="hl">XTRIP</span> đề nghị bạn nên xem trước nội dung trang này trước khi truy cập các nội dung
                    khác trên website/ứng dụng.
                  </p>
                  <p>Mọi ý kiến đóng góp hoặc yêu cầu giải quyết khiếu nại liên quan đến việc thông tin cá nhân bị sử dụng sai
                    mục đích
                    hoặc phạm vi đã thông báo xin gửi về địa chỉ:
                  </p>
                  <ul>
                    <div class="title">CÔNG TY CỔ PHẦN DU LỊCH XTRAVEL
                    </div>
                    <p>Địa chỉ: 136 Nguyễn Duy Dương, Phường 9, Quận 5, Thành phố Hồ Chí Minh
                      <br> Điện thoại:
                      <b>1800 6782</b>
                      <br> Email: support@xtravel.vn
                    </p>
                  </ul>
                  <p class="text-center">--------------------------------------</p>

                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InformationSecurityPolicyComponent extends AppPage {
  constructor() {
    super();
  }
}