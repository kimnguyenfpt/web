import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem, setCart } from "./CartSlice";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(setCart(storedCart));
  }, [dispatch]);

  const handleUpdateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      alert("Số lượng phải lớn hơn 0.");
    } else {
      dispatch(updateQuantity({ index, quantity }));
    }
  };

  const handleRemoveConfirmation = (index) => {
    setItemToRemove(index);
    setShowModal(true);
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(itemToRemove));
    setShowModal(false);
  };

  const handleCancelRemove = () => {
    setItemToRemove(null);
    setShowModal(false);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotal = () => {
    const shipping = 100000;
    return getSubtotal() + shipping;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="px-4 md:px-20 mt-4 font-roboto">
      {/* Desktop and Tablet Cart Table */}
      <section id="cart" className="hidden lg:block overflow-x-auto mb-6">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="py-3 px-4 border-b text-center">Thao Tác</th>
              <th className="py-3 px-4 border-b text-center">Hình ảnh</th>
              <th className="py-3 px-4 border-b text-left">Sản phẩm</th>
              <th className="py-3 px-4 border-b text-right">Giá</th>
              <th className="py-3 px-4 border-b text-center">Số lượng</th>
              <th className="py-3 px-4 border-b text-right">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 last:border-none">
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleRemoveConfirmation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={24} />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <img
                      src={`/img/products/${item.img}`}
                      alt={item.name}
                      className="w-16 h-16 mx-auto object-cover rounded-md"
                    />
                  </td>
                  <td className="py-4 px-6 text-gray-700 text-left">{item.name}</td>
                  <td className="py-4 px-6 text-right text-gray-700">{formatCurrency(item.price)}</td>
                  <td className="py-4 px-6 text-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(index, parseInt(e.target.value, 10))}
                      className="w-16 text-center border rounded-md p-1"
                    />
                  </td>
                  <td className="py-4 px-6 text-right text-gray-700">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                  Giỏ hàng trống
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Tablet and Mobile View */}
      <section id="cart-mobile" className="block lg:hidden">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="mb-4 bg-white rounded-lg shadow-md p-4 flex items-start gap-4"
            >
              <img
                src={`/img/products/${item.img}`}
                alt={item.name}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-gray-700">{formatCurrency(item.price)}</p>
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(index, parseInt(e.target.value, 10))}
                    className="w-16 text-center border rounded-md p-1"
                  />
                  <p className="ml-auto font-bold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveConfirmation(index)}
                className="text-red-500 hover:text-red-700 self-start"
              >
                <Trash size={28} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Giỏ hàng trống</p>
        )}
      </section>

      {/* Subtotal Section */}
      {cartItems.length > 0 && (
        <section id="cart-add" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md ml-auto border border-gray-300">
            <h3 className="text-lg font-semibold text-red-500 mb-4">Tổng cộng</h3>
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-700">Tổng tiền hàng</td>
                  <td className="py-2 text-right font-bold">{formatCurrency(getSubtotal())}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-700">Phí vận chuyển</td>
                  <td className="py-2 text-right font-bold">{formatCurrency(100000)}</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 text-gray-900 font-bold">Tổng cộng</td>
                  <td className="py-2 text-right text-xl text-red-500 font-bold">{formatCurrency(getTotal())}</td>
                </tr>
              </tbody>
            </table>
            <button
              className="mt-4 w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition"
              onClick={handleCheckout}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </section>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <h4 className="text-lg font-bold mb-4">Xóa sản phẩm</h4>
            <p className="text-gray-600 mb-4">
              Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={handleRemoveItem}>
                Xóa
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400" onClick={handleCancelRemove}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
