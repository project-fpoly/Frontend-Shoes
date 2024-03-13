// redux/slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../common/products";
import { CartItem } from "../../common/order";
import axios from "axios";
import { notification } from "antd";
import { fetchAllProducts } from "../product";
import { RootState } from "../../redux/store";
import { fetchAllUsers } from "../user";

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
        notification.success({ message: response.data.message });
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
export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const response = await axios.get("http://localhost:9000/api/order/carts", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async ({
    cartItems,
    shippingAddress,
    totalPrice,
  }: {
    cartItems: Array<{
      product: string;
      images: Array<string>;
      color: string;
      price: number;
      size: string;
    }>;
    shippingAddress: {
      fullname: string;
      phone: string;
      address: string;
      email: string;
    };
    totalPrice: number;
  }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.post(
          "http://localhost:9000/api/order/bills/",
          { shippingAddress, cartItems },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        console.log(shippingAddress);
        notification.success({ message: response.data.message });
        return response.data.cart;
      } else {
        const cookie = document.cookie; // Lấy giá trị của cookie từ trình duyệt
        console.log(cookie);
        const response = await axios.post(
          "http://localhost:9000/api/order/bills/",
          { cartItems, shippingAddress, totalPrice },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Cookie: cookie,
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        notification.success({ message: response.data.message });
        return response.data.cart;
      }
    } catch (error: any) {
      notification.error({ message: error.message });

      throw new Error(error.response.data.message);
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (product: string, { dispatch }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.delete(
          `http://localhost:9000/api/order/carts/${product}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        notification.success({ message: response.data.message });
        dispatch(getCartItems());
        return response.data;
      } else {
        const response = await axios.delete(
          `http://localhost:9000/api/order/carts/${product}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        notification.success({ message: response.data.message });
        return response.data;
      }
    } catch (error: any) {
      notification.error({ message: error.message });

      throw new Error(error.response.data.message);
    }
  }
);
export const updateProductCart = createAsyncThunk(
  "cart/updateProductCart",
  async ({
    productId,
    size,
    quantity,
  }: {
    productId: string;
    size: string;
    quantity: number;
  }) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/order/carts/${productId}`,
        { size, quantity },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      notification.success({ message: response.data.message });
      return response.data;
    } catch (error: any) {
      notification.error({ message: error.message });

      throw new Error(error.response.data.message);
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
        state.totalPrice = action.payload.cart?.totalPrice;
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

    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const productId = action.meta.arg;

        state.cartItems = state.cartItems.filter(
          (item: any) => item.product !== productId
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateProductCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductCart.fulfilled, (state, action) => {
        state.loading = false;
        const productId = action.meta.arg;

        // Cập nhật lại giỏ hàng sau khi cập nhật thành công
        state.cartItems = state.cartItems.filter(
          (item: any) => item.product === productId
        );
      })
      .addCase(updateProductCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
