import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    assets: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getAssets = createAsyncThunk("asset/getAssets", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/assets`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("asset/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/assets`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {},
    extraReducers: {
        [getAssets.pending]: (state) => {
            state.assets = [];
            state.pager = null;
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [getAssets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.assets = data;
            state.pager = pager;
            state.loading = false
            state.success = true;
        },
        [getAssets.rejected]: (state, { payload }) => {
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
    }
});

export default assetSlice.reducer;
