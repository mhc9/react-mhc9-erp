import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormGroup } from 'react-bootstrap'
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa'
import ModalItemList from '../../../components/Modals/ItemList'

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
                        onSelect={(item) => console.log(item)}
                    />

                    <div className="flex flex-row gap-2 mb-2">
                        <FormGroup className="w-[45%]">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="รายการ"
                                />
                                <input
                                    type="hidden"
                                    name="item_id"
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
                                className="form-control"
                                placeholder="หน่วยนับ"
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
