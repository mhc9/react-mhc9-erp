import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { currency } from '../../../../utils'
import { store, update } from '../../../../features/slices/budget-allocation/budgetAllocationSlice'
import BudgetTypeBadge from '../../../../components/Budget/BudgetTypeBadge'

const allocationSchema = Yup.object().shape({
    budget_id: Yup.string().required(),
    doc_no: Yup.string().required(),
    doc_date: Yup.string().required(),
    // description: Yup.string().required(),
    total: Yup.string().required(),
});

const AllocationForm = ({ budget, allocation }) => {
    const dispatch = useDispatch();
    const [selectedDocDate, setSelectedDocDate] = useState(moment());
    const [agency, setAgency] = useState(null);

    const handleSubmit = (data, formik) => {
        if (allocation) {
            dispatch(update({ id: allocation.id, data }));
        } else {
            dispatch(store(data));
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                budget_id: budget ? budget.id : '',
                doc_no: '',
                doc_date: '',
                allocate_type_id: 1,
                agency_id: '',
                agency: null,
                description: '',
                total: '',
            }}
            validationSchema={allocationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row>
                            <Col md={12} className="mb-2">
                                <div className="border rounded-md py-3 px-4 mb-2 leading-6">
                                    <p className="text-gray-500">{budget?.activity?.project?.plan?.name}</p>
                                    <p className="font-semibold">{budget?.activity?.project?. name}</p>
                                    <p className="font-bold text-blue-600 mr-1">{budget?.activity?.name}</p>
                                    <p>
                                        <span className="mr-4"><b>ปีงบประมาณ</b> {budget?.activity && budget?.activity?.year+543}</span>
                                        <span><b>ประเภท</b> {budget?.type && <BudgetTypeBadge type={budget?.type} />}</span>
                                    </p>
                                    <p><b>ยอดจัดสรรแล้ว</b> {currency.format(budget?.total)} <b>บาท</b></p>
                                </div>
                            </Col>
                            <Col md={4} className="mb-2">
                                <label htmlFor="">เลขที่อ้างอิง</label>
                                <input
                                    type="text"
                                    name="doc_no"
                                    value={formik.values.doc_no}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.doc_no && formik.touched.doc_no) && (
                                    <span className="text-red-500 text-sm">{formik.errors.doc_no}</span>
                                )}
                            </Col>
                            <Col md={4} className="mb-2">
                                <label htmlFor="">ลงวันที่</label>
                                <div className="w-[100%] border rounded-md px-2">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedDocDate}
                                        onChange={(date) => {
                                            setSelectedDocDate(date);
                                            formik.setFieldValue('doc_date', date.format('YYYY-MM-DD'));
                                        }}
                                        // className={classes.muiTextFieldInput}
                                    />
                                </div>
                                {(formik.errors.doc_date && formik.touched.doc_date) && (
                                    <span className="text-red-500 text-sm">{formik.errors.doc_date}</span>
                                )}
                            </Col>
                            <Col md={4}>
                                <label htmlFor="">รับ/คืน</label>
                                <div className="form-control flex justify-around">
                                    <label className="flex gap-2">
                                        <Field
                                            type="radio"
                                            name="allocate_type_id"
                                            value="1"
                                            checked={parseInt(formik.values.allocate_type_id, 10) === 1}
                                        />
                                        <label>รับโอน</label>
                                    </label>
                                    <label className="flex gap-2">
                                        <Field
                                            type="radio"
                                            name="allocate_type_id"
                                            value="2"
                                            checked={parseInt(formik.values.allocate_type_id, 10) === 2}
                                        />
                                        <label>โอนคืน</label>
                                    </label>
                                </div>
                            </Col>
                            <Col md={7} className="mb-2">
                                <label htmlFor="">หน่วยรับ/คืน</label>
                                <div className="input-group">
                                    <div className="form-control text-sm min-h-[34px]">
                                        {agency?.name}
                                    </div>
                                    <button className="btn btn-secondary btn-sm">
                                        <FaSearch />
                                    </button>
                                </div>
                                {(formik.errors.agency_id && formik.touched.agency_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.agency_id}</span>
                                )}
                            </Col>
                            <Col className="mb-2">
                                <label htmlFor="">ยอดรับโอน</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="total"
                                        value={formik.values.total}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm mr-1"
                                    /> บาท
                                </div>
                                {(formik.errors.total && formik.touched.total) && (
                                    <span className="text-red-500 text-sm">{formik.errors.total}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">รายละเอียด</label>
                                <textarea
                                    rows={3}
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.description && formik.touched.description) && (
                                    <span className="text-red-500 text-sm">{formik.errors.description}</span>
                                )}
                            </Col>
                        </Row>
                        
                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-outline-primary btn-sm">
                                บันทึก
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AllocationForm