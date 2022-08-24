import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import Api from "../../utils/api";

export const fetchProducts = createAsyncThunk("products/fetch",
    async (config = null, thunkAPI) => {
        try {
            const response = await Api.get(`developer/product`, config);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const readProduct = createAsyncThunk("product/read",
    async (id, thunkAPI) => {
        try {
            const response = await Api.get(`product/${id}`);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const createProduct = createAsyncThunk("product/create",
    async (data, thunkAPI) => {
        try {
            const response = await Api.post(`developer/product`, data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const updateProduct = createAsyncThunk("product/update",
    async ({id, data}, thunkAPI) => {
        try {
            const response = await Api.patch(`developer/product/update/${id}`, data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const deleteProduct = createAsyncThunk("product/delete",
    async (id, thunkAPI) => {
        try {
            await Api.delete(`developer/product/${id}`);

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
})

const productSlice = createSlice({
    name: 'product',
    initialState: productEntity.getInitialState({
        links: [],
        errors: null
    }),
    reducers: {},
    extraReducers: {
        [readProduct.fulfilled]: (state, action) => {
            productEntity.setOne(state, action.payload)
        },

        [fetchProducts.fulfilled]: (state, action) => {
            productEntity.setAll(state, action.payload.data);
            state.links = action.payload.links;
        },

        [createProduct.fulfilled]: (state, action) => {
            productEntity.addOne(state, action.payload)
        },
        [createProduct.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [updateProduct.fulfilled]: (state, action) => {
            productEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
        },
        [updateProduct.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [deleteProduct.fulfilled]: (state, action) => {
            productEntity.removeOne(state, action.payload)
        },
        [deleteProduct.rejected]: (state, action) => {
            state.errors = action.payload;
        },
    }
});

export const productSelectors = productEntity.getSelectors((state) => state.product);

export default productSlice.reducer;