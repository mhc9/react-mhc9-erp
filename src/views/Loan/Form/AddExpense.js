import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormGroup } from 'react-bootstrap'
import ModalAddItemDesc from '../../../components/Modals/AddItemDesc'

const itemSchema = Yup.object().shape({
    expense_id: Yup.string().required(),
    description: Yup.string().required(),
    total: Yup.string().required(),
});

const AddExpense = ({ data, formData, onAddItem, onUpdateItem, onClear }) => {
    const [item, setItem] = useState(null);
    const [showModalAddItemDesc, setShowModalAddItemDesc] = useState(false);

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
        const [amount, time, price] = desc.split('*');

        return parseFloat(amount) * parseFloat(time) * parseFloat(price);
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
                    <ModalAddItemDesc
                        isShow={showModalAddItemDesc}
                        onHide={() => setShowModalAddItemDesc(false)}
                        onConfirm={(desc) => formik.setFieldValue('description', desc)}
                    />

                    <div className="flex flex-row gap-2 mb-2">
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
                            {(formik.errors.item_id && formik.touched.item_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.item_id}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[40%]">
                            <input
                                type="text"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={(e) => formik.setFieldValue('total', calculateTotalFromDesc(e.target.value))}
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
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button
                                    type="button"
                                    className={`btn ${data ? 'btn-outline-warning' : 'btn-outline-primary'} w-full text-sm`}
                                    onClick={formik.submitForm}
                                >
                                    {/* <FaPlus /> */}
                                    {data ? 'แก้ไข' : 'เพิ่ม'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger text-sm"
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
