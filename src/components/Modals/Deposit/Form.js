import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { DatePicker } from '@material-ui/pickers'
import { Col, Modal, Row } from 'react-bootstrap'
import { deposit } from '../../../features/slices/loan-contract/loanContractSlice'
import moment from 'moment'

const depositSchema = Yup.object().shape({
    contract_id: Yup.string().required(),
    deposit_date: Yup.string().required(),
    refund_date: Yup.string().required()
});

const ModalDepositForm = ({ isShow, onHide, onSubmit, contract }) => {
    const dispatch = useDispatch()
    const [selectedDepositDate, setSelectedDepositDate] = useState(moment());
    const [selectedRefundDate, setSelectedRefundDate] = useState(moment());

    const handleSubmit = (values, formik) => {
        dispatch(deposit({ id: contract?.id, data: values }));

        onHide();
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='md'
        >
            <Modal.Header closeButton>
                <Modal.Title>บันทึกเงินเข้า</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        contract_id: contract ? contract.id : '',
                        deposit_date: '',
                        refund_date: '',
                    }}
                    validationSchema={depositSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form className="p-3">
                                <Row className="mb-2">
                                    <Col md={6} className="text-lg text-blue-700">เลขที่สัญญา: {contract.contract_no}</Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={12}>
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่เงินเข้า</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedDepositDate}
                                                onChange={(date) => {
                                                    setSelectedDepositDate(date);
                                                    formik.setFieldValue('deposit_date', date.format('YYYY-MM-DD'));
                                                    
                                                    /** คำนวณวันที่กำหนดคืนเงินจาก contract.refund_days */
                                                    const refundDate = moment(date).add(contract.refund_days, "days");
                                                    setSelectedRefundDate(refundDate);
                                                    formik.setFieldValue('refund_date', refundDate.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.deposit_date && formik.touched.deposit_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.deposit_date}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={12}>
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่กำหนดคืนเงิน</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedRefundDate}
                                                onChange={(date) => {
                                                    setSelectedRefundDate(date);
                                                    formik.setFieldValue('refund_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.refund_date && formik.touched.refund_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.refund_date}</span>
                                        )}
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
            </Modal.Body>
        </Modal>
    )
}

export default ModalDepositForm