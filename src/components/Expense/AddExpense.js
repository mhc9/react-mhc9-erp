import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormGroup } from 'react-bootstrap'
import { toShortTHDate } from '../../utils'
import ModalAddItemDesc from '../Modals/AddItemDesc'

const itemSchema = Yup.object().shape({
    course_id: Yup.string().required(),
    expense_id: Yup.string().required(),
    total: Yup.string().required(),
});

const AddExpense = ({ data, formData, courses, onAddItem, onUpdateItem, onClear }) => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (data) {
            setItem(data);
        }
    }, [data]);

    const handleClear = (formik) => {
        formik.resetForm();
        onClear(null);
    };

    const calculateTotalFromDesc = (desc = '') => {
        if (desc.includes('+')) {
            const groups = desc.split('+');

            return groups.reduce((sum, curVal) => sum + calculatePattern(curVal), 0);
        } else {
            return calculatePattern(desc);
        }
    };

    const calculatePattern = (str) => {
        const [amount, time, price] = str.split('*');

        return parseFloat(amount) * parseFloat(time) * parseFloat(price);
    }

    const getFormDataPattern = (id) => {
        return formData.find(exp => exp.id === parseInt(id, 10))?.pattern;
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
                course_id: item ? item.course_id : '',
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
                        <FormGroup className="w-[10%]">
                            <select
                                name="course_id"
                                value={formik.values.course_id}
                                onChange={formik.handleChange}
                                className="form-control text-sm"
                            >
                                <option value="">-- รุ่น --</option>
                                {courses && courses.map(course => (
                                    <option value={course.id} key={course.id}>
                                        รุ่นที่ {course.seq_no} {course?.course_date && <>วันที่ {toShortTHDate(course?.course_date)}</>} 
                                        ณ {course?.place?.name} จ.{course?.place?.changwat?.name}
                                    </option>
                                ))}
                            </select>
                            {(formik.errors.course_id && formik.touched.course_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.course_id}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[35%]">
                            <select
                                name="expense_id"
                                value={formik.values.expense_id}
                                onChange={formik.handleChange}
                                className="form-control text-sm"
                            >
                                <option value="">-- ค่าใช้จ่าย --</option>
                                {formData && formData.map(exp => (
                                    <option value={exp.id} key={exp.id}>
                                        {exp.name} {exp.pattern}
                                    </option>
                                ))}
                            </select>
                            {(formik.errors.expense_id && formik.touched.expense_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.expense_id}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[30%]">
                            <input
                                type="text"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={(e) => {
                                    formik.setFieldValue(
                                        'total',
                                        (getFormDataPattern(formik.values.expense_id) && e.target.value !== '') ? calculateTotalFromDesc(e.target.value) : ''
                                    )
                                }}
                                className="form-control text-sm"
                                placeholder="รายละเอียด"
                            />
                            {(formik.errors.description && formik.touched.description) && (
                                <span className="text-red-500 text-sm">{formik.errors.description}</span>
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
