import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import equipmentReducer from "./equipment/equipmentSlice";
import asssetReducer from "./asset/assetSlice";
import employeeReducer from "./employee/employeeSlice";
import departmentReducer from "./department/departmentSlice";
import divisionReducer from "./division/divisionSlice";
import assetTypeReducer from "./asset-type copy/assetTypeSlice";
import assetCategoryReducer from "./asset-category/assetCategorySlice";
import { authApi } from "../services/auth/authService";

export default configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        equipment: equipmentReducer,
        asset: asssetReducer,
        employee: employeeReducer,
        department: departmentReducer,
        division: divisionReducer,
        assetType: assetTypeReducer,
        assetCategory: assetCategoryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
