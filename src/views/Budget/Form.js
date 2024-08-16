import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { useGetInitialFormDataQuery } from '../../features/services/budget/budgetApi'
import { store } from '../../features/slices/budget/budgetSlice'
import { useDispatch } from 'react-redux'

const BudgetForm = () => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [filteredProject, setFilteredProject] = useState([]);

    const handleFilterProject = (planId) => {
        const newProjects = formData?.projects.filter(project => project.plan_id === parseInt(planId, 10));

        setFilteredProject(newProjects);
    };

    const handleSubmit = (values, formik) => {
        console.log(values);

        dispatch(store(values));
    }

    return (
        <Formik
            initialValues={{
                name: '',
                gfmis_id: '',
                type_id: '',
                plan_id: '',
                project_id: ''
            }}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <label htmlFor="" className="col-3 col-form-label text-right">แผน :</label>
                            <Col md={6}>
                                <select
                                    name="plan_id"
                                    value={formik.values.plan_id}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        handleFilterProject(e.target.value);
                                    }}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- แผน --</option>
                                    {formData && formData?.plans.map(plan => (
                                        <option value={plan.id} key={plan.id}>
                                            {plan.plan_no} {plan.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <label htmlFor="" className="col-3 col-form-label text-right">โครงการ/ผลผลิต :</label>
                            <Col md={6}>
                                <select
                                    name="project_id"
                                    value={formik.values.project_id}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- โครงการ/ผลผลิต --</option>
                                    {filteredProject && filteredProject.map(project => (
                                        <option value={project.id} key={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <label htmlFor="" className="col-3 col-form-label text-right">ประเภทงบประมาณ :</label>
                            <Col md={6}>
                                <select
                                    name="type_id"
                                    value={formik.values.type_id}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- ประเภทงบประมาณ --</option>
                                    {formData && formData?.types.map(type => (
                                        <option value={type.id} key={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <label htmlFor="" className="col-3 col-form-label text-right">ชื่องบประมาณ :</label>
                            <Col md={6}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                    placeholder="ระบุชื่องบประมาณ"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <label htmlFor="" className="col-3 col-form-label text-right">รหัส New GFMIS :</label>
                            <Col md={6}>
                                <input
                                    type="text"
                                    name="gfmis_id"
                                    value={formik.values.gfmis_id}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                    placeholder="ระบุรหัส New GFMIS"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <div className="col-3 offset-md-3">
                                <button type="submit" className="btn btn-outline-primary text-sm">
                                    บันทึก
                                </button>
                            </div>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default BudgetForm