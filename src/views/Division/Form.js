import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Loading from '../../components/Loading'
import { store, update } from '../../features/division/divisionSlice'

const divisionSchema = Yup.object().shape({
    name: Yup.string().required()
});

const DivisionForm = ({ division, handleCancel }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.division);

    const handleSubmit = (values, props) => {
        if (division) {
            dispatch(update({ id: division.id, data: values }));

            handleCancel()
        } else {
            dispatch(store(values));
        }

        props.resetForm();
    };

    return (
        <div className="my-2">
            <Formik
                enableReinitialize
                initialValues={{
                    name: division ? division.name : '',
                    status: division ? (division.status === 1 ? true : false) : false,
                }}
                validationSchema={divisionSchema}
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
                                    className="form-control w-4/12"
                                    placeholder="ชื่องาน"
                                />
                                <div className="flex items-center justify-center gap-2">
                                    <Field
                                        type="checkbox"
                                        name="status"
                                    /> ใช้งานอยู่
                                </div>
                                <div className="flex gap-1">
                                    <button type="submit" className={`btn ${division ? 'btn-outline-warning' : 'btn-outline-primary'}`}>
                                        {loading && <Loading />}
                                        {division ? 'แก้ไขงาน' : 'เพิ่มงาน'}
                                    </button>
                                    {division && (
                                        <button type="button" className="btn btn-outline-danger" onClick={handleCancel}>
                                            ยกเลิก
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default DivisionForm
