import { Route, Routes } from 'react-router-dom';
import DefaultLayout from "./components/DefaultLayout"

function App() {
    return (
        <Routes>
            <Route path="" element={<DefaultLayout />} />
        </Routes>
    );
}

export default App;
