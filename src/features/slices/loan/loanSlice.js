import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    loan: null,
    loans: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    isDeleted: false,
    error: null
};

export const getLoans = createAsyncThunk("loan/getLoans", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getLoan = createAsyncThunk("loan/getLoan", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/loans/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("loan/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loans`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("loan/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loans/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("loan/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loans/${id}/delete`, {});

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("loan/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loans/${id}/upload`, data);

        dispatch(updateImage(res.data?.img_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const loanSlice = createSlice({
    name: 'loan',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetDeleted: (state) => {
            state.isDeleted = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateImage: (state, { payload }) => {
            state.loan = { ...state.loan, img_url: payload };
        }
    },
    extraReducers: {
        [getLoans.pending]: (state) => {
            state.loans = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getLoans.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.loans = data;
            state.pager = pager;
            state.isLoading = false
        },
        [getLoans.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getLoan.pending]: (state) => {
            state.loan = null;
            state.isLoading = true;
            state.error = null;
        },
        [getLoan.fulfilled]: (state, { payload }) => {
            state.loan = payload;
            state.isLoading = false
        },
        [getLoan.rejected]: (state, { payload }) => {
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
                state.error = { message }
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
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.error = { message }
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
                state.error = { message };
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [upload.pending]: (state) => {
            state.isUploaded = false;
            state.error = null;
        },
        [upload.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isUploaded = true;
            } else {
                state.isUploaded = false;
                state.error = { message };
            }
        },
        [upload.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default loanSlice.reducer;

export const { resetSuccess, resetDeleted, resetUploaded, updateImage } = loanSlice.actions;
