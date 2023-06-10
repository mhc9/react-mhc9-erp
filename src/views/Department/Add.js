import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const departmentSchema = Yup.object().shape({
    name: Yup.string().required()
});

const AddDepartment = () => {
    return (
        <div className="my-2">
            <Formik
                initialValues={{
                    name: '',
                    status: false,
                }}
                validationSchema={departmentSchema}
                onSubmit={(values) => console.log(values)}
            >
                {(formik) => {
                    return (
                        <Form className="form-inline">
                            <div className="flex flex-row items-center gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className="form-control w-1/2"
                                    placeholder="ชื่อกลุ่มงาน"
                                />
                                <div className="flex items-center justify-center gap-2">
                                    <Field
                                        type="checkbox"
                                        name="status"
                                    /> ใช้งานอยู่
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary"
                                    onClick={() => console.log()}
                                >
                                    เพิ่มกลุ่มงาน
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddDepartment
