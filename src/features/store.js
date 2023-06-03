import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { authApi } from "../services/auth/authService";

export default configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
