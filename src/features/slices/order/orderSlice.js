import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    orders: [],
    order: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    error: null
};

export const getOrders = createAsyncThunk("order/getOrders", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getOrder = createAsyncThunk("order/getOrder", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/orders/${id}`);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("order/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/orders`, data);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("order/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/orders/${id}/update`, data);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("order/destroy", async (id, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/orders/${id}/delete`, {});
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetDeleted: (state) => {
            state.isDeleted = false;
        }
    },
    extraReducers: {
        [getOrders.pending]: (state) => {
            state.orders = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getOrders.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.orders = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getOrders.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        [getOrder.pending]: (state) => {
            state.order = null;
            state.isLoading = true;
            state.error = null;
        },
        [getOrder.fulfilled]: (state, { payload }) => {
            state.order = payload;
            state.isLoading = false;
        },
        [getOrder.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
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
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, order } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.order = order;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isDeleted = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isDeleted = true;
            } else {
                state.isDeleted = false;
                state.error = { message };
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default orderSlice.reducer;

export const { resetSuccess, resetDeleted } = orderSlice.actions;
