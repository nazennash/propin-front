import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity, price, image, name, description } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, quantity, price, image, name, description });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },

    addQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        item.quantity += quantity;
      }
    },

    minusQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        item.quantity = Math.max(item.quantity - quantity, 0);
      }
    },

    fetchCartItems(state, action) {
      // Assuming the cart items are already persisted, no need to do anything
      // Redux-Persist will automatically rehydrate the state when the app loads
    }
  }
});

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

export const { addToCart, removeItem, addQuantity, minusQuantity, fetchCartItems } = cartSlice.actions;
export default persistedReducer;
