import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import searchService from '../../Service/SearchService';
import { logout } from '../Login/AuthLoginSilce';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const auth = useSelector((state) => state.authLogin);
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

  const handleResultClick = () => {
    setSearchResults([]);
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
      <div className="search-results">
        {searchResults.map((result, index) => (
          <Link 
            to={`/product/${result.id}`} 
            key={index} 
            className="search-result-item" 
            onClick={handleResultClick}
          >
            <img src={`/img/products/${result.img}`} className="search-result-image" alt={result.name} />
            <div className="search-result-text">
              <h4>{result.name}</h4>
            </div>
          </Link>
        ))}
      </div>

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
          <li id="lg-bag"><Link to="/cart"><i className="fa fa-bag-shopping" id="countItem"></i></Link></li>
          <a href="#" id="close"><i className="fa-solid fa-xmark"></i></a>
        </ul>
      </nav>
      <div id="mobile">
        <Link to="/cart"><i className="fa fa-bag-shopping" id="countItem">1</i></Link>
        <i id="bar" className="fas fa-outdent"></i>
      </div>
    </header>
  );
}

export default Header;
