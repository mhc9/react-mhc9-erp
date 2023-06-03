import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import { useGetUserDetailsQuery } from '../../services/auth/authService'
import { logout } from '../../features/auth/authSlice'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000,
    });

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        dispatch(logout());

        navigate("/login");
    }

    return (
        <nav className="h-[50px] border bg-slate-700 flex justify-between items-center px-5 text-white">
            <div className="flex w-3/4">
                <div className="w-4/12">
                    <h1>ระบบแจ้งซ่อมออนไลน์ (IT Helpdesk)</h1>
                </div>
                <ul className="flex flex-row gap-4">
                    <li><Link to="/" className="hover:text-gray-400">หน้าหลัก</Link></li>
                    <li className="menu-item flex relative">
                        <button className="hover:text-gray-400 flex items-center gap-1">
                            บริการ
                            <i className="fas fa-caret-down"></i>
                        </button>
                        <ul className="dropdown-menu rounded-md bg-white text-blue-950 p-0">
                            <li className="hover:bg-gray-300 p-2 rounded-t-md">
                                <Link to="/list"><p className="w-full">สถานะการซ่อม</p></Link>
                            </li>
                            <li className="hover:bg-gray-300 p-2">
                                <Link to="/add"><p className="w-full">แจ้งปัญหา/แจ้งซ่อม</p></Link>
                            </li>
                            <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                <Link to="/stat"><p className="w-full">สถิติการแจ้งซ่อม</p></Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item flex relative">
                        <button className="hover:text-gray-400 flex items-center gap-1">
                            ข้อมูลพื้ฐาน
                            <i className="fas fa-caret-down"></i>
                        </button>
                        <ul className="dropdown-menu rounded-md bg-white text-blue-950 p-0">
                            <li className="hover:bg-gray-300 p-2 rounded-t-md">
                                <Link href="/equipment"><p className="w-full">อุปกรณ์</p></Link>
                            </li>
                            <li className="hover:bg-gray-300 p-2">
                                <Link href="/equipment-type"><p className="w-full">ประเภทอุปกรณ์</p></Link>
                            </li>
                            <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                <Link href="/equipment-group"><p className="w-full">กลุ่มอุปกรณ์</p></Link>
                            </li>
                        </ul>
                    </li>
                    <li><Link to="/advice" className="hover:text-gray-400">แนะนำการใช้งาน</Link></li>
                </ul>
            </div>
            <div className="menu-item flex relative">
                <button className="hover:text-gray-400 flex items-center gap-1">
                    {isFetching && (
                        <Spinner animation="border" role="status" size="sm" style={{ marginRight: '2px' }}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                    {(!isFetching && data) && data.name}
                    <i className="fas fa-caret-down"></i>
                </button>
                <ul className="dropdown-menu rounded-md bg-white text-blue-950">
                    <li className="hover:bg-gray-300 p-2 rounded-t-md">
                        <a href="/profile"><p className="w-full">Profile</p></a>
                    </li>
                    <li className="hover:bg-gray-300 p-2 rounded-b-md">
                        <button type="button" onClick={handleLogout}>
                            <p className="w-full">Logout</p>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
