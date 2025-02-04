import React from "react";

function Newsletter() {
  return (
    <section
      id="newsletter"
      className="flex flex-wrap items-center justify-between px-6 md:px-20 py-10 bg-[#041e42] bg-cover bg-no-repeat font-roboto"
      style={{
        backgroundImage: "url('/img/banner/b14.png')",
        backgroundPosition: "20% 30%",
      }}
    >
      {/* Text Section */}
      <div className="mb-6 md:mb-0 md:w-1/2">
        <h4 className="text-white text-2xl font-bold mb-2">Đăng Ký Nhận Bản Tin</h4>
        <p className="text-white text-sm">
          Nhận thông tin cập nhật qua E-mail về cửa hàng mới nhất của chúng tôi và các ưu đãi đặc biệt....
        </p>
      </div>

      {/* Form Section */}
      <div className="flex w-full md:w-1/2">
        <input
          type="text"
          placeholder="Địa chỉ email của bạn"
          className="flex-grow h-12 px-4 text-sm bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button className="bg-teal-500 text-white px-6 py-3 text-sm font-medium rounded-r-lg hover:bg-teal-600 transition">
          Đăng Ký
        </button>
      </div>
    </section>
  );
}

export default Newsletter;
