import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../Service/ProductService';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchProductById(id);
        setProduct(product);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} đã được thêm vào giỏ hàng`);
  };

  if (!product) {
    return <p>Đang tải chi tiết sản phẩm...</p>;
  }

  return (
    <section id="prodetails" className="section-p1">
      <div className="single-pro-image">
        <img src={`/img/products/${product.img}`} width="100%" id="MainImg" alt={product.name} />

        <div className="small-img-group">
          {product.images && product.images.map((img, index) => (
            <div className="small-img-col" key={index}>
              <img src={`/img/products/${img}`} width="100%" className="small-img" alt={product.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="single-pro-details">
        <h6>Trang Chủ / {product.categoryId}</h6>
        <h4>{product.name}</h4>
        <h2 className="price">{product.price}</h2>
        <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
        <button className="normal" onClick={addToCart}>Thêm vào giỏ hàng</button>
        <h4>Chi Tiết Sản Phẩm</h4>
        <span>{product.description}</span>
      </div>
    </section>
  );
}

export default ProductDetails;
