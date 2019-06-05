import {Component} from '@angular/core';
import {AppPage} from '../../../app.base';

@Component({
  selector: 'general-trading-policy',
  template: `
    <div class="policy">
      <app-header [back]="true" [heading]="'Chính sách giao dịch chung'" [fixed]="true"></app-header>
      <div class="wrapper">
        <div class="container">
          <div class="row">
            <div class="container-fluid">
              <header class="text-center">
                <b>
                  <h3>CHÍNH SÁCH GIAO DỊCH CHUNG</h3>
                </b>
              </header>
              <main>
                <div class="content">
                  <div class="title">ĐIỀU 1: PHẠM VI ÁP DỤNG
                  </div>
                  <ol>
                    <li class="hl">
                      Website thương mại điện tử/ ứng dụng bán hàng XTRIP là website/ứng dụng thương mại điện tử do Công ty Cổ
                      Phần Du lịch Xtravel (XTRIP) tự thiết lập để phục vụ hoạt động xúc tiến thương mại của chính XTRIP, cụ
                      thể là hoạt động dịch vụ
                      Kinh doanh
                      tour du lịch lữ hành nội địa - quốc tế, đại lý bán vé máy bay, đặt phòng khách sạn. Theo đó XTRIP đóng
                      vai
                      trò thay
                      mặt Bạn (Người sử dụng) để liên hệ mua các sản phẩm theo như
                      <span class="hl-important">thông tin đã giới thiệu trên website/ứng dụng</span> và bàn giao sản phẩm cho
                      bạn.

                    </li>
                    <li>
                      Những điều khoản này áp dụng đối với việc “đặt mua” các Sản phẩm được
                      <span class="hl-important">giới thiệu trên website/ứng dụng XTRIP</span> cho Bạn (Người sử dụng).

                    </li>
                    <li class="hl">
                      “Sản phẩm” được đề cập trong chính sách giao dịch này được hiểu là các đối tượng hàng hoá/dịch vụ được
                      giới thiệu trên website/ứng
                      dụng của XTRIP, bao gồm nhưng không giới hạn: vé máy bay, vé tour du lịch, vé phòng khách sạn.

                    </li>
                    <li>
                      Nếu truy cập
                      <span class="hl">XTRIP</span> để đặt mua sản phẩm có nghĩa là Bạn đồng ý với những điều khoản này.

                    </li>
                  </ol>
                  <div class="title">ĐIỀU 2: QUY TRÌNH ĐẶT MUA SẢN PHẨM</div>
                  <ol>
                    <li>
                      Tất cả các thông tin và mô tả Sản phẩm đề cập trên website/ứng dụng
                      <span class="hl">XTRIP</span> không phải là một lời chào hàng và có thể được thu hồi hoặc sửa đổi bất cứ
                      lúc nào trước khi
                      <span class="hl">XTRIP</span> chấp nhận yêu cầu mua sản phẩm của Bạn.
                      <span class="hl">XTRIP</span> không thể đảm bảo rằng, tất cả các sản phẩm cung cấp trên website/ứng dụng
                      đều hoạt động một cách đầy
                      đủ, song sẽ cố gắng để đảm bảo sẵn sàng cung cấp các sản phẩm đã giới thiệu.

                    </li>
                    <li>Quy trình sử dụng chức năng đặt mua sản phẩm tại website/ứng dụng
                      <span class="hl">XTRIP</span>:
                      <ul>
                        <li class="hl">
                          <b>Bước 1:</b> Đăng ký tài khoản thành viên hoặc Đăng nhập bằng tài khoản Google / mạng xã hội
                          (không
                          bắt buộc)
                        </li>
                        <li class="hl">
                          <b>Bước 2:</b> Lựa chọn sản phẩm cần mua
                        </li>
                        <li class="hl">
                          <b>Bước 3:</b>: Lựa chọn các thông tin tương ứng
                          <br> ví dụ:
                          <ul>
                            <li>
                              Nơi khởi hành, nơi đến, ngày đi, số hành khách (đối với đặt vé máy bay);
                            </li>
                            <li>
                              Địa điểm khách sạn, ngày nhận phòng, số đêm ở, lựa chọn kiểu phòng và số lượng người ở (đối với
                              đặt phòng khách sạn);
                            </li>
                            <li>
                              Địa điểm du lịch, nơi khởi hành, thời gian (đối với đặt tour du lịch)
                            </li>
                          </ul>
                        </li>
                        <li class="hl">
                          <b>Bước 4:</b> Lựa chọn sản phẩm theo thông tin mô tả hiển thị trên màn hình

                        </li>
                        <li class="hl">
                          <b>Bước 5:</b> Điền thông tin còn thiếu (VD: Họ tên hành khách ghi trên vé máy bay, nếu người đặt
                          mua
                          Sản phẩm không
                          phải người sử dụng Sản phẩm)

                        </li>
                        <li class="hl">
                          <b>Bước 6:</b> Xem lại thông tin đã khai báo
                        </li>
                        <li class="hl">
                          <b>Bước 7:</b> Xác nhận và tiến hành thanh toán theo các phương thức thanh toán được đề xuất.
                        </li>
                      </ul>

                    </li>
                    <li>Bất cứ yêu cầu đặt mua sản phẩm nào do Bạn gửi đến đều là một đề xuất mua sản phẩm chiếu theo những
                      thỏa
                      thuận này
                      và quyền chấp nhận phụ thuộc vào
                      <span class="hl">XTRIP</span>. Sự chấp nhận yêu cầu đặt hàng có hiệu lực và giao dịch sẽ được xác lập
                      khi
                      <span class="hl">XTRIP</span> gửi thông báo/gọi điện thoại xác nhận cho Bạn.
                    </li>
                    <li>
                      Bạn chắc chắn rằng tất cả và bất cứ thông tin nào do Bạn cung cấp khi đăng ký tài khoản và thanh toán
                      đều
                      cập nhật và chính
                      xác để XTRIP có thể đáp ứng yêu cầu của Bạn.
                    </li>
                  </ol>
                  <div class="title">ĐIỀU 3: GIÁ CẢ
                  </div>
                  <ol>
                    <li>
                      Giá phải trả cho Sản phẩm là giá có hiệu lực tại thời điểm
                      <span class="hl">XTRIP</span> tiếp nhận yêu cầu đặt mua sản phẩm của Bạn, trừ khi được thỏa thuận trực
                      tiếp hoặc được đề cập đến trực
                      tiếp. Giá cả là giá được
                      <span class="hl">XTRIP</span> thông báo với Bạn thông qua màn hình trang chủ website/ứng dụng.

                    </li>
                    <li>Trước khi Chấp nhận yêu cầu đặt mua sản phẩm của Bạn,
                      <span class="hl">XTRIP</span> có quyền ngừng áp dụng giảm giá và/hoặc chỉnh sửa giá cả để xem xét đến sự
                      gia tăng trong chi phí bao
                      gồm nhưng không giới hạn: giá thay đổi bởi công ty du lịch, hãng hàng không, khách sạn, sự gia tăng của
                      các loại
                      thuế và sự thay đổi của tỷ giá hối đoái.
                    </li>
                    <li>Lỗi lập trình hoặc lỗi về dữ liệu trên website/ứng dụng có thể dẫn tới những sự không chính xác về giá
                      cả. Khi giá
                      cả không chính xác hoặc có chênh lệch so với giá thị trường,
                      <span class="hl">XTRIP</span> sẽ tôn trọng các yêu cầu đặt hàng của Bạn, song có thể chỉnh sửa giá cả và
                      chào bán với giá đúng của
                      thị trường.
                    </li>
                    <li>
                      <span class="hl">XTRIP</span> sẽ thông báo tới Bạn bất cứ sai sót nào trong giá cả trước khi tiếp nhận
                      yêu
                      cầu đặt mua sản phẩm của
                      Bạn. Trong trường hợp Bạn chọn tiếp tục yêu cầu đặt mua sản phẩm, tức là Bạn chấp nhận những điều kiện
                      và
                      giá mới
                      như được thông báo bởi
                      <span class="hl">XTRIP</span>.
                    </li>
                    <li>Giá (trừ khi được thông báo khác) sẽ được tính bằng loại tiền tệ như XTRIP đã thông báo với bạn qua
                      màn
                      hình website/ứng
                      dụng.
                    </li>
                    <li class="hl">Mã khuyến mãi, mã giảm giá: là mã code
                      <span class="hl">XTRIP</span> cung cấp tuỳ vào kế hoạch kinh doanh của XTRIP, mà Bạn có thể nhập mã đó
                      trước khi thực hiện thanh toán
                      để được mua sản phẩm với Giá thấp hơn Giá niêm yết. Mã khuyến mãi, mã giảm giá này chỉ áp dụng khi mua
                      sản
                      phẩm tại
                      website/ứng dụng
                      <span class="hl">XTRIP</span>, không áp dụng trực tiếp tại địa điểm sử dụng sản phẩm vì
                      <span class="hl">XTRIP</span> không thiết lập website/ứng dụng khuyến mại trực tuyến để thực hiện khuyến
                      mại cho hàng hóa, dịch vụ
                      của thương nhân, tổ chức, cá nhân khác (gọi tắt là đối tác) theo các điều khoản của hợp đồng dịch vụ
                      khuyến mại với
                      các đối tác đó.
                    </li>
                  </ol>
                  <div class="title">ĐIỀU 4: THANH TOÁN</div>
                  <p>Hiện tại việc thanh toán đặt mua các sản phẩm của
                    <span class="hl">XTRIP</span>, có thể được thực hiện thông qua các hình thức thanh toán sau đây:
                  </p>
                  <ul>
                    <li>Thẻ tín dụng (Visa, MasterCard)</li>
                    <li>Thẻ ATM nội địa có chức năng thanh toán trực tuyến (Internet Banking)
                    </li>
                    <li>Thanh toán trực tiếp tại hơn 3.000 điểm thanh toán trên cả nước (Family Mart, Circle K...).
                    </li>
                    <li>Thanh toán tại các văn phòng, đại lý của
                      <span class="hl">XTRIP</span>,
                    </li>
                  </ul>
                  <p>Đối với phương thức thanh toán trực tuyến,
                    <span class="hl">XTRIP</span>, đã tích hợp công cụ trung gian của các đối tác có chức năng cổng thanh toán
                    đã đáp ứng điều kiện hoạt
                    động theo pháp luật Việt Nam và đảm bảo tuân thủ “Chính sách bảo mật thanh toán” của
                    <span class="hl">XTRIP</span>,.
                  </p>
                  <div class="title">ĐIỀU 5: CHÍNH SÁCH ĐỔI TRẢ, HUỶ VÉ
                  </div>
                  <ol>
                    <li class="hl">
                      Khi đăng nhập tài khoản của Bạn, Bạn có thể sử dụng chức năng Huỷ đặt chỗ trong mục “Đặt chỗ của Tôi” để
                      yêu cầu huỷ yêu
                      cầu đặt mua sản phẩm. Tuy nhiên, trong một số trường hợp, sản phẩm sau khi đã mua và thanh toán thì
                      không
                      được huỷ
                      hoặc cần tuân thủ chính sách riêng của bên thứ ba nơi bạn sẽ sử dụng sản phẩm đó.

                    </li>
                    <li class="hl">
                      Bạn cần tham khảo chính sách đổi trả và huỷ vé áp dụng cho từng loại sản phẩm cụ thể (vé máy bay, vé
                      khách
                      sạn, tour du lịch)
                      ở Mục “Hỗ trợ Xtrip”

                    </li>
                    <li>
                      Mọi yêu cầu hỗ trợ hoặc gặp khó khăn khi thực hiện, vui lòng liên hệ Tổng đài hỗ trợ của XTRIP:
                      <b>1800 6782</b>

                    </li>
                  </ol>
                  <div class="title">ĐIỀU 6: TRÁCH NHIỆM

                  </div>
                  <ol>
                    <li>
                      Bạn có trách nhiệm đọc kĩ và hiểu rõ các chính sách giao dịch liên quan đến Sản phẩm được mô tả và thể
                      hiện trên website/ứng
                      dụng của
                      <span class="hl">XTRIP</span>. Nếu có bất kỳ vấn đề gì phát sinh, xin vui lòng liên hệ ngay Tổng đài hỗ
                      trợ 1800 6782 của
                      <span class="hl">XTRIP</span>.


                    </li>
                    <li>
                      <span class="hl">XTRIP</span> cam kết tuân thủ quy định về Chính sách bảo mật thông tin, Chính sách bảo
                      mật thanh toán khi Bạn đăng
                      ký tài khoản và thanh toán tại website/ứng dụng
                      <span class="hl">XTRIP</span>. XTRIP không phải chịu trách nhiệm về những thiệt hại phát sinh do Bạn cố
                      tình vi phạm điều khoản giao
                      dịch và/hoặc thông tin của Bạn cung cấp là không chính xác tại thời điểm đăng ký tài khoản và thanh
                      toán.


                    </li>

                  </ol>
                  <div class="title">ĐIỀU 7: CHẤM DỨT HỢP ĐỒNG
                  </div>
                  <p>Giao dịch sẽ chấm dứt khi XTRIP hoàn thành việc giao sản phẩm cho Bạn. XTRIP có thể hoãn hoặc dừng việc
                    giao sản phẩm
                    trong trường hợp Bạn có bất kỳ dấu hiệu nào dẫn đến việc không có khả năng thanh toán đơn hàng. Trong
                    trường
                    hợp này,
                    XTRIP cũng có thể chấm dứt yêu cầu đặt mua sản phẩm của Bạn bằng một thông báo gửi đến Bạn qua email/điện
                    thoại/sms.
                  </p>
                  <div class="title">ĐIỀU 8: KHIẾU NẠI VÀ QUY TRÌNH GIẢI QUYẾT KHIẾU NẠI
                  </div>
                  <p>Nếu Bạn chưa hài lòng hoặc có thắc mắc, khiếu nại, vui lòng liên hệ Tổng đài hỗ trợ của
                    <span class="hl">XTRIP</span> (Điện thoại:
                    <b>1800 6782</b>) hoặc trực tiếp tại địa chỉ trụ sở của XTRIP:

                  </p>
                  <ul>
                    <div class="title">CÔNG TY CỔ PHẦN DU LỊCH XTRAVEL
                    </div>
                    <p>
                      <i>Địa chỉ: 136 Nguyễn Duy Dương, Phường 9, Quận 5, Thành phố Hồ Chí Minh Email: support@xtravel.vn
                      </i>
                    </p>
                  </ul>
                  <p>Tuỳ vào nội dung khiếu nại và thông tin Bạn cung cấp, trong thời gian hợp lý nhưng không quá 07 ngày làm
                    việc, kể từ
                    ngày XTRIP nhận được đầy đủ thông tin khiếu nại, XTRIP sẽ đề xuất phương thức xử lý cho Bạn.
                  </p>
                  <div class="title">
                    ĐIỀU 9: ĐIỀU KHOẢN CHUNG

                  </div>
                  <p>Các điều khoản này được thực hiện trên tinh thần tự nguyện và chỉ là các điều khoản giữa
                    <span class="hl">XTRIP</span> và Bạn, trong khi các điều khoản trước đó, dù là thỏa thuận miệng hay bằng
                    văn
                    bản, đều không bắt buộc,
                    trừ trường hợp được nhắc đến trong tài liệu này.
                    <span class="hl">XTRIP</span> có quyền thay đổi các điều khoản hiện tại theo thời gian và có thông báo về
                    những thay đổi quan trọng
                    trên website/ứng dụng hiện tại. Việc Bạn tiếp tục thực hiện/yêu cầu đặt mua sản phẩm trên website/ứng dụng
                    này sau
                    khi thông báo đồng nghĩa với sự chấp thuận của Bạn đối với các thay đổi đó. Bạn không có quyền chuyển
                    nhượng
                    hoặc
                    chuyển giao quyền và trách nhiệm chiếu theo các điều khoản này cho bên thứ ba, mà không có văn bản đồng ý
                    của
                    <span class="hl">XTRIP</span>.
                  </p>
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
export class GeneralTradingPolicyComponent extends AppPage {
  constructor() {
    super();
  }
}