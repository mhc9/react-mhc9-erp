import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    contract: null,
    contracts: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
    error: null
};

export const getContracts = createAsyncThunk("loan-contract/getContracts", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getContract = createAsyncThunk("loan-contract/getContract", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/loan-contracts/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getReport = createAsyncThunk("loan-contract/getReport", async (year, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/loan-contracts/report/${year}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("loan-contract/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-contracts`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("loan-contract/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-contracts/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("loan-contract/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-contracts/${id}/delete`);

        dispatch(getContracts({ url: '/api/loan-contracts' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("loan-contract/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-contracts/${id}/upload`, data);

        dispatch(updateImage(res.data?.img_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const approve = createAsyncThunk("loan-contract/approve", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-contracts/${id}/approve`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const deposit = createAsyncThunk("loan-contract/deposit", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/loan-contracts/${id}/deposit`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const loanContractSlice = createSlice({
    name: 'loanContract',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateImage: (state, { payload }) => {
            state.contract = { ...state.contract, img_url: payload };
        }
    },
    extraReducers: {
        [getContracts.pending]: (state) => {
            state.contracts = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getContracts.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.contracts = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getContracts.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getContract.pending]: (state) => {
            state.contract = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getContract.fulfilled]: (state, { payload }) => {
            state.contract = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getContract.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getReport.pending]: (state) => {
            state.contracts = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getReport.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.contracts = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getReport.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
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
        [approve.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [approve.fulfilled]: (state, { payload }) => {
            const { status, message, contract } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.contract = contract;
            } else {
                state.error = { message };
            }
        },
        [approve.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [deposit.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [deposit.fulfilled]: (state, { payload }) => {
            const { status, message, contract } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.contract = contract;
            } else {
                state.error = { message };
            }
        },
        [deposit.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default loanContractSlice.reducer;

export const { resetSuccess, resetUploaded, updateImage } = loanContractSlice.actions;
