import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Formik } from 'formik';
import { v4 as uuid } from 'uuid'
import { useGetInitialFormDataQuery } from '../../features/services/budget/budgetApi'

const AddBudgetType = ({ data, onSubmit }) => {
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    const getBudgetType = (id) => {
        return formData ? formData.types.find(type => type.id === parseInt(id, 10)) : null; 
    };

    const handleSubmit = (values, formik) => {
        onSubmit(values)
    };

    return (
        <Formik
            initialValues={{
                id: data ? data.id : uuid(),
                budget_id: '',
                budget_type_id: '',
                budget_type: null,
                total: 0
            }}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Row className="mb-2">
                        <Col md={5}>
                            <div className="form-group">
                                <label htmlFor="">ประเภทงบประมาณ :</label>
                                <select
                                    name="budget_type_id"
                                    value={formik?.values.budget_type_id}
                                    onChange={(e) => {
                                        formik?.handleChange(e);
                                        formik.setFieldValue('budget_type', getBudgetType(e.target.value));
                                    }}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- ประเภทงบประมาณ --</option>
                                    {formData && formData?.types.map(type => (
                                        <option value={type.id} key={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {(formik?.errors.budget_type_id && formik?.touched.budget_type_id) && (
                                    <span className="text-red-500 text-sm">{formik?.errors.budget_type_id}</span>
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
                            <button type="button" className="btn btn-outline-primary btn-sm mt-4" onClick={formik.submitForm}>
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