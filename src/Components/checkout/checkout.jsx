import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../../Components/Cart/CartSlice';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const shippingFee = 100000;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [buyerInfo, setBuyerInfo] = useState({
    username: '',
    address: '',
    phone: '',
  });

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingFee;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBuyerInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheckout = () => {
    const { username, address, phone } = buyerInfo;

    if (!username.trim() || !address.trim() || !phone.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin trước khi thanh toán.');
      return;
    }

    alert(`Thanh toán thành công, ${username}!`);

    dispatch(setCart([]));
    localStorage.setItem('cart', JSON.stringify([]));

    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Thông tin thanh toán</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Thông tin người mua */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Thông tin người mua</h3>
          <form>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Họ tên:
            </label>
            <input
              type="text"
              id="username"
              value={buyerInfo.username}
              onChange={handleInputChange}
              placeholder="Nhập họ tên"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />

            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Địa chỉ:
            </label>
            <input
              type="text"
              id="address"
              value={buyerInfo.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />

            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Số điện thoại:
            </label>
            <input
              type="text"
              id="phone"
              value={buyerInfo.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
          </form>
        </div>

        {/* Thông tin giỏ hàng */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Thông tin giỏ hàng</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-3">Sản phẩm</th>
                <th className="border border-gray-300 p-3">Số lượng</th>
                <th className="border border-gray-300 p-3">Giá</th>
                <th className="border border-gray-300 p-3">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-3">{item.name}</td>
                  <td className="border border-gray-300 p-3 text-center">{item.quantity}</td>
                  <td className="border border-gray-300 p-3">
                    {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-right">
            <p className="mb-2 text-lg">
              <strong>Tổng tiền hàng: </strong>
              {cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
            <p className="mb-2 text-lg">
              <strong>Phí vận chuyển: </strong>
              {shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
            <p className="text-xl font-bold text-red-600">
              <strong>Tổng cộng: </strong>
              {calculateTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              className="px-6 py-3 bg-gray-400 text-black rounded-lg hover:bg-teal-500 transition"
              onClick={() => navigate(-1)}
            >
              Hủy bỏ
            </button>
            <button
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition"
              onClick={handleCheckout}
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
