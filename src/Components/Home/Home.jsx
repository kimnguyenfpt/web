import React from "react";
import Banner from "../Banner/Banner";
import HotProducts from "../Products/HotProducts";
import NewProducts from "../Products/NewProducts";

function Home() {
  return (
    <div>
      {/* Banner Section */}
      <Banner />

      {/* Features Section */}
      <section
        id="feature"
        className="py-10 px-5 sm:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {[
          {
            img: "/img/features/f1.png",
            title: "Miễn Phí Vận Chuyển",
            bg: "bg-pink-100",
          },
          {
            img: "/img/features/f2.png",
            title: "Đặt Hàng Trực Tuyến",
            bg: "bg-green-100",
          },
          {
            img: "/img/features/f3.png",
            title: "Tiết Kiệm Tiền",
            bg: "bg-blue-100",
          },
          {
            img: "/img/features/f4.png",
            title: "Khuyến Mãi",
            bg: "bg-indigo-100",
          },
          {
            img: "/img/features/f6.png",
            title: "Hỗ Trợ 24/7",
            bg: "bg-red-100",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 border border-green-200 rounded-lg"
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-full mb-4"
            />
            <h6
              className={`inline-block px-2 py-1 rounded ${feature.bg} text-green-600 font-bold`}
            >
              {feature.title}
            </h6>
          </div>
        ))}
      </section>

      {/* HotProducts Section */}
      <HotProducts />

      {/* Sale Banner Section */}
      <section
        id="banner"
        className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-cover bg-center relative flex items-center justify-center flex-col px-4 sm:px-10 lg:px-20 font-roboto"
        style={{ backgroundImage: "url('/img/banner/laptop10.jpg')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold flex justify-center items-center mb-4">
            Nóng{" "}
            <img
              src="/img/sale.png"
              alt="Sale"
              className="ml-2 w-8 sm:w-10 lg:w-12 animate-pulse"
            />
          </h2>
          <h4 className="text-xl sm:text-2xl lg:text-4xl font-semibold">
            Up to <span className="text-red-500 font-bold">10%</span> off - Tất
            Cả Laptop & Điện Thoại
          </h4>
        </div>
      </section>

      {/* NewProducts Section */}
      <NewProducts />

      {/* Small Banner Section */}
      <section
        id="sm-banner"
        className="py-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8"
      >
        <div
          className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/img/banner/banner1.jpg')" }}
        ></div>
        <div
          className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/img/banner/banner3.webp')" }}
        ></div>
      </section>

      {/* Triple Banner Section */}
      <section
        id="banner3"
        className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/img/banner/ner1.jpg')" }}
        >
          <div className="absolute inset-0 bg-opacity-30 rounded-lg"></div>
        </div>
        <div
          className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/img/banner/banner2.jpg')" }}
        >
          <div className="absolute inset-0 bg-opacity-30 rounded-lg"></div>
        </div>
        <div
          className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/img/banner/banner3.jpg')" }}
        >
          <div className="absolute inset-0 bg-opacity-30 rounded-lg"></div>
        </div>
      </section>
    </div>
  );
}

export default Home;
