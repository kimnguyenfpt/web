import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../Service/ProductService';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from "../Cart/CartSlice"; // Import the addItem action
import './Products.css'; // CSS for styling

export default function Products() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [modalProduct, setModalProduct] = useState(null); // Product added to the cart
  const [progress, setProgress] = useState(0); // Progress bar state
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (modalVisible) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            closeModal();
          }
          return prev + 5;
        });
      }, 100); // Update progress every 100ms
    }
  }, [modalVisible]);

  const addToCart = (product) => {
    dispatch(addItem(product));
    setModalProduct(product); // Set the product added to the cart
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Hide the modal
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

      {/* Modal with progress bar */}
      {modalVisible && modalProduct && (
        <div className="modal">
          <div className="modal-content">
            <h4>Sản phẩm đã được thêm vào giỏ hàng!</h4>
            <p>{modalProduct.name}</p>
            <img
              src={`/img/products/${modalProduct.img}`}
              alt={modalProduct.name}
              className="modal-product-img"
            />
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
