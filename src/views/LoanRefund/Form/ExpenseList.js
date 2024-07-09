import React, { Fragment } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { currency, replaceExpensePatternFromDesc, toShortTHDate } from '../../../utils'

const ExpenseList = ({ items, courses, showButtons=true, edittingItem,  onEditItem, onRemoveItem }) => {
    return (
        <table className="table table-bordered table-striped table-hover text-sm mb-2">
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
                {(courses && courses.length > 1)
                    ? courses.map(course => (
                        <Fragment key={course.id}>
                            <tr>
                                <td colSpan={5}>
                                    รุ่นที่ {course.seq_no} {course?.course_date && <span>วันที่ {toShortTHDate(course?.course_date)}</span>} 
                                    ณ {course?.place?.name} จ.{course?.place?.changwat?.name}
                                </td>
                            </tr>

                            {items && items.map((data, index) => (
                                <Fragment key={data.contract_detail_id}>
                                    {data.contract_detail?.loan_detail?.course_id === course.id && <tr className="font-thin">
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
                                                    onClick={() => onRemoveItem(data.contract_detail_id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        )}
                                    </tr>}
                                </Fragment>
                            ))}
                        </Fragment>
                    )) : (
                        <Fragment>
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
                                                onClick={() => onRemoveItem(data.contract_detail_id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </Fragment>
                    )}
            </tbody>
        </table>
    )
}

export default ExpenseList
