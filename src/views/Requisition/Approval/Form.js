import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Col, Modal, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment';
import { useGetInitialFormDataQuery } from '../../../features/services/approval/approvalApi'
import { store } from '../../../features/slices/approval/approvalSlice'

const ModalApprovalForm = ({ isShow, onHide, requisitionId }) => {
    const dispatch = useDispatch();
    const [selectedDeliverDate, setSelectedDeliverDate] = useState(moment());
    const [selectedReportDate, setSelectedReportDate] = useState(moment());
    const [selectedDirectiveDate, setSelectedDirectiveDate] = useState(moment());
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    const handleSubmit = (values, formik) => {
        dispatch(store(values));

        formik.resetForm();
        onHide();
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='lg'
        >
            <Formik
                initialValues={{
                    requisition_id: requisitionId,
                    procuring_id: '1',
                    deliver_date: '',
                    report_no: '',
                    report_date: '',
                    directive_no: '',
                    directive_date: ''
                }}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Modal.Header className="border py-1 px-2">
                                <Modal.Title>บันทึกรายงานขอซื้อ/จ้าง</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="px-4">
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">วิธีการจัดหา</label>
                                        <select
                                            name="procuring_id"
                                            value={formik.values.procuring_id}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">-- เลือก --</option>
                                            {formData && formData.procurings.map(proc => (
                                                <option value={proc.id} key={proc.id}>{proc.name}</option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col>
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
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">เลขที่รายงาน</label>
                                        <input
                                            name="report_no"
                                            value={formik.values.report_no}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col>
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่รายงาน</label>
                                            <DatePicker
                                                variant="outlined"
                                                format="DD/MM/YYYY"
                                                value={selectedReportDate}
                                                onChange={(date) => {
                                                    setSelectedReportDate(date);
                                                    formik.setFieldValue('report_date', date.format('YYYY-MM-DD'));
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">เลขที่คำสั่ง</label>
                                        <input
                                            name="directive_no"
                                            value={formik.values.directive_no}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col>
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่คำสั่ง</label>
                                            <DatePicker
                                                variant="outlined"
                                                format="DD/MM/YYYY"
                                                value={selectedDirectiveDate}
                                                onChange={(date) => {
                                                    setSelectedDirectiveDate(date);
                                                    formik.setFieldValue('directive_date', date.format('YYYY-MM-DD'));
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer className="py-1">
                                <button type="submit" className="btn btn-outline-primary">
                                    บันทึก
                                </button>
                            </Modal.Footer>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default ModalApprovalForm