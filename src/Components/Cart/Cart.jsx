import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem, setCart } from './CartSlice';
import {useNavigate} from 'react-router-dom'
import '../../assets/css/cart.css'; // CSS cho giỏ hàng

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [buyerInfo, setBuyerInfo] = useState({
    username: '',
    address: '',
    phone: '',
  });

  // State cho modal
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(setCart(storedCart));
  }, [dispatch]);

  const handleUpdateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      alert('Số lượng phải lớn hơn 0.');
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
      [id]: value,
    }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
      return;
    }

    // Chuyển hướng sang trang thanh toán
    navigate('/checkout');
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
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleRemoveConfirmation(index)}
                    >
                      Xóa
                    </button>
                  </td>
                  <td>
                    <img src={`/img/products/${item.img}`} alt={item.name} />
                  </td>
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
          <div id="subtotal">
            <h3>Tổng cộng</h3>
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
            <button
              className="btn-checkout"
              onClick={handleCheckout}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </section>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Xóa sản phẩm</h4>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
            <button
              className="btn-confirm"
              onClick={handleRemoveItem}
            >
              Xóa
            </button>
            <button
              className="btn-cancel"
              onClick={handleCancelRemove}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
