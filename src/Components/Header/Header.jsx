import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import searchService from "../../Service/SearchService";
import { logout } from "../Login/AuthLoginSilce";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for responsive menu
  const auth = useSelector((state) => state.authLogin);
  const uniqueProductCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const results = await searchService.search(searchTerm);
      setSearchResults(results);
      console.log(results);
    } catch (error) {
      console.log("Tìm kiếm thất bại:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.alert("Đăng xuất thành công");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          MiXiShop
        </Link>

        {/* Hamburger Icon for tablet/mobile */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fa fa-bars text-2xl"></i>
        </button>

        {/* Search Bar */}
        <form
          id="search-form"
          className="hidden lg:flex items-center border border-gray-300 rounded-md overflow-hidden"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-48 md:w-64 focus:outline-none"
          />
          <button type="submit" className="text-gray-900 px-4 py-2">
            <i className="fa fa-search"></i>
          </button>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-4 md:space-x-6">
            <NavLinks
              auth={auth}
              location={location}
              handleLogout={handleLogout}
              uniqueProductCount={uniqueProductCount}
            />
          </ul>
        </nav>
      </div>

      {/* Mobile/Tablet Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white shadow-md rounded-md p-4">
          <ul className="space-y-4">
            <NavLinks
              auth={auth}
              location={location}
              handleLogout={handleLogout}
              uniqueProductCount={uniqueProductCount}
              isMobile
            />
          </ul>
        </nav>
      )}
    </header>
  );
}

function NavLinks({
  auth,
  location,
  handleLogout,
  uniqueProductCount,
  isMobile,
}) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  return (
    <>
      <li>
        <Link
          to="/"
          className={`${
            location.pathname === "/"
              ? "text-teal-500 font-bold"
              : "text-gray-800 hover:text-teal-500"
          } font-medium`}
        >
          Trang Chủ
        </Link>
      </li>
      <li>
        <Link
          to="/shop"
          className={`${
            location.pathname === "/shop"
              ? "text-teal-500 font-bold"
              : "text-gray-800 hover:text-teal-500"
          } font-medium`}
        >
          Cửa Hàng
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className={`${
            location.pathname === "/about"
              ? "text-teal-500 font-bold"
              : "text-gray-800 hover:text-teal-500"
          } font-medium`}
        >
          Về Chúng Tôi
        </Link>
      </li>
      {auth.user ? (
        <li className={`relative ${isMobile ? "" : "group"}`}>
  <button
    className="text-gray-800 hover:text-teal-500 font-medium flex items-center"
    onClick={() => isMobile && setIsAccountMenuOpen(!isAccountMenuOpen)}
  >
    Xin chào, {auth.user.user.username}
    <i className="fa fa-caret-down ml-1"></i>
  </button>
  <div
    className={`${
      isMobile
        ? isAccountMenuOpen
          ? "block"
          : "hidden"
        : "absolute hidden group-hover:block"
    } bg-white shadow-md rounded-md mt-2 z-50`}
    style={{ minWidth: "150px" }}
  >
    <Link
      to="/profile"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    >
      Hồ sơ
    </Link>
    <button
      onClick={handleLogout}
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
    >
      Đăng xuất
    </button>
  </div>
</li>

      ) : (
        <li className={`relative group ${isMobile ? "" : "group"}`}>
          <button
            className="text-gray-800 hover:text-teal-500 font-medium flex items-center"
            onClick={() => isMobile && setIsAccountMenuOpen(!isAccountMenuOpen)}
          >
            Tài Khoản <i className="fa fa-caret-down ml-1"></i>
          </button>
          <div
            className={`${
              isMobile
                ? isAccountMenuOpen
                  ? "block"
                  : "hidden"
                : "absolute hidden group-hover:block"
            } z-50 opacity-100 flex flex-col w-30 border-gray-200 rounded-md shadow-lg bg-white mt-1`}
          >
            <Link
              to="/login"
              className="block px-4 py-2 text-gray-700 hover:text-teal-500 hover:bg-gray-100"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 text-gray-700 hover:text-teal-500 hover:bg-gray-100"
            >
              Đăng Ký
            </Link>
          </div>
        </li>
      )}
      <li>
        <Link to="/cart" className="relative text-gray-800 hover:text-teal-500">
          <i className="fa fa-bag-shopping"></i>
          {uniqueProductCount > 0 && (
            <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {uniqueProductCount}
            </span>
          )}
        </Link>
      </li>
    </>
  );
}

export default Header;
