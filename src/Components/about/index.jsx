import React from "react";
import "./about.css";

function AboutUs() {
  return (
    <div className="about-us">
      {/* Tiêu đề chính */}
      <div className="header">
        <h1>Chính Sách và Điều Khoản</h1>
        <hr />
      </div>

      {/* Chính sách bảo mật */}
      <section>
        <h2>1. Chính sách bảo mật</h2>
        <p>
          Chúng tôi cam kết bảo vệ quyền riêng tư và bảo mật thông tin cá nhân
          của khách hàng. Thông tin cá nhân của bạn sẽ được chúng tôi thu thập
          và xử lý một cách minh bạch và hợp pháp. Các thông tin mà chúng tôi
          thu thập bao gồm:
        </p>
        <ul>
          <li>Họ tên, số điện thoại, địa chỉ email, địa chỉ nhận hàng.</li>
          <li>Thông tin thanh toán như thẻ ngân hàng, phương thức thanh toán.</li>
          <li>Dữ liệu hành vi truy cập như cookies và lịch sử giao dịch.</li>
        </ul>
        <p>
          <strong>Cam kết bảo mật thông tin:</strong>
        </p>
        <ul>
          <li>
            Thông tin khách hàng chỉ được sử dụng để cung cấp dịch vụ và xử lý
            đơn hàng.
          </li>
          <li>
            Không chia sẻ, bán hoặc tiết lộ thông tin khách hàng cho bên thứ ba
            không liên quan.
          </li>
          <li>
            Áp dụng các biện pháp bảo mật tốt nhất để bảo vệ dữ liệu khách hàng
            khỏi truy cập trái phép.
          </li>
        </ul>
      </section>

      {/* Điều khoản sử dụng */}
      <section>
        <h2>2. Điều khoản sử dụng</h2>
        <p>
          Khi truy cập và sử dụng website của chúng tôi, bạn đồng ý tuân thủ các
          điều khoản sau:
        </p>
        <ul>
          <li>
            Không sử dụng website vào mục đích phi pháp hoặc gây hại đến hệ
            thống và nội dung website.
          </li>
          <li>
            Không sao chép, chỉnh sửa hoặc sử dụng trái phép các nội dung, hình
            ảnh trên website.
          </li>
          <li>
            Không thực hiện các hành vi gây gián đoạn, xâm nhập hệ thống hoặc
            phát tán mã độc.
          </li>
        </ul>
        <p>
          Vi phạm các điều khoản sử dụng sẽ dẫn đến việc tạm khóa tài khoản hoặc
          áp dụng các biện pháp xử lý theo quy định pháp luật hiện hành.
        </p>
      </section>

      {/* Chính sách đổi trả */}
      <section>
        <h2>3. Chính sách đổi trả</h2>
        <p>
          <strong>Điều kiện đổi trả hàng:</strong>
        </p>
        <ul>
          <li>Thời gian đổi trả: trong vòng 7 ngày kể từ ngày nhận hàng.</li>
          <li>
            Sản phẩm phải còn nguyên tem mác, bao bì và không có dấu hiệu đã qua
            sử dụng.
          </li>
          <li>Cần cung cấp đầy đủ hóa đơn mua hàng và thông tin sản phẩm.</li>
        </ul>
        <p>
          <strong>Phí đổi trả hàng:</strong>
        </p>
        <ul>
          <li>
            Miễn phí đổi trả nếu sản phẩm bị lỗi do nhà sản xuất hoặc lỗi trong
            quá trình vận chuyển.
          </li>
          <li>
            Khách hàng chịu phí vận chuyển nếu đổi trả vì lý do cá nhân.
          </li>
        </ul>
      </section>

      {/* Chính sách giao hàng */}
      <section>
        <h2>4. Chính sách giao hàng</h2>
        <p>
          Chúng tôi cung cấp dịch vụ giao hàng trên toàn quốc với các quy định
          cụ thể như sau:
        </p>
        <ul>
          <li>
            <strong>Thời gian giao hàng:</strong> từ 2 - 5 ngày làm việc, tùy
            khu vực địa lý.
          </li>
          <li>
            <strong>Phí giao hàng:</strong> miễn phí hoặc có tính phí tùy theo
            chính sách khuyến mãi.
          </li>
          <li>
            <strong>Kiểm tra hàng:</strong> khách hàng được kiểm tra sản phẩm
            trước khi nhận hàng.
          </li>
        </ul>
        <p>
          Nếu có bất kỳ vấn đề gì liên quan đến giao hàng, vui lòng liên hệ ngay
          với bộ phận chăm sóc khách hàng để được hỗ trợ.
        </p>
      </section>

      {/* Liên hệ */}
      <section className="contact-info">
        <h2>5. Liên hệ</h2>
        <p>
          Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ thêm, vui lòng liên hệ với
          chúng tôi qua các phương thức sau:
        </p>
        <ul>
          <li>
            Email hỗ trợ:{" "}
            <a href="mailto:cunnne4@gmail.com">cunnne4@gmail.com</a>
          </li>
          <li>
            Số điện thoại: <strong>035-253-7046</strong>
          </li>
          <li>
            Địa chỉ: phường Tân Chánh Hiệp, Quận 12, thành phố Hồ Chí Minh,
            Vietnam
          </li>
        </ul>
        <p>
          Chúng tôi rất vui được phục vụ và giải đáp mọi thắc mắc từ phía khách
          hàng.
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
