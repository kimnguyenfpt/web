import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Components/Cart/CartSlice';
import authLoginReducer from '../Components/Login/AuthLoginSilce'; 
import authRegisterReducer from '../Components/Register/AuthRegisterSlice'; 

const store = configureStore({
  reducer: {
    cart: cartReducer,
    authLogin: authLoginReducer, 
    authRegister: authRegisterReducer, 
  },
});

export default store;
