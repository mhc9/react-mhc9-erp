import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import ModalBudgetList from '../../../../components/Modals/BudgetList'

const allocationSchema = Yup.object().shape({
    budget_id: Yup.string().required(),
    doc_no: Yup.string().required(),
    doc_date: Yup.string().required(),
    // description: Yup.string().required(),
    total: Yup.string().required(),
});

const AllocationForm = () => {
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [selectedDocDate, setSelectedDocDate] = useState(moment())
    const [budget, setBudget] = useState(null);

    const handleSubmit = (data, formik) => {

    };

    return (
        <Formik
            initialValues={{
                budget_id: '',
                budget: null,
                doc_no: '',
                doc_date: '',
                description: '',
                total: '',
            }}
            validationSchema={allocationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {{
                return (
                    <Form>
                        <ModalBudgetList
                            isShow={showBudgetModal}
                            onHide={() => setShowBudgetModal(false)}
                            onSelect={(budget) => {
                                setBudget(budget);
                                formik.setFieldValue('budget_id', budget.id);
                                formik.setFieldValue('budget', budget);

                                setTimeout(() => formik.setTouched('budget_id', true), 1000);
                            }}
                        />
                        <Row>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">รายการงบประมาณ</label>
                                <div className="input-group">
                                    <div className="form-control h-[34px] text-sm bg-gray-200">
                                        <span className="mr-1">{budget?.activity?.name}</span>
                                        <span className="badge rounded-pill bg-danger">{budget?.type?.name}</span>
                                        <span className="ml-1">งบประมาณ {budget?.total} บาท</span>
                                    </div>
                                    <input
                                        type="hidden"
                                        name="budget_id"
                                        value={formik.values.budget_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowBudgetModal(true)}>
                                        <FaSearch />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => {

                                        }}
                                    >
                                        เคลียร์
                                    </button>
                                </div>
                                {(formik.errors.budget_id && formik.touched.budget_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.budget_id}</span>
                                )}
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
                                <div className="w-[100%] border rounded-md">
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
            }}}
        </Formik>
    )
}

export default AllocationForm