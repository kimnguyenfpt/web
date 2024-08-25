import React from 'react';

import Categories from '../Categories/Categories';
import Products from '../Products/Products'
import BannerShop from '../BannerShop/BannerShop';

function Shop() {
  
  return (
    <div>
      {/* BannerShop */}
        <BannerShop/>

      {/* Cate Section */}
        <Categories/>

      {/* Product Section */}
        <Products/>

    </div>
  );
}

export default Shop;
