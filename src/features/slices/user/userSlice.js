import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api';

const initialState = {
    users: [],
    user: null,
    pager: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isDeleted: false,
};

export const getUsers = createAsyncThunk("user/getUsers", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getUser = createAsyncThunk("user/getUser", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/users/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("user/store", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post(`/api/users`, data);

        dispatch(getUsers({ url: `/api/users` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("user/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/users/${id}`, data);

        dispatch(getUsers({ url: `/api/users` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("user/destroy", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put(`/api/users/${id}`, data);

        dispatch(getUsers({ url: `/api/users` }));

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.users = [];
            state.pager = null;
            state.isLoading = true;
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.users = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getUsers.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getUser.pending]: (state) => {
            state.user = [];
            state.isLoading = true;
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
        },
        [getUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isSuccess = false;
            state.user = null;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const {status, message, user } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.user = user;
            } else {
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [update.pending]: (state) => {
            state.isSuccess = false;
            state.users = null;
            state.error = null;
        },
        [update.fulfilled]: (state, { payload }) => {
            const {status, message, user } = payload;

            if (status === 1) {
                state.isSuccess = true;
                state.user = user;
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
    }
});

export default userSlice.reducer;
