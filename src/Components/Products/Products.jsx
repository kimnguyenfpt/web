import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../Service/ProductService";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../Cart/CartSlice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Lỗi rồi:", error);
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
      }, 100);
    }
  }, [modalVisible]);

  const addToCart = (product) => {
    dispatch(addItem(product));
    setModalProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <section className="py-10 px-5 md:px-20 font-roboto">
      <h2 className="text-3xl font-bold mb-6 text-center">Tất Cả Sản Phẩm</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, visibleCount).map((product, index) => (
          <div
            key={index}
            className="w-full mx-auto p-4 border border-teal-100 rounded-4xl hover:shadow-lg transition-transform hover:scale-[1.02] relative overflow-hidden h-auto"
          >
            {/* Product Image */}
            <div className="relative h-80">
              <img
                src={`/img/products/${product.img}`}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="text-center mt-4">
              <Link to={`/product/${product.id}`}>
                <h4 className="text-lg font-semibold text-gray-800 mb-2 hover:cursor-pointer hover:text-teal-600">
                  {product.name}
                </h4>
              </Link>
              <div className="text-yellow-400 mb-2">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
              <h4 className="text-xl font-bold text-teal-600 mb-4">
                {formatCurrency(product.price)}
              </h4>
              <button
                onClick={() => addToCart(product)}
                className="absolute bottom-4 right-4 bg-teal-100 border border-gray-300 text-teal-600 rounded-full p-3 hover:bg-teal-600 hover:text-white shadow-sm hover:shadow-md transition flex items-center justify-center"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < products.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-white border border-teal-500 text-teal-500 px-6 py-3 rounded-lg hover:bg-teal-600 hover:text-white transition"
          >
            Xem thêm
          </button>
        </div>
      )}

      {/* Modal with Progress Bar */}
      {modalVisible && modalProduct && (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-11/12 max-w-md">
            <h4 className="text-lg font-bold mb-4 text-center">
              Sản phẩm đã được thêm vào giỏ hàng!
            </h4>
            <p className="mb-4 text-center">{modalProduct.name}</p>
            <img
              src={`/img/products/${modalProduct.img}`}
              alt={modalProduct.name}
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-teal-500 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
