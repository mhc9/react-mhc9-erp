import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaPencilAlt, FaTrash } from 'react-icons/fa'

const OwnershipList = ({ assetId }) => {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="w-[5%] text-center">#</th>
                        <th className="w-[20%] text-center">วันที่รับ</th>
                        <th>ผู้ดูแล</th>
                        <th className="w-[15%] text-center">สถานะ</th>
                        <th className="w-[10%] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td></td>
                        <td className="text-center"></td>
                        <td className="text-center">
                            <Link to={`/asset//edit`} className="btn btn-sm btn-warning mr-1">
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

export default OwnershipList
