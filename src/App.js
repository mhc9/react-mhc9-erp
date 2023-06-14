import { Route, Routes } from 'react-router-dom';
import DefaultLayout from "./components/DefaultLayout"
import Home from './views/Home';
import RepairList from './views/Repair/List';
import AddRepair from './views/Repair/Add';
import Advice from './views/Advice';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import GuardRoute from './components/GuardRoute';
import EquipmentList from './views/Equipment/List';
import AddEquipment from './views/Equipment/Add';
import EquipmentTypeList from './views/EquipmentType/List';
import EquipmentGroupList from './views/EquipmentGroup/List';
import AddAsset from './views/Asset/Add';
import AssetList from './views/Asset/List';
import AssetType from './views/AssetType';
import AssetCategory from './views/AssetCategory';
import EmployeeList from './views/Employee/List';
import AddEmployee from './views/Employee/Add';
import Department from './views/Department';
import Division from './views/Division';
import Room from './views/Room';
import AssetDetail from './views/Asset/Detail';

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />} >
                <Route index element={<GuardRoute><Home /></GuardRoute>} />
                <Route path="list" element={<GuardRoute><RepairList /></GuardRoute>} />
                <Route path="add" element={<GuardRoute><AddRepair /></GuardRoute>} />
                <Route path="advice" element={<GuardRoute><Advice /></GuardRoute>} />
                <Route path="equipment" element={<GuardRoute><EquipmentList /></GuardRoute>} />
                <Route path="equipment/add" element={<GuardRoute><AddEquipment /></GuardRoute>} />
                <Route path="equipment-type" element={<GuardRoute><EquipmentTypeList /></GuardRoute>} />
                <Route path="equipment-group" element={<GuardRoute><EquipmentGroupList /></GuardRoute>} />
                <Route path="asset" element={<GuardRoute><AssetList /></GuardRoute>} />
                <Route path="asset/add" element={<GuardRoute><AddAsset /></GuardRoute>} />
                <Route path="asset/:id/edit" element={<GuardRoute><AddAsset /></GuardRoute>} />
                <Route path="asset/:id/detail" element={<GuardRoute><AssetDetail /></GuardRoute>} />
                <Route path="asset-type" element={<GuardRoute><AssetType /></GuardRoute>} />
                <Route path="asset-category" element={<GuardRoute><AssetCategory /></GuardRoute>} />
                <Route path="employee" element={<GuardRoute><EmployeeList /></GuardRoute>} />
                <Route path="employee/add" element={<GuardRoute><AddEmployee /></GuardRoute>} />
                <Route path="department" element={<GuardRoute><Department /></GuardRoute>} />
                <Route path="division" element={<GuardRoute><Division /></GuardRoute>} />
                <Route path="room" element={<GuardRoute><Room /></GuardRoute>} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
