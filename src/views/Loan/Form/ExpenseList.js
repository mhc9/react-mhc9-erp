import React from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { currency } from '../../../utils'

const ExpenseList = ({ items, showButtons=true, isEditting,  onEditItem, onRemoveItem }) => {
    const replaceExpensePattern = (pattern = '', replacement = '') => {
        const [p_amount, p_time, p_price] = pattern.split('X');
        const [r_amount, r_time, r_price] = replacement.split('*');

        return `${p_amount.replace('...', r_amount)}X${p_time.replace('...', r_time)}X${p_price.replace('...', r_price)}`;
    };

    return (
        <table className="table table-bordered table-striped text-sm mb-2">
            <thead>
                <tr>
                    <th className="w-[5%] text-center">#</th>
                    <th>รายการ</th>
                    <th className="w-[15%] text-center">รวมเป็นเงิน</th>
                    {showButtons && <th className="w-[10%] text-center">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {items && items.map((data, index) => (
                    <tr key={data.expense_id} className="font-thin">
                        <td className="text-center">{index+1}</td>
                        <td>
                            <p className="text-gray-500 font-thin">{data.expense?.name}</p>
                            <p className="text-xs">{data.item?.name}</p>
                            {data.description && (
                                <p className="text-sm text-gray-400 font-thin">
                                    {replaceExpensePattern(data.expense?.pattern, data.description)}
                                </p>
                            )}
                        </td>
                        <td className="text-right">{currency.format(data.total)}</td>
                        {showButtons && (
                            <td className="text-center">
                                {!isEditting && (
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
