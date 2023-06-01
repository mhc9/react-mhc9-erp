import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="h-[50px] border bg-slate-700 flex justify-between items-center px-5 text-white">
            <div className="flex w-3/4">
                <div className="w-4/12">
                    <h1>ระบบแจ้งซ่อมออนไลน์ (IT Helpdesk)</h1>
                </div>
                <ul className="flex flex-row gap-4">
                    <li><Link to="/" className="hover:text-gray-400">หน้าหลัก</Link></li>
                    <li><Link to="/list" className="hover:text-gray-400">สถานะการซ่อม</Link></li>
                    <li><Link to="/add" className="hover:text-gray-400">แจ้งปัญหา/แจ้งซ่อม</Link></li>
                </ul>
            </div>
            <div className="menu-item flex relative">
                <button className="hover:text-gray-400 flex items-center gap-1">
                    Admin
                    <i class="fas fa-caret-down"></i>
                </button>
                <ul className="dropdown-menu rounded-md bg-white text-blue-950">
                    <li className="hover:bg-gray-300 p-2 rounded-t-md">
                        <a href="/profile"><p className="w-full">Profile</p></a>
                    </li>
                    <li className="hover:bg-gray-300 p-2 rounded-b-md">
                        <a href="/login"><p className="w-full">Logout</p></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
