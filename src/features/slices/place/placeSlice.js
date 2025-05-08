import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    place: null,
    places: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getPlaces = createAsyncThunk("place/getPlaces", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getPlace = createAsyncThunk("place/getPlace", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/places/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("place/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/places`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("place/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/places/${id}/update`, data);

        dispatch(getPlaces({ url: '/api/places' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("place/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/places/${id}/delete`);

        dispatch(getPlaces({ url: '/api/places' }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getPlaces.pending]: (state) => {
            state.places = [];
            state.pager = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getPlaces.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.places = data;
            state.pager = pager;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getPlaces.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getPlace.pending]: (state) => {
            state.place = null;
            state.isLoading = true;
            // state.isSuccess = false;
            state.error = null;
        },
        [getPlace.fulfilled]: (state, { payload }) => {
            state.place = payload;
            state.isLoading = false
            // state.isSuccess = true;
        },
        [getPlace.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, place } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.place = place;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
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
    }
});

export default placeSlice.reducer;

export const { resetSuccess } = placeSlice.actions;
