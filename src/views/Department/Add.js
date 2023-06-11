import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Loading from '../../components/Loading'
import { store } from '../../features/department/departmentSlice'

const departmentSchema = Yup.object().shape({
    name: Yup.string().required()
});

const AddDepartment = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.department);

    const handleSubmit = (values, props) => {
        dispatch(store(values));
    };

    return (
        <div className="my-2">
            <Formik
                initialValues={{
                    name: '',
                    status: false,
                }}
                validationSchema={departmentSchema}
                onSubmit={handleSubmit}
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
                                <button type="submit" className="btn btn-outline-primary">
                                    {loading && <Loading />}
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
