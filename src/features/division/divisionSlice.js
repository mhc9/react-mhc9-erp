import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    divisions: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getDivisions = createAsyncThunk("division/getdivisions", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/divisions`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("division/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/divisions`, data);

        dispatch(addDivision(res.data.division))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("division/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/divisions/${id}`, data);

        dispatch(updateDivision(res.data.division))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("division/destroy", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/divisions/${id}`, data);

        dispatch(deleteDivision(res.data.division))

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {
        addDivision: (state, { payload }) => {
            const updateddivisions = [...state.divisions, payload];

            state.divisions = updateddivisions;
        },
        updateDivision: (state, { payload }) => {
            const updateddivisions = state.divisions.map(dep => {
                if (dep.id === payload.id) return payload;

                return dep;
            });

            state.divisions = updateddivisions;
        },
        deleteDivision: (state, { payload }) => {
            const updateddivisions = [...state.divisions, payload];

            state.divisions = updateddivisions;
        }
    },
    extraReducers: {
        [getDivisions.pending]: (state) => {
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

export default divisionSlice.reducer;

export const {
    addDivision,
    updateDivision,
    deleteDivision
} = divisionSlice.actions;
