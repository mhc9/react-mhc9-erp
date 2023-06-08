import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    equipments: [],
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getEquipments = createAsyncThunk("equipment/getEquipments", async (data, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/equipments`);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("equipment/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post(`/api/equipments`);

        return res.data;
    } catch (error) {
        console.log(error);
        rejectWithValue(error);
    }
});

export const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {},
    extraReducers: {
        [getEquipments.pending]: (state) => {
            state.equipments = [];
            state.pager = null;
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [getEquipments.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.loading = false;
            state.equipments = data;
            state.pager = pager;
            state.success = true;
        },
        [getEquipments.rejected]: (state, { payload }) => {
            console.log(payload);

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
            state.loading = false;
            state.success = true;
        },
        [store.rejected]: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.error = payload;
        },
    }
});

export default equipmentSlice.reducer;
