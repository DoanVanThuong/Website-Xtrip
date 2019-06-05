import { Component } from '@angular/core';
import { AppBase } from '../../../../app.base';

@Component({
    selector: 'more-faq-mobile',
    templateUrl: './faq-mobile.component.html',
})
export class FaqMobileComponent extends AppBase {

    tab: string = 'general';
    tabs: Array<any> = [];

    constructor() {
        super();
    }

    // fn on select tab
    onSelectTab = ($e: any, tab: string = '') => {
        this.tab = tab;
    };

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

    questions: Array<any> = [
        {
            'heading': 'Câu hỏi chung',
            'key': 'general',
            'icon': 'assets/images/faq/general/title.svg',
            'groups': [
                {
                    'title': 'Câu hỏi chung',
                    'icon': 'assets/images/faq/general/general.svg',
                    'questions': [
                        {
                            question: 'Vì sao tôi chưa nhận được email xác nhận trong khi tôi đã đặt phòng và đã thanh toán đúng thời hạn?',
                            answer: 'Bạn vui lòng kiểm tra lại hộp thư nếu chưa nhận được vui lòng bạn xem thêm mục spam / quảng cáo. Trong trường hợp cần tư vấn thêm bạn vui lòng liên hệ chúng tôi qua email <a href="mailto:support@xtrip.vn">support@xtrip.vn</a> hoặc điện thoại số <a href="18006782">1800 6782</a> nhân viên phục vụ khách hàng sẽ tư vấn nhanh nhất có thể.'
                        },
                        {
                            question: 'Đăng ký nhận tin từ Xtrip có phải tốn bất kỳ chi phí nào không?',
                            answer: 'Hoàn toàn miễn phí bạn nhé. Khi đăng ký nhận bản tin, bạn sẽ được cập nhật các thông tin mới nhất của chương trình ưu đãi giảm giá cũng như các thông tin quan trọng khác từ Xtrip qua email.'
                        },
                        {
                            question: 'Tôi muốn xem thông tin khuyến mãi và ưu đãi thì xem ở đâu?',
                            answer: 'Bạn có thể xem những thông tin khuyến mãi, ưu đãi mới nhất trên banner website hoặc App của Xtrip. Để cập nhật nội dung của từng chương trình khuyến mãi, bạn vui lòng chọn mục khuyến mãi trên website hoặc trên App.'
                        },
                        {
                            question: 'Tôi muốn liên hệ với hỗ trợ khách hàng của Xtrip phải làm sao?',
                            answer: 'Dịch vụ hỗ trợ khách hàng của Xtrip luôn sẵn sàng 24/7 để giải đáp các thắc mắc của bạn. Bạn vui lòng liên hệ với Xtrip qua tổng đài 1800 6782, gửi email về địa chỉ <a href="mailto:support@xtrip.vn">support@xtrip.vn</a> hoặc bạn vui lòng gửi yêu cầu hỗ trợ trên App của Xtrip.'
                        }
                    ]
                },
                {
                    'title': 'Thanh toán',
                    'icon': 'assets/images/faq/general/pay.svg',
                    'questions': [
                        {
                            question: 'Xtrip có những hình thức thanh toán nào?',
                            answer: 'Hiện tại Xtrip có 6 hình thức thanh toán như sau: <br />- Thẻ tín dụng (Visa, MasterCard,JCB)<br />- Thẻ ATM nội địa có chức năng thanh toán trực tuyến (Internet Banking)<br />            - Thanh toán trực tiếp tại hơn 2.500 điểm thanh toán trên cả nước (Family Mart, Circle K...).<br />- Thanh toán tại các văn phòng, đại lý của Xtrip.<br/>- Thanh toán bằng cách chuyển khoản.<br/>- Thanh toán bằng hình thức thu hộ.'
                        },
                        {
                            question: 'Tôi sẽ thanh toán cho chỗ đã đặt như thế nào?',
                            answer: 'Sau khi bạn điền và hoàn tất việc kiểm tra lại các thông tin đặt chỗ, bạn sẽ chuyển đến bước thanh toán.<br />Hiện tại Xtrip có 6 hình thức thanh toán, tùy theo nhu cầu bạn có thể lựa chọn:- thẻ tín dụng quốc tế : visa, master card, JCB.<br />- Thẻ ATM nội địa có chức năng thanh toán trực tuyến (Internet Banking)<br />- Thanh toán trực tiếp tại hơn 2.500 điểm thanh toán trên cả nước (Family Mart, Circle K...).<br />- Thanh toán tại cac văn phòng, đại lý của Xtrip.<br />- Thanh toán chuyển khoản.<br/>- Thanh toán bằng hình thức thu hộ.'
                        },
                        {
                            question: 'Tôi có thể thanh toán tiền bằng thẻ tín dụng khác với thẻ tín dụng đã đặt phòng trước đó không?',
                            answer: 'Bạn hoàn toàn có thể thanh toán bằng thẻ tín dụng khác với thẻ bạn đã dùng để đặt phòng trước đó tại Xtrip.'
                        },
                        {
                            question: 'Tại sao tôi thanh toán bằng thẻ tín dụng không được? Tôi phải làm gì khi gặp trường hợp này?',
                            answer: 'Trong một số trường hợp tiến trình thanh toán có thể kéo dài hơn bình thường. Nếu giao dịch đầu tiên không thành công, bạn hãy tải lại trang thanh toán. Hãy đảm bảo rằng bạn đã nhập chính xác thông tin thẻ tín dụng trước khi tiến hành thanh toán lại. Nếu cần thêm thông tin, bạn vui lòng liên hệ bộ phận phục vụ Khách hàng của Xtrip số <a href="18006782">1800 6782</a> để được hỗ trợ tốt nhất.'
                        },
                        {
                            question: 'Tại sao khi thanh toán tôi phải nhập mã OTP? ',
                            answer: 'Bạn hãy yên tâm vì yêu cầu nhập mã OTP là để đảm bảo tính bảo mật cho các thanh toán của bạn. Đây cũng là hình thức ngân hàng phát hành thẻ tín dụng cần xác thực các giao dịch để đảm bảo bạn là chủ thẻ tín dụng.'
                        },
                        {
                            question: 'Tôi sẽ nhận mật khẩu sử dụng một lần (OTP) để hoàn tất thanh toán ra sao?',
                            answer: 'Mật khẩu sử dụng một lần (OTP) sẽ được ngân hàng phát hành thẻ tín dụng của bạn gửi cho bạn qua tin nhắn SMS. Sau khi nhận được mật khẩu, bạn vui lòng nhập ngay lập tức để đảm bảo giao dịch được thành công nhé.'
                        },
                    ]
                },
                {
                    'title': 'Mã khuyến mãi / Ưu đãi',
                    'icon': 'assets/images/faq/general/campaign.svg',
                    'questions': [
                        {
                            question: 'Mã khuyến mãi của Xtrip là gì?',
                            answer: 'Mã khuyến mãi là những mã số giảm giá, ưu đãi được Xtrip gửi đến email của bạn hoặc App. Khi bạn mua vé máy bay, đặt phòng hoặc tour bạn nhập mã khuyến mãi sẽ có mức giá tốt hơn bình thường.'
                        },
                        {
                            question: 'Làm thế nào tôi có thể nhận được mã giảm giá của Xtrip ?',
                            answer: 'Xtrip phân phối các mã giảm giá đặc biệt dành riêng cho người dùng đăng ký nhận tin, vì vậy bạn đừng bỏ lỡ bất kỳ cơ hội nào nhé. Bạn có thể đăng ký nhận tin trên website của Xtrip.'
                        },
                        {
                            question: 'Tôi dùng mã giảm giá của Xtrip như thế nào?',
                            answer: '- Tìm vé máy bay /khách sạn/ tour mong muốn.<br />- Chọn và đặt vé máy bay /phòng khách sạn/ tour.<br />- Nhập mã giảm giá khi thanh toán. Kiểm tra lại thông tin đặt chỗ của bạn.<br />- Hoàn tất giao dịch.'
                        }
                    ]
                },
                {
                    'title': 'Điểm thưởng của tôi',
                    'icon': 'assets/images/faq/general/reward-point.svg',
                    'questions': [
                        {
                            question: 'Điểm thưởng Xtrip là gì?',
                            answer: 'Điểm thưởng Xtrip là số điểm tích lũy vào tài khoản của người dùng sau khi đặt vé máy bay, phòng khách sạn hoặc mua tour. Bạn có thể sử dụng số điểm tích lũy để thanh toán cho các lần đặt vé máy bay, phòng khách sạn, tour tiếp theo.'
                        },
                        {
                            question: 'Tôi có thể tích điểm bằng cách nào? ',
                            answer: 'Xtrip sẽ cộng vào tài khoản của bạn ngay sau khi bạn hoàn tất thanh toán các dịch vụ mua vé máy bay, đặt phòng khách sạn, tour trên website hoặc App. '
                        },
                        {
                            question: 'Với mỗi lần đặt tour, khách sạn hoặc vé máy bay thì tôi nhận được bao nhiêu điểm?',
                            answer: 'Với mỗi 10.000VND mà bạn đã thanh toán bạn sẽ tích lũy được:<br />- 4 Điểm khi đặt phòng khách sạn.<br />- 1 Điểm khi đặt vé máy bay.<br />- 2 Điểm khi đặt tour.'
                        },
                        {
                            question: 'Tôi có thể tích lũy điểm nếu sử dụng mã khuyến mãi khi thanh toán không?',
                            answer: 'Khi thanh toán có sử dụng mã khuyến mãi thì bạn vẫn tích lũy điểm được nhé. Tuy nhiên khi bạn sử dụng mã khuyến mãi thì số tiền được giảm trừ do khuyến mãi sẽ không được tính điểm tích lũy lần nữa mà chỉ có số tiền bạn thanh toán sau khi đã giảm trừ khuyến mãi mới được cộng vào điểm tích lũy.'
                        },
                        {
                            question: 'Làm thế nào để kiểm tra tình trạng điểm thưởng và lịch sử giao dịch của tôi?',
                            answer: 'Để xem điểm thưởng bạn đăng nhập vào tài khoản tại mục điểm thưởng của tôi để kiểm tra điểm thưởng và lịch sử giao dịch của bạn nhé.'
                        },
                        {
                            question: 'Điểm khả dụng và điểm chờ duyệt là gì?',
                            answer: 'Sau khi hoàn tất thanh toán, ứng với số tiền thanh toán bạn sẽ nhận được một số điểm nhất định, số điểm này bạn chưa thể dùng quy đổi ngay lập tức.  Sau 3 ngày tính từ khi bạn hoàn thành chuyến đi bạn hãy quy đổi số điểm bạn đang có để được giảm giá vé máy bay và phòng khách sạn hay tour nhé.'
                        },
                        {
                            question: 'Điểm của tôi sẽ có hiệu lực trong bao lâu?',
                            answer: 'Điểm tích luỹ sẽ có hiệu lực trong vòng một năm tính từ ngày phát sinh đặt chỗ đầu tiên. Bạn có thể kiểm tra số điểm tích lũy và ngày hết hạn tại trang Điểm thưởng của tôi.'
                        },
                        {
                            question: 'Nếu tôi đã thanh toán đặt chỗ xong sau đó tôi gửi yêu cầu hủy và hoàn lại tiền thì chuyện gì sẽ xảy ra với điểm tích lũy của tôi?',
                            answer: 'Nếu bạn yêu cầu hoàn tiền, số điểm đang chờ duyệt mà bạn sẽ nhận được từ lần đặt chỗ này tự động bị trừ khỏi tài khoản. <br />Lưu ý rằng nếu bạn quy đổi điểm sau đó bạn yêu cầu hủy hoàn tiền, số điểm tích lũy bạn sử dụng trong lần thanh toán mua vé máy bay, phòng khách sạn hay tour này sẽ không được hoàn trả lại cho tài khoản của bạn, hệ thống sẽ hủy bỏ số điểm tích lũy bạn đã dùng.'
                        },
                        {
                            question: 'Tôi có thể dùng số điểm đã tích lũy được khi đặt chỗ với Xtrip để làm gì?',
                            answer: 'Bạn có thể quy đổi số điểm tích lũy của mình cho lần đặt chỗ tiếp theo để được hưởng giá ưu đãi hơn nữa.'
                        },
                        {
                            question: 'Tôi quy đổi điểm như thế nào?',
                            answer: 'Để quy đổi điểm tích lũy bạn đăng nhập vào tài khoản và tiến hành đặt vé máy bay, khách sạn, tour. Tại trang đặt chỗ bạn vui lòng chọn dùng điểm thưởng sau đó bạn có thể tuỳ ý kéo đến số điểm mà mình muốn dùng để quy đổi.'
                        },
                        {
                            question: 'Một điểm trị giá bao nhiêu?',
                            answer: 'Một điểm sẽ có giá trị qui đổi tương đương là 100đ.'
                        },
                        {
                            question: 'Tôi cần tích luỹ tối thiểu là bao nhiêu điểm thì mới có thể sử dụng để quy đổi ?',
                            answer: 'Hiện nay Xtrip chưa có quy định số điểm tối thiểu cho một lần quy đổi. Vì vậy bạn có thể chọn số điểm muốn quy đổi tùy theo nhu cầu của bạn.'
                        },
                        {
                            question: 'Liệu số điểm của tôi có bị trừ khi tôi quy đổi nhưng chưa hoàn thành giao dịch?',
                            answer: 'Bạn hãy yên tâm. Nếu bạn chưa hoàn tất thanh toán, số điểm của bạn sẽ được tự động ghi có lại trong tài khoản của bạn sau khi thời gian đặt chỗ hết hạn.'
                        },
                        {
                            question: 'Khi tôi yêu cầu huỷ phòng, vé hoặc tour mà tôi đã thanh toán thì số điểm đã quy đổi cho giao dịch này có được trả lại vào tài khoản của tôi không?',
                            answer: 'Rất tiếc Xtrip không thể hoàn lại số điểm vào tài khoản nếu bạn đã yêu cầu huỷ vé, phòng, hoặc tour mà bạn đã thanh toán trước đó.'
                        },
                        {
                            question: 'Tôi có thể quy đổi điểm thành tiền mặt thay vì được giảm giá cho giao dịch lần sau?',
                            answer: 'Rất tiếc Xtrip không có chính sách quy đổi điểm thành tiền mặt.'
                        }
                    ]
                },
                {
                    'title': 'Ứng dụng của Xtrip',
                    'icon': 'assets/images/faq/general/app.svg',
                    'questions': [
                        {
                            question: 'Tôi có thể tải ứng dụng của Xtrip ở đâu?',
                            answer: 'Bạn có thể tải ứng dụng Xtrip từ <a href="" target="_blank">Google Play (đối với thiết bị chạy Android)</a> hoặc <a href="" target="_blank">App Store (đối với thiết bị chạy iOS)</a> HOÀN TOÀN MIỄN PHÍ. Bạn cần nhập từ khoá tìm kiếm là "Xtrip" và chọn ứng dụng để cài đặt.'
                        },
                        {
                            question: 'Tại sao tôi không thể tải ứng dụng Xtrip trên thiết bị Android?',
                            answer: 'Để cài đặt ứng dụng Xtrip trên Android, thiết bị của bạn tối thiểu phải chạy hệ điều hành Android 5.0. Hãy bảo đảm rằng thiết bị của bạn kết nối với wifi, 3G.'
                        },
                        {
                            question: 'Tại sao tôi không thể tải ứng dụng Xtrip trên thiết bị iOS?',
                            answer: 'Để cài đặt ứng dụng Xtrip trên iOS, thiết bị của bạn tối thiểu phải chạy hệ điều hành iOS 8.3. Hãy bảo đảm rằng thiết bị của bạn phải kết nối với Wifi, 3G.'
                        },
                        {
                            question: 'Ngoài Android và iOS ra tôi còn có thể tải ứng dụng Xtrip trên hệ điều hành nào?',
                            answer: 'Hiện tại, ứng dụng Xtrip chỉ có sẵn cho hệ điều hành Android và iOS. Đối với các hệ điều hành khác, bạn vui lòng truy cập trang web Xtrip trên phiên bản máy tính hoặc web di động.'
                        }
                    ]
                }
            ]
        },
        {
            'heading': 'Vé máy bay',
            'key': 'flight',
            'icon': 'assets/images/faq/flight/title.svg',
            'groups': [
                {
                    'title': 'Tìm chuyến bay',
                    'icon': 'assets/images/faq/flight/find.svg',
                    'questions': [
                        {
                            question: 'Tôi có thể đặt mua vé của những hãng hàng không nào qua Xtrip?	Tôi có thể đặt mua vé của những hãng hàng không nào qua Xtrip?',
                            answer: 'Tính đến hiện tại, bạn có thể đặt vé của hầu hết tất cả các hãng hàng không trên App hay website của Xtrip như: AirAsia, Air France, Asiana, Aviastar, Bangkok Airways, Batik Air, Cathay Pacific, China Southern, Citilink, Etihad, Firefly, Garuda Indonesia, Kalstar, KLM, Lion Air, Lufthansa, Malaysia Airlines, Malindo Air, NAM Air, Singapore Airlines, Sky Aviation, Sriwijaya Air, Thai Airways, Trigana Air, Wings Air, và Xpress Air, Tigerair, VietJet Air, JetStar, Vietnam Airlines...'
                        },
                        {
                            question: 'Giá tiền mà tôi thấy khi tìm vé là cho 1 người lớn hay là tổng số hành khách ?',
                            answer: 'Các giá vé hiển thị trên kết quả tìm kiếm là dành cho 1 hành khách người lớn. Giá tiền tổng cộng sẽ được hiển thị chi tiết trên mẫu phiếu đặt chỗ của bạn.'
                        },
                        {
                            question: 'Những biểu tượng trên kết quả tìm kiếm có ý nghĩa gì?',
                            answer: 'Các biểu tượng biểu thị đây là vé cơ bản hay là vé best combo, vé có chặng dừng hay vé bay thẳng.'
                        },
                        {
                            question: 'Như thế nào là vé Best combo?',
                            answer: 'Best combo là loại vé được ghép sẵn vé chiều đi và chiều về có giá rẻ hơn so với việc bạn chon riêng lẻ từng vé chiều đi riêng và chiều về riêng.'
                        }
                    ]
                },
                {
                    'title': 'Đặt vé',
                    'icon': 'assets/images/faq/flight/book.svg',
                    'questions': [
                        {
                            question: 'Tại sao tôi chưa nhận được vé điện tử sau khi thanh toán?',
                            answer: 'Có thể vé điện tử/phiếu thanh toán của bạn chưa được phát hành vì một số lý do sau: <br/>- Số tiền bạn thanh toán có thể không trùng khớp với số tiền trên biên nhận, bạn vui lòng kiểm tra lại.<br/>- Quá thời hạn giữ chỗ bạn sẽ không thanh toán được.<br/>- Tiến trình xác thực thanh toán của bạn bị chậm do trục trặc trong hệ thống của ngân hàng.<br/>- Tiến trình xuất vé của bạn bị chậm do trục trặc trong hệ thống của hãng hàng không<br/>Nếu bạn đã kiểm tra lại toàn bộ quy trình thanh toán mà vẫn chưa nhận được vé điện tử, bạn vui lòng liên hệ nhân viên bộ phận phục vụ khách hàng của Xtrip số tổng đài 18006782 để được hỗ trợ bạn nhé.'
                        },
                        {
                            question: 'Tôi muốn tìm vé điện tử thì xem ở đâu ?',
                            answer: 'Sau khi hoàn tất thanh toán, bạn sẽ nhận được vé điện tử, vé điện tử được gửi qua địa chỉ email mà bạn cung cấp. Ngoài ra, bạn có thể đăng nhập vào tài khoản Xtrip tại mục Đặt chỗ của tôi để xem thông tin đặt vé bạn nhé.'
                        },
                        {
                            question: 'Tôi muốn xem thông tin chuyến bay phải làm sao?',
                            answer: 'Nếu bạn đã đăng nhập vào tài khoản hoặc bạn sử dụng điện thoại để đặt vé trước đó, bạn có thể tìm thấy thông tin chuyến bay tại mục Đặt chỗ của tôi. Ngoài ra, bạn có thể xem thông tin chuyến bay trong email xác nhận phát hành vé điện tử. Nếu không thấy thông tin bạn cần tìm, xin vui lòng liên hệ bộ phận Hỗ trợ Khách hàng Xtrip qua số điện thoại 18006782 để được hỗ trợ tốt nhất.'
                        },
                        {
                            question: 'Làm sao để biết rằng yêu cầu đặt chỗ của tôi đã được xác nhận hay chưa?',
                            answer: 'Ngay sau khi nhận được số tiền bạn đã thanh toán, Xtrip sẽ gửi cho bạn một email xác nhận đặt chỗ.'
                        },
                        {
                            question: 'Tôi có thể đặt vé hoặc đặt phòng trực tiếp tại văn phòng Xtrip không? Tôi tìm văn phòng Xtrip ở đâu?',
                            answer: 'Bạn có thể ghé trực tiếp văn phòng Xtrip để đặt vé hoặc đặt phòng. Hiện tại văn phòng Xtrip ở địa chỉ 136 Nguyễn Duy Dương, Phường 9, Quận 5, Thành phố Hồ Chí Minh.'
                        },
                        {
                            question: 'Tại sao đặt vé trên Xtrip lại giá tốt hơn so với hầu hết các trang web khác?',
                            answer: 'Bởi vì Xtrip luôn nỗ lực thương thuyết với các hãng hàng không nhằm cung cấp cho bạn vé giá rẻ hàng ngày. Trên hết, với công nghệ có độ bảo mật cao và ưu việt, Xtrip có thể cung cấp cho bạn giá vé tốt như bạn đã thấy trên trang web.'
                        },
                        {
                            question: 'Xtrip có tính phí dịch vụ đặt vé không?',
                            answer: 'Xtrip không tính bất kỳ khoản phí đặt vé đối với bất kể hình thức thanh toán nào. Giá bạn thấy là giá bạn trả. KHÔNG phí dịch vụ. KHÔNG chi phí ẩn.'
                        },
                        {
                            question: 'Tôi có thể biết hãng hàng không nào đã tính phí dịch vụ hành khách (PSC) hoặc thuế sân bay vào sẵn trong giá vé không?',
                            answer: 'Hầu hết các hãng hàng không đều đã bao gồm phí dịch vụ hành khách (PSC) hoặc thuế sân bay vào giá vé. Vì vậy, giá bạn thấy trên vé điện tử Xtrip là giá cuối cùng đã bao gồm thuế phí.'
                        },
                        {
                            question: 'Tại sao giá vé lại thay đổi theo từng thời điểm?',
                            answer: 'Giá vé có thể thay đổi tùy thuộc vào chính sách giá của các hãng hàng không. Do đó, khi bạn chuyển đến trang thanh toán, bạn thấy giá vé đôi lúc có thể thay đổi là thời điểm Xtrip điều chỉnh theo giá mới cập nhật từ các hãng hàng không. Để có thông tin chi tiết bạn vui lòng liên hệ nhân viên bộ phận Hỗ trợ Khách hàng của Xtrip qua số điện thoại 18006782.'
                        },
                        {
                            question: 'Giá vé cho trẻ em và em bé có khác nhau không?',
                            answer: 'Theo quy định bay quốc tế thì có 3 nhóm hành khách: Người lớn (Từ 12 tuổi trở lên), trẻ em (từ 2 đến 12 tuổi) và em bé (dưới 2 tuổi). Giá mỗi nhóm có thể thay đổi tùy theo chính sách của hãng hàng không.<br/>Để biết thông tin chi tiết bạn vui lòng liên hệ bộ phận Hỗ trợ Khách hàng của Xtrip qua số điện thoại <a href="call:18006782">1800 6782</a> nhân viên sẽ tư vấn bạn nhé.'
                        },
                        {
                            question: 'Chi phí nâng hạng ghế là bao nhiêu?',
                            answer: 'Điều này tuỳ thuộc vào chặng bay, tình trạng ghế trống và thời điểm nâng hạng so với ngày khởi hành chuyến bay. Thông thường, vé hạng đặt chỗ càng thấp thì chi phí nâng hạng sẽ càng cao. Chi phí nâng hạng đối với các chuyến bay quốc tế liên lục địa cũng sẽ cao hơn nhiều. Để biết thông tin chi tiết, bạn vui lòng liên hệ nhân viên bộ phận Hỗ trợ khách hàng của chúng tôi qua số tổng đài <a href="call:18006782">1800 6782</a>.'
                        }
                    ]
                },
                {
                    'title': 'Huỷ đặt chỗ, đổi lịch bay và Hoàn tiền',
                    'icon': 'assets/images/faq/flight/ref.svg',
                    'questions': [
                        {
                            question: 'Tôi có thể thay đổi thông tin đặt chỗ của mình không?',
                            answer: 'Trong trường hợp vé của bạn chưa thanh toán thì khi qua thời hạn đặt chỗ vé sẽ tự hết hạn. Nếu vé của bạn đã thanh toán và bạn có nhu cầu thay đổi thông tin đặt chỗ, bạn vui lòng liên hệ bộ phận Hỗ trợ khách hàng qua tổng đài 18006782 nhân viên sẽ tư vấn cho bạn nhé.'
                        },
                        {
                            question: 'Tôi sẽ luôn được hoàn lại tiền vé khi hủy vé phải không?',
                            answer: 'Một số hãng hàng không như AirAsia, Citilink, Firefly, Jetstar và Tiger air chỉ cho phép hoàn lại tiền vé nếu chuyến bay bị hủy bởi chính hãng hàng không. Vé khuyến mãi không được hoàn tiền. Xin bảo đảm rằng bạn đã đọc và hiểu rõ các chính sách của hãng hàng không. Mọi yêu cầu hoàn tiền phải được xử lý thông qua Xtrip, bạn vui lòng liên hệ bộ phận hỗ trợ khách hàng qua tổng đài <a class="underline" href="call:18006782">1800 6782</a> để được hỗ trợ tốt nhất.'
                        },
                        {
                            question: 'Tôi có thể thay đổi lịch bay như thế nào?',
                            answer: 'Mỗi hãng hàng không có những chính sách và thủ tục thay đổi lịch bay khác nhau. Để có thêm thông tin về cách thức tiến hành, bạn vui lòng liên hệ bộ phận Hỗ trợ Khách hàng số 18006782 để được hỗ trợ tốt nhất.'
                        },
                        {
                            question: 'Làm sao để tôi đổi lại tên đã viết sai?',
                            answer: 'Việc đổi tên sẽ tùy thuộc vào chính sách của từng hãng hàng không. Để có thêm thông tin chi tiết, bạn vui lòng liên hệ bộ phận Hỗ trợ Khách hàng qua số tổng đài 18006782.'
                        }
                    ]
                },
                {
                    'title': 'Check-in Online',
                    'icon': 'assets/images/faq/flight/check.svg',
                    'questions': [
                        {
                            question: 'Tôi nên làm thủ tục chuyến bay (check in) khi nào?',
                            answer: 'Nếu không mang theo hành lý ký gửi, bạn nên có mặt và làm thủ tục 90 phút trước giờ khởi hành. Nếu bạn có mang theo hành lý, vui lòng có mặt làm thủ tục ít nhất 2 tiếng trước giờ khởi hành. Đối với các chuyến bay quốc tế, chúng tôi khuyến nghị bạn nên có mặt tại sân bay ít nhất 3 tiếng trước giờ khởi hành.<br/>Xin bảo đảm bạn đã phân bổ đủ thời gian cho thủ tục kiểm tra an ninh và nhập cảnh.'
                        },
                        {
                            question: 'Tôi có thể làm thủ tục trực tuyến như thế nào?',
                            answer: 'Bạn hãy vào trang làm thủ tục trực tuyến của hãng hàng không.<br/>Nhập Mã vé (PNR) hoặc Họ của hành khách.<br/>Hoàn tất thông tin thủ tục trực tuyến.<br/>Sau khi hoàn thành thủ tục trực tuyến, bạn hãy in thẻ lên máy bay ra. Nếu bạn cần hỗ trợ thêm thông tin vui lòng liên hệ với nhân viên bộ phận Hỗ trợ khách hàng qua tổng đài 18006782 để được tư vấn.'
                        }
                    ]
                }
            ]
        },
        {
            'heading': 'Khách sạn',
            'key': 'hotel',
            'icon': 'assets/images/faq/hotel/title.svg',
            'groups': [
                {
                    'title': 'Tìm Khách sạn',
                    'icon': 'assets/images/faq/hotel/find.svg',
                    'questions': [
                        {
                            question: 'Ngoài Việt Nam, tôi có thể đặt khách sạn ở nước ngoài không?',
                            answer: 'Tất nhiên là được. Ngoài vé máy bay, Xtrip còn cung cấp dịch vụ đặt phòng khách sạn trên toàn thế giới.'
                        },
                        {
                            question: 'Tôi muốn tìm khách sạn phù hợp với các tiêu chí cho điểm đến của tôi phải làm sao?',
                            answer: 'Nếu bạn không biết khách sạn nào bạn nên chọn trong thành phố bạn đến, chỉ cần gõ tên thành phố mà bạn sẽ đến. Các kết quả sẽ hiển thị ra các khách sạn trong khu vực đó. Bạn cũng có thể lọc kết quả theo điểm đánh giá, mức giá và hạng khách sạn... những tiêu chí giúp bạn lựa chọn được khách sạn phù hợp nhất.'
                        },
                        {
                            question: 'Tôi tìm số điện thoại của khách sạn ở đâu?',
                            answer: 'Số điện thoại của khách sạn được hiển thị trên file đính kèm xác nhận đặt chỗ khi bạn đã thanh toán.'
                        },
                        {
                            question: 'Tôi kiểm tra giá phòng khách sạn như thế nào?',
                            answer: 'Giá phòng khách sạn sẽ được hiển thị trong các kết quả tìm kiếm sau khi bạn nhập số đêm nghỉ và nhấn vào Tìm kiếm.'
                        },
                        {
                            question: 'Làm thế nào để tôi biết khách sạn còn phòng trống trong khung ngày mà tôi đã chọn?',
                            answer: 'Các kết quả tìm kiếm sẽ tự động hiển thị các khách sạn còn phòng trống trong khung ngày bạn chọn.'
                        },
                        {
                            question: 'Làm sao tôi có thể tìm khách sạn phù hợp với ngân sách của mình ?',
                            answer: 'Sau khi lựa chọn điểm đến và số đêm nghỉ, bạn có thể lọc kết quả tìm kiếm theo giá phòng, điểm đánh giá và hạng khách sạn.'
                        },
                        {
                            question: 'Tôi có thể tìm khách sạn quanh một khu vực hay địa danh cụ thể không?',
                            answer: 'Tất nhiên là được. Bạn có thể tìm kiếm với 2 bước sau:<br/> - Nhập khu vực hoặc địa điểm vào khung tìm kiếm.<br/>- Sau khi các kết quả tìm kiếm hiển thị, bạn sử dụng chức năng Bộ lọc trên đầu trang để phân loại các kết quả cụ thể.'
                        },
                        {
                            question: 'Làm thế nào để tôi biết số khách ở tối đa cho mỗi phòng?',
                            answer: 'Sức chứa tối đa của mỗi phòng sẽ được hiển thị trên trang giới thiệu khách sạn, sau khi bạn nhấn Chọn phòng.'
                        },
                        {
                            question: 'Không hoàn tiền và Miễn phí hủy đặt phòng nghĩa là gì?',
                            answer: 'Không hoàn tiền nghĩa là bạn sẽ không được nhận lại tiền hoàn trả khi hủy đặt phòng. Miễn phí hủy phòng nghĩa là bạn sẽ được hoàn tiền nếu việc hủy được thực hiện trong thời gian quy định.'
                        }
                    ]
                },
                {
                    'title': 'Đặt phòng khách sạn',
                    'icon': 'assets/images/faq/hotel/book.svg',
                    'questions': [
                        {
                            question: 'Tôi muốn đặt phòng khách sạn từ ứng dụng Xtrip phải làm thế nào?',
                            answer: 'Sau khi chọn khách sạn, ngày và phòng mong muốn, bạn vui lòng nhập các thông tin đặt phòng bao gồm họ tên, email, số điện thoại và tiến hành thanh toán.'
                        },
                        {
                            question: 'Làm sao tôi nhận được phiếu thanh toán và biên nhận khách sạn?',
                            answer: 'Sau khi bạn hoàn thành việc thanh toán, phiếu thanh toán và biên nhận thanh toán sẽ được gửi vào email của bạn dưới dạng tập tin đính kèm. Bạn cũng có thể truy cập để xem phiếu thanh toán trong mục Đặt chỗ của tôi bằng cách đăng nhập vào tài khoản qua ứng dụng Xtrip App hoặc trang web Xtrip.'
                        },
                        {
                            question: 'Tại sao tôi chưa nhận được phiếu thanh toán khách sạn?',
                            answer: 'Có thể phiếu thanh toán của bạn chưa được phát hành vì một số lý do sau:<br/>- Số tiền thanh toán không khớp.<br/>- Thanh toán được thực hiện sau thời hạn thanh toán quy định.<br/>- Tiến trình xác thực thanh toán của bạn bị chậm do trục trặc trong hệ thống của ngân hàng. Nếu bạn đã kiểm tra lại toàn bộ quy trình thanh toán mà vẫn chưa nhận được phiếu thanh toán khách sạn, bạn vui lòng liên hệ bộ phận phục vụ khách hàng của Xtrip số tổng đài 18006782 để nhân viên hỗ trợ bạn nhé.'
                        },
                        {
                            question: 'Làm sao tôi biết yêu cầu đặt phòng của mình đã được xác nhận hay chưa?',
                            answer: 'Ngay sau khi nhận được số tiền thanh toán, Xtrip sẽ gửi cho bạn một email xác nhận đặt chỗ. Email này cũng sẽ đính kèm phiếu thanh toán khách sạn, biên nhận thanh toán và thông tin lịch trình.'
                        },
                        {
                            question: 'Tôi muốn đặt phòng cho một nhóm khách, đoàn hơn 30 người có được không?',
                            answer: 'Trong mục tìm khách sạn, bạn bật tính năng " Tôi muốn đặt phòng cho đoàn hơn 30 người", sau đó bạn nhập đầy đủ các thông tin đặt khách sạn, thông tin liên hệ và nhấn Gởi yêu cầu. Nhân viên chăm sóc khách hàng của Xtrip sẽ liên hệ bạn trong thời gian sớm nhất để tư vấn.'
                        },
                        {
                            question: 'Liệu tôi có thể đặt phòng trực tiếp với khách sạn không?',
                            answer: 'Xtrip đang liên kết, hợp tác với các khách sạn để cung cấp cho khách hàng những ưu đãi về giá và dịch vụ tốt nhất. Trong trường hợp bạn đặt phòng trực tiếp với khách sạn thì các mức giá có thể cao hơn bạn nhé.'
                        },
                        {
                            question: 'Tôi muốn ở lại lâu hơn 30 ngày/ đêm được không?',
                            answer: 'Nếu bạn muốn thời gian lưu trú hơn 30 ngày, bạn hãy tạo thành 2 lần đặt phòng, với mỗi lần đặt phòng tối đa là 15 ngày.'
                        },
                    ]
                },
                {
                    'title': 'Giá phòng',
                    'icon': 'assets/images/faq/hotel/price.svg',
                    'questions': [
                        {
                            question: 'Giá phòng khách sạn bao gồm những gì?',
                            answer: 'Tất cả tiện nghi có trên trang khách sạn đều được bao gồm trong mức giá hiển thị. Bạn có thể tìm thông tin hoàn chỉnh trên trang đặt chỗ, trang xác nhận và email xác nhận.'
                        },
                        {
                            question: 'Giá phòng hiển thị được tính theo đêm hay đầu người?',
                            answer: 'Toàn bộ giá phòng trên trang giới thiệu khách sạn được Xtrip tính theo số đêm và loại phòng.'
                        },
                        {
                            question: 'Giá phòng đã bao gồm thuế chưa?',
                            answer: 'Có. Toàn bộ giá phòng là giá cuối cùng và đã bao gồm các loại thuế. Bạn không phải lo lắng về các loại phí ẩn hoặc giá tăng đột ngột. Tuy nhiên với một số trường hợp phát sinh như thêm người, yêu cầu giường lớn hơn có thể sẽ tính thêm vào giá phòng.'
                        },
                        {
                            question: 'Tất cả các phòng đều có bao gồm bữa sáng đúng không?',
                            answer: 'Điều này tùy theo chính sách của khách sạn và hạng phòng. Ký hiệu bữa sáng sẽ hiển thị nếu giá phòng có bao gồm bữa sáng.'
                        },
                        {
                            question: 'Là thành viên của Xtrip thì khi đặt phòng có được giá ưu đãi không?',
                            answer: 'Có. Bất kỳ ai là thành viên và sở hữu tài khoản Xtrip đều nhận được mức giá ưu đãi.'
                        },
                        {
                            question: 'Trẻ em có phải mất thêm phí phụ thu nào không?',
                            answer: 'Mức giá hiển thị trên trang kết quả tìm kiếm chưa bao gồm phụ phí đối với trẻ em. Mức phí này phụ thuộc vào chính sách của từng khách sạn, vì vậy bạn vui lòng liên hệ nhân viên bộ phận Hỗ trợ Khách hàng của chúng tôi qua số  tổng đài 18006782 để được tư vấn cụ thể hơn.'
                        }
                    ],
                }, {
                    'title': 'Tiện nghi khách sạn',
                    'icon': 'assets/images/faq/hotel/fac.svg',
                    'questions': [
                        {
                            question: 'Liệu tôi có thể gửi hành lý tại khách sạn trước khi nhận phòng và sau khi trả phòng được không?',
                            answer: 'Một số khách sạn có các dịch vụ cất giữ hành lý. Để biết được liệu khách sạn của bạn có dịch vụ này không, bạn vui lòng xem chi tiết trong mô tả của khách sạn khi đặt phòng hoặc liên hệ trực tiếp với nhân viên bộ phận Hỗ trợ Khách hàng của chúng tôi qua số tổng đài 18006782.'
                        },
                        {
                            question: 'Tôi có thể tìm thông tin về các tiện nghi khách sạn ở đâu?\tTôi có thể tìm thông tin về các tiện nghi khách sạn ở đâu?',
                            answer: 'Khi bạn chọn một khách sạn mong muốn, phần tiện nghi sẽ nằm ở mục chi tiết khách sạn.'
                        },
                        {
                            question: 'Làm thế nào để tôi biết khách sạn có tiện nghi hỗ trợ cho người khuyết tật không?',
                            answer: 'Thông tin này được hiển thị trong phần tiện nghi, nếu bạn không tìm thấy thì có thể khách sạn không cung cấp tiện nghi này. Để biết thông tin chi tiết, bạn vui lòng liên hệ nhân viên bộ phận Hỗ trợ Khách hàng qua số tổng đài 18006782.'
                        }
                    ]
                }, {
                    'title': 'Huỷ đặt chỗ, đặt phòng & hoàn tiền',
                    'icon': 'assets/images/faq/hotel/can.svg',
                    'questions': [
                        {
                            question: 'Tôi có thể thay đổi thời gian nhận phòng hoặc trả phòng không?',
                            answer: 'Nếu muốn thay đổi thời gian lưu trú, bạn có thể huỷ đặt phòng và đặt lại phòng vào ngày phù hợp khác. Tuy nhiên, xin lưu ý rằng một số phòng khách sạn thuộc diện không được hoàn tiền, trong khi một số khác có thể áp dụng phí khi khách hủy phòng. Để biết thông tin chi tiết, bạn vui lòng liên hệ nhân viên bộ phận Hỗ trợ Khách hàng của chúng rôi qua số tổng đài 18006782.'
                        },
                        {
                            question: 'Liệu tôi có thể hủy yêu cầu đặt phòng của mình không?',
                            answer: 'Việc hủy đặt phòng sẽ tùy thuộc vào chính sách của khách sạn. Một số phòng của khách sạn thuộc diện không được hoàn tiền trong khi số khác có thể tính phí khi khách hủy phòng. Nếu bạn có yêu cầu hủy đặt phòng vui lòng liên hệ với nhân viên bộ phận Hỗ trợ khách hàng của Xtrip qua số tổng đài 18006782.'
                        },
                        {
                            question: 'Khi huỷ đặt phòng tôi có bị mất phí không?',
                            answer: 'Mỗi khách sạn có qui định chính sách hủy đặt phòng khác nhau. Bạn hãy kiểm tra thông tin về chính sách hủy đặt phòng khách sạn trong email xác nhận Xtrip đã gửi.'
                        },
                        {
                            question: 'Tôi có thể tìm thấy chính sách hủy đặt phòng ở đâu?',
                            answer: 'Bạn có thể tìm chính sách hủy đặt phòng trên trang đặt phòng khách sạn. Ngoài ra, khi bạn đã hoàn tất thanh toán cho đặt phòng, Xtrip sẽ gửi thông tin về chính sách hủy đặt phòng trong email xác nhận cho bạn.'
                        },
                        {
                            question: 'Làm thế nào tôi biết được rằng tôi đã huỷ phòng thành công?',
                            answer: 'Bạn vào phần đặt chỗ của tôi sẽ thấy được khách sạn mình muốn đặt có nhãn đã huỷ phòng. Đồng thời, bạn sẽ nhận được email thông báo về việc hủy bỏ đặt chỗ. Vui lòng kiểm tra hộp thư đến cũng như mục thư rác/quảng cáo trong email của bạn hoặc liên hệ nhân viên bộ phận Hỗ trợ Khách hàng qua số tổng đài 18006782 để được hỗ trợ tốt nhất.'
                        }
                    ]
                },
                {
                    'title': 'Đánh giá khách sạn',
                    'icon': 'assets/images/faq/hotel/fed.svg',
                    'questions': [
                        {
                            question: 'Tôi muốn viết đánh giá về khách sạn phải làm sao?',
                            answer: 'Bạn có thể vào phần đặt chỗ của tôi để đánh giá ngay sau khi bạn kết thúc chuyến lưu trú tại khách sạn'
                        },
                        {
                            question: 'Bất kỳ ai cũng có thể viết đánh giá đúng không?',
                            answer: 'Chỉ những khách nào đã đi và trải nghiệm khách sạn sẽ được đánh giá. Bạn có thể vào mục Đặt chỗ của tôi và chọn khách sạn muốn đánh giá.'
                        },
                        {
                            question: 'Tôi có thể chỉnh sửa những bài đánh giá của mình không?',
                            answer: 'Chúng tôi rất lấy làm tiếc, bạn không thể chỉnh sửa một khi bài đánh giá đã được gửi đi.'
                        },
                        {
                            question: 'Tại sao bài đánh giá của tôi vẫn chưa được hiển thị?',
                            answer: 'Chúng tôi rất xin lỗi về điều này. Có thể do trong bài đánh giá của bạn có chứa bình luận không phù hợp mang tính xúc phạm hoặc liên quan đến các vấn đề sắc tộc, tầng lớp, tôn giáo và chủng tộc. Nếu bạn cần hỗ trợ thêm vui lòng liên hệ nhân viên bộ phận hỗ trợ khách hàng của Xtrip qua số tổng đài 18006782 bạn nhé.'
                        },
                        {
                            question: 'Xtrip có kiểm duyệt bài đánh giá không?',
                            answer: 'Xtrip kiểm duyệt tất cả các bài đánh giá để lọc ra những bình luận không phù hợp, mang tính xúc phạm hoặc liên quan đến các vấn đề sắc tộc, tầng lớp, tôn giáo và chủng tộc. Chúng tôi không điều chỉnh các bài đánh giá của khách, trừ các bài đánh giá không phù hợp và nếu có thì chỉ là những thay đổi nhỏ.'
                        }
                    ]
                },
                {
                    'title': 'Chính sách khách sạn',
                    'icon': 'assets/images/faq/hotel/fea.svg',
                    'questions': [
                        {
                            question: 'Khách sạn có chính sách cho nhận phòng trễ không?',
                            answer: 'Được. Bạn vẫn có thể nhận phòng nếu đến trễ. Tuy nhiên, chúng tôi đề nghị rằng bạn phải thông báo trước cho khách sạn trong trường hợp đến trễ.'
                        },
                        {
                            question: 'Tôi có thể xem thời gian nhận phòng và trả phòng ở đâu?',
                            answer: 'Bạn co thể xem thông tin giờ nhận hoặc trả phòng tại thông tin chính sách đặt phòng của khách sạn hoặc trên phiếu thanh toán khách sạn.'
                        },
                        {
                            question: 'Tôi có thể tìm thông tin về các tiện nghi khách sạn ở đâu?',
                            answer: 'Các tiện nghi khách sạn đều được hiển thị trên trang giới thiệu khách sạn hoặc hạng phòng.'
                        },
                        {
                            question: 'Tôi muốn đặt phòng có hút thuốc phải làm sao?',
                            answer: 'Nếu bạn tìm trong tiện nghi khách sạn không có phòng hút thuốc, nghĩa là khách sạn không thể đáp ứng yêu cầu của bạn. Để biết thông tin chi tiết bạn vui lòng liên hệ bộ phận Hỗ trợ Khách hàng số 18006782.'
                        },
                        {
                            question: 'Khách sạn có cho phép khách mang theo thú nuôi?',
                            answer: 'Điều này phụ thuộc vào chính sách của từng khách sạn. Bạn vui lòng kiểm tra trong chính sách hoặc tiện nghi của khách sạn có cho phép hay không. Để biết thông tin chi tiết bạn vui lòng liên hệ bộ phận Hỗ trợ Khách hàng số 18006782.'
                        }
                    ]
                },
            ]
        },
        {
            'heading': 'Tour',
            'key': 'tour',
            'icon': 'assets/images/faq/tour/title.svg',
            'groups': [
                {
                    'title': 'Tìm tour',
                    'icon': 'assets/images/faq/hotel/find.svg',
                    'questions': [
                        {
                            question: 'Tôi có thể đặt tour ngoài phạm vi Việt Nam không?',
                            answer: 'Tất nhiên là được. Ngoài các tour du lịch trong nước, Xtrip còn bán các tour du lịch nước ngoài.'
                        },
                        {
                            question: 'Làm thế nào để tôi tìm được tour ưng ý nhất cho điểm đến của mình?',
                            answer: 'Chỉ cần chọn tour mà bạn sẽ đến. Các kết quả sẽ hiển thị ra, bạn cũng có thể lọc kết quả theo điểm đánh giá, mức giá...những tiêu chí này sẽ giúp bạn lựa chọn được tour phù hợp nhất.'
                        },
                        {
                            question: 'Tôi tìm số điện thoại của nhà tổ chức tour ở đâu?',
                            answer: 'Sau khi bạn đã thanh toán Xtrip sẽ gửi email xác nhận đặt chỗ. Xtrip sẽ cung cấp thông tin số điện thoại của công ty tổ chức tour trong file đính kèm bạn nhé.'
                        },
                        {
                            question: 'Tôi kiểm tra giá tour như thế nào?',
                            answer: 'Giá tour sẽ được hiển thị trong các kết quả tìm kiếm sau khi bạn tìm tour.'
                        },
                        {
                            question: 'Làm thế nào để tôi biết tour nào còn chỗ trống trong khung ngày đã chọn?',
                            answer: 'Bạn cần vào chi tiết tour, chọn số người và ngày dự kiến sẽ đi, thông tin số chỗ còn trống sẽ hiển thị .'
                        },
                        {
                            question: 'Tôi có thể tìm tour phù hợp với ngân sách của mình không?',
                            answer: 'Tất nhiên là được. Sau khi chọn tour muốn đến , bạn có thể vào bộ lọc để lọc lại tour theo mức giá mình mong muốn.'
                        },
                        {
                            question: 'Không hoàn tiền và miễn phí hủy tour nghĩa là gì?',
                            answer: 'Không hoàn tiền nghĩa là bạn sẽ không được nhận lại tiền hoàn trả khi hủy đặt tour. Miễn phí hủy tour nghĩa là bạn sẽ được hoàn tiền nếu việc hủy được thực hiện trong thời gian quy định.'
                        },
                    ]
                },
                {
                    'title': 'Đặt tour',
                    'icon': 'assets/images/faq/tour/book.svg',
                    'questions': [
                        {
                            question: 'Làm sao để đặt tour qua Xtrip?',
                            answer: 'Bạn cần nhập các thông tin đặt tour bao gồm họ tên, email, số điện thoại và tiến hành thanh toán, khi đó tour của bạn đã được đặt xong.'
                        },
                        {
                            question: 'Làm sao biết yêu cầu đặt tour của tôi đã được xác nhận hay chưa?',
                            answer: 'Ngay sau khi nhận được số tiền thanh toán, Xtrip sẽ gửi cho bạn một email xác nhận đặt tour. Email này cũng sẽ đính kèm phiếu thanh toán đặt tour, biên nhận thanh toán và thông tin lịch trình.'
                        },
                        {
                            question: 'Làm thế nào để tôi đặt tour cho một nhóm khách?',
                            answer: 'Trong mục tìm tour, bạn chọn " Tôi muốn đặt tour đoàn riêng", sau đó bạn nhập đầy đủ các thông tin đặt tour, thông tin liên hệ và nhấn Gởi yêu cầu. Nhân viên chăm sóc khách hàng của Xtrip sẽ liên hệ bạn trong thời gian sớm nhất để tư vấn và sắp xếp tour hợp lý cho bạn.'
                        },

                    ]
                },
                {
                    'title': 'Giá tour',
                    'icon': 'assets/images/faq/tour/price.svg',
                    'questions': [
                        {
                            question: 'Giá tour bao gồm những gì?',
                            answer: 'Giá tour được niêm yết thông thường là giá tour trọn gói.Thông tin chi tiết của từng tour sẽ được thể hiện ở mục giới thiệu trong chính sách tour trên web hoặc App của Xtrip.'
                        },
                        {
                            question: 'Giá tour đã bao gồm thuế chưa?',
                            answer: 'Tùy thuộc vào mỗi chương trình tour, sẽ có một vài thuế phí chưa được tính vào giá tour. Để biết thông tin chi tiết giá không bao gồm những gì, bạn có thể xem các dịch vụ không được tính trong giá tour ở mục chính sách tour. '
                        },
                        {
                            question: 'Giá tour có bao gồm bữa sáng không?',
                            answer: 'Tuỳ thuộc vào tour bạn khởi hành vào buổi sáng hay buổi tối mà lịch trình sẽ sắp xếp có bữa sáng cho bạn hay không.'
                        },
                        {
                            question: 'Xtrip có mức giá ưu đãi cho thành viên không?',
                            answer: 'Có. Bất kỳ ai là thành viên và sở hữu tài khoản Xtrip đều nhận được mức giá ưu đãi.'
                        },
                        {
                            question: 'Trẻ em có phải mất thêm phí phụ thu nào không?',
                            answer: 'Mức giá hiển thị trên trang kết quả tìm kiếm chưa bao gồm phụ phí đối với trẻ em. Vì mức phí này phụ thuộc vào chính sách của từng tour, bạn vui lòng liên hệ trực tiếp bộ phận Hỗ trợ Khách hàng của Xtrip sẽ tư vấn cho bạn qua số 18006782.'
                        },
                    ]
                }, {
                    'title': 'Huỷ đặt tour & hoàn tiền',
                    'icon': 'assets/images/faq/tour/cancel.svg',
                    'questions': [
                        {
                            question: 'Liệu tôi có thể hủy yêu cầu đặt tour của mình không?',
                            answer: 'Việc hủy đặt tour sẽ tùy thuộc vào chính sách do công ty tổ chức tour qui định. Một số tour có thể tính phí khi khách hủy tour. Nếu bạn có yêu cầu hủy tour đã đặt vui lòng liên hệ với nhân viên bộ phận Hỗ trợ khách hàng của Xtrip qua số tổng đài 18006782.'
                        },
                        {
                            question: 'Liệu tôi có phải mất phí nếu hủy đặt tour không?',
                            answer: 'Mỗi tour sẽ có một chính sách hủy đặt khác nhau. Bạn hãy kiểm tra thông tin về chính sách hủy đặt tour trong email xác nhận Xtrip đã gửi cho bạn. Khi cần tư vấn thêm thông tin, bạn vui lòng liên hệ trực tiếp bộ phận Hỗ trợ Khách hàng của Xtrip sẽ tư vấn cho bạn qua số 18006782.'
                        },
                        {
                            question: 'Tôi có thể tìm thấy chính sách hủy đặt tour ở đâu?',
                            answer: 'Bạn có thể xem các điều kiện hủy đặt tour trong nội dung chi tiết tour. Ngoài ra, khi bạn đã hoàn tất thanh toán cho đặt tour, Xtrip cũng sẽ gửi thông tin về chính sách hủy tour trong email xác nhận cho bạn. Khi cần tư vấn thêm thông tin, bạn vui lòng liên hệ trực tiếp bộ phận Hỗ trợ Khách hàng của Xtrip sẽ tư vấn cho bạn qua số 18006782.'
                        },
                        {
                            question: 'Làm sao tôi biết rằng liệu yêu cầu đặt chỗ của mình đã bị hủy bỏ?',
                            answer: 'Bạn đặng nhập vào tài khoản ở mục đặt chỗ của tôi, bạn thấy tour đã đặt có nhãn huỷ hoặc bạn sẽ nhận được email thông báo về việc hủy bỏ đặt chỗ. Nếu chưa nhận mail, bạn vui lòng kiểm tra mục thư rác/quảng cáo trong email của bạn.'
                        },
                    ]
                },
                {
                    'title': 'Đánh giá nhà tổ chức tour',
                    'icon': 'assets/images/faq/tour/feedback.svg',
                    'questions': [
                        {
                            question: 'Làm thế nào để viết đánh giá về nhà tổ chức tour?',
                            answer: 'Sau khi bạn hoàn thành chuyến đi, bạn có thể vào đặt chỗ của tôi và chọn tour mình vừa đi để đánh giá tour.'
                        },
                        {
                            question: 'Bất cứ ai cũng có thể viết đánh giá phải không?',
                            answer: 'Chỉ những khách hàng đã đặt và hoàn thành chuyến đi thì sẽ được đánh giá'
                        },
                        {
                            question: 'Tôi có thể chỉnh sửa bài đánh giá của mình không?',
                            answer: 'Chúng tôi rất lấy làm tiếc, bạn không thể chỉnh sửa một khi bài đánh giá của bạn đã được gửi đi.'
                        },
                        {
                            question: 'Tại sao bài đánh giá của tôi vẫn chưa được hiển thị?\n',
                            answer: 'Chúng tôi rất xin lỗi về điều này. Có thể do trong bài đánh giá của bạn có chứa bình luận không phù hợp mang tính xúc phạm hoặc liên quan đến các vấn đề sắc tộc, tầng lớp, tôn giáo và chủng tộc. Nếu phần lỗi thuộc về chúng tôi hoặc bạn cần được hỗ trợ thêm, xin liên hệ bộ phận hỗ trợ khách hàng của  của Xtrip qua số 18006782.'
                        },
                        {
                            question: 'Xtrip có kiểm duyệt bài đánh giá không?',
                            answer: 'Xtrip sẽ kiểm duyệt tất cả các bài đánh giá để lọc ra những bình luận không phù hợp, mang tính xúc phạm hoặc liên quan đến các vấn đề sắc tộc, tầng lớp, tôn giáo và chủng tộc. Chúng tôi không điều chỉnh các bài đánh giá của khách, trừ các bài đánh giá không phù hợp và nếu có thì chỉ là những thay đổi rất nhỏ.'
                        },
                    ]
                }
            ]
        }
    ];
}
