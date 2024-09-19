import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useGetInitialFormDataQuery } from '../../features/services/budget/budgetApi'
import { Formik } from 'formik';

const AddBudgetType = ({ data, onSubmit }) => {
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    return (
        <Formik
            initialValues={{
                type_id: '',
                total: ''
            }}
        >
            {(formik) => {
                return (
                    <Row className="mb-2">
                        <Col md={5}>
                            <div className="form-group">
                                <label htmlFor="">ประเภทงบประมาณ :</label>
                                <select
                                    name="type_id"
                                    value={formik?.values.type_id}
                                    onChange={formik?.handleChange}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- ประเภทงบประมาณ --</option>
                                    {formData && formData?.types.map(type => (
                                        <option value={type.id} key={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {(formik?.errors.type_id && formik?.touched.type_id) && (
                                    <span className="text-red-500 text-sm">{formik?.errors.type_id}</span>
                                )}
                            </div>
                        </Col>
                        <Col md={5} className="pl-0">
                            <div className="form-group">
                                <label htmlFor="">ยอดจัดสรร (บาท) :</label>
                                <input
                                    type="text"
                                    name="total"
                                    value={formik?.values.total}
                                    onChange={formik?.handleChange}
                                    className="form-control text-sm"
                                    placeholder="ยอดจัดสรร"
                                />
                                {(formik?.errors.total && formik?.touched.total) && (
                                    <span className="text-red-500 text-sm">{formik?.errors.total}</span>
                                )}
                            </div>
                        </Col>
                        <Col className="pl-0">
                            <button type="button" className="btn btn-outline-primary btn-sm mt-4">
                                เพิ่ม
                            </button>
                        </Col>
                    </Row>
                )
            }}
        </Formik>
    )
}

export default AddBudgetType