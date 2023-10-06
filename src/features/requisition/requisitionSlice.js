import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    requisition: null,
    requisitions: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getRequisitions = createAsyncThunk("item/getRequisitions", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getRequisition = createAsyncThunk("item/getRequisition", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/requisitions/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("item/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/requisitions`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("item/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/requisitions/${id}`, data);

        dispatch(getRequisitions({ url: '/api/requisitions' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("item/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/requisitions/${id}`);

        dispatch(getRequisitions({ url: '/api/requisitions' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const requisitionSlice = createSlice({
    name: 'requisition',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getRequisitions.pending]: (state) => {
            state.requisitions = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getRequisitions.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.requisitions = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getRequisitions.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getRequisition.pending]: (state) => {
            state.requisition = null;
            state.isLoading = true;
            state.error = null;
        },
        [getRequisition.fulfilled]: (state, { payload }) => {
            state.requisition = payload;
            state.isLoading = false;
        },
        [getRequisition.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
                state.error = { message }
            }
        },
        [store.rejected]: (state, { payload }) => {
            console.log(payload);
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.isSuccess = true;
        },
        [update.rejected]: (state, { payload }) => {
            console.log(payload);
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.isSuccess = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            console.log(payload);
            state.error = payload;
        },
    }
});

export default requisitionSlice.reducer;

export const { resetSuccess } = requisitionSlice.actions;
