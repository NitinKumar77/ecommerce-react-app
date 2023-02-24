import { createSlice, current } from "@reduxjs/toolkit";

const initialCartState = {
  data: [],
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  query: "",
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      state.totalQuantity++;
      console.log(current(state));
      console.log(action.payload.item.id);
      const existingItem = state.items.find(
        ({ item }) => item.id === action.payload.item.id
      );
      console.log(existingItem);

      if (!existingItem) {
        const updatedItem = {
          ...action.payload,
          item: { ...action.payload.item, amount: 1 },
        };

        state.items.push(updatedItem);
        state.totalAmount = state.totalAmount + action.payload.item.price;
      } else {
        existingItem.item.amount++;
        state.totalAmount = state.totalAmount + existingItem.item.price;
      }
      console.log(existingItem);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(({ item }) => item.id === id);

      state.totalQuantity--;
      if (existingItem.item.amount === 1) {
        state.items = state.items.filter(({ item }) => item.id !== id);
      } else {
        existingItem.item.amount--;
      }
      state.totalAmount = state.totalAmount - existingItem.item.price;
    },

    searchQuery(state, action) {
      state.query = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
