import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { DatePicker } from '@material-ui/pickers'
import { Col, Modal, Row } from 'react-bootstrap'
import { approve } from '../../../../features/slices/loan-refund/loanRefundSlice'
import moment from 'moment'

const approvalSchema = Yup.object().shape({
    contract_id: Yup.string().required(),
    bill_no: Yup.string().required('กรุณาระบุเลขที่ใบสำคัญ'),
    approved_date: Yup.string().required('กรุณาเลือกวันที่เคลียร์')
});

const ModalApprovalForm = ({ isShow, onHide, contract }) => {
    const dispatch = useDispatch()
    const [selectedApprovedDate, setSelectedApprovedDate] = useState(moment());

    const handleSubmit = (values, formik) => {
        dispatch(approve({ id: contract?.id, data: values }));

        onHide();
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='md'
        >
            <Modal.Header closeButton>
                <Modal.Title>บันทึกเคลียร์เงินยืม</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        contract_id: contract ? contract.id : '',
                        bill_no: '',
                        receipt_no: '',
                        approved_date: '',
                    }}
                    validationSchema={approvalSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form className="px-3 pt-3">
                                <Row className="mb-3">
                                    <Col md={12} className="text-lg text-blue-700">
                                        <div className="flex flex-row items-center">
                                            <label htmlFor="" className="w-[35%]">เลขที่สัญญา :</label>
                                            <div>
                                                {contract.contract_no}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={12}>
                                        <div className="flex flex-row items-center">
                                            <label htmlFor="" className="w-[35%]">เลขที่ใบสำคัญ :</label>
                                            <input
                                                name="bill_no"
                                                value={formik.values.bill_no}
                                                onChange={formik.handleChange}
                                                className="form-control w-[45%]"
                                                placeholder="ระบุเลขที่ใบสำคัญ"
                                            />
                                        </div>
                                        {(formik.errors.bill_no && formik.touched.bill_no) && (
                                            <span className="text-red-500 text-xs">{formik.errors.bill_no}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={12}>
                                        <div className="flex flex-row items-center">
                                            <label htmlFor="" className="w-[35%]">เลขที่ใบเสร็จ (ถ้ามี) :</label>
                                            <input
                                                name="receipt_no"
                                                value={formik.values.receipt_no}
                                                onChange={formik.handleChange}
                                                className="form-control w-[45%]"
                                                placeholder="ระบุเลขที่ใบเสร็จ (ถ้ามี)"
                                            />
                                        </div>
                                        {(formik.errors.receipt_no && formik.touched.receipt_no) && (
                                            <span className="text-red-500 text-xs">{formik.errors.receipt_no}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={12}>
                                        <div className="flex flex-row items-center">
                                            <label htmlFor="" className="w-[35%]">วันที่เคลียร์ :</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedApprovedDate}
                                                onChange={(date) => {
                                                    setSelectedApprovedDate(date);
                                                    formik.setFieldValue('approved_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.approved_date && formik.touched.approved_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.approved_date}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="flex flex-row items-center">
                                            <p className="w-[35%]"></p>
                                            <button type="submit" className="btn btn-outline-primary float-right">
                                                บันทึก
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default ModalApprovalForm