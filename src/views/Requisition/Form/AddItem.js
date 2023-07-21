import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import ModalItemList from '../../../components/Modals/ItemList'
import ModalAddItemDesc from '../../../components/Modals/AddItemDesc'
import { calculateTotal } from '../../../utils'
import { useGetInitialFormDataQuery } from '../../../services/item/itemApi'

const itemSchema = Yup.object().shape({
    item_id: Yup.string().required(),
    price: Yup.string().required(),
    unit_id: Yup.string().required(),
    amount: Yup.string().required(),
    total: Yup.string().required(),
});

const initialFormData = {
    units: [],
    categories: [],
};

const AddItem = ({ data, filteredCategory, onAddItem, onUpdateItem }) => {
    const [item, setItem] = useState(null);
    const [showModalItems, setShowModalItems] = useState(false);
    const [showModalAddItemDesc, setShowModalAddItemDesc] = useState(false);
    const { data: formData = initialFormData } = useGetInitialFormDataQuery();

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

        handleCalculateTotal(formik, item?.price, 1);
    };

    const handleCalculateTotal = (formik, price, amount) => {
        formik.setFieldValue('total', calculateTotal(price, amount));
        formik.setFieldTouched('total', true);
    };

    const handleSubmit = (values, formik) => {
        if (data) {
            onUpdateItem(values.item_id, { ...values, item })
        } else {
            onAddItem({ ...values, item });
        }

        formik.resetForm();
        setItem(null);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                item_id: data ? data.item_id : '',
                description: data? data.description : '',
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
                        category={filteredCategory}
                    />

                    <ModalAddItemDesc
                        isShow={showModalAddItemDesc}
                        onHide={() => setShowModalAddItemDesc(false)}
                        onConfirm={(desc) => formik.setFieldValue('description', desc)}
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
                        <FormGroup>
                            <button
                                type="button"
                                className="btn btn-outline-info text-sm"
                                onClick={() => setShowModalAddItemDesc(true)}
                            >
                                Desc
                            </button>
                        </FormGroup>
                        <FormGroup className="w-[10%]">
                            <input
                                type="text"
                                name="price"
                                value={formik.values.price}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    handleCalculateTotal(formik, e.target.value, formik.values.amount);
                                }}
                                className="form-control text-sm text-right"
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
                                disabled={data}
                            >
                                <option value="">-- หน่วยนับ --</option>
                                {formData.units && formData.units.map(unit => (
                                    <option value={unit.id} key={unit.id}>
                                        {unit.name}
                                    </option>
                                ))}
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
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    handleCalculateTotal(formik, formik.values.price, e.target.value);
                                }}
                                className="form-control text-sm text-center"
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
                                className="form-control text-sm text-right"
                                placeholder="รวมเป็นเงิน"
                            />
                            {(formik.errors.total && formik.touched.total) && (
                                <span className="text-red-500 text-sm">{formik.errors.total}</span>
                            )}
                        </FormGroup>
                        <FormGroup className="w-[5%]">
                            <button
                                type="button"
                                className={`btn ${data ? 'btn-outline-warning' : 'btn-outline-primary'} w-full text-sm`}
                                onClick={formik.submitForm}
                            >
                                {/* <FaPlus /> */}
                                {data ? 'อัพเดต' : 'เพิ่ม'}
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
