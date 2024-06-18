import React, { Fragment } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { currency, replaceExpensePatternFromDesc, toShortTHDate } from '../../utils'

const ExpenseList = ({ items, courses, showButtons=true, edittingItem,  onEditItem, onRemoveItem }) => {
    const renderExpenseRow = (data, index) => {
        return (
            <tr className="font-thin">
                <td className="text-center">{index}</td>
                <td>
                    <p className="text-gray-500 font-thin">
                        {data.expense?.name}
                        {(data.description && data.expense?.pattern)
                            ? (
                                <span className="text-xs text-red-500 font-thin ml-1">
                                    {replaceExpensePatternFromDesc(data.expense?.pattern, data.description)}
                                </span>
                            ) : (
                                <span className="text-xs text-red-500 font-thin">
                                    {data.description && <span>({data.description})</span>}
                                </span>
                            )
                        }
                    </p>
                </td>
                <td className="text-right">{currency.format(data.total)}</td>
                {showButtons && (
                    <td className="text-center">
                        {(!edittingItem || edittingItem?.id !== data.id) && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-warning mr-1 p-1"
                                onClick={() => onEditItem(data)}
                            >
                                <FaPencilAlt />
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger p-1"
                            onClick={() => onRemoveItem(data.id)}
                        >
                            <FaTrash />
                        </button>
                    </td>
                )}
            </tr>
        )
    };

    return (
        <table className="table table-bordered table-striped table-hover text-sm mb-2">
            <thead>
                <tr>
                    <th className="w-[5%] text-center">#</th>
                    <th>รายการ</th>
                    <th className="w-[15%] text-center">รวมเป็นเงิน</th>
                    {showButtons && <th className="w-[8%] text-center">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {(courses && courses.length > 1)
                    ? courses.map(course => {
                        let seq = 0;

                        return (
                            <Fragment key={course.id} >
                                <tr>
                                    <td colSpan={4}>
                                        {/* รุ่นที่ {course.seq_no} */}
                                        {course?.course_date && <span className="mr-1">วันที่ {toShortTHDate(course?.course_date)}</span>} 
                                        ณ {course?.place?.name} จ.{course?.place?.changwat?.name}
                                    </td>
                                </tr>
                                {items && items.map((data, index) => (
                                    <Fragment key={index}>
                                        {(parseInt(data.course_id, 10) === course.id && !data.removed) && renderExpenseRow(data, ++seq)}
                                    </Fragment>
                                ))}
                            </Fragment>
                        )})
                    : items && items.map((data, index) => (
                        <Fragment key={index}>
                            {!data.removed && renderExpenseRow(data, ++index)}
                        </Fragment>
                    ))}
            </tbody>
        </table>
    )
}

export default ExpenseList
