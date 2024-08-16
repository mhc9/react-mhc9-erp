import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { DatePicker } from '@material-ui/pickers'
import { Form, Formik } from 'formik'
import moment from 'moment'
import { useGetInitialFormDataQuery } from '../../features/services/budget/budgetApi'
import { useStyles } from '../../hooks/useStyles'
import { store } from '../../features/slices/budget/budgetSlice'

const BudgetForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [filteredProject, setFilteredProject] = useState([]);
    const [selectedYear, setSelectedYear] = useState(moment());

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
                project_id: '',
                year: moment().format('YYYY')
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
                            <label htmlFor="" className="col-3 col-form-label text-right">ชื่อกิจกรรม :</label>
                            <Col md={6}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                    placeholder="ระบุชื่อกิจกรรม"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <label htmlFor="" className="col-3 col-form-label text-right">ประเภทงบ :</label>
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
                            <label htmlFor="" className="col-3 col-form-label text-right">ปีงบประมาณ :</label>
                            <Col md={6}>
                                <div className="flex flex-col w-[40%]">
                                    <DatePicker
                                        format="YYYY"
                                        views={['year']}
                                        value={selectedYear}
                                        onChange={(date) => {
                                            setSelectedYear(date);
                                            formik.setFieldValue('year', date.year());
                                        }}
                                        className={classes.muiTextFieldInput}
                                    />
                                    {(formik.errors.year && formik.touched.year) && (
                                        <span className="text-red-500 text-sm">{formik.errors.year}</span>
                                    )}
                                </div>
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