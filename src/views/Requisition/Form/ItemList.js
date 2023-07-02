import React from 'react'
import { Link } from 'react-router-dom'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { currency } from '../../../utils'

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
                {items && items.map((data, index) => (
                    <tr key={data.item?.id}>
                        <td className="text-center">{index+1}</td>
                        <td>
                            <p className="text-sm text-gray-500 font-thin">{data.item.category.name}</p>
                            {data.item?.name}
                        </td>
                        <td className="text-center">{currency.format(data.price_per_unit)}</td>
                        <td className="text-center">{data.item.unit?.name}</td>
                        <td className="text-center">{currency.format(data.amount)}</td>
                        <td className="text-right">{currency.format(data.total)}</td>
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
