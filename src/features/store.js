import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import comsetReducer from "./comset/comsetSlice";
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
import unitReducer from './unit/unitSlice';
import memberReducer from "./member/memberSlice";
import orderReducer from "./order/orderSlice";
import supplierReducer from "./supplier/supplierSlice";
import inspectionReducer from "./inspection/inspectionSlice";
import repairationReducer from "./repairation/repairationSlice";
import { authApi } from "../services/auth/authApi";
import { requisitionApi } from "../services/requisition/requisitionApi";
import { employeeApi } from "../services/employee/employeeApi";
import { itemApi } from "../services/item/itemApi";
import { supplierApi } from "../services/supplier/supplierApi";
import { assetApi } from "../services/asset/assetApi";
import { orderApi } from "../services/order/orderApi";
import { inspectionApi } from "../services/inspection/inspectionApi"
import { taskApi } from "../services/task/taskApi"
import { repairationApi } from "../services/repairation/repairationApi"

export default configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [requisitionApi.reducerPath]: requisitionApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [itemApi.reducerPath]: itemApi.reducer,
        [supplierApi.reducerPath]: supplierApi.reducer,
        [assetApi.reducerPath]: assetApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [inspectionApi.reducerPath]: inspectionApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [repairationApi.reducerPath]: repairationApi.reducer,
        comset: comsetReducer,
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
        unit: unitReducer,
        member: memberReducer,
        order: orderReducer,
        supplier: supplierReducer,
        inspection: inspectionReducer,
        repairation: repairationReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware,
            requisitionApi.middleware,
            employeeApi.middleware,
            itemApi.middleware,
            supplierApi.middleware,
            assetApi.middleware,
            orderApi.middleware,
            inspectionApi.middleware,
            taskApi.middleware,
            repairationApi.middleware,
        ),
});
