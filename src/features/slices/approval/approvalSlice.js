import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    approval: null,
    approvals: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getApprovals = createAsyncThunk("approval/getApprovals", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getApproval = createAsyncThunk("approval/getApproval", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/approvals/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("approval/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/approvals`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("approval/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/approvals/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("approval/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/approvals/${id}/delete`);

        dispatch(getApprovals({ url: '/api/approvals' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const consider = createAsyncThunk("approval/consider", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/approvals/${id}/consider`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const approvalSlice = createSlice({
    name: 'approval',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
    },
    extraReducers: {
        [getApprovals.pending]: (state) => {
            state.approvals = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getApprovals.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.approvals = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getApprovals.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getApproval.pending]: (state) => {
            state.approval = null;
            state.isLoading = true;
            state.error = null;
        },
        [getApproval.fulfilled]: (state, { payload }) => {
            state.approval = payload;
            state.isLoading = false
        },
        [getApproval.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.approval = null;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, approval } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.approval = approval;
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
            state.approval = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [consider.pending]: (state) => {
            state.isSuccess = false;
            state.approval = null;
            state.error = null;
        },
        [consider.fulfilled]: (state, { payload }) => {
            const { status, message, approval } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.approval = approval;
            } else {
                state.error = { message };
            }
        },
        [consider.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default approvalSlice.reducer;

export const { resetSuccess } = approvalSlice.actions;
