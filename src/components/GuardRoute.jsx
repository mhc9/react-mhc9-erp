import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwt from "jwt-decode";
import { setLoggedInUser } from '../features/slices/auth/authSlice'
import { useGetUserDetailsQuery } from '../features/services/auth/authApi'
import ChangePassword from '../views/Auth/ChangePassword';

const GuardRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, loggedInUser } = useSelector(state => state.auth);
    const { data: user } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000,
        refetchOnMountOrArgChange: true,
    });
    const token = localStorage.getItem("access_token");
    const decode = token ? jwt(token) : null;

    useEffect(() => {
        if (isLoggedIn && user) {
            console.log('on Guard route loaded...');

            dispatch(setLoggedInUser(user));
        }
    }, [isLoggedIn, user]);

    /** Checking token expiration */
    if ((!isLoggedIn && !token) || (decode && ((decode.exp * 1000) < Date.now()))) {
        return <Navigate to="/login" replace={true} />;
    }

    /** If loggedInUser is new user render ChangPassword */
    if (loggedInUser && loggedInUser.is_new === 1) {
        return <ChangePassword currentUser={loggedInUser} />;
    }

    return children;
}

export default GuardRoute