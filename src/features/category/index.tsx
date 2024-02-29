import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialCategory } from "../../common/redux/type";
import { getCategories, deleteCate, addCategory, updateCate } from "../../services/category";
import { ICategory } from "../../common/category";


const initialState: initialCategory = {
    loading: "idle",
    categories: [],
    category: "",
    totalDocs: 0,
};

export const fetchAllCategories = createAsyncThunk(
    "category/fetchAllCategories",
    async ({ page, limit, keyword }: { page: number; limit: number; keyword: string }) => {
        try {
            const response = await getCategories(page, limit, keyword);
           return response;
        } catch (error) {
            throw new Error("Lỗi khi lấy dữ liệu");
        }
    }
);
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id: string, thunkApi) => {
        try {
            const response = await deleteCate(id);
            thunkApi.dispatch(fetchAllCategories({ page: 1, limit: 10, keyword: "" }));
            return response;
        } catch (error) {
            throw new Error("Lỗi khi xóa danh mục");
        }
    }
);
export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (newCategory: ICategory, thunkApi) => {
        try {
            const response = await addCategory(newCategory);
            thunkApi.dispatch(fetchAllCategories({ page: 1, limit: 10, keyword: "" }));
            return response;
        } catch (error) {
            throw new Error("Error create category");
        }
    }
);

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ id, newCategory }: { id: string; newCategory: ICategory }, thunkApi) => {
        try {
            const response = await updateCate(id, newCategory);
            thunkApi.dispatch(fetchAllCategories({ page: 1, limit: 10, keyword: "" }));
            return response;
        } catch (error) {
            throw new Error("Error updating category");
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
            state.categories = Array.isArray(action.payload.data) ? action.payload.data : [];
            state.totalDocs = action.payload.totalDocs;
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
        builder.addCase(createCategory.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(createCategory.rejected, (state) => {
            state.loading = "failed";
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = "fulfilled";
            state.categories = Array.isArray(action.payload) ? action.payload : [];
            state.totalDocs = state.categories.length;
        });
        builder.addCase(updateCategory.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(updateCategory.rejected, (state) => {
            state.loading = "failed";
        });
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = "fulfilled";
            state.categories = Array.isArray(action.payload) ? action.payload : [];
            state.totalDocs = state.categories.length;
        });
    },
});

export default categorySlice.reducer;