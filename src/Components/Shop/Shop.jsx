import React from 'react';

import Products from '../Products/Products'
import BannerShop from '../BannerShop/BannerShop';

function Shop() {
  
  return (
    <div>
      {/* BannerShop */}
        <BannerShop/>

      {/* Product Section */}
        <Products/>

    </div>
  );
}

export default Shop;
