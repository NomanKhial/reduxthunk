import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("https://dummyjson.com/products");
  return await response.json();
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    items: [],
    error: null,
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload.products;
      state.loading = false;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice;
