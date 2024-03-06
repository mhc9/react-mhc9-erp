import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/slices/auth/authSlice';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

const DefaultLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isShowSidebar, setIsShowSidebar] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("access_token");

        dispatch(logout());

        navigate("/login");
    };

    return (
        <div className="relative w-full bg-gray-200">
            <header className="">
                <Navbar
                    showSidebar={isShowSidebar}
                    toggleSidebar={setIsShowSidebar}
                    onLogout={handleLogout}
                />
            </header>

            <Sidebar
                isShow={isShowSidebar}
                toggleShow={setIsShowSidebar}
                onLogout={handleLogout}
            />

            <main className="container bg-white min-h-[87vh]">
                <section className="p-4">
                    <Outlet />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default DefaultLayout