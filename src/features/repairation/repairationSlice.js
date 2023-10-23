import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    repairation: null,
    repairations: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const getRepairations = createAsyncThunk("repairation/getRepairations", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getRepairation = createAsyncThunk("repairation/getRepairation", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/repairations/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getRepairationsByAsset = createAsyncThunk("repairation/getRepairationsByAsset", async (assetId, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/repairations/asset/${assetId}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("repairation/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/repairations`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const repair = createAsyncThunk("repairation/repair", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/repairations/${id}/repair`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("repairation/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/api/repairations/${id}`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("repairation/destroy", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/repairations/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const taskHandlingSlice = createSlice({
    name: 'taskHandling',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getRepairations.pending]: (state) => {
            state.isLoading = true;
            state.repairations = [];
            state.pager = null;
            state.error = null;
        },
        [getRepairations.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.repairations = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getRepairations.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getRepairation.pending]: (state) => {
            state.isLoading = true;
            state.repairation = null;
            state.error = null;
        },
        [getRepairation.fulfilled]: (state, { payload }) => {
            state.repairation = payload;
            state.isLoading = false;
        },
        [getRepairation.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getRepairationsByAsset.pending]: (state) => {
            state.isLoading = true;
            state.repairations = null;
            state.pager = null;
            state.error = null;
        },
        [getRepairationsByAsset.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.repairations = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getRepairationsByAsset.rejected]: (state, { payload }) => {
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
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [repair.pending]: (state) => {
            state.repairation = null;
            state.isSuccess = false;
            state.error = null;
        },
        [repair.fulfilled]: (state, { payload }) => {
            const { status, message, repairation } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.repairation = repairation;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [repair.rejected]: (state, { payload }) => {
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
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [update.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isSuccess = false;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
                state.error = { message };
            }
        },
        [destroy.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default taskHandlingSlice.reducer;

export const { resetSuccess } = taskHandlingSlice.actions;
