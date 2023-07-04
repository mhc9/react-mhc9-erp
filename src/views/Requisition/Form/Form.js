import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import AddItem from './AddItem'
import ItemList from './ItemList'
import { FaSearch } from 'react-icons/fa'
import { calculateNetTotal } from '../../../utils'

const requisitionSchema = Yup.object().shape({
    pr_no: Yup.string().required(),
    pr_date: Yup.string().required(),
    requester_id: Yup.string().required(),
    division_id: Yup.string().required(),
    budget_id: Yup.string().required(),
    reason: Yup.string().required(),
});

const RequisitionForm = () => {
    const [items, setItems] = useState([]);
    const [requester, setRequester] = useState(null);
    const [edittedItem, setEdittedItem] = useState(null);

    const handleAddItem = (formik, item) => {
        const newItems = [...items, item];

        setItems(newItems);
        formik.setFieldValue('item_count', newItems.length);
        formik.setFieldValue('net_total', calculateNetTotal(newItems));
    };

    const handleEditItem = (data) => {
        setEdittedItem(data);
    };

    const handleUpdateItem = (formik, id, data) => {
        console.log(id, data);
        const updatedItems = items.map(item => {
            if (item.item_id === id) return { ...data };

            return item;
        });

        // setItems(updatedItems);
        // formik.setFieldValue('item_count', updatedItems.length);
        // formik.setFieldValue('net_total', calculateNetTotal(updatedItems));
    };

    const handleRemoveItem = (formik, id) => {
        const newItems = items.filter(item => item.item_id !== id);

        setItems(newItems);
        formik.setFieldValue('item_count', newItems.length);
        formik.setFieldValue('net_total', calculateNetTotal(newItems));
    };

    const handleSubmit = (values, formik) => {
        console.log(values, formik);
    };

    return (
        <Formik
            initialValues={{
                pr_no: '',
                pr_date: '',
                requester_id: '',
                division_id: '',
                budget_id: '',
                reason: '',
                item_count: 0,
                net_total: '',
                items: []
            }}
            validationSchema={requisitionSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-3">
                            <Col>
                                <label htmlFor="">เลขที่เอกสาร</label>
                                <input
                                    type="text"
                                    name="pr_no"
                                    className="form-control"
                                />
                                {(formik.errors.pr_no && formik.touched.pr_no) && (
                                    <span className="text-red-500 text-sm">{formik.errors.pr_no}</span>
                                )}
                            </Col>
                            <Col>
                                <label htmlFor="">วันที่เอกสาร</label>
                                <input
                                    type="text"
                                    name="pr_date"
                                    className="form-control"
                                />
                                {(formik.errors.pr_date && formik.touched.pr_date) && (
                                    <span className="text-red-500 text-sm">{formik.errors.pr_date}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={4}>
                                <label htmlFor="">หน่วยงาน</label>
                                <select
                                    name="division_id"
                                    className="form-control"
                                >
                                    <option value="">-- เลือกหน่วยงาน --</option>
                                </select>
                                {(formik.errors.division_id && formik.touched.division_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.division_id}</span>
                                )}
                            </Col>
                            <Col md={4}>
                                <label htmlFor="">ผู้ขอ</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="requester_id"
                                        className="form-control"
                                    />
                                    <button type="button" className="btn btn-outline-secondary">
                                        <FaSearch />
                                    </button>
                                </div>
                                {(formik.errors.requester_id && formik.touched.requester_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.requester_id}</span>
                                )}
                            </Col>
                            <Col md={4}>
                                <label htmlFor="">งบประมาณ</label>
                                <input
                                    type="text"
                                    name="budget_id"
                                    className="form-control"
                                />
                                {(formik.errors.budget_id && formik.touched.budget_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.budget_id}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <label htmlFor="">เหตุผลที่ขอ</label>
                                <textarea
                                    rows={3}
                                    name="reason"
                                    className="form-control"
                                ></textarea>
                                {(formik.errors.reason && formik.touched.reason) && (
                                    <span className="text-red-500 text-sm">{formik.errors.reason}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการสินค้า</h1>
                                    <AddItem
                                        data={edittedItem}
                                        onAddItem={(item) => handleAddItem(formik, item)}
                                        onUpdateItem={(id, item) => handleUpdateItem(formik, id, item)}
                                    />
                                    <ItemList
                                        items={items}
                                        onEditItem={(data) => handleEditItem(data)}
                                        onRemoveItem={(id) => handleRemoveItem(formik, id)}
                                    />

                                    <div className="flex flex-row justify-end">
                                        <div className="w-[15%]">
                                            <input
                                                type="text"
                                                name="net_total"
                                                value={formik.values.net_total}
                                                onChange={formik.handleChange}
                                                placeholder="รวมเป็นเงินทั้งสิ้น"
                                                className="form-control float-right text-right"
                                            />
                                            {(formik.errors.net_total && formik.touched.net_total) && (
                                                <span className="text-red-500 text-sm">{formik.errors.net_total}</span>
                                            )}
                                        </div>
                                        <div className="w-[10%]"></div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button type="submit" className="btn btn-outline-primary float-right">
                                    บันทึก
                                </button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default RequisitionForm
