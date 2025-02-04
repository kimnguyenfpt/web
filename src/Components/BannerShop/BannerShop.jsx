import React from 'react';

const BannerShop = () => {
  return (
    <section
      id="page-header"
      className="bg-cover bg-center w-full h-[40vh] flex flex-col justify-center items-center text-center px-4"
      style={{ backgroundImage: `url('../img/banner/b1.jpg')` }}
    >
      <h2 className="text-white text-4xl font-bold">#MiXiShop</h2>
      <p className="text-white text-lg mt-2">
        Tiết kiệm nhiều hơn với phiếu giảm giá và giảm giá tới 20%!
      </p>
    </section>
  );
};

export default BannerShop;
