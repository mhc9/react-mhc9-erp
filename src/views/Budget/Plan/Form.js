import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment';
import { DatePicker } from '@material-ui/pickers';
import { useStyles } from '../../../hooks/useStyles';

const budgetPlanSchema = Yup.object().shape({
    plan_no: Yup.string().required(),
    name: Yup.string().required(),
    year: Yup.string().required(),
    plan_type_id: Yup.string().required(),
});

const BudgetPlanForm = () => {
    const classes = useStyles();
    const [selectedYear, setSelectedYear] = useState(moment());

    const handleSubmit = (values, formik) => {
        console.log(values);
    };

    return (
        <div className="border rounded-md py-5">
            <Formik
                initialValues={{
                    plan_no: '',
                    name: '',
                    year: '',
                    plan_type_id: ''
                }}
                validationSchema={budgetPlanSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form>
                            <div className="form-group row mb-2">
                                <label htmlFor="" className="col-3 text-right">เลขที่แผนงาน :</label>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        name="plan_no"
                                        value={formik.values.plan_no}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm w-[40%]"
                                    />
                                    {(formik.errors.plan_no && formik.touched.plan_no) && (
                                        <span className="text-red-500 text-sm">{formik.errors.plan_no}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label htmlFor="" className="col-3 text-right">ชื่อแผนงาน :</label>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.name && formik.touched.name) && (
                                        <span className="text-red-500 text-sm">{formik.errors.name}</span>
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
                                <label htmlFor="" className="col-3 text-right">ประเภทแผนงาน :</label>
                                <div className="col-6">
                                    <select
                                        name="plan_type_id"
                                        value={1}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    >
                                        <option value="">-- เลือกประเภท --</option>
                                    </select>
                                    {(formik.errors.plan_type_id && formik.touched.plan_type_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.plan_type_id}</span>
                                    )}
                                </div>
                            </div>
                            <div class="row">
                                <div className="offset-3">
                                    <button className="btn btn-outline-primary">บันทึก</button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default BudgetPlanForm