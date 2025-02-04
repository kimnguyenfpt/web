import React from 'react';

function Footer() {
  return (
    <footer className="flex flex-wrap justify-between px-10 py-6 bg-gray-100 font-roboto">
      {/* Contact Column */}
      <div className="flex flex-col mb-6">
        <a className="text-xl font-bold text-gray-800 mb-4">MiXiShop</a>
        <h4 className="text-sm font-semibold mb-3">Liên Hệ</h4>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Địa chỉ:</strong> Quận 12, Thành phố Hồ Chí Minh
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Số điện thoại:</strong> 0101010101010
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Giờ làm việc:</strong> 09:00am -11:00pm
        </p>
        <div>
          <h4 className="text-sm font-semibold mb-3">Theo dõi chúng tôi</h4>
          <div className="flex space-x-3">
            <i className="fab fa-facebook-f text-gray-500 hover:text-teal-500 cursor-pointer"></i>
            <i className="fab fa-twitter text-gray-500 hover:text-teal-500 cursor-pointer"></i>
            <i className="fab fa-instagram text-gray-500 hover:text-teal-500 cursor-pointer"></i>
            <i className="fab fa-pinterest-p text-gray-500 hover:text-teal-500 cursor-pointer"></i>
            <i className="fab fa-youtube text-gray-500 hover:text-teal-500 cursor-pointer"></i>
          </div>
        </div>
      </div>

      {/* About Column */}
      <div className="flex flex-col mb-6">
        <h4 className="text-sm font-semibold mb-3">Về</h4>
        <a href="#" className="text-sm text-gray-600 mb-2 hover:text-teal-500">Về Chúng Tôi</a>
        <a href="#" className="text-sm text-gray-600 mb-2 hover:text-teal-500">Thông tin giao hàng</a>
        <a href="#" className="text-sm text-gray-600 mb-2 hover:text-teal-500">Chính sách bảo mật</a>
        <a href="#" className="text-sm text-gray-600 mb-2 hover:text-teal-500">Điều khoản và điều kiện</a>
        <a href="#" className="text-sm text-gray-600 hover:text-teal-500">Liên hệ chúng tôi</a>
      </div>

      {/* Account Column */}
      <div className="flex flex-col mb-6">
        <h4 className="text-sm font-semibold mb-3">Tài Khoản</h4>
        <a href="#" className="text-sm text-gray-600 mb-2 hover:text-teal-500">Đăng nhập</a>
        <a href="#" className="text-sm text-gray-600 mb-2 hover:text-teal-500">Xem giỏ hàng</a>
        <a href="#" className="text-sm text-gray-600 mb-2 hover:text-teal-500">Sản phẩm yêu thích</a>
        <a href="#" className="text-sm text-gray-600 mb-2 hover:text-teal-500">Theo dõi đơn hàng</a>
        <a href="#" className="text-sm text-gray-600 hover:text-teal-500">Giúp đỡ</a>
      </div>

      {/* Install Column */}
      <div className="flex flex-col mb-6">
        <h4 className="text-sm font-semibold mb-3">Cài đặt ứng dụng</h4>
        <p className="text-sm text-gray-600 mb-4">Từ App Store hoặc Google Play</p>
        <div className="flex space-x-4 mb-4">
          <img
            src="/img/pay/app.jpg"
            alt="App Store"
            className="w-22 h-10 rounded-lg border border-gray-200"
          />
          <img
            src="/img/pay/play.jpg"
            alt="Google Play"
            className="w-22 h-10 rounded-lg border border-gray-200"
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">Cổng Thanh Toán</p>
        <img
          src="/img/pay/pay.png"
          alt="Payment"
          className="w-32 h-auto"
        />
      </div>
    </footer>
  );
}

export default Footer;
