// redux/slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../common/products";
import { CartItem } from "../../common/order";
import axios from "axios";
import { notification } from "antd";
import { fetchAllProducts } from "../product";
import { RootState } from "../../redux/store";

const initialState: any = {
  cartItems: [] as CartItem[],
  loading: false,
  error: null as string | null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // Simulate fetching products from an API
    const response = await fetch("https://api.example.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products;
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem: CartItem, { getState }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      let response;

      if (accessToken) {
        // Người dùng đã đăng nhập
        response = await axios.post(
          "http://localhost:9000/api/order/carts",
          {
            size: cartItem.size,
            product: cartItem.product,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        return response.data.cart;
      } else {
        response = await axios.post(
          "http://localhost:9000/api/order/carts",
          {
            size: cartItem.size,
            product: cartItem.product,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        return sessionStorage.setItem(
          "cart",
          JSON.stringify(response.data.cart)
        );
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (props, { dispatch }) => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/order/carts",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      dispatch(fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: "" }));

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      });
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state: any, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
        state.totalPrice = action.payload.cart.totalPrice;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng";
      });
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state: any, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
