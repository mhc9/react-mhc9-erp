import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaInfoCircle } from 'react-icons/fa'
import { Breadcrumb, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import api from '../../api'
import { toast } from 'react-toastify'

const changeSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required('กรุณากรอกรหัสผ่านใหม่ก่อน'),
    password_confirmation: Yup.string().required('กรุณากรอกยืนยันรหัสผ่านใหม่ก่อน'),
});

const ChangePassword = ({ currentUser }) => {
    const navigate = useNavigate();

    const handleSubmit = async (values, formik) => {
        try {
            const res = await api.post('/api/change-password', values);

            if (res.data.success) {
                toast.success('เปลี่ยนรหัสผ่านสำเร็จ!!');
                navigate('/');
            }
        } catch (error) {
            toast.error('พบข้อผิดพลาด ไม่สามารถเปลี่ยนรหัสผ่านได้!!');
        }
    };

    return (
        <Formik
            initialValues={{
                email: currentUser.email,
                password: '',
                password_confirmation: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={changeSchema}
        >
            {(formik) => {
                return (
                    <Form>
                        <div>
                            <h3 className="text-xl font-bold">เปลี่ยนรหัสผ่าน</h3>

                            <div className="alert alert-info text-sm mb-4 w-full flex flex-row items-center gap-1">
                                <FaInfoCircle size={"20px"}  />
                                กรุณาเปลี่ยนรหัสผ่านก่อนใช้งานระบบ
                            </div>

                            <div className="mt-4">
                                <div className="w-[400px]">
                                    <FormGroup className="mb-2">
                                        <label htmlFor="">อีเมล</label>
                                        <div className="form-control bg-gray-100">{formik.values.email}</div>
                                    </FormGroup>
                                    <FormGroup className="mb-2">
                                        <label htmlFor="">รหัสผ่านใหม่</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                            placeholder="รหัสผ่านใหม่"
                                        />
                                        {(formik.errors.password && formik.touched.password) && (
                                            <span className="text-red-500 text-sm">{formik.errors.password}</span>
                                        )}
                                    </FormGroup>
                                    <FormGroup className="mb-2">
                                        <label htmlFor="">ยืนยันรหัสผ่าน</label>
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            value={formik.values.password_confirmation}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                            placeholder="ยืนยันรหัสผ่าน"
                                        />
                                        {(formik.errors.password_confirmation && formik.touched.password_confirmation) && (
                                            <span className="text-red-500 text-sm">{formik.errors.password_confirmation}</span>
                                        )}
                                    </FormGroup>

                                    <button type="submit" className="btn btn-outline-primary btn-sm">
                                        บันทึก
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ChangePassword;
