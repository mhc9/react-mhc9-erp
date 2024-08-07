import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { useGetUserDetailsQuery } from '../../features/services/auth/authApi'
import NavMenuItem from './NavMenuItem'
import './Navbar.css'
import UserProfile from './UserProfile'

const Navbar = ({ showSidebar, toggleSidebar, onLogout }) => {
    const { data: user, isFetching } = useGetUserDetailsQuery('userDetails', { pollingInterval: 900000 });

    return (
        <nav className="navbar h-[60px] border bg-slate-700 flex justify-between items-center px-5 text-white">
            <div className="flex justify-between w-full">
                <div className="sm:w-3/12 md:w-1/2 lg:w-4/12">
                    <h1 className="max-md:hidden text-lg">ระบบวางแผนทรัพยากร</h1>
                    <h1 className="md:hidden text-lg">MHC9 ERP</h1>
                    <p className="max-md:hidden text-sm text-gray-300">MHC9 ERP</p>
                </div>
                <button className="lg:hidden" onClick={() => toggleSidebar(!showSidebar)}>
                    <FaBars size={'20px'} />
                </button>
                <ul className="max-lg:hidden lg:flex flex-row items-center gap-4 w-full">
                    <li><Link to="/" className="hover:text-gray-400">หน้าหลัก</Link></li>
                    {[1].includes(user?.permissions[0]?.role_id) && (
                        <NavMenuItem
                            text="บริการ"
                            submenus={[
                                {type: 'menu', text: 'รายการแจ้งปัญหา', link: '/task'},
                                {type: 'menu', text: 'แจ้งปัญหา', link: '/task/add'},
                                {type: 'menu', text: 'รายการส่งซ่อม', link: '/repairation'},
                            ]}
                        />
                    )}

                    <NavMenuItem
                        text="จัดซื้อจัดจ้าง"
                        submenus={[
                            {type: 'menu', text: 'คำขอซื้อ/จ้าง', link: '/requisition', user: []},
                            {type: 'menu', text: 'ใบสั่งซื้อ/จ้าง', link: '/order', user: [1, 3]},
                            {type: 'menu', text: 'ตรวจรับพัสดุ', link: '/inspection', user: [1, 3]},
                        ]}
                        userRole={user?.permissions[0]?.role_id}
                    />
                    <NavMenuItem
                        text="ยืมเงินราชการ"
                        submenus={[
                            {type: 'menu', text: 'คำขอยืมเงิน', link: '/loan', user: []},
                            {type: 'menu', text: 'สัญญายืมเงิน', link: '/loan-contract', user: [1, 4]},
                            {type: 'menu', text: 'หักล้างเงินยืม', link: '/loan-refund', user: []},
                            {type: 'menu', text: 'ทะเบียนคุม', link: '/loan-report', user: [1, 4]},
                        ]}
                        userRole={user?.permissions[0]?.role_id}
                    />

                    {[1,3].includes(user?.permissions[0]?.role_id) && (
                        <NavMenuItem
                            text="ข้อมูลพื้ฐาน"
                            submenus={[
                                {type: 'menu', text: 'ครุภัณฑ์', link: '/asset', user: [1, 3]},
                                {type: 'menu', text: 'ชุดคอมพิวเตอร์', link: '/comset', user: [1, 3]},
                                {type: 'menu', text: 'วัสดุ', link: '/material', user: [1, 3]},
                                {type: 'menu', text: 'ประเภทพัสดุ', link: '/asset-type', user: [1, 3]},
                                {type: 'menu', text: 'ชนิดพัสดุ', link: '/asset-category', user: [1, 3]},
                                {type: 'divided'},
                                {type: 'menu', text: 'บุคลากร', link: '/employee', user: [1]},
                                {type: 'menu', text: 'กลุ่มงาน', link: '/department', user: [1]},
                                {type: 'menu', text: 'งาน', link: '/division', user: [1]},
                                {type: 'divided'},
                                {type: 'menu', text: 'สินค้า/บริการ', link: '/item', user: [1, 3]},
                                {type: 'menu', text: 'หน่วยนับ', link: '/unit', user: [1, 3]},
                                {type: 'menu', text: 'ผู้จัดจำหน่าย', link: '/supplier', user: [1, 3]},
                                {type: 'divided'},
                                {type: 'menu', text: 'งบประมาณ', link: '/budget', user: [1, 3]},
                            ]}
                            userRole={user?.permissions[0]?.role_id}
                        />
                    )}
                    <li><Link to="/advice" className="hover:text-gray-400">แนะนำการใช้งาน</Link></li>
                </ul>
                
                <UserProfile
                    user={user}
                    isLoading={isFetching}
                    logout={onLogout}
                />
            </div>
        </nav>
    )
}

export default Navbar
