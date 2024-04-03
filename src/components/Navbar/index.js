import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { useGetUserDetailsQuery } from '../../features/services/auth/authApi'
import Loading from '../Loading'

const Navbar = ({ showSidebar, toggleSidebar, onLogout }) => {
    const { data: user, isFetching } = useGetUserDetailsQuery('userDetails', { pollingInterval: 900000 });

    return (
        <nav className="h-[60px] border bg-slate-700 flex justify-between items-center px-5 text-white">
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
                    {user?.permissions[0]?.role_id === 1 && (
                        <li className="menu-item flex relative h-full">
                            <button className="hover:text-gray-400 flex items-center gap-1">
                                บริการ
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <ul className="dropdown-menu rounded-md bg-white text-blue-950 p-0">
                                <li className="hover:bg-gray-300 p-2 rounded-t-md">
                                    <Link to="/task"><p className="w-full">รายการแจ้งปัญหา</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 p-2">
                                    <Link to="/task/add"><p className="w-full">แจ้งปัญหา</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                    <Link to="/repairation"><p className="w-full">รายการส่งซ่อม</p></Link>
                                </li>
                            </ul>
                        </li>
                    )}

                    {[1,3].includes(user?.permissions[0]?.role_id) && (
                        <li className="menu-item flex relative h-full">
                            <button className="hover:text-gray-400 flex items-center gap-1">
                                จัดซื้อจัดจ้าง
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <ul className="dropdown-menu rounded-md bg-white text-blue-950 p-0">
                                <li className="hover:bg-gray-300 p-2 rounded-t-md">
                                    <Link to="/requisition"><p className="w-full">คำขอซื้อ/จ้าง</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 p-2">
                                    <Link to="/order"><p className="w-full">ใบสั่งซื้อ/จ้าง</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                    <Link to="/inspection"><p className="w-full">ตรวจรับพัสดุ</p></Link>
                                </li>
                            </ul>
                        </li>
                    )}

                    {[1].includes(user?.permissions[0]?.role_id) && (
                        <li className="menu-item flex relative h-full">
                            <button className="hover:text-gray-400 flex items-center gap-1">
                                ยืมเงินราชการ
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <ul className="dropdown-menu rounded-md bg-white text-blue-950 p-0">
                                <li className="hover:bg-gray-300 p-2 rounded-t-md">
                                    <Link to="/loan"><p className="w-full">คำขอยืมเงิน</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 p-2">
                                    <Link to="/loan-contract"><p className="w-full">สัญญายืมเงิน</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                    <Link to="/loan-refund"><p className="w-full">คืนเงินยืม</p></Link>
                                </li>
                            </ul>
                        </li>
                    )}

                    {[1,3].includes(user?.permissions[0]?.role_id) && (
                        <li className="menu-item flex relative h-full">
                            <button className="hover:text-gray-400 flex items-center gap-1">
                                ข้อมูลพื้ฐาน
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <ul className="dropdown-menu rounded-md bg-white text-blue-950 p-0">
                                {[1,3].includes(user?.permissions[0]?.role_id) && (
                                    <>
                                        <li className="hover:bg-gray-300 p-2 rounded-t-md">
                                            <Link to="/asset"><p className="w-full">ครุภัณฑ์</p></Link>
                                        </li>
                                        <li className="hover:bg-gray-300 p-2 rounded-t-md">
                                            <Link to="/material"><p className="w-full">วัสดุ</p></Link>
                                        </li>
                                        <li className="hover:bg-gray-300 p-2">
                                            <Link to="/asset-type"><p className="w-full">ประเภทพัสดุ</p></Link>
                                        </li>
                                        <li className="hover:bg-gray-300 p-2">
                                            <Link to="/asset-category"><p className="w-full">ชนิดพัสดุ</p></Link>
                                        </li>
                                    </>
                                )}

                                {[1,3].includes(user?.permissions[0]?.role_id) && (
                                    <>
                                        <li><hr className="dropdown-divider m-0" /></li>
                                        {user?.permissions[0]?.role_id === 1 && (
                                            <>
                                                <li className="hover:bg-gray-300 p-2">
                                                    <Link to="/employee"><p className="w-full">บุคลากร</p></Link>
                                                </li>
                                                <li className="hover:bg-gray-300 p-2">
                                                    <Link to="/department"><p className="w-full">กลุ่มงาน</p></Link>
                                                </li>
                                                <li className="hover:bg-gray-300 p-2">
                                                    <Link to="/division"><p className="w-full">งาน</p></Link>
                                                </li>
                                                <li><hr className="dropdown-divider m-0" /></li>
                                                <li className="hover:bg-gray-300 p-2">
                                                    <Link to="/room"><p className="w-full">ห้อง</p></Link>
                                                </li>
                                            </>
                                        )}
                                        <li><hr className="dropdown-divider m-0" /></li>
                                        <li className="hover:bg-gray-300 p-2">
                                            <Link to="/item"><p className="w-full">สินค้า/บริการ</p></Link>
                                        </li>
                                        <li className="hover:bg-gray-300 p-2">
                                            <Link to="/supplier"><p className="w-full">ผู้จัดจำหน่าย</p></Link>
                                        </li>
                                        <li className="hover:bg-gray-300 p-2">
                                            <Link to="/unit"><p className="w-full">หน่วยนับ</p></Link>
                                        </li>

                                        <li><hr className="dropdown-divider m-0" /></li>
                                        {user?.permissions[0]?.role_id === 1 && (
                                            <>
                                                <li className="hover:bg-gray-300 p-2">
                                                    <Link to="/budget"><p className="w-full">งบประมาณ</p></Link>
                                                </li>
                                                <li className="hover:bg-gray-300 p-2 rounded-b-md">
                                                    {/* <Link to="/unit"><p className="w-full">หน่วยนับ</p></Link> */}
                                                </li>
                                            </>
                                        )}
                                    </>
                                )}
                            </ul>
                        </li>
                    )}
                    <li><Link to="/advice" className="hover:text-gray-400">แนะนำการใช้งาน</Link></li>
                </ul>
                <div className="menu-item max-lg:hidden flex relative">
                    <button className="hover:text-gray-400">
                        {isFetching && <Loading />}
                        {(!isFetching && user) && (
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
                                <p className="w-full text-center">{(!isFetching && user) && user.name}</p>
                            </a>
                        </li>
                        <li className="hover:bg-gray-300 p-2 rounded-b-md">
                            <button type="button" className="w-full" onClick={onLogout}>
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
