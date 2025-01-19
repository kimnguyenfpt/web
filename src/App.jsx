import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Shop from './Components/Shop/Shop';

import Footer from './Components/Footer/Footer';
import Newsletter from './Components/Newsletter/Newsletter';
import ProductDetails from './Components/ProductDetails/ProductDeatils';
import Products from './Components/Products/Products';

import '../src/assets/css/style.css';
import '../src/assets/css/all.min.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';

import Cart from './Components/Cart/Cart';
import Profile from './Components/Profile/Profile';
import AboutUs from './Components/about';
import CheckoutPage from './Components/checkout/checkout';




function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        
        <Route path="/cart" element={<Cart />} />


        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Newsletter/>
      <Footer />
    </Router>
  );
}

export default App;
