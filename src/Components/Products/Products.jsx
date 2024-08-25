import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../Service/ProductService';
import { Link} from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Lỗi rồi:', error);
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
    <div>
      <section id="product1" className="section-p1">
        <h2>Tất Cả Sản Phẩm</h2>
        <div className="pro-container">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div className="pro" key={index}>
                <img src={`/img/products/${product.img}`} alt={product.name} />
                <div className="des">
                  <span>{product.category}</span>
                  <Link to={`/product/${product.id}`}>
                    <h5>{product.name}</h5>
                  </Link>
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
            <p>Đang tải sản phẩm...</p>
          )}
        </div>
      </section>
    </div>
  );
}
