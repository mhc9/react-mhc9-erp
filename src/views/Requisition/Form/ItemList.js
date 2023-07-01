import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

const ItemList = ({ items }) => {
    return (
        <table className="table table-bordered table-striped mb-2">
            <thead>
                <tr>
                    <th className="w-[5%] text-center">#</th>
                    <th>รายการ</th>
                    <th className="w-[15%] text-center">ราคาต่อหน่วย</th>
                    <th className="w-[10%] text-center">หน่วยนับ</th>
                    <th className="w-[8%] text-center">จำนวน</th>
                    <th className="w-[15%] text-center">รวมเป็นเงิน</th>
                    <th className="w-[10%] text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items && items.map((item, index) => (
                    <tr key={item}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-center">
                            <Link to={`/employees/${''}/edit`} className="btn btn-sm btn-warning mr-1">
                                <FaPencilAlt />
                            </Link>
                            <button className="btn btn-sm btn-danger">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ItemList
