import { Route, Routes } from 'react-router-dom';
import DefaultLayout from "./components/DefaultLayout"
import Home from './views/Home';
import RepairList from './views/Repair/List';
import AddRepair from './views/Repair/Add';
import Stat from './views/Stat';
import Advice from './views/Advice';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import GuardRoute from './components/GuardRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<GuardRoute><DefaultLayout /></GuardRoute>}>
                <Route index element={<Home />} />
                <Route path="list" element={<RepairList />} />
                <Route path="add" element={<AddRepair />} />
                <Route path="stat" element={<Stat />} />
                <Route path="advice" element={<Advice />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
