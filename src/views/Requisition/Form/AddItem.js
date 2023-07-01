import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormGroup } from 'react-bootstrap'
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa'
import ModalItemList from '../../../components/Modals/ItemList'
import { calculateTotal } from '../../../utils'

const itemSchema = Yup.object().shape({
    item_id: Yup.string().required(),
    price_per_unit: Yup.string().required(),
    unit_id: Yup.string().required(),
    amount: Yup.string().required(),
    total: Yup.string().required(),
});

const AddItem = ({ onAddItem }) => {
    const [item, setItem] = useState(null);
    const [showModalItems, setShowModalItems] = useState(false);

    const handleSubmit = (values, props) => {
        console.log(values, props);
        onAddItem({ ...values, item });
    };

    const handleClear = (formik) => {
        formik.resetForm();
    };

    const handleSelect = (formik, item) => {
        setItem(item);

        formik.setFieldValue('item_id', item?.id);
        // formik.setFieldTouched('item_id', true);
        formik.setFieldValue('price_per_unit', item?.price_per_unit);
        // formik.setFieldTouched('price_per_unit', true);
        formik.setFieldValue('unit_id', item?.unit_id);
        // formik.setFieldTouched('unit_id', true);
        formik.setFieldValue('amount', 1);
        // formik.setFieldTouched('amount', true);
        formik.setFieldValue('total', calculateTotal(item?.price_per_unit, 1));
        formik.setFieldTouched('total', true);
    };

    return (
        <Formik
            initialValues={{
                item_id: '',
                price_per_unit: '',
                unit_id: '',
                amount: '',
                total: '',
            }}
            validationSchema={itemSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <>
                    <ModalItemList
                        isShow={showModalItems}
                        onHide={() => setShowModalItems(false)}
                        onSelect={(item) => handleSelect(formik, item)}
                    />

                    <div className="flex flex-row gap-2 mb-2">
                        <FormGroup className="w-[45%]">
                            <div className="input-group">
                                <div className="form-control h-[38px]">
                                    {item?.name}
                                </div>
                                <input
                                    type="hidden"
                                    name="item_id"
                                    value={formik.values.item_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                    placeholder="รายการ"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowModalItems(true)}
                                >
                                    <FaSearch />
                                </button>
                            </div>
                            {(formik.errors.item_id && formik.touched.item_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.item_id}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[10%]">
                            <input
                                type="text"
                                name="price_per_unit"
                                value={formik.values.price_per_unit}
                                onChange={formik.handleChange}
                                className="form-control"
                                placeholder="ราคาต่อหน่วย"
                            />
                            {(formik.errors.price_per_unit && formik.touched.price_per_unit) && (
                                <span className="text-red-500 text-sm">{formik.errors.price_per_unit}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[10%]">
                            <select
                                name="unit_id"
                                value={formik.values.unit_id}
                                onChange={formik.handleChange}
                                className="form-control"
                            >
                                <option value="">-- เลือกหน่วยนับ --</option>
                                <option value="1">เครื่อง</option>
                            </select>
                            {(formik.errors.unit_id && formik.touched.unit_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.unit_id}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[8%]">
                            <input
                                type="text"
                                name="amount"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                className="form-control"
                                placeholder="จำนวน"
                            />
                            {(formik.errors.amount && formik.touched.amount) && (
                                <span className="text-red-500 text-sm">{formik.errors.amount}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[15%]">
                            <input
                                type="text"
                                name="total"
                                value={formik.values.total}
                                onChange={formik.handleChange}
                                className="form-control"
                                placeholder="รวมเป็นเงิน"
                            />
                            {(formik.errors.total && formik.touched.total) && (
                                <span className="text-red-500 text-sm">{formik.errors.total}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[5%]">
                            <button
                                type="button"
                                className="btn btn-outline-primary w-full"
                                onClick={formik.submitForm}
                            >
                                {/* <FaPlus /> */}
                                เพิ่ม
                            </button>
                        </FormGroup>
                        <FormGroup className="w-[7%]">
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => handleClear(formik)}
                            >
                                {/* <FaTimes /> */}
                                เคลียร์
                            </button>
                        </FormGroup>
                    </div>
                </>
            )}
        </Formik>
    )
}

export default AddItem
