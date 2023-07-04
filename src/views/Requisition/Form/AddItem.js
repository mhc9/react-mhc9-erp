import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import ModalItemList from '../../../components/Modals/ItemList'
import { calculateTotal } from '../../../utils'

const itemSchema = Yup.object().shape({
    item_id: Yup.string().required(),
    price: Yup.string().required(),
    unit_id: Yup.string().required(),
    amount: Yup.string().required(),
    total: Yup.string().required(),
});

const AddItem = ({ data, onAddItem }) => {
    const [item, setItem] = useState(null);
    const [showModalItems, setShowModalItems] = useState(false);

    useEffect(() => {
        if (data) {
            setItem(data.item);
        }
    }, [data]);

    const handleClear = (formik) => {
        formik.resetForm();
        setItem(null);
    };

    const handleSelect = (formik, item) => {
        setItem(item);

        formik.setFieldValue('item_id', item?.id);
        // formik.setFieldTouched('item_id', true);
        formik.setFieldValue('price', item?.price);
        // formik.setFieldTouched('price', true);
        formik.setFieldValue('unit_id', item?.unit_id);
        // formik.setFieldTouched('unit_id', true);
        formik.setFieldValue('amount', 1);
        // formik.setFieldTouched('amount', true);
        formik.setFieldValue('total', calculateTotal(item?.price, 1));
        formik.setFieldTouched('total', true);
    };

    const handleSubmit = (values, formik) => {
        onAddItem({ ...values, item });

        formik.resetForm();
        setItem(null);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                item_id: data ? data.item_id : '',
                price: data ? data.price : '',
                unit_id: data ? data.unit_id : '',
                amount: data ? data.amount : '',
                total: data ? data.total : '',
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
                                <div className="form-control text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                                    {item ? item?.name : <span className="text-gray-400">รายการสินค้า</span>}
                                </div>
                                <input
                                    type="hidden"
                                    name="item_id"
                                    value={formik.values.item_id}
                                    onChange={formik.handleChange}
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
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                className="form-control text-sm"
                                placeholder="ราคาต่อหน่วย"
                            />
                            {(formik.errors.price && formik.touched.price) && (
                                <span className="text-red-500 text-sm">{formik.errors.price}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[10%]">
                            <select
                                name="unit_id"
                                value={formik.values.unit_id}
                                onChange={formik.handleChange}
                                className="form-control text-sm"
                            >
                                <option value="">-- หน่วยนับ --</option>
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
                                className="form-control text-sm"
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
                                className="form-control text-sm"
                                placeholder="รวมเป็นเงิน"
                            />
                            {(formik.errors.total && formik.touched.total) && (
                                <span className="text-red-500 text-sm">{formik.errors.total}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[5%]">
                            <button
                                type="button"
                                className="btn btn-outline-primary w-full text-sm"
                                onClick={formik.submitForm}
                            >
                                {/* <FaPlus /> */}
                                เพิ่ม
                            </button>
                        </FormGroup>
                        <FormGroup className="w-[7%]">
                            <button
                                type="button"
                                className="btn btn-outline-danger text-sm"
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
