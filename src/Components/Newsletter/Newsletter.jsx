import React from 'react';

function Newsletter() {
  return (
    <section id="newsletter" className="section-p1 section-m1">
      <div className="newstext">
        <h4>Đăng Ký Nhận Bản Tin</h4>
        <p>Nhận thông tin cập nhật qua E-mail về cửa hàng mới nhất của chúng tôi và các ưu đãi đặc biệt....</p>
      </div>
      <div className="form">
        <input type="text" placeholder="Địa chỉ email của bạn" />
        <button className="normal">Đăng Ký</button>
      </div>
    </section>
  );
}

export default Newsletter;
