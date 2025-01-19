import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../../Components/Cart/CartSlice'; // Import action setCart để cập nhật giỏ hàng
import './checkout.css';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const shippingFee = 100000;
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Sử dụng dispatch để cập nhật Redux

  // State để quản lý thông tin người dùng
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

    // Hiển thị thông báo thành công
    alert(`Thanh toán thành công, ${username}!`);

    // Xóa giỏ hàng
    dispatch(setCart([]));
    localStorage.setItem('cart', JSON.stringify([])); // Cập nhật localStorage

    // Điều hướng về trang chủ hoặc trang khác sau khi thanh toán
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '40px', textAlign: 'center' }}>Thông tin thanh toán</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* Thông tin người mua */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h3>Thông tin người mua</h3>
          <form>
            <label htmlFor="username">Họ tên:</label>
            <input
              type="text"
              id="username"
              value={buyerInfo.username}
              onChange={handleInputChange}
              placeholder="Nhập họ tên"
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            />
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              value={buyerInfo.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            />
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="text"
              id="phone"
              value={buyerInfo.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            />
          </form>
        </div>

        {/* Thông tin chi phí */}
        <div style={{ flex: 1 }}>
          <h3>Thông tin giỏ hàng</h3>
          <table width="100%" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <p>
              <strong>Tổng tiền hàng:</strong>{' '}
              {cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
            <p>
              <strong>Phí vận chuyển:</strong>{' '}
              {shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
            <p>
              <strong>Tổng cộng:</strong>{' '}
              {calculateTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
          </div>

          {/* Nút hành động */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#ccc',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
              onClick={() => navigate(-1)} // Quay về trang trước
            >
              Hủy bỏ
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#00a1e0',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
              onClick={handleCheckout} // Xử lý thanh toán
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
