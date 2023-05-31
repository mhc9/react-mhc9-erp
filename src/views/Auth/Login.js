import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[100vh] border bg-gray-200">
            <div className="login-box flex flex-col justify-center items-center bg-white border rounded-md p-10">
                <h2 className="text-xl">ระบบ <b>IT</b> Helpdesk</h2>
                <div>
                    <div className="flex flex-row gap-2 justify-center items-center my-2">
                        <label className="w-3/12">ชื่อผู้ใช้ :</label>
                        <div className="border px-4 py-1 rounded-2xl w-3/4">
                            <input type="text" placeholder="Username" className="outline-none" />
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 justify-center items-center my-2">
                        <label className="w-3/12">รหัสผ่าน :</label>
                        <div className="border px-4 py-1 rounded-2xl w-3/4">
                            <input type="password" placeholder="Password" className="outline-none" />
                        </div>
                    </div>

                    <div className="flex flex-row gap-1 justify-center items-center">
                        <label className="w-3/12"></label>
                        <div className="w-3/4 flex justify-between items-center">
                            <button className="bg-green-600 rounded-full px-4 py-1 text-white hover:bg-green-900">
                                ล็อกอิน
                                <i className="fas fa-sign-in-alt ml-1"></i>
                            </button>
                            <Link to="/register" className="hover:text-blue-500 mr-1">
                                <i class="fas fa-user-plus"></i> ลงทะเบียน
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login