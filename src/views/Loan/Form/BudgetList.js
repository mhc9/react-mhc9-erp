import React from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { currency } from '../../../utils'

const BudgetList = ({ budgets }) => {
    return (
        <>
            <table className="table table-bordered table-striped text-sm">
                <thead>
                    <tr>
                        <th className="text-center w-[5%]">#</th>
                        <th>งบประมาณ</th>
                        <th className="text-center w-[15%]">จำนวนเงิน</th>
                        <th className="text-center w-[10%]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {budgets && budgets.map((data, index) => (
                        <tr className="font-thin">
                            <td className="text-center">{index+1}</td>
                            <td>
                                <p className="text-sm">{data.budget?.name}</p>
                                <p className="font-thin text-xs">{data.budget?.project?.plan?.name}/{data.budget?.project?.name}</p>
                                </td>
                            <td className="text-right">{currency.format(data.total)}</td>
                            <td className="text-center">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    {/* {(!edittingItem || edittingItem?.expense_id !== data.expense_id) && ( */}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-warning"
                                            >
                                            {/* onClick={() => onEditItem(data)} */}
                                            <FaPencilAlt />
                                        </button>
                                    {/* )} */}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        >
                                        {/* onClick={() => onRemoveItem(data.expense_id)} */}
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default BudgetList