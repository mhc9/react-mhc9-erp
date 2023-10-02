import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    suppliers: [],
    supplier: null,
    pager: null,
    isLoading: false,
    isSuccess: false,
    error: null
};

export const getSuppliers = createAsyncThunk("supplier/getSuppliers", async ({ url }, { rejectWithValue }) => {
    try {
        const res = await api.get(url);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }

});

export const getSupplier = createAsyncThunk("supplier/getSupplier", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/suppliers/${id}`);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }

});

export const store = createAsyncThunk("supplier/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/suppliers`, data);
        
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }

});

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: {
        [getSuppliers.pending]: (state) => {
            state.suppliers = [];
            state.pager = null;
            state.isLoading = true;
            state.error = null;
        },
        [getSuppliers.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.suppliers = data;
            state.pager = pager;
            state.isLoading = false;
        },
        [getSuppliers.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        [getSupplier.pending]: (state) => {
            state.supplier = null;
            state.isLoading = true;
            state.error = null;
        },
        [getSupplier.fulfilled]: (state, { payload }) => {
            state.supplier = payload;
            state.isLoading = false;
        },
        [getSupplier.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        [store.pending]: (state) => {
            state.error = null;
            state.isSuccess = false;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message, ...data } = payload;

            if (status === 1) {
                state.isSuccess = true;
            } else {
                state.error = message;
                state.isSuccess = false;
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isSuccess = false;
        },
    }
});

export default supplierSlice.reducer;
