import React from 'react';
import './Home.css';
import Banner from '../Banner/Banner';
import HotProducts from '../Products/HotProducts';
import NewProducts from '../Products/NewProducts';

function Home() {


  return (
    <div>

      {/* Banner Section */}
      <Banner/>

      {/* Features Section */}
      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img src="/img/features/f1.png" alt="" />
          <h6>Miễn Phí Vận Chuyển</h6>
        </div>
        <div className="fe-box">
          <img src="/img/features/f2.png" alt="" />
          <h6>Đặt Hàng Trực Tuyến</h6>
        </div>
        <div className="fe-box">
          <img src="/img/features/f3.png" alt="" />
          <h6>Tiết Kiệm Tiền</h6>
        </div>
        <div className="fe-box">
          <img src="/img/features/f4.png" alt="" />
          <h6>Khuyến Mãi</h6>
        </div>
        <div className="fe-box">
          <img src="/img/features/f6.png" alt="" />
          <h6>Hỗ Trợ 24/7</h6>
        </div>
      </section>

      
      {/* HotProducts Section */}
      <HotProducts/>


      {/* Banner Section */}
      <section id="banner" className="section-m1">
        <h2>Nóng<img src="/img/sale.png" alt="" /></h2>
        <h4>Up to <span>🔟% off</span> - Tất Cả Laptop & Điện Thoại</h4>
      </section>

      {/* NewProducts Section */}
      <NewProducts/>

      {/* Small Banner Section */}
      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <div className="overlay"></div>
        </div>
        <div className="banner-box">
          <div className="overlay"></div>
        </div>
      </section>

      <section id="banner3" className="section-p1">
        <div className="banner-box">
          <div className="overlay"></div>
        </div>
        <div className="banner-box">
          <div className="overlay"></div>
        </div>
        <div className="banner-box">
          <div className="overlay"></div>
          <div className="content"></div>
        </div>
      </section>
    </div>
  );
}

export default Home;
