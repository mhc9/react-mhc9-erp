import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimes, FaAngleDown, FaAngleUp } from 'react-icons/fa'

const Sidebar = ({ isShow, toggleShow, onLogout }) => {
    return (
        <div className={`sidebar border absolute top-0 w-[220px] h-full overflow-scroll ${isShow ? 'left-0' : 'left-[-220px]'} bg-white md:hidden transition-all ease-in-out delay-300 z-[999]`}>
            <div className={`relative p-2 h-full ${isShow ? 'menu-link justify-between' : 'hidden'} overflow-hidden`}>
                <div>
                    <div className="w-full text-black py-2 flex flex-row justify-end items-center mb-3">
                        <FaTimes className="hover:text-blue-600 cursor-pointer" onClick={() => toggleShow(!isShow)} />
                    </div>
                    <div>
                        <div className="menu-link">
                            <button type="button">
                                บริการ
                                <FaAngleDown />
                            </button>
                            <ul className="sub-menus">
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/task"><p className="w-full">รายการแจ้งปัญหา</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/task/add"><p className="w-full">แจ้งปัญหา</p></Link>
                                </li>
                            </ul>
                        </div>

                        <hr className="border-b-1 border-gray-400 m-0" />

                        <div className="menu-link">
                            <button type="button" className="text-black text-left p-2 hover:bg-blue-500 rounded-md flex flex-row items-center justify-between">
                                จัดซื้อจัดจ้าง
                                <FaAngleDown />
                            </button>
                            <ul className="sub-menus">
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/requisition"><p className="w-full">คำขอซื้อ/จ้าง</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/order"><p className="w-full">ใบสั่งซื้อ/จ้าง</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/inspection"><p className="w-full">ตรวจรับพัสดุ</p></Link>
                                </li>
                            </ul>
                        </div>

                        <hr className="border-1 border-gray-400 m-0" />

                        <div className="menu-link">
                            <button type="button" className="text-black text-left p-2 hover:bg-blue-500 rounded-md flex flex-row items-center justify-between">
                                ข้อมูลพื้ฐาน
                                <FaAngleDown />
                            </button>
                            <ul className="sub-menus">
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/asset"><p className="w-full">พัสดุ</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/asset-type"><p className="w-full">ประเภทพัสดุ</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/asset-category"><p className="w-full">ชนิดพัสดุ</p></Link>
                                </li>
                                {/* <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/equipment"><p className="w-full">อุปกรณ์</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/equipment-type"><p className="w-full">ประเภทอุปกรณ์</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/equipment-group"><p className="w-full">กลุ่มอุปกรณ์</p></Link>
                                </li> */}
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/employee"><p className="w-full">บุคลากร</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/department"><p className="w-full">กลุ่มงาน</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/division"><p className="w-full">งาน</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/room"><p className="w-full">ห้อง</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/item"><p className="w-full">สินค้า/บริการ</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/supplier"><p className="w-full">ผู้จัดจำหน่าย</p></Link>
                                </li>
                                <li className="hover:bg-gray-300 font-thin py-2 pl-4 rounded-md" onClick={() => toggleShow(false)}>
                                    <Link to="/unit"><p className="w-full">หน่วย</p></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 text-black p-2 w-full">
                    <button
                        type="button"
                        className="hover:bg-blue-500 hover:text-white p-2 rounded-md w-full flex flex-row items-center justify-center gap-1"
                        onClick={onLogout}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
