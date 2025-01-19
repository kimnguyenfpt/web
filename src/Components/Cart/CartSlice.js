import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [], // List of unique products
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the product already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new product to cart
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;

      if (quantity <= 0) {
        state.items.splice(index, 1); // Remove item if quantity is 0
      } else {
        state.items[index].quantity = quantity; // Update quantity
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items.splice(action.payload, 1); // Remove item by index
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { setCart, addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
