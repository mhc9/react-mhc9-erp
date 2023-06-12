import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    types: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getAssetTypes = createAsyncThunk("asset-type/getAssetTypes", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/asset-types`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("asset-type/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/asset-types`, data);

        dispatch(addAssetType(res.data.types))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("asset-type/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/asset-types/${id}`, data);

        dispatch(updateAssetType(res.data.types))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("asset-type/destroy", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/asset-types/${id}`, data);

        dispatch(deleteAssetType(res.data.types))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const assetTypeSlice = createSlice({
    name: 'assetType',
    initialState,
    reducers: {
        addAssetType: (state, { payload }) => {
            const updated = [...state.types, payload];

            state.types = updated;
        },
        updateAssetType: (state, { payload }) => {
            const updated = state.types.map(dep => {
                if (dep.id === payload.id) return payload;

                return dep;
            });

            state.types = updated;
        },
        deleteAssetType: (state, { payload }) => {
            const updated = [...state.types, payload];

            state.types = updated;
        }
    },
    extraReducers: {
        [getAssetTypes.pending]: (state) => {
            state.loading = true;
        },
        [getAssetTypes.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.types = data;
            state.pager = pager;
            state.loading = false;
        },
        [getAssetTypes.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.loading = true;
        },
        [store.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.loading = true;
        },
        [update.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [update.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.loading = true;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
});

export default assetTypeSlice.reducer;

export const {
    addAssetType,
    updateAssetType,
    deleteAssetType
} = assetTypeSlice.actions;
