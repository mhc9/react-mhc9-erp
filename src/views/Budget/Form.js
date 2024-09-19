import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker } from '@material-ui/pickers'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useStyles } from '../../hooks/useStyles'
import { store, update } from '../../features/slices/budget/budgetSlice'
import { getAllBudgetPlans } from '../../features/slices/budget-plan/budgetPlanSlice'
import { getAllBudgetProjects } from '../../features/slices/budget-project/budgetProjectSlice'
import AddBudgetType from './AddBudgetType'
import BudgetTypeList from './BudgetTypeList'

const budgetSchema = Yup.object().shape({
    name: Yup.string().required('กรุณาเลือกแผนงาน'),
    plan_id: Yup.string().required('กรุณาระบุชื่อกิจกรรม'),
    project_id: Yup.string().required('กรุณาเลือกโครงการ/ผลผลิต'),
    year: Yup.string().required('กรุณาเลือกปีงบประมาณ'),
});

const BudgetForm = ({ budget }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { plans, isLoading: isPlanLoading } = useSelector(state => state.budgetPlan);
    const { projects, isLoading: isProjectLoading } = useSelector(state => state.budgetProject);
    const [filteredProject, setFilteredProject] = useState([]);
    const [selectedYear, setSelectedYear] = useState(moment());

    useEffect(() => {
        dispatch(getAllBudgetPlans({ url: `/api/budget-plans?year=${selectedYear.year()}` }));
        dispatch(getAllBudgetProjects({ url: `/api/budget-projects?year=${selectedYear.year()}` }));
    }, [selectedYear]);

    useEffect(() => {
        if (budget) {
            handleFilterProject(budget?.project.plan_id);
        }
    }, [budget]);

    const handleFilterProject = (planId) => {
        const newProjects = projects.filter(project => project.plan_id === parseInt(planId, 10));

        setFilteredProject(newProjects);
    };

    const handleSubmit = (values, formik) => {
        if (budget) {
            dispatch(update({ id: budget.id, data: values }));
        } else {
            dispatch(store(values));
        }
    };

    return (
        <Formik
            initialValues={{
                name: budget ? budget.name : '',
                year: budget ? budget.year : moment().format('YYYY'),
                gfmis_id: budget ? budget.gfmis_id : '',
                plan_id: (budget && budget.project) ? budget.project.plan_id : '',
                project_id: budget ? budget.project_id : '',
                budget_types: []
            }}
            onSubmit={handleSubmit}
            validationSchema={budgetSchema}
        >
            {(formik) => {
                return (
                    <Form>
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
                            <label htmlFor="" className="col-3 col-form-label text-right">แผนงาน :</label>
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
                                    <option value="">-- แผนงาน --</option>
                                    {plans && plans.map(plan => (
                                        <option value={plan.id} key={plan.id}>
                                            {plan.plan_no} {plan.name}
                                        </option>
                                    ))}
                                </select>
                                {(formik.errors.plan_id && formik.touched.plan_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.plan_id}</span>
                                )}
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
                                {(formik.errors.project_id && formik.touched.project_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.project_id}</span>
                                )}
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
                                {(formik.errors.name && formik.touched.name) && (
                                    <span className="text-red-500 text-sm">{formik.errors.name}</span>
                                )}
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
                                {(formik.errors.gfmis_id && formik.touched.gfmis_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.gfmis_id}</span>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-5">
                                <div className="border py-2 px-3 mb-2">
                                    <h3 className="text-xl font-bold mb-2">รายงานประเภทงบประมาณ</h3>

                                    <AddBudgetType
                                        data={formik.values.budget_types}
                                        onSubmit={(data) => console.log(data)}
                                    />

                                    <BudgetTypeList data={formik.values.budget_types} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="col-3 offset-md-3">
                                <button type="submit" className={`btn ${budget ? 'btn-outline-secondary' : 'btn-outline-primary'} btn-sm`}>
                                    {budget ? 'บันทึกการแก้ไข' : 'บันทึก'}
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