import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart')) || [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (quantity <= 0) {
        state.splice(index, 1);
      } else {
        state[index].quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { addItem, updateQuantity, removeItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;
