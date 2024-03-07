import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Medicine } from "../types/Medicine";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  picture: string;
  quantity: number;
}

interface CartState {
  medicines: CartItem[];
}

const initialState: CartState = {
  medicines: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Medicine>) {
      const existingItem = state.medicines.find(
        (medicine) => medicine._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.medicines.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.medicines = state.medicines.filter(
        (medicine) => medicine._id !== action.payload
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.medicines.find(
        (medicine) => medicine._id === id
      );

      if (itemToUpdate) {
        itemToUpdate.quantity += quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
