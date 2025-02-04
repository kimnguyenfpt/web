import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNewProducts } from "../../Service/ProductService";
import { useDispatch } from "react-redux";
import { addItem } from "../Cart/CartSlice";
import BrandBox from "../Brand/BrandBox";

function NewProducts() {
  const [newProducts, setNewProducts] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

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

  return (
    <section className="py-10 px-5 md:px-20 font-roboto">
      <BrandBox />
      <h2 className="text-3xl font-bold mb-6 text-center">Sản Phẩm Mới</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {error && <p className="text-red-500">Lỗi: {error}</p>}
        {newProducts.length > 0 ? (
          newProducts.map((product, index) => (
            <div
              key={index}
              className="p-4 border border-green-200 rounded-4xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] relative overflow-hidden h-[500px]"
            >
              {/* Ảnh sản phẩm */}
              <div className="relative h-80">
                <img
                  src={`/img/products/${product.img}`}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Chi tiết sản phẩm */}
              <div className="text-center mt-4">
                <Link to={`/product/${product.id}`}>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 hover:cursor-pointer">
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
          ))
        ) : (
          <p className="text-center col-span-4">Đang tải sản phẩm...</p>
        )}
      </div>

      {/* Modal thêm vào giỏ hàng */}
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

export default NewProducts;
