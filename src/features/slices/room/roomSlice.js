import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    rooms: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getRooms = createAsyncThunk("room/getRooms", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/rooms`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("room/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/rooms`, data);

        dispatch(getRooms());

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("room/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/rooms/${id}`, data);

        dispatch(getRooms());

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("room/destroy", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/rooms/${id}`, data);

        dispatch(getRooms());

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        addRoom: (state, { payload }) => {
            const updated = [...state.types, payload];

            state.types = updated;
        },
        updateRoom: (state, { payload }) => {
            const updated = state.types.map(dep => {
                if (dep.id === payload.id) return payload;

                return dep;
            });

            state.types = updated;
        },
        deleteRoom: (state, { payload }) => {
            const updated = [...state.types, payload];

            state.types = updated;
        }
    },
    extraReducers: {
        [getRooms.pending]: (state) => {
            state.rooms = [];
            state.pager = null;
            state.loading = true;
        },
        [getRooms.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.rooms = data;
            state.pager = pager;
            state.loading = false;
        },
        [getRooms.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.rooms = [];
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
            state.rooms = [];
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

export default roomSlice.reducer;

export const {
    addRoom,
    updateRoom,
    deleteRoom
} = roomSlice.actions;
