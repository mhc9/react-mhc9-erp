import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    item: null,
    items: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
    isUploaded: false,
    error: null
};

export const getItems = createAsyncThunk("item/getItems", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getItem = createAsyncThunk("item/getItem", async ({ id }, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/items/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("item/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/items`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("item/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/items/${id}/update`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("item/destroy", async ({ id }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/items/${id}/delete`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const upload = createAsyncThunk("item/upload", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/items/${id}/upload`, data);

        dispatch(updateImage(res.data?.img_url));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        resetDeleted: (state) => {
            state.isDeleted = false;
        },
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
        resetUploaded: (state) => {
            state.isUploaded = false;
        },
        updateImage: (state, { payload }) => {
            state.item = { ...state.item, img_url: payload };
        }
    },
    extraReducers: {
        [getItems.pending]: (state) => {
            state.items = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getItems.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.items = data;
            state.pager = pager;
            state.isLoading = false
        },
        [getItems.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getItem.pending]: (state) => {
            state.item = null;
            state.isLoading = true;
            state.error = null;
        },
        [getItem.fulfilled]: (state, { payload }) => {
            state.item = payload;
            state.isLoading = false
        },
        [getItem.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.item = null;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, item } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.item = item;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.item = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const { status, message, item } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.item = item;
            } else {
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

export default itemSlice.reducer;

export const {
    resetDeleted,
    resetSuccess,
    resetUploaded,
    updateImage
} = itemSlice.actions;
