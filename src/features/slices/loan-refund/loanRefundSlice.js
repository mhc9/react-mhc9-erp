import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    refund: null,
    refunds: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getRefunds = createAsyncThunk("loan-refund/getRefunds", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getRefund = createAsyncThunk("loan-refund/getRefund", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/loan-refunds/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("loan-refund/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-refunds`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("loan-refund/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-refunds/${id}/update`, data);

        dispatch(getRefunds({ url: '/api/loan-refunds' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("loan-refund/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-refunds/${id}/delete`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const approve = createAsyncThunk("loan-refund/approve", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-refunds/${id}/approve`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const receipt = createAsyncThunk("loan-refund/receipt", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-refunds/${id}/receipt`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const loanRefundSlice = createSlice({
    name: 'loanRefund',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateImage: (state, { payload }) => {
            state.refund = { ...state.refund, img_url: payload };
        }
    },
    extraReducers: {
        [getRefunds.pending]: (state) => {
            state.refunds = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getRefunds.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.refunds = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getRefunds.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getRefund.pending]: (state) => {
            state.refund = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getRefund.fulfilled]: (state, { payload }) => {
            state.refund = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getRefund.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if(status === 1) {
                state.isSuccess = true;
            } else {
                state.error = payload;
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [approve.pending]: (state) => {
            state.refund = null;
            state.isSuccess = false;
            state.error = null;
        },
        [approve.fulfilled]: (state, { payload }) => {
            const { status, message, refund } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.refund = refund;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [approve.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [receipt.pending]: (state) => {
            state.refund = null;
            state.isSuccess = false;
            state.error = null;
        },
        [receipt.fulfilled]: (state, { payload }) => {
            const { status, message, refund } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.refund = refund;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [receipt.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default loanRefundSlice.reducer;

export const { resetSuccess, resetUploaded, updateImage } = loanRefundSlice.actions;
