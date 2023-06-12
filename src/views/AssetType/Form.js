import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Loading from '../../components/Loading'
import { store, update } from '../../features/asset-type/assetTypeSlice'
import api from '../../api';

const assetTypeSchema = Yup.object().shape({
    name: Yup.string().required(),
    department_id: Yup.string().required(),
});

const AssetTypeForm = ({ assettype, handleCancel }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.assetType);

    const handleSubmit = (values, props) => {
        if (assetType) {
            dispatch(update({ id: assetType.id, data: values }));

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
                    name: assetType ? assetType.name : '',
                    department_id: assetType ? assetType.department_id : '',
                    status: assetType ? (assetType.status === 1 ? true : false) : false,
                }}
                validationSchema={assetTypeSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form className="form-inline">
                            <div className="flex flex-row items-center gap-4">
                                <div className="w-4/12">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className="form-control w-full"
                                        placeholder="ประเภทพัสดุ"
                                    />
                                    {(formik.errors.name && formik.touched.name) && (
                                        <span className="text-red-500 text-sm">{formik.errors.name}</span>
                                    )}
                                </div>
                                <div className="w-4/12">
                                    <select
                                        name="department_id"
                                        className="form-control w-full"
                                        value={formik.values.department_id}
                                        onChange={formik.handleChange}
                                    >
                                        <option>-- เลือกกลุ่มงาน --</option>
                                        {departments && departments.map(dep => (
                                            <option key={dep.id} value={dep.id}>
                                                {dep.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.department_id && formik.touched.department_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.department_id}</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <Field
                                        type="checkbox"
                                        name="status"
                                    /> ใช้งานอยู่
                                </div>
                                <div className="flex gap-1">
                                    <button type="submit" className={`btn ${assettype ? 'btn-outline-warning' : 'btn-outline-primary'}`}>
                                        {loading && <Loading />}
                                        {assettype ? 'แก้ไขประเภทพัสดุ' : 'เพิ่มประเภทพัสดุ'}
                                    </button>
                                    {assettype && (
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

export default AssetTypeForm
