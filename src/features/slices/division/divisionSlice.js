import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    division: null,
    divisions: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getDivisions = createAsyncThunk("division/getdivisions", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getDivision = createAsyncThunk("division/getdivision", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/divisions/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("division/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/divisions`, data);

        dispatch(getDivisions({ url: `/api/divisions` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("division/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/divisions/${id}`, data);

        dispatch(getDivisions({ url: `/api/divisions` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("division/destroy", async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/divisions/${id}`);

        dispatch(getDivisions({ url: `/api/divisions` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {},
    extraReducers: {
        [getDivisions.pending]: (state) => {
            state.divisions = [];
            state.pager = null;
            state.loading = true;
        },
        [getDivisions.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.divisions = data;
            state.pager = pager;
            state.loading = false;
        },
        [getDivisions.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getDivision.pending]: (state) => {
            state.division = null;
            state.loading = true;
            state.error = null;
        },
        [getDivision.fulfilled]: (state, { payload }) => {
            state.divisions = payload;
            state.loading = false;
        },
        [getDivision.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.divisions = [];
            state.pager = null;
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
            state.divisions = [];
            state.pager = null;
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

export default divisionSlice.reducer;

// export const {} = divisionSlice.actions;
