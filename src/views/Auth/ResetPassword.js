import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Spinner } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { login, resetSuccess } from '../../features/slices/auth/authSlice'
import api from '../../api'

const loginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().required(),
});

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success, loading } = useSelector(state => state.auth);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());

            navigate('/');
        }
    }, [success]);

    const handleSubmit = async (values, props) => {
        // dispatch(login({ ...values }));
        try {
            const res = await api.post(`/api/reset-password`, values);
            console.log(res.data);
            
            if (res.data.success) {
                toast.success('การตั้งรหัสผ่านใหม่สำเร็จ!!');
                navigate('/login');
            }
        } catch (error) {
            
        }

        props.resetForm();
    };

    return (
        <div className="container flex flex-col justify-center items-center min-h-[100vh]">
            <div className="login-box bg-white w-[380px] min-h-[360px] rounded-lg px-4 py-4 flex flex-col justify-around items-center">
                <h1 className="text-3xl font-bold mt-4 mb-2">ตั้งรหัสผ่านใหม่</h1>

                <div className="alert alert-info text-sm mb-4 w-full flex flex-row items-center gap-1">
                    <FaInfoCircle size={"20px"}  />
                    กรุณาตั้งรหัสผ่านใหม่ของคุณ
                </div>

                <div className="w-[100%] my-4">
                    <Formik
                        initialValues={{
                            email: searchParams ? searchParams.get('email') : '',
                            password: '',
                            password_confirmation: ''
                        }}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <Row className="mb-2">
                                        <Col>
                                            <input
                                                type="text"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                className="form-control bg-gray-100"
                                                placeholder="Email"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                                placeholder="รหัสผ่านใหม่"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col>
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                value={formik.values.password_confirmation}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                                placeholder="ยืนยันรหัสผ่าน"
                                            />
                                        </Col>
                                    </Row>

                                    <div className="d-grid mb-2">
                                        <button type="submit" className="btn btn-outline-primary">
                                            {loading && (
                                                <Spinner animation="border" role="status" size="sm" style={{ marginRight: '2px' }}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            )}
                                            บันทึก
                                        </button>
                                    </div>

                                    {/* <div className="text-xs flex flex-row items-center gap-1">
                                        <i class="fas fa-info-circle"></i>
                                        <span>ระบบจะส่งรหัสยืนยันตัวตนของท่านไปยังอีเมลที่ลงทะเบียนไว้</span>
                                    </div> */}
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>

            <div className="mt-4 text-gray-600 text-sm">
                <a href="https:www.mhc9dmh.com">©ศูนย์สุขภาพจิตที่ 9</a> | โดย สัญญา ธรรมวงษ์
            </div>
        </div>
    )
}

export default ResetPassword