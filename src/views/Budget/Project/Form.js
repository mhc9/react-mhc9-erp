import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useStyles } from '../../../hooks/useStyles'

const budgetProjectSchema = Yup.object().shape({
    name: Yup.string().required(),
    plan_id: Yup.string().required(),
    project_type_id: Yup.string().required(),
    year: Yup.string().required(),
});

const BudgetProjectForm = () => {
    const classes = useStyles();
    const [selectedYear, setSelectedYear] = useState(moment());

    const handleSubmit = (values, formik) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{
                name: '',
                plan_id: '',
                project_type_id: 1,
                year: moment().format('YYYY'),
                gfmis_id: '',
                status: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={budgetProjectSchema}
        >
            {(formik) => {
                return (
                    <Form>
                        <div className="form-group row mb-2">
                            <label htmlFor="" className="col-3 text-right">ชื่อโครงการ/ผลผลิต :</label>
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control text-sm"
                                />
                                {(formik.errors.name && formik.touched.name) && (
                                    <span className="text-red-500 text-sm">{formik.errors.name}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="" className="col-3 text-right">แผนงาน :</label>
                            <div className="col-6">
                                <select
                                    name="plan_id"
                                    className="form-control text-sm"
                                >
                                    <option value="">-- เลือกแผนงาน --</option>
                                </select>
                                {(formik.errors.plan_id && formik.touched.plan_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.plan_id}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="" className="col-3 text-right">ปีงบประมาณ :</label>
                            <div className="col-6">
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
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="" className="col-3 text-right">ประเภท :</label>
                            <div className="col-6 flex items-center justify-start gap-10 h-[34px]">
                                <label>
                                    <input
                                        type="radio"
                                        name="project_type_id"
                                        value={1}
                                        checked={formik.values.project_type_id === 1}
                                        className="mr-2"
                                    />
                                    โครงการ
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="project_type_id"
                                        value={2}
                                        checked={formik.values.project_type_id === 2}
                                        className="mr-2"
                                    />
                                    ผลผลิต
                                </label>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="" className="col-3 text-right">รหัส GFMIS :</label>
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="gfmis_id"
                                    className="form-control text-sm"
                                />
                                {(formik.errors.gfmis_id && formik.touched.gfmis_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.gfmis_id}</span>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-3">
                                <button type="submit" className="btn btn-outline-primary">บันทึก</button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default BudgetProjectForm