import React from 'react'

const Navbar = () => {
    return (
        <nav className="h-[50px] border bg-slate-700 flex justify-between items-center px-5 text-white">
            <div className="flex w-3/4">
                <div className="w-4/12">
                    <h1>ระบบแจ้งซ่อมออนไลน์ (IT Helpdesk)</h1>
                </div>
                <ul className="flex flex-row gap-4">
                    <li>หน้าหลัก</li>
                    <li>สถานะการซ่อม</li>
                    <li>แจ้งปัญหา/แจ้งซ่อม</li>
                </ul>
            </div>
            <div>
                <a href="#">Admin</a>
                <ul className="hidden">
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
