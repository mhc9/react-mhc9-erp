import React from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { currency, replaceExpensePatternFromDesc } from '../../../utils'

const ExpenseList = ({ items, showButtons=true, edittingItem,  onEditItem, onRemoveItem }) => {
    return (
        <table className="table table-bordered table-striped text-sm mb-2">
            <thead>
                <tr>
                    <th className="w-[5%] text-center">#</th>
                    <th>รายการ</th>
                    <th className="w-[10%] text-center">ยอดใช้จริง</th>
                    <th className="w-[10%] text-center">คงเหลือ</th>
                    {showButtons && <th className="w-[10%] text-center">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {items && items.map((data, index) => (
                    <tr key={data.contract_detail_id} className="font-thin">
                        <td className="text-center">{index+1}</td>
                        <td>
                            <p className="text-gray-500 font-thin">
                                {data.contract_detail?.expense?.name}
                                {(data.contract_detail?.description && data.contract_detail?.expense?.pattern)
                                    ? (
                                        <span className="text-sm text-red-500 font-thin ml-1">
                                            {replaceExpensePatternFromDesc(data.contract_detail?.expense?.pattern, data.description)}
                                        </span>
                                    ) : (
                                        <>
                                            {data.contract_detail?.description && 
                                                <span className="text-sm text-red-500 font-thin ml-1">
                                                    ({data.contract_detail?.description})
                                                </span>
                                            }
                                        </>
                                    )
                                }

                                {/* <span className="ml-1">งบประมาณ {currency.format(data.contract_detail?.total)} บาท</span> */}
                            </p>
                        </td>
                        <td className="text-right">{currency.format(data.total)}</td>
                        <td className="text-right">
                            {data.contract_detail?.total - data.total < 0 && <span className="text-red-600 font-bold">
                                {currency.format(data.contract_detail?.total - data.total)}
                            </span>}
                            {data.contract_detail?.total - data.total >= 0 && <span className="text-green-600 font-bold">
                                {currency.format(data.contract_detail?.total - data.total)}
                            </span>}
                        </td>
                        {showButtons && (
                            <td className="text-center">
                                {(!edittingItem || edittingItem?.expense_id !== data.expense_id) && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-warning mr-1"
                                        onClick={() => onEditItem(data)}
                                    >
                                        <FaPencilAlt />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onRemoveItem(data.expense_id)}
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

export default ExpenseList
