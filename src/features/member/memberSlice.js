import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

const initialState = {
    member: null,
    members: [],
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getEmployees = createAsyncThunk("member/getEmployees", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getEmployee = createAsyncThunk("member/getEmployee", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/members/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("member/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/members`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const update = createAsyncThunk("member/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/members/${id}`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const destroy = createAsyncThunk("member/destroy", async (id, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/members/${id}`);

        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        }
    },
    extraReducers: {
        [getEmployees.pending]: (state) => {
            state.members = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getEmployees.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.members = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getEmployees.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [getEmployee.pending]: (state) => {
            state.member = null;
            state.isLoading = true;
            state.error = null;
        },
        [getEmployee.fulfilled]: (state, { payload }) => {
            state.member = payload;
            state.isLoading = false;
        },
        [getEmployee.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [store.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, member } = payload;

            if (status === 1) {
                state.member = member;
                state.isSuccess = true;
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
            console.log(payload);
            state.isLoading = false;
            state.isSuccess = true;
        },
        [update.rejected]: (state, { payload }) => {
            console.log(payload);
            state.isLoading = false;
            state.error = payload;
        },
        [destroy.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [destroy.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.isLoading = false;
            state.isSuccess = true;
        },
        [destroy.rejected]: (state, { payload }) => {
            console.log(payload);
            state.isLoading = false;
            state.error = payload;
        },
    }
});

export default memberSlice.reducer;

export const { resetSuccess } = memberSlice.actions;
