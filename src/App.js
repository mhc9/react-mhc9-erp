import { Route, Routes } from 'react-router-dom';
import DefaultLayout from "./components/DefaultLayout"
import Login from './views/Auth/Login';
import Home from './views/Home';
import RepairList from './views/Repair/List';
import AddRepair from './views/Repair/Add';

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="list" element={<RepairList />} />
                <Route path="add" element={<AddRepair />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
