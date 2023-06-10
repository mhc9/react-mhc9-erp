import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import { FaBars } from 'react-icons/fa'
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
        <nav className="h-[60px] border bg-slate-700 flex justify-between items-center px-5 text-white">
            <div className="flex justify-between w-full">
                <div className="sm:w-3/12 md:w-1/2 lg:w-4/12">
                    <h1 className="max-md:hidden text-lg">ระบบแจ้งซ่อมออนไลน์</h1>
                    <h1 className="md:hidden text-lg">IT Helpdesk</h1>
                    <p className="max-md:hidden text-sm text-gray-300">IT Helpdesk</p>
                </div>
                <button className="md:hidden">
                    <FaBars size={'20px'} />
                </button>
                <ul className="max-md:hidden md:flex flex-row items-center gap-4 w-full">
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
                        </ul>
                    </li>
                    <li className="menu-item flex relative">
                        <button className="hover:text-gray-400 flex items-center gap-1">
                            ข้อมูลพื้ฐาน
                            <i className="fas fa-caret-down"></i>
                        </button>
                        <ul className="dropdown-menu rounded-md bg-white text-blue-950 p-0">
                            <li className="hover:bg-gray-300 p-2 rounded-t-md">
                                <Link to="/equipment"><p className="w-full">อุปกรณ์</p></Link>
                            </li>
                            <li className="hover:bg-gray-300 p-2">
                                <Link to="/equipment-type"><p className="w-full">ประเภทอุปกรณ์</p></Link>
                            </li>
                            <li className="hover:bg-gray-300 p-2">
                                <Link to="/equipment-group"><p className="w-full">กลุ่มอุปกรณ์</p></Link>
                            </li>
                            <li><hr className="dropdown-divider m-0" /></li>
                            <li className="hover:bg-gray-300 p-2">
                                <Link to="/asset"><p className="w-full">พัสดุ</p></Link>
                            </li>
                            <li><hr className="dropdown-divider m-0" /></li>
                            <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                <Link to="/employee"><p className="w-full">บุคลากร</p></Link>
                            </li>
                            <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                <Link to="/department"><p className="w-full">กลุ่มงาน</p></Link>
                            </li>
                            <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                <Link to="/division"><p className="w-full">งาน</p></Link>
                            </li>
                        </ul>
                    </li>
                    <li><Link to="/advice" className="hover:text-gray-400">แนะนำการใช้งาน</Link></li>
                </ul>
                <div className="menu-item max-md:hidden flex relative">
                    <button className="hover:text-gray-400">
                        {isFetching && (
                            <Spinner animation="border" role="status" size="sm" style={{ marginRight: '2px' }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                        {(!isFetching && data) && (
                            <div className="flex items-center gap-1">
                                <div className="w-8 h-8 border rounded-full flex items-center justify-center">
                                    ST
                                </div>
                                <i className="fas fa-caret-down"></i>
                            </div>
                        )}
                    </button>
                    <ul className="dropdown-menu rounded-md bg-white text-blue-950 p-0">
                        <li className="hover:bg-gray-300 p-2 rounded-t-md">
                            <a href="/profile">
                                <p className="w-full text-center">{(!isFetching && data) && data.name}</p>
                            </a>
                        </li>
                        <li className="hover:bg-gray-300 p-2 rounded-b-md">
                            <button type="button" className="w-full" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
