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
    return <p className="text-center text-gray-500 font-roboto">Đang tải chi tiết sản phẩm...</p>;
  }

  return (
    <section className="py-10 px-5 sm:px-10 md:px-20 lg:px-40 grid grid-cols-1 md:grid-cols-3 gap-10 font-roboto">
      {/* Product Images - Left Section */}
      <div className="md:col-span-1">
        <div className="mb-4">
          <img
            src={`/img/products/${product.img}`}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {product.images && product.images.map((img, index) => (
            <img
              key={index}
              src={`/img/products/${img}`}
              alt={product.name}
              className="w-20 h-20 object-contain rounded-lg border border-gray-200 shadow-sm hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>

      {/* Product Details - Right Section */}
      <div className="md:col-span-2 flex flex-col">
        <h6 className="text-gray-600 font-roboto font-medium text-sm mb-2">
          Trang Chủ / {product.categoryId}
        </h6>
        <h4 className="text-2xl font-roboto font-bold mb-4">{product.name}</h4>
        <h2 className="text-3xl font-roboto font-bold text-teal-600 mb-4">
          {product.price.toLocaleString('vi-VN')}₫
        </h2>

        <div className="flex items-center mb-4">
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="w-16 sm:w-20 p-2 border border-gray-300 rounded-md text-center font-roboto"
          />
          <button
            onClick={addToCart}
            className="ml-4 bg-teal-500 text-white px-4 sm:px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 transition font-roboto"
          >
            Thêm vào giỏ hàng
          </button>
        </div>

        <h4 className="text-lg font-roboto font-semibold mb-2">Chi Tiết Sản Phẩm</h4>
        <p className="text-gray-600 font-roboto">{product.description}</p>
      </div>
    </section>
  );
}

export default ProductDetails;
