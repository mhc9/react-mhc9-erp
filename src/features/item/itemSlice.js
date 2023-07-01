import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    item: null,
    items: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getItems = createAsyncThunk("item/getItems", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getItem = createAsyncThunk("item/getItem", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/items/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("item/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/items`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("item/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/items/${id}`, data);

        dispatch(getItems({ url: '/api/items' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("item/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/items/${id}`);

        dispatch(getItems({ url: '/api/items' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: {
        [getItems.pending]: (state) => {
            state.items = [];
            state.pager = null;
            state.loading = true;
            // state.success = false;
            state.error = null;
        },
        [getItems.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.items = data;
            state.pager = pager;
            state.loading = false
            // state.success = true;
        },
        [getItems.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getItem.pending]: (state) => {
            state.item = null;
            state.loading = true;
            // state.success = false;
            state.error = null;
        },
        [getItem.fulfilled]: (state, { payload }) => {
            state.item = payload;
            state.loading = false
            // state.success = true;
        },
        [getItem.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.success = true;
        },
        [update.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.success = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
    }
});

export default itemSlice.reducer;

export const { resetSuccess } = itemSlice.actions;
