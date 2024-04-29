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
    deposited_date: Yup.string().required(),
    refund_date: Yup.string().required()
});

const ModalApprovalForm = ({ isShow, onHide, onSubmit, contract }) => {
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
                <Modal.Title>บันทึกอนุมัติสัญญา</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        contract_id: contract ? contract.id : '',
                        approved_date: '',
                    }}
                    validationSchema={approvalSchema}
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