import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Loading from '../../components/Loading'
import { store, update } from '../../features/division/divisionSlice'
import api from '../../api';

const divisionSchema = Yup.object().shape({
    name: Yup.string().required(),
    department_id: Yup.string().required(),
});

const DivisionForm = ({ division, handleCancel }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.division);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments();

        return () => getDepartments();
    }, [])

    const getDepartments = async () => {
        try {
            const res = await api.get(`/api/divisions/form/init`);

            setDepartments(res.data.departments);
        } catch (error) {
            console.log(error);
        }
    };

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
                    department_id: division ? division.department_id : '',
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
                                <select name="department_id" className="form-control w-4/12">
                                    <option>-- เลือกกลุ่มงาน --</option>
                                    {departments && departments.map(dep => (
                                        <option key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </option>
                                    ))}
                                </select>
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
