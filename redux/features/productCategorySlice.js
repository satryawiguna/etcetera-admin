import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../utils/api";


const initialState = {
    data: {},
    loading: null,
    success: null,
    error: null,
    message: null
};


export const fetchProductCategories = createAsyncThunk("productCategories/fetchProductCategories",
    async (_,{rejectWithValue}) => {
        try {
            const response = await Api.get(`developer/category`);

            if (response.status !== 200)
                throw Error();

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

export const readProductCategory = createAsyncThunk("productCategory/readProductCategory",
    async (id, {rejectWithValue}) => {
        try {
            const response = await Api.get(`category/${id}`);

            if (response.status !== 200)
                throw Error();

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

export const createProductCategory = createAsyncThunk("productCategory/createProductCategory",
    async (data, {rejectWithValue}) => {
        try {
            const response = await Api.post(`developer/category`, data);

            if (response.status !== 200)
                throw Error();

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

export const updateProductCategory = createAsyncThunk("productCategory/updateProductCategory",
    async ({id, data}, {rejectWithValue}) => {
        try {
            const response = await Api.put(`developer/category/update/${id}`, data);

            if (response.status !== 200)
                throw Error();

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

export const deleteProductCategory = createAsyncThunk("productCategory/deleteProductCategory",
    async (id, {rejectWithValue}) => {
        try {
            const response = await Api.delete(`developer/category/${id}`);

            if (response.status !== 200)
                throw Error();

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });


const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState,
    reducers: {},
    extraReducers: {
        [readProductCategory.pending]: (state) => {
            state.loading = true;
        },
        [readProductCategory.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.success = true;
        },
        [readProductCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.error.message;
        },

        [fetchProductCategories.pending]: (state) => {
            state.loading = true;
        },
        [fetchProductCategories.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.success = true;
        },
        [fetchProductCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.error.message;
        },

        [createProductCategory.pending]: (state) => {
            state.loading = true;
        },
        [createProductCategory.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.success = true;
        },
        [createProductCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.error.message;
        },

        [updateProductCategory.pending]: (state) => {
            state.loading = true;
        },
        [updateProductCategory.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.success = true;
        },
        [updateProductCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.error.message;
        },

        [deleteProductCategory.pending]: (state) => {
            state.loading = true;
        },
        [deleteProductCategory.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.success = true;
        },
        [deleteProductCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.error.message;
        }
    }
});

export default productCategorySlice.reducer;