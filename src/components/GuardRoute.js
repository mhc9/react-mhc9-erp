import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GuardRoute = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);

    const token = localStorage.getItem("access_token");

    if (!isLoggedIn && !token) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default GuardRoute