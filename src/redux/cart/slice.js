// redux/cart/slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);

      if (existing) {
        existing.quantity += product.quantity || 1;
        existing.totalPrice = existing.price * existing.quantity;
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
          totalPrice: product.price * (product.quantity || 1),
        });
      }
    },
    removeFromCart: (state, action) => {
     state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;