import React, { Fragment, useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormGroup } from 'react-bootstrap'
import { currency, replaceExpensePattern, toShortTHDate } from '../../../utils'

const itemSchema = Yup.object().shape({
    contract_detail_id: Yup.string().required(),
    total: Yup.string().required(),
});

const AddExpense = ({ data, expenses, courses, refundType, onAddItem, onUpdateItem, onClear }) => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (data) {
            setItem(data);
        }
    }, [data]);

    const replaceExpensePatternFromDesc = (pattern = '', replacement = '') => {
        if (replacement.includes('+')) {
            const groups = replacement.split('+').map(group => replaceExpensePattern(pattern, group));

            return groups.join('+');
        } else {
            return replaceExpensePattern(pattern, replacement);
        }
    };

    const handleClear = (formik) => {
        formik.resetForm();
        onClear(null);
    };

    const handleSubmit = (values, formik) => {
        if (data) {
            onUpdateItem(values.item_id, { ...values, item })
        } else {
            const detail = expenses.find(cd => cd.id === parseInt(values.contract_detail_id, 10));

            onAddItem({ ...values, contract_detail: detail });
        }

        formik.resetForm();
        setItem(null);
    };

    console.log(courses);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                contract_detail_id: item ? item.contract_detail_id : '',
                contract_detail: null,
                total: item ? item.total : '',
            }}
            validationSchema={itemSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <>
                    <div className="flex flex-row gap-2 mb-2">
                        <FormGroup className="w-[70%]">
                            <select
                                name="contract_detail_id"
                                value={formik.values.contract_detail_id}
                                onChange={formik.handleChange}
                                className="form-control text-sm"
                            >
                                <option value="">-- ค่าใช้จ่าย --</option>
                                {(courses && courses.length > 1) ? courses.map(course => {
                                    let index = 0;

                                    return (
                                        <optgroup key={course.id} label={`รุ่นที่ ${course.seq_no} วันที่ ${toShortTHDate(course.course_date)}`}>
                                            {expenses && expenses.map(data => (
                                                <Fragment key={data.id}>
                                                    {data.loan_detail.course_id === course.id && (
                                                        <option value={data.id}>
                                                            {++index}. <>{data.expense?.name}</>&nbsp;
                                                            {(data.description && data.expense?.pattern)
                                                                ? <>{replaceExpensePatternFromDesc(data.expense?.pattern, data.description)}</>
                                                                : <>{data.description && <>({data.description})</>}</>
                                                            }
                                                            &nbsp;งบประมาณ <>{currency.format(data.total)} บาท</>
                                                        </option>
                                                    )}
                                                </Fragment>
                                            ))}
                                        </optgroup>
                                    )
                                }) : (
                                    <>
                                        {expenses && expenses.map((data, index) => (
                                            <option value={data.id} key={data.id}>
                                                {++index}. <>{data.expense?.name}</>&nbsp;
                                                {(data.description && data.expense?.pattern)
                                                    ? <>{replaceExpensePatternFromDesc(data.expense?.pattern, data.description)}</>
                                                    : <>{data.description && <>({data.description})</>}</>
                                                }
                                                &nbsp;งบประมาณ <>{currency.format(data.total)} บาท</>
                                            </option>
                                        ))}
                                    </>
                                )}

                            </select>
                            {(formik.errors.contract_detail_id && formik.touched.contract_detail_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.contract_detail_id}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[20%]">
                            <input
                                type="text"
                                name="total"
                                value={formik.values.total}
                                onChange={formik.handleChange}
                                className="form-control text-sm text-right"
                                placeholder="ยอดใช้จริง"
                            />
                            {(formik.errors.total && formik.touched.total) && (
                                <span className="text-red-500 text-sm">{formik.errors.total}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[10%]">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button
                                    type="button"
                                    className={`btn ${data ? 'btn-outline-warning' : 'btn-outline-primary'} text-sm min-[992px]:px-2 max-[992px]:px-1`}
                                    onClick={formik.submitForm}
                                >
                                    {/* <FaPlus /> */}
                                    {data ? 'แก้ไข' : 'เพิ่ม'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger text-xs min-[1285px]:text-sm  max-[1285px]:px-1 min-[1285px]:px-2"
                                    onClick={() => handleClear(formik)}
                                >
                                    {/* <FaTimes /> */}
                                    {data ? 'ยกเลิก' : 'เคลียร์'}
                                </button>
                            </div>
                        </FormGroup>
                    </div>
                </>
            )}
        </Formik>
    )
}

export default AddExpense
