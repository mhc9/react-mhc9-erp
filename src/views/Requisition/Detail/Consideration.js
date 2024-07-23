import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers'
import { Col, Row } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import ModalSupplierList from '../../../components/Modals/Supplier'

const Consideration = ({ requisition }) => {
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedConsiderDate, setSelectedConsiderDate] = useState(moment());
    const [selectedNoticeDate, setSelectedNoticeDate] = useState(moment());
    const [selectedDeliverDate, setSelectedDeliverDate] = useState(moment());

    return (
        <Formik
            initialValues={{
                consider_no: '',
                consider_date: '',
                notice_date: '',
                supplier_id: '',
                deliver_date: '',
                deliver_days: '0',
            }}
            onSubmit={(values, formik) => console.log(values)}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalSupplierList
                            isShow={showSupplierModal}
                            onHide={() => setShowSupplierModal(false)}
                            onSelect={(supplier) => {
                                setSelectedSupplier(supplier);
                                formik.setFieldValue('supplier_id', supplier.id);
                            }}
                        />

                        <Row>
                            <Col md={5}>
                                <label htmlFor="">เลขที่รายงาน</label>
                                <input
                                    type="text"
                                    name="consider_no"
                                    value={formik.values.consider_no}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.consider_no && formik.touched.consider_no) && (
                                    <span className="text-red-500 text-sm">{formik.errors.consider_no}</span>
                                )}
                            </Col>
                            <Col md={3}>
                                <div className="flex flex-col">
                                    <label htmlFor="">วันที่รายงาน</label>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedConsiderDate}
                                        onChange={(date) => {
                                            setSelectedConsiderDate(date);
                                            formik.setFieldValue('consider_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                    />
                                </div>
                                {(formik.errors.consider_date && formik.touched.consider_date) && (
                                    <span className="text-red-500 text-sm">{formik.errors.consider_date}</span>
                                )}
                            </Col>
                            <Col md={3}>
                                <div className="flex flex-col">
                                    <label htmlFor="">วันที่ประกาศผู้ชนะ</label>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedNoticeDate}
                                        onChange={(date) => {
                                            setSelectedNoticeDate(date);
                                            formik.setFieldValue('notice_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                    />
                                </div>
                                {(formik.errors.notice_date && formik.touched.notice_date) && (
                                    <span className="text-red-500 text-sm">{formik.errors.notice_date}</span>
                                )}
                            </Col>
                            <Col md={5} className="mt-2">
                                <label htmlFor="">ผู้จัดจำหน่าย</label>
                                <div className="input-group">
                                    <div className="min-h-[34px] form-control font-thin text-sm bg-gray-100">
                                        {selectedSupplier && selectedSupplier.tax_no+ ' ' +selectedSupplier.name}
                                    </div>
                                    <input
                                        type="hidden"
                                        name="supplier_id"
                                        value={formik.values.supplier_id}
                                        onChange={formik.handleChange}
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowSupplierModal(true)}>
                                        <FaSearch />
                                    </button>
                                </div>
                                {(formik.errors.supplier_id && formik.touched.supplier_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.supplier_id}</span>
                                )}
                            </Col>
                            <Col md={3} className="mt-2">
                                <div className="flex flex-col">
                                    <label htmlFor="">กำหนดส่งมอบวันที่</label>
                                    <DatePicker
                                        variant="outlined"
                                        format="DD/MM/YYYY"
                                        value={selectedDeliverDate}
                                        onChange={(date) => {
                                            setSelectedDeliverDate(date);
                                            formik.setFieldValue('deliver_date', date.format('YYYY-MM-DD'));
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col md={3} className="mt-2">
                                <label htmlFor="">กำหนดส่งมอบภายใน</label>
                                <div className="form-control min-h-[34px] text-sm text-center">
                                    {formik.values.deliver_days} วัน
                                </div>
                            </Col>
                            <Col md={12} className="text-center">
                                <button type="submit" className="btn btn-outline-primary btn-sm mt-3">
                                    <i className="fas fa-save mr-1"></i>
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

export default Consideration