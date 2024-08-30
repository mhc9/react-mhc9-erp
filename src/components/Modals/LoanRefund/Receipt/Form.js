import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { DatePicker } from '@material-ui/pickers'
import { Col, Modal, Row } from 'react-bootstrap'
import { receipt } from '../../../../features/slices/loan-refund/loanRefundSlice'
import moment from 'moment'

const approvalSchema = Yup.object().shape({
    contract_id: Yup.string().required(),
    receipt_no: Yup.string().required('กรุณาระบุเลขที่ใบเสร็จ'),
    receipt_date: Yup.string().required('กรุณาระบุวันที่ใบเสร็จ'),
});

const ModalReceiptForm = ({ isShow, onHide, refund }) => {
    const dispatch = useDispatch()
    const [selectedReceiptDate, setSelectedReceiptDate] = useState(moment());

    const handleSubmit = (values, formik) => {
        dispatch(receipt({ id: refund?.id, data: values }));

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
                        contract_id: refund ? refund?.contract?.id : '',
                        receipt_no: '',
                        receipt_date: '',
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
                                            <label htmlFor="" className="w-[45%]">เลขที่สัญญา :</label>
                                            <div>
                                                {refund?.contract?.contract_no}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={12}>
                                        <div className="flex flex-row items-center">
                                            <label htmlFor="" className="w-[45%]">เลขที่ใบเสร็จ :</label>
                                            <input
                                                name="receipt_no"
                                                value={formik.values.receipt_no}
                                                onChange={formik.handleChange}
                                                className="form-control w-[45%]"
                                                placeholder="ระบุเลขที่ใบเสร็จ"
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
                                            <label htmlFor="" className="w-[45%]">วันที่ใบเสร็จ :</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedReceiptDate}
                                                onChange={(date) => {
                                                    setSelectedReceiptDate(date);
                                                    formik.setFieldValue('receipt_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.receipt_date && formik.touched.receipt_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.receipt_date}</span>
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

export default ModalReceiptForm