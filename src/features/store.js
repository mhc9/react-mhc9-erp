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
import budgetReducer from "./budget/budgetSlice";
import requisitionReducer from "./requisition/requisitionSlice";
import { authApi } from "../services/auth/authService";
import { requisitionApi } from "../services/requisition/requisitionService";
import { employeeApi } from "../services/employee/employeeService";

export default configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [requisitionApi.reducerPath]: requisitionApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
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
        budget: budgetReducer,
        requisition: requisitionReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware,
            requisitionApi.middleware,
            employeeApi.middleware,
        ),
});
