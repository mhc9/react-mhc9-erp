import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    comsets: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getComsets = createAsyncThunk("comset/getComsets", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/comsets`);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("comset/store", async (data, { rejectWithValue }) => {
    try {
        console.log(data);
        const res = await api.post(`/api/comsets`, data);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error);
    }
});

export const comsetSlice = createSlice({
    name: 'comset',
    initialState,
    reducers: {},
    extraReducers: {
        [getComsets.pending]: (state) => {
            state.comsets = [];
            state.pager = null;
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [getComsets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.loading = false;
            state.comsets = data;
            state.pager = pager;
            state.success = true;
        },
        [getComsets.rejected]: (state, { payload }) => {
            console.log(payload);

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
            state.loading = false;
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
    }
});

export default comsetSlice.reducer;
