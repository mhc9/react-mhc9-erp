import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { DatePicker } from '@material-ui/pickers'
import { Col, Modal, Row } from 'react-bootstrap'
import { approve } from '../../../../features/slices/loan-contract/loanContractSlice'
import moment from 'moment'

const approvalSchema = Yup.object().shape({
    contract_id: Yup.string().required(),
    approved_date: Yup.string().required()
});

const ModalApprovalForm = ({ isShow, onHide, contract }) => {
    const dispatch = useDispatch()
    const [selectedApprovedDate, setSelectedApprovedDate] = useState(moment());
    const [selectedBk02Date, setSelectedBk02Date] = useState(moment());
    const [selectedSentDate, setSelectedSentDate] = useState(moment());

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
                <Modal.Title>บันทึกอนุมัติสัญญา</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        contract_id: contract ? contract.id : '',
                        contract_no: '',
                        approved_date: '',
                        sent_date: '',
                        bill_no: '',
                        bk02_date: '',
                    }}
                    validationSchema={approvalSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form className="px-3 pt-3">
                                <Row className="mb-3">
                                    <Col md={12} className="text-lg text-blue-700">
                                        <div className="flex flex-row items-center gap-3">
                                            <label htmlFor="">เลขที่สัญญา :</label>
                                            {contract.contract_no}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <div className="flex flex-row items-center gap-3">
                                            <label htmlFor="">เลขที่สัญญา</label>
                                            <input
                                                type="text"
                                                name="contract_no"
                                                value={formik.values.contract_no}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                        </div>
                                        {(formik.errors.contract_no && formik.touched.contract_no) && (
                                            <span className="text-red-500 text-xs">{formik.errors.contract_no}</span>
                                        )}
                                    </Col>
                                    <Col md={12}>
                                        <div className="flex flex-row items-center gap-3">
                                            <label htmlFor="">วันที่อนุมัติสัญญา :</label>
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
                                    <Col md={12}>
                                        <div className="flex flex-row items-center gap-3">
                                            <label htmlFor="">เลขที่ฎีกา/อ้างอิง</label>
                                            <input
                                                type="text"
                                                name="bill_no"
                                                value={formik.values.bill_no}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                        </div>
                                        {(formik.errors.bill_no && formik.touched.bill_no) && (
                                            <span className="text-red-500 text-xs">{formik.errors.bill_no}</span>
                                        )}
                                    </Col>
                                    <Col md={12}>
                                        <div className="flex flex-row items-center gap-3">
                                            <label htmlFor="">วันที่ส่งสัญญา</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedSentDate}
                                                onChange={(date) => {
                                                    setSelectedSentDate(date);
                                                    formik.setFieldValue('sent_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.sent_date && formik.touched.sent_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.sent_date}</span>
                                        )}
                                    </Col>
                                    <Col md={12}>
                                        <div className="flex flex-row items-center gap-3">
                                            <label htmlFor="">วันที่วาง ขบ.02</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedBk02Date}
                                                onChange={(date) => {
                                                    setSelectedBk02Date(date);
                                                    formik.setFieldValue('bk02_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.bk02_date && formik.touched.bk02_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.bk02_date}</span>
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

export default ModalApprovalForm