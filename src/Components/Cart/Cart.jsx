import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem, setCart } from './CartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [buyerInfo, setBuyerInfo] = useState({
    username: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(setCart(storedCart));
  }, [dispatch]);

  const handleUpdateQuantity = (index, quantity) => {
    dispatch(updateQuantity({ index, quantity }));
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotal = () => {
    const shipping = 100000;
    return getSubtotal() + shipping;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBuyerInfo((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
      return;
    }

    const invalidItems = cartItems.filter(item => item.quantity <= 0);

    if (invalidItems.length > 0) {
      alert('Vui lòng kiểm tra lại giỏ hàng.');
      return;
    }

    if (!buyerInfo.username.trim() || !buyerInfo.address.trim() || !buyerInfo.phone.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin người mua.');
      return;
    }

    const orderDetails = {
      buyerInfo,
      cartItems,
      subtotal: getSubtotal(),
      total: getTotal()
    };

    try {
      const response = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Đã đặt hàng thành công');
        dispatch(setCart([]));
        localStorage.setItem('cart', JSON.stringify([]));
      } else {
        alert(`Không thể đặt hàng: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Vui lòng thử lại xem');
    }
  };

  return (
    <div>
      <section id="cart" className="section-p1">
        <table width="100%">
          <thead>
            <tr>
              <td>Thao Tác</td>
              <td>Hình ảnh</td>
              <td>Sản phẩm</td>
              <td>Giá</td>
              <td>Số lượng</td>
              <td>Tổng</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td><button onClick={() => handleRemoveItem(index)}>Xóa</button></td>
                  <td><img src={`/img/products/${item.img}`} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td className="price">{formatCurrency(item.price)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(index, parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td className="price">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Giỏ hàng trống</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {cartItems.length > 0 && (
        <section id="cart-add" className="section-p1">
          <div id="buyer-info">
            <h3>Thông tin người mua</h3>
            <div>
              <input type="text" id="username" placeholder="Họ tên" value={buyerInfo.username} onChange={handleChange} />
            </div>
            <div>
              <input type="text" id="address" placeholder="Địa chỉ" value={buyerInfo.address} onChange={handleChange} />
            </div>
            <div>
              <input type="tel" id="phone" placeholder="Số điện thoại" value={buyerInfo.phone} onChange={handleChange} />
            </div>
          </div>
          <div id="subtotal">
            <h3></h3>
            <table>
              <tbody>
                <tr>
                  <td>Tổng tiền hàng</td>
                  <td className="price">{formatCurrency(getSubtotal())}</td>
                </tr>
                <tr>
                  <td>Phí vận chuyển</td>
                  <td className="price">{formatCurrency(100000)}</td>
                </tr>
                <tr>
                  <td><strong>Tổng cộng</strong></td>
                  <td className="price">{formatCurrency(getTotal())}</td>
                </tr>
              </tbody>
            </table>
            <button className="normal" onClick={handleCheckout} disabled={cartItems.length === 0}>Tiến hành thanh toán</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
