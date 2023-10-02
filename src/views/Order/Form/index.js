import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { toShortTHDate } from '../../../utils'
import OverWriteMomentBE from '../../../utils/OverwriteMomentBE'
import ModalRequisitionList from '../../../components/Modals/Requisition';
import ModalSupplierList from '../../../components/Modals/Supplier';

const orderSchema = Yup.object().shape({

});

const OrderForm = () => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [showRequisitionModal, setShowRequisitionModal] = useState(false);
    const [selectedRequisition, setSelectedRequisition] = useState(null);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const handleSubmit = () => {

    };

    const handleSelectRequisition = (formik, requisition) => {
        setSelectedRequisition(requisition);
        formik.setFieldValue('pr_id', requisition.pr_id);
    };

    const handleSelectSupplier = (formik, supplier) => {
        setSelectedSupplier(supplier);
        formik.setFieldValue('supplier_id', supplier.id);
    };

    return (
        <Formik
            initialValues={{
                po_no: '',
                po_date: '',
                pr_id: '',
                division_id: '',
                supplier_id: '',
                item_count: '',
                net_total: '',
                items: []
            }}
            validationSchema={orderSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <Form>
                    <ModalRequisitionList
                        isShow={showRequisitionModal}
                        onHide={() => setShowRequisitionModal(false)}
                        onSelect={(requisition) => handleSelectRequisition(formik, requisition)}
                    />

                    <ModalSupplierList
                        isShow={showSupplierModal}
                        onHide={() => setShowSupplierModal(false)}
                        onSelect={(supplier) => handleSelectSupplier(formik, supplier)}
                    />

                    <Row className="mb-2">
                        <Col md={6}>
                            <label htmlFor="">เลขที่คำขอ</label>
                            <div className="input-group">
                                <div className="min-h-[34px] form-control font-thin text-sm bg-gray-100">
                                    {selectedRequisition &&  <p>เลขที่ {selectedRequisition.pr_no} วันที่ {toShortTHDate(selectedRequisition.pr_date)}</p>}
                                </div>
                                <input
                                    type="hidden"
                                    name="supplier_id"
                                    value={formik.values.supplier_id}
                                    onChange={formik.handleChange}
                                />
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowRequisitionModal(true)}>
                                    <FaSearch />
                                </button>
                            </div>
                            {(formik.errors.pr_no && formik.touched.pr_no) && (
                                <span className="text-red-500 text-sm">{formik.errors.pr_no}</span>
                            )}
                        </Col>
                        <Col md={3}>
                            <label htmlFor="">เลขที่ใบสั่งซื้อ</label>
                            <input
                                type="text"
                                name="po_no"
                                value={formik.values.po_no}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                            {(formik.errors.po_no && formik.touched.po_no) && (
                                <span className="text-red-500 text-sm">{formik.errors.po_no}</span>
                            )}
                        </Col>
                        <Col md={3}>
                            <div className="flex flex-col">
                                <label htmlFor="">วันที่เอกสาร</label>
                                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedDate}
                                        onChange={(date) => {
                                            setSelectedDate(date);
                                            formik.setFieldValue('po_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                    />
                                </MuiPickersUtilsProvider>
                                {/* <input
                                    type="text"
                                    name="pr_date"
                                    value={formik.values.pr_date}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                /> */}

                            </div>
                            {(formik.errors.pr_date && formik.touched.pr_date) && (
                                <span className="text-red-500 text-sm">{formik.errors.pr_date}</span>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <label htmlFor="">ผู้จัดจำหน่าย</label>
                            <div className="input-group">
                                <div className="min-h-[34px] form-control font-thin text-sm bg-gray-100">
                                    {selectedSupplier && selectedSupplier.supplier_id}
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
                            {(formik.errors.pr_no && formik.touched.pr_no) && (
                                <span className="text-red-500 text-sm">{formik.errors.pr_no}</span>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={3}></Col>
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default OrderForm
