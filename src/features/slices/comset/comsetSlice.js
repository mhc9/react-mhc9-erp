import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

const initialState = {
    comsets: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
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

export const getComset = createAsyncThunk("comset/getComset", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/comsets/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("comset/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/comsets`, data);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("comset/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/comsets/${id}/update`, data);

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
        [getComset.pending]: (state) => {
            state.loading = true;
            state.comset = null;
            state.error = null;
        },
        [getComset.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.comset = payload;
        },
        [getComset.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.success = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            console.log(payload);
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.success = false;
            state.comset = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, comset } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.comset = comset
            } else {
                state.error = { message };
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default comsetSlice.reducer;
