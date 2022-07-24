import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {useSelector} from "react-redux";

export const initialState = {
    productCategories: [],
    productCategory: {}
};

export const readProductCategories = createAsyncThunk("productCategories/readProductCategories", async () => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category`, {
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

export const readProductCategory = createAsyncThunk("productCategory/readProductCategory", async ({id, req}) => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category/${id}`, {
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

export const createProductCategory = createAsyncThunk("productCategory/createProductCategory", async (data) => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category`, {
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

export const updateProductCategory = createAsyncThunk("productCategory/updateProductCategory", async ({id, data}) => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category/update/${id}`, {
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

export const deleteProductCategory = createAsyncThunk("productCategory/deleteProductCategory", async (id) => {
    const {access_token} = useSelector((state) => state.auth);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category/${id}`, {
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

const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState,
    reducers: {},
    extraReducers: {
        [HYDRATE]: (state, {payload}) => {
            return {
                ...state,
                ...payload.productCategories,
                ...payload.productCategory,
            };
        },
        [readProductCategories.fulfilled]: (state, {payload}) => {
            state.productCategories = payload.productCategories;
        },
        [readProductCategory.fulfilled]: (state, {payload}) => {
            state.productCategory = payload.productCategory;
        },
    }
});

const productCategoryReducer = productCategorySlice.reducer;

export default productCategoryReducer;