import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk("items/fetchItems", () => {
    // return a Promise containing the data we want
    return fetch("/items")
      .then((response) => response.json())
      .then((data) => data.items);
});

const itemsSlice = createSlice({
    name: "items",
    initialState: {
      items: [], // array of items
      current_user: [],
      status: "idle", // loading state
    },
    reducers: {
      itemAdded(state, action) {
        // using createSlice lets us mutate state!
        state.items.push(action.payload);
      },
      itemUpdated(state, action) {
        const item = state.items.find((item) => item.id === action.payload.id);
        item = action.payload;
      },
      userAdded(state, action) {
          state.current_user.push(action.payload);
      }
    },
    extraReducers: {
      // handle async actions: pending, fulfilled, rejected (for errors)
      [fetchItems.pending](state) {
        state.status = "loading";
      },
      [fetchItems.fulfilled](state, action) {
        state.entities = action.payload;
        state.status = "idle";
      },
    },
  });
  
  export const { itemAdded, itemUpdated,userAdded } = itemsSlice.actions;
  
  export default itemsSlice.reducer;
  
