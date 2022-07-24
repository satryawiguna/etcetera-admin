import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {useSelector} from "react-redux";

export const initialState = {
    products: [],
    product: {}
};

export const readProducts = createAsyncThunk("products/readProducts", async () => {
    const { access_token } = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/product`, {
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

export const readProduct = createAsyncThunk("product/readProduct", async ({ id, req }) => {
        const { access_token } = useSelector((state) => state.auth);

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/product/${id}`, {
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
    const { access_token } = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
        method: 'POST',
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

export const updateProduct = createAsyncThunk("product/updateProduct", async ({ id, data }) => {
    const { access_token } = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/product/update-detail-product/${id}`, {
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
    const { access_token } = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/product/${id}`, {
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

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: {
        [HYDRATE]: (state, { payload }) => {
            return {
                ...state,
                ...payload.products,
                ...payload.product,
            };
        },
        [readProducts.fulfilled]: (state, { payload }) => {
            state.products = payload.products;
        },
        [readProduct.fulfilled]: (state, { payload }) => {
            state.product = payload.product;
        },
    }
});

const productReducer = productSlice.reducer;

export default productReducer;