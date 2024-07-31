import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import jwt from "jwt-decode";

const GuardRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const token = localStorage.getItem("access_token");
    const decode = token ? jwt(token) : null;

    /** Checking token expiration */
    // console.log((decode.exp * 1000), Date.now());

    if ((!isLoggedIn && !token) || (decode && ((decode.exp * 1000) < Date.now()))) {
        navigate("/login");
    }

    return children;
}

export default GuardRoute