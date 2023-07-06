import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import equipmentReducer from "./equipment/equipmentSlice";
import asssetReducer from "./asset/assetSlice";
import assetTypeReducer from "./asset-type/assetTypeSlice";
import assetCategoryReducer from "./asset-category/assetCategorySlice";
import assetOwnershipReducer from "./asset-ownership/assetOwnershipSlice";
import employeeReducer from "./employee/employeeSlice";
import departmentReducer from "./department/departmentSlice";
import divisionReducer from "./division/divisionSlice";
import roomReducer from "./room/roomSlice";
import taskRecuer from "./task/taskSlice";
import itemReducer from "./item/itemSlice";
import activityReducer from "./activity/activitySlice";
import { authApi } from "../services/auth/authService";

export default configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        equipment: equipmentReducer,
        asset: asssetReducer,
        assetType: assetTypeReducer,
        assetCategory: assetCategoryReducer,
        ownership: assetOwnershipReducer,
        employee: employeeReducer,
        department: departmentReducer,
        division: divisionReducer,
        room: roomReducer,
        task: taskRecuer,
        item: itemReducer,
        activity: activityReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
