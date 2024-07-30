import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Col, Modal, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import { DatePicker } from '@material-ui/pickers'
import { toast } from 'react-toastify';
import moment from 'moment';
import { useGetInitialFormDataQuery } from '../../../features/services/approval/approvalApi'
import { store } from '../../../features/slices/approval/approvalSlice'

const approvalSchema = Yup.object().shape({
    procuring_id: Yup.string().required('กรุณาเลือกวิธีการจัดหา'),
    report_no: Yup.string().required('กรุณาระบุเลขที่รายงาน'),
    report_date: Yup.string().required('กรุณาเลือกวันที่รายงาน'),
    directive_no: Yup.string().required('กรุณาระบุเลขที่คำสั่ง'),
    directive_date: Yup.string().required('กรุณาเลือกวันที่คำสั่ง'),
    deliver_date: Yup.string().required('กรุณาเลือกวันที่ส่งมอบ'),
    // deliver_date: Yup.mixed()
    // .test({
    //     name: 'cannotLessThanNoticeDate',
    //     exclusive: true,
    //     message: 'ไม่สามารถกำหนดวันที่ส่งมอบก่อนวันที่ประกาศผู้ชนะได้',
    //     test: function (val) {
    //         return moment(val).toDate() > moment(this.parent.notice_date).toDate()
    //     },
    // }).required('กรุณาเลือกวันที่ส่งมอบ'),
    deliver_days: Yup.number().min(1, "ส่งมอบภายในต้องมากกว่า 0 (วัน)").required('กรุณาระบุเลขที่รายงาน'),
});

const ModalApprovalForm = ({ isShow, onHide, requisitionId }) => {
    const dispatch = useDispatch();
    const [selectedReportDate, setSelectedReportDate] = useState(moment());
    const [selectedDirectiveDate, setSelectedDirectiveDate] = useState(moment());
    const [selectedDeliverDate, setSelectedDeliverDate] = useState(moment());
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
            size='md'
        >
            <Formik
                initialValues={{
                    requisition_id: requisitionId,
                    procuring_id: '1',
                    report_no: '',
                    report_date: '',
                    directive_no: '',
                    directive_date: '',
                    deliver_date: '',
                    deliver_days: ''
                }}
                validationSchema={approvalSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Modal.Header className="border py-1 px-2">
                                <Modal.Title className="text-xl">บันทึกรายงานขอซื้อ/จ้าง</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="px-4">
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">วิธีการจัดหา</label>
                                        <select
                                            name="procuring_id"
                                            value={formik.values.procuring_id}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        >
                                            <option value="">-- เลือก --</option>
                                            {formData && formData.procurings.map(proc => (
                                                <option value={proc.id} key={proc.id}>{proc.name}</option>
                                            ))}
                                        </select>
                                        {(formik.errors.procuring_id && formik.touched.procuring_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.procuring_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">เลขที่รายงาน</label>
                                        <input
                                            name="report_no"
                                            value={formik.values.report_no}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        />
                                        {(formik.errors.report_no && formik.touched.report_no) && (
                                            <span className="text-red-500 text-sm">{formik.errors.report_no}</span>
                                        )}
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
                                            {(formik.errors.report_date && formik.touched.report_date) && (
                                                <span className="text-red-500 text-sm">{formik.errors.report_date}</span>
                                            )}
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
                                            className="form-control text-sm"
                                        />
                                        {(formik.errors.directive_no && formik.touched.directive_no) && (
                                            <span className="text-red-500 text-sm">{formik.errors.directive_no}</span>
                                        )}
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
                                            {(formik.errors.directive_date && formik.touched.directive_date) && (
                                                <span className="text-red-500 text-sm">{formik.errors.directive_date}</span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col className="mt-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่ส่งมอบ</label>
                                            <DatePicker
                                                variant="outlined"
                                                format="DD/MM/YYYY"
                                                value={selectedDeliverDate}
                                                onChange={(date) => {
                                                    setSelectedDeliverDate(date);
                                                    formik.setFieldValue('deliver_date', date.format('YYYY-MM-DD'));
                                                    setTimeout(() => formik.setFieldTouched('deliver_date', true), 300);

                                                    /** คำนวณวันกำหนดส่งมอบภายใน (วัน) */
                                                    // if (moment(date).toDate() <= moment(formik.values.notice_date).toDate()) {
                                                    //     toast.error('วันที่ส่งมอบต้องหลังวันที่ประกาศผู้ชนะได้!!');

                                                    //     formik.setFieldValue('deliver_days', 0);
                                                    // } else {
                                                    //     formik.setFieldValue('deliver_days', moment(date).diff(moment(formik.values.notice_date), "day"));
                                                    // }
                                                }}
                                            />
                                            {(formik.errors.deliver_date && formik.touched.deliver_date) && (
                                                <span className="text-red-500 text-sm">{formik.errors.deliver_date}</span>
                                            )}
                                        </div>
                                    </Col>
                                    <Col className="mt-2">
                                        <label htmlFor="">ส่งมอบภายใน</label>
                                        <div className="form-control min-h-[34px] text-sm text-center bg-gray-100">
                                            {formik.values.deliver_days} วัน
                                        </div>
                                        {(formik.errors.deliver_days && formik.touched.deliver_days) && (
                                            <span className="text-red-500 text-sm">{formik.errors.deliver_days}</span>
                                        )}
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer className="py-1">
                                <button type="submit" className="btn btn-outline-primary btn-sm">
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