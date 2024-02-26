import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialCategory } from "../../common/redux/type";
import { getCategories, deleteCate } from "../../services/category";


const initialState: initialCategory = {
    loading: "idle",
    categories: [],
    category: "",
    totalDocs: 0,
};

export const fetchAllCategories = createAsyncThunk(
    "category/fetchAllCategories",
    async () => {
        try {
            const response = await getCategories();
            return response.data; // Đảm bảo chỉ trả về dữ liệu danh mục từ API
        } catch (error) {
            throw new Error("Lỗi khi lấy dữ liệu"); // Ném ra lỗi để được xử lý trong rejected case
        }
    }
);
export const deleteCategory= createAsyncThunk(
    "category/deleteCategory",
    async (id: string, thunkApi) => {
        try {
            const response = await deleteCate(id);
            thunkApi.dispatch(fetchAllCategories());
            return response;
        } catch (error) {
            throw new Error("Lỗi khi xóa danh mục");
        }
    }
);

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchAllCategories.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllCategories.rejected, (state) => {
            state.loading = "failed";
        });
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.loading = "fulfilled";
            state.categories = Array.isArray(action.payload) ? action.payload : [];
            state.totalDocs = state.categories.length;
        });
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(deleteCategory.rejected, (state) => {
            state.loading = "failed";
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = "fulfilled";
            state.categories = Array.isArray(action.payload) ? action.payload : [];
            state.totalDocs = state.categories.length;
        });
    },
});

export default categorySlice.reducer;