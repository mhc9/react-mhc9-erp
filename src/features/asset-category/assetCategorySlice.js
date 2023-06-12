import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    categories: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getAssetCategories = createAsyncThunk("asset-category/getAssetCategories", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/asset-categories`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("asset-category/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/asset-categories`, data);

        dispatch(addCategory(res.data.categories))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("asset-category/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/asset-categories/${id}`, data);

        dispatch(updateCategory(res.data.categories))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("asset-category/destroy", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/asset-categories/${id}`, data);

        dispatch(deleteCategory(res.data.categories))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const assetCategorySlice = createSlice({
    name: 'assetCategory',
    initialState,
    reducers: {
        addCategory: (state, { payload }) => {
            const updated = [...state.categories, payload];

            state.categories = updated;
        },
        updateCategory: (state, { payload }) => {
            const updated = state.categories.map(dep => {
                if (dep.id === payload.id) return payload;

                return dep;
            });

            state.categories = updated;
        },
        deleteCategory: (state, { payload }) => {
            const updated = [...state.categories, payload];

            state.categories = updated;
        }
    },
    extraReducers: {
        [getAssetCategories.pending]: (state) => {
            state.loading = true;
        },
        [getAssetCategories.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.categories = data;
            state.pager = pager;
            state.loading = false;
        },
        [getAssetCategories.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.loading = true;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.loading = true;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.loading = true;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
});

export default assetCategorySlice.reducer;

export const {
    addCategory,
    updateCategory,
    deleteCategory
} = assetCategorySlice.actions;
