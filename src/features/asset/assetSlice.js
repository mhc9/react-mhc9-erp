import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    asset: null,
    assets: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isUploaded: false,
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
        const res = await api.post(`/api/assets/${id}/update`, data);

        dispatch(getAssets({ url: '/api/assets' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("asset/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/assets/${id}/delete`);

        dispatch(getAssets({ url: '/api/assets' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("asset/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/assets/${id}/upload`, data);

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
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateImage: (state, { payload }) => {
            state.asset = { ...state.asset, img_url: payload };
        }
    },
    extraReducers: {
        [getAssets.pending]: (state) => {
            state.assets = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getAssets.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.assets = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getAssets.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getAsset.pending]: (state) => {
            state.asset = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getAsset.fulfilled]: (state, { payload }) => {
            state.asset = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getAsset.rejected]: (state, { payload }) => {
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
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            state.isLoading = false;
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

export default assetSlice.reducer;

export const { resetSuccess, resetUploaded, updateImage } = assetSlice.actions;
