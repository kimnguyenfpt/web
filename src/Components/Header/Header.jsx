import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import searchService from '../../Service/SearchService';
import { logout } from '../Login/AuthLoginSilce';
import "../../assets/css/cart.css"

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const auth = useSelector((state) => state.authLogin);
  const uniqueProductCount = useSelector((state) => state.cart.items.length); // Unique product count
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const results = await searchService.search(searchTerm);
      setSearchResults(results);
      console.log(results);
    } catch (error) {
      console.log('Tìm kiếm thất bại:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.alert('Đăng xuất thành công');
    navigate('/');
  };

  return (
    <header>
      <Link to="/" className="logo">MiXiShop</Link>
      <form id="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit"><i className="fa fa-search"></i></button>
      </form>
      <nav>
        <ul id="navbar">
          <li><Link to="/" className="active">Trang Chủ</Link></li>
          <li><Link to="/shop">Cửa Hàng</Link></li>
          <li><Link to="/about">Về Chúng Tôi</Link></li>
          {auth.user ? (
            <li className="dropdown">
              <a href="#" className="dropbtn">Xin chào, {auth.user.user.username} <i className="fa fa-caret-down"></i></a>
              <div className="dropdown-content">
                <Link to="/profile">Hồ sơ</Link>
                <a href="" onClick={handleLogout}>Đăng xuất</a>
              </div>
            </li>
          ) : (
            <li className="dropdown">
              <a href="#" className="dropbtn">Tài Khoản <i className="fa fa-caret-down"></i></a>
              <div className="dropdown-content">
                <Link to="/login">Đăng Nhập</Link>
                <Link to="/register">Đăng Ký</Link>
              </div>
            </li>
          )}
          <li id="lg-bag">
            <Link to="/cart">
              <i className="fa fa-bag-shopping"></i>
              {uniqueProductCount > 0 && (
                <span className="cart-count">{uniqueProductCount}</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
