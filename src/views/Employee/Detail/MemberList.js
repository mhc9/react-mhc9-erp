import React from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

const MemberList = ({ members }) => {
    return (
        <div className="mt-4">
            <div className="flex flex-row justify-between items-center mb-2">
                <h2 className="font-bold text-lg">สังกัดหน่วยงาน</h2>

                <button className="btn btn-primary btn-sm">
                    เพิ่ม
                </button>
            </div>

            <table className="table table-bordered text-sm">
                <thead>
                    <tr>
                        <th className="text-center w-[5%]">#</th>
                        <th>หน่วยงาน</th>
                        <th className="text-center w-[20%]">บทบาท/หน้าที่</th>
                        <th className="text-center w-[10%]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members && members.map((member, index) => (
                        <tr key={member.id} className="font-thin">
                            <td className="text-center">{index+1}</td>
                            <td>{member.division.name}</td>
                            <td className="text-center">ผู้ปฏิบัติงาน</td>
                            <td className="text-center">
                                <button className="btn btn-warning btn-sm px-1 mr-1">
                                    <FaPencilAlt />
                                </button>
                                <button className="btn btn-danger btn-sm px-1">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MemberList