import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Newsletter from './Components/Newsletter/Newsletter';
import Footer from './Components/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDeatils';
import Cart from './Components/Cart/Cart';
import Shop from './Components/Shop/Shop';
import AboutUs from './Components/about';
import CheckoutPage from './Components/checkout/checkout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/Shop" element={<Shop />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      </Routes>
      <Newsletter/>
      <Footer/>
    </Router>
  );
}

export default App;
