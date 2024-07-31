import React, { Fragment } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { currency } from '../../../utils'

const ItemList = ({ items, showButtons=true, onEditItem, onRemoveItem }) => {
    return (
        <table className="table table-bordered table-striped text-sm mb-2">
            <thead>
                <tr>
                    <th className="w-[5%] text-center">#</th>
                    <th>รายการ</th>
                    <th className="w-[12%] text-center">ราคาต่อหน่วย</th>
                    <th className="w-[8%] text-center">จำนวน</th>
                    <th className="w-[10%] text-center">หน่วยนับ</th>
                    <th className="w-[15%] text-center">รวมเป็นเงิน</th>
                    {showButtons && <th className="w-[10%] text-center">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {items && items.map((data, index) => (
                    <tr className="font-thin" key={data.id}>
                        <td className="text-center">{index+1}</td>
                        <td>
                            <p className="text-gray-500 font-thin">{data.item?.category?.name}</p>
                            <p className="text-sm">{data.item?.name}</p>
                            {data.description && (
                                <p className="text-xs text-gray-400 font-thin">{data.description}</p>
                            )}
                        </td>
                        <td className="text-center">{currency.format(data.price)}</td>
                        <td className="text-center">{currency.format(data.amount)}</td>
                        <td className="text-center">{data.unit?.name}</td>
                        <td className="text-right">{currency.format(data.total)}</td>
                        {showButtons && (
                            <td className="text-center">
                                <button type="button" className="btn btn-outline-warning btn-sm px-1 mr-1" onClick={() => onEditItem(data)}>
                                    <FaPencilAlt />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm px-1"
                                    onClick={() => onRemoveItem(data.id, !data.requisition_id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ItemList
