import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="section-p1">
      <div className="col">
        <a className="logo">MiXiShop</a>
        <h4>Liên Hệ</h4>
        <p><strong>Địa chỉ:</strong> Quận 12, Thành phố Hồ Chí Minh </p>
        <p><strong>Số điện thoại:</strong> 0101010101010 </p>
        <p><strong>Giờ làm việc:</strong> 09:00am -11:00pm </p>
        <div className="icon follow">
          <h4>Theo dõi chúng tôi</h4>
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-pinterest-p"></i>
          <i className="fab fa-youtube"></i>
        </div>
      </div>
      <div className="col">
        <h4>Về</h4>
        <a href="#">Về Chúng Tôi</a>
        <a href="#">Thông tin giao hàng</a>
        <a href="#">Chính sách bảo mật</a>
        <a href="#">Điều khoản và điều kiện</a>
        <a href="#">Liên hệ chúng tôi</a>
      </div>
      <div className="col">
        <h4>Tài Khoản</h4>
        <a href="#">Đăng nhập</a>
        <a href="#">Xem giỏ hàng</a>
        <a href="#">Sản phẩm yêu thích</a>
        <a href="#">Theo dõi đơn hàng</a>
        <a href="#">Giúp đỡ</a>
      </div>
      <div className="col install">
        <h4>Cài đặt ứng dụng</h4>
        <p>Từ App Store hoặc Google Play</p>
        <div className="row">
          <img src="src/assets/img/pay/app.jpg" alt="" />
          <img src="src/assets/img/pay/play.jpg" alt="" />
        </div>
        <p>Cổng Thanh Toán</p>
        <img src="src/assets/img/pay/pay.png" alt="" />
      </div>
    </footer>
  );
}

export default Footer;
