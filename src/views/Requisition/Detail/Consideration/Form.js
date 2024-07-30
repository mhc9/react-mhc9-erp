import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaSearch } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers'
import { Col, Row } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { consider } from '../../../../features/slices/approval/approvalSlice'
import ModalSupplierList from '../../../../components/Modals/Supplier'

const approvalSchema = Yup.object().shape({
    consider_no: Yup.string().required('กรุณาระบุเลขที่รายงาน'),
    consider_date: Yup.string().required('กรุณาเลือกวันที่รายงาน'),
    notice_date: Yup.string().required('กรุณาเลือกวันที่ประกาศผู้ชน'),
    supplier_id: Yup.string().required('กรุณาเลือกผู้ขาย/ผู้จัดจำหน่าย'),
    deliver_date: Yup.mixed().test({
        name: 'cannotLessThanNoticeDate',
        exclusive: true,
        message: 'ไม่สามารถกำหนดวันที่ส่งมอบก่อนวันที่ประกาศผู้ชนะได้',
        test: function (val) {
            return moment(val).toDate() > moment(this.parent.notice_date).toDate()
        },
    }).required('กรุณาเลือกวันที่ส่งมอบ'),
    deliver_days: Yup.number().min(1, "ส่งมอบภายในต้องมากกว่า 0 (วัน)").required('กรุณาระบุเลขที่รายงาน'),
});

const ConsiderationForm = ({ approval, requisition, onSubmitted }) => {
    const dispatch = useDispatch();
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedConsiderDate, setSelectedConsiderDate] = useState(moment());
    const [selectedNoticeDate, setSelectedNoticeDate] = useState(moment());
    const [selectedDeliverDate, setSelectedDeliverDate] = useState(moment());

    useEffect(() => {
        if (approval && approval.consider_no !== '') {
            setSelectedSupplier(approval.supplier);
            setSelectedConsiderDate(moment(approval.consider_date));
            setSelectedNoticeDate(moment(approval.notice_date));
            setSelectedDeliverDate(moment(approval.deliver_date));
        }
    }, []);

    const handleSubmit = (values, formik) => {
        dispatch(consider({ id: approval.id, data: values }));

        onSubmitted();
    };

    return (
        <Formik
            initialValues={{
                requisition_id: requisition.id,
                consider_no: (approval && approval.consider_no) ? approval.consider_no : '',
                consider_date: (approval && approval.consider_date) ? approval.consider_date : '',
                notice_date: (approval && approval.notice_date) ? approval.notice_date : '',
                supplier_id: (approval && approval.supplier_id) ? approval.supplier_id : '',
                supplier: (approval && approval.supplier) ? approval.supplier : null,
                deliver_date: (approval && approval.deliver_date) ? approval.deliver_date : '',
                deliver_days: (approval && approval.deliver_days) ? approval.deliver_days : 0,
            }}
            validationSchema={approvalSchema}
            onSubmit={handleSubmit}
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
                                <label htmlFor="">ผู้ขาย/ผู้จัดจำหน่าย</label>
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
                                            if (moment(date).toDate() <= moment(formik.values.notice_date).toDate()) {
                                                toast.error('วันที่ส่งมอบต้องหลังวันที่ประกาศผู้ชนะได้!!');

                                                formik.setFieldValue('deliver_days', 0);
                                            } else {
                                                formik.setFieldValue('deliver_days', moment(date).diff(moment(formik.values.notice_date), "day"));
                                            }
                                        }}
                                    />
                                    {(formik.errors.deliver_date && formik.touched.deliver_date) && (
                                        <span className="text-red-500 text-sm">{formik.errors.deliver_date}</span>
                                    )}
                                </div>
                            </Col>
                            <Col md={3} className="mt-2">
                                <label htmlFor="">ส่งมอบภายใน</label>
                                <div className="form-control min-h-[34px] text-sm text-center bg-gray-100">
                                    {formik.values.deliver_days} วัน
                                </div>
                                {(formik.errors.deliver_days && formik.touched.deliver_days) && (
                                    <span className="text-red-500 text-sm">{formik.errors.deliver_days}</span>
                                )}
                            </Col>
                            <Col md={12} className="text-center mt-3">
                                <button type="submit" className="btn btn-outline-primary btn-sm">
                                    <i className="fas fa-save mr-1"></i>
                                    บันทึก
                                </button>
                                {approval?.consider_no && (
                                    <button type="submit" className="btn btn-outline-danger btn-sm ml-2">
                                        <i className="fas fa-times mr-1"></i>
                                        ยกเลิก
                                    </button>
                                )}
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ConsiderationForm