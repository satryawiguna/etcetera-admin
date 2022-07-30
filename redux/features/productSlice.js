import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {useSelector} from "react-redux";
import {
    createProductCategory,
    deleteProductCategory, readProductCategories,
    readProductCategory,
    updateProductCategory
} from "./productCategorySlice";

export const initialState = {
    product: {},
    products: [],
    loading: null,
    success: null,
    message: null
};

export const readProduct = createAsyncThunk("product/readProduct", async ({id, req}) => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/developer/product/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    }).then(res => {
        if (!res.ok) {
            throw Error(res);
        }

        return res.json();
    }).catch(err => {
        console.log(err.message);
    });
});

export const createProduct = createAsyncThunk("product/createProduct", async (data) => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/developer/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        body: data
    }).then(res => {
        if (!res.ok) {
            throw Error(res);
        }

        return res.json();
    }).catch(err => {
        console.log(err.message);
    });
});

export const updateProduct = createAsyncThunk("product/updateProduct", async ({id, data}) => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/developer/product/update-detail-product/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        body: data
    }).then(res => {
        if (!res.ok) {
            throw Error(res);
        }

        return res.json();
    }).catch(err => {
        console.log(err.message);
    });
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/developer/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    }).then(res => {
        if (!res.ok) {
            throw Error(res);
        }

        return res.json();
    }).catch(err => {
        console.log(err.message);
    });
});

export const readProducts = createAsyncThunk("products/readProducts", async () => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/developer/product`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    }).then(res => {
        if (!res.ok) {
            throw Error(res);
        }

        return res.json();
    }).catch(err => {
        console.log(err.message);
    });
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: {
        [readProduct.pending]: (state) => {
            state.loading = true;
        },
        [readProduct.fulfilled]: (state, action) => {
            state.product = action.payload.product;
            state.loading = false;
            state.success = true;
        },
        [readProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [readProducts.pending]: (state) => {
            state.loading = true;
        },
        [readProducts.fulfilled]: (state, action) => {
            state.products = action.payload.products;
            state.loading = false;
            state.success = true;
        },
        [readProducts.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createProduct.pending]: (state) => {
            state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.product = action.payload.product;
            state.loading = false;
            state.success = true;
        },
        [createProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateProduct.pending]: (state) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.product = action.payload.product;
            state.loading = false;
            state.success = true;
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteProduct.pending]: (state) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.product = action.payload.product;
            state.loading = false;
            state.success = true;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        }
    }
});


export default productSlice.reducer;