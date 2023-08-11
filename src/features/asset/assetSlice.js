import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    asset: null,
    assets: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getAssets = createAsyncThunk("asset/getAssets", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getAsset = createAsyncThunk("asset/getAsset", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/assets/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("asset/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/assets`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("asset/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/assets/${id}`, data);

        dispatch(getAssets({ url: '/api/assets' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("asset/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/assets/${id}`);

        dispatch(getAssets({ url: '/api/assets' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("asset/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/assets/${id}/upload`, data);

        dispatch(updateImage(res.data?.img_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        },
        updateImage: (state, { payload }) => {
            state.asset = { ...state.asset, img_url: payload };
        }
    },
    extraReducers: {
        [getAssets.pending]: (state) => {
            state.assets = [];
            state.pager = null;
            state.loading = true;
            // state.success = false;
            state.error = null;
        },
        [getAssets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.assets = data;
            state.pager = pager;
            state.loading = false
            // state.success = true;
        },
        [getAssets.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getAsset.pending]: (state) => {
            state.asset = null;
            state.loading = true;
            // state.success = false;
            state.error = null;
        },
        [getAsset.fulfilled]: (state, { payload }) => {
            state.asset = payload;
            state.loading = false
            // state.success = true;
        },
        [getAsset.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.success = true;
        },
        [update.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.success = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
        [upload.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [upload.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.success = true;
        },
        [upload.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
    }
});

export default assetSlice.reducer;

export const { resetSuccess, updateImage } = assetSlice.actions;
