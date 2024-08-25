import React, { useEffect, useState } from 'react';
import { fetchNewProducts } from '../../Service/ProductService';
import BrandBox from '../Brand/BrandBox';

function NewProducts() {
  const [newProducts, setNewProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const newProducts = await fetchNewProducts();
        setNewProducts(newProducts);
      } catch (error) {
        setError(error.message);
      }
    };

    loadProducts();
  }, []);
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} đã được thêm vào giỏ hàng`);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <section id="product1" className="section-p1">
      <BrandBox/>
      <h2>Sản Phẩm Mới</h2>
      <div className="pro-container" id="products">
        {error && <p>Error: {error}</p>}
        {newProducts.length > 0 ? (
          newProducts.map((product, index) => (
            <div className="pro" key={index}>
              <img src={`/img/products/${product.img}`} alt={product.name} />
              <div className="des">
                <span>{product.category}</span>
                <h5>{product.name}</h5>
                <div className="star">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <h4 className="price">{formatCurrency(product.price)}</h4>
                <button onClick={() => addToCart(product)}>
                    <i className="fa-solid fa-cart-shopping cart"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading new products...</p>
        )}
      </div>
    </section>
  );
}

export default NewProducts;
