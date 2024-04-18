import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormGroup } from 'react-bootstrap'
import { replaceExpensePattern } from '../../../utils'

const itemSchema = Yup.object().shape({
    expense_id: Yup.string().required(),
    description: Yup.string().required(),
    total: Yup.string().required(),
});

const AddExpense = ({ data, formData, onAddItem, onUpdateItem, onClear }) => {
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

    const calculateTotalFromDesc = (desc = '') => {
        const [amount, time, price] = desc.split('*');

        return parseFloat(amount) * parseFloat(time) * parseFloat(price);
    };

    const handleClear = (formik) => {
        formik.resetForm();
        onClear(null);
    };

    const handleSubmit = (values, formik) => {
        if (data) {
            onUpdateItem(values.item_id, { ...values, item })
        } else {
            const expense = formData.find(exp => exp.id === parseInt(values.expense_id, 10));

            onAddItem({ ...values, expense: expense });
        }

        formik.resetForm();
        setItem(null);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                expense_id: item ? item.expense_id : '',
                expense: null,
                description: item? item.description : '',
                total: item ? item.total : '',
            }}
            validationSchema={itemSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <>
                    <div className="flex flex-row gap-2 mb-2">
                        <FormGroup className="w-[75%]">
                            <select
                                name="expense_id"
                                value={formik.values.expense_id}
                                onChange={formik.handleChange}
                                className="form-control text-sm"
                            >
                                <option value="">-- ค่าใช้จ่าย --</option>
                                {formData && formData.map(exp => (
                                    <option value={exp.id} key={exp.id}>
                                        {exp.expense?.name}
                                        {(exp.description && exp.expense?.pattern)
                                            ? (
                                                <span className="text-sm text-red-500 font-thin ml-1">
                                                    {replaceExpensePatternFromDesc(exp.expense?.pattern, exp.description)}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-red-500 font-thin">
                                                    {exp.description && <span>({exp.description})</span>}
                                                </span>
                                            )
                                        }
                                    </option>
                                ))}
                            </select>
                            {(formik.errors.expense_id && formik.touched.expense_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.expense_id}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[15%]">
                            <input
                                type="text"
                                name="total"
                                value={formik.values.total}
                                onChange={formik.handleChange}
                                className="form-control text-sm text-right"
                                placeholder="รวมเป็นเงิน"
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
