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
import EquipmentTypeList from './views/EquipmentType/List';
import EquipmentGroupList from './views/EquipmentGroup/List';

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />} >
                <Route index element={<GuardRoute><Home /></GuardRoute>} />
                <Route path="list" element={<GuardRoute><RepairList /></GuardRoute>} />
                <Route path="add" element={<GuardRoute><AddRepair /></GuardRoute>} />
                <Route path="equipment" element={<GuardRoute><EquipmentList /></GuardRoute>} />
                <Route path="equipment-type" element={<GuardRoute><EquipmentTypeList /></GuardRoute>} />
                <Route path="equipment-group" element={<GuardRoute><EquipmentGroupList /></GuardRoute>} />
                <Route path="advice" element={<GuardRoute><Advice /></GuardRoute>} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
