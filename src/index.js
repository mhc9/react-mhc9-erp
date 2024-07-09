import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import OverWriteMomentBE from './utils/OverwriteMomentBE'
import store from "./features/store";
import App from './App';

import './index.css';
import 'react-toastify/dist/ReactToastify.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* On production mode add basename="/erp" prop to Router */}
        <Router>
            <Provider store={store}>
                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                    <App />
                </MuiPickersUtilsProvider>
                <ToastContainer />
            </Provider>
        </Router>
    </React.StrictMode>
);
