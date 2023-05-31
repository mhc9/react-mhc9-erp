import React from 'react'

const Navbar = () => {
    return (
        <nav className="h-[50px] border bg-slate-700 flex justify-between items-center px-5 text-white">
            <div className="flex w-3/4">
                <div className="w-4/12">
                    <h1>ระบบแจ้งซ่อมออนไลน์ (IT Helpdesk)</h1>
                </div>
                <ul className="flex flex-row gap-4">
                    <li><a href="#" className="hover:text-gray-400">หน้าหลัก</a></li>
                    <li><a href="#" className="hover:text-gray-400">สถานะการซ่อม</a></li>
                    <li><a href="#" className="hover:text-gray-400">แจ้งปัญหา/แจ้งซ่อม</a></li>
                </ul>
            </div>
            <div className="flex">
                <a href="#" className="hover:text-gray-400 flex items-center gap-1">
                    Admin
                    <i class="fas fa-caret-down"></i>
                </a>
                <ul className="hidden">
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
