import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import Api from "../../utils/api";

export const fetchProductCategories = createAsyncThunk("productCategories/fetch",
    async (config = null, thunkAPI) => {
        try {
            const response = await Api.get(`developer/category`, config);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const readProductCategory = createAsyncThunk("productCategory/read",
    async (id, thunkAPI) => {
        try {
            const response = await Api.get(`category/${id}`);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const createProductCategory = createAsyncThunk("productCategory/create",
    async (data, thunkAPI) => {
        try {
            const response = await Api.post(`developer/category`, data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const updateProductCategory = createAsyncThunk("productCategory/update",
    async ({id, data}, thunkAPI) => {
        try {
            const response = await Api.patch(`developer/category/update/${id}`, data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const deleteProductCategory = createAsyncThunk("productCategory/delete",
    async (id, thunkAPI) => {
        try {
            await Api.delete(`developer/category/${id}`);

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

const productCategoryEntity = createEntityAdapter({
    selectId: (productCategory) => productCategory.id
})

const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState: productCategoryEntity.getInitialState({
        links: [],
        errors: null
    }),
    extraReducers: {
        [readProductCategory.fulfilled]: (state, action) => {
            productCategoryEntity.setOne(state, action.payload)
        },

        [fetchProductCategories.fulfilled]: (state, action) => {
            productCategoryEntity.setAll(state, action.payload.data);
            state.links = action.payload.links;
        },

        [createProductCategory.fulfilled]: (state, action) => {
            productCategoryEntity.addOne(state, action.payload)
        },
        [createProductCategory.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [updateProductCategory.fulfilled]: (state, action) => {
            productCategoryEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
        },
        [updateProductCategory.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [deleteProductCategory.fulfilled]: (state, action) => {
            productCategoryEntity.removeOne(state, action.payload)
        },
        [deleteProductCategory.rejected]: (state, action) => {
            state.errors = action.payload;
        },
    }
});

export const productCategorySelectors = productCategoryEntity.getSelectors((state) => state.productCategory);

export default productCategorySlice.reducer;