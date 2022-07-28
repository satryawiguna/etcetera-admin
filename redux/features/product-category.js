import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import fetcher from "../../utils/fetcher";

export const initialState = {
    productCategory: {},
    productCategories: [],
    loading: null,
    success: null,
    message: ""
};

export const readProductCategory = createAsyncThunk("productCategory/readProductCategory", async (id) => {
    await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category/${id}`, {
        method: 'GET',
    }).then(res => {
        if (!res.ok) {
            throw Error(res);
        }

        return res.json();
    }).catch(err => {
        console.log(err.message);
    });
});

export const readProductCategories = createAsyncThunk("productCategories/readProductCategories",
    async (_, { rejectWithValue }) => {
        try {
            await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category`, {
                method: 'GET'
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }

                throw res;
            }).then(
                data => {
                    console.log(data);
            }).catch(err => {
                rejectWithValue([], err)
            });
        } catch (err) {
            console.log(err.message);
            return rejectWithValue([], err);
        }
    });

export const createProductCategory = createAsyncThunk("productCategory/createProductCategory", async (data) => {
    await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category`, {
        method: 'POST',
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
    await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category/update/${id}`, {
        method: 'POST',
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
    await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/developer/category/${id}`, {
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
        [readProductCategory.pending]: (state) => {
            state.loading = true;
        },
        [readProductCategory.fulfilled]: (state, {payload}) => {
            state.productCategory = payload.productCategory;
            state.loading = false;
            state.success = true;
        },
        [readProductCategory.rejected]: (state, {payload}) => {
            state.loading = false;
            state.message = payload;
        },
        [readProductCategories.pending]: (state) => {
            state.loading = true;
        },
        [readProductCategories.fulfilled]: (state, {payload}) => {
            state.productCategories = payload.productCategories;
            state.loading = false;
            state.success = true;
        },
        [readProductCategories.rejected]: (state, {payload}) => {
            state.loading = false;
            state.message = payload;
        },
        [createProductCategory.pending]: (state) => {
            state.loading = true;
        },
        [createProductCategory.fulfilled]: (state, {payload}) => {
            state.productCategory = payload.productCategory;
            state.loading = false;
            state.success = true;
        },
        [createProductCategory.rejected]: (state, {payload}) => {
            state.loading = false;
            state.message = payload;
        },
        [updateProductCategory.pending]: (state) => {
            state.loading = true;
        },
        [updateProductCategory.fulfilled]: (state, {payload}) => {
            state.productCategory = payload.productCategory;
            state.loading = false;
            state.success = true;
        },
        [updateProductCategory.rejected]: (state, {payload}) => {
            state.loading = false;
            state.message = payload;
        },
        [deleteProductCategory.pending]: (state) => {
            state.loading = true;
        },
        [deleteProductCategory.fulfilled]: (state, {payload}) => {
            state.productCategory = payload.productCategory;
            state.loading = false;
            state.success = true;
        },
        [deleteProductCategory.rejected]: (state, {payload}) => {
            state.loading = false;
            state.message = payload;
        }
    }
});

export default productCategorySlice.reducer;