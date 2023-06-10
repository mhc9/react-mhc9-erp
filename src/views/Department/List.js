import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillBulb } from 'react-icons/ai'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

const DepartmentList = () => {
    return (
        <div className="mt-2">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="w-[5%] text-center">#</th>
                        <th>ชื่อกลุ่มงาน</th>
                        <th className="w-[10%] text-center">สถานะ</th>
                        <th className="w-[10%] text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center"></td>
                        <td></td>
                        <td className="text-center">
                            <button type="button" className="text-success">
                                <AiFillBulb size={'1.5rem'} />
                            </button>
                        </td>
                        <td className="text-center">
                            <Link to={`/assets/.../edit`} className="btn btn-sm btn-warning mr-1">
                                <FaPencilAlt />
                            </Link>
                            <button className="btn btn-sm btn-danger">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DepartmentList
