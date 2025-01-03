import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

const initialState = {
    comsets: [],
    comset: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
};

export const getComsets = createAsyncThunk("comset/getComsets", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

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
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetDeleted: (state) => {
            state.isDeleted = false;
        },
    },
    extraReducers: {
        [getComsets.pending]: (state) => {
            state.comsets = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getComsets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.isLoading = false;
            state.comsets = data;
            state.pager = pager;
        },
        [getComsets.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getComset.pending]: (state) => {
            state.isLoading = true;
            state.comset = null;
            state.error = null;
        },
        [getComset.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.comset = payload;
        },
        [getComset.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.comset = null;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, comset } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.comset = comset;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.comset = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, comset } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.comset = comset;
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

export const { resetDeleted, resetSuccess } = comsetSlice.actions;
