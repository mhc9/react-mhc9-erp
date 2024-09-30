import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { login, resetSuccess } from '../../features/slices/auth/authSlice'
import api from '../../api'

const loginSchema = Yup.object().shape({
    email: Yup.string().required(),
    token: Yup.string().required(),
});

const VerifyEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());

            navigate('/');
        }
    }, [success]);

    const handleSubmit = async (values, props) => {
        // dispatch(login({ ...values }));
        try {
            const res = await api.post(`/api/verify/pin`, values);
            console.log(res.data);
            
            if (res.data.success) {
                toast.success('ยืนยันตัวตนสำเร็จ!!');
                navigate('/reset-password');
            }
        } catch (error) {
            
        }

        props.resetForm();
    };

    return (
        <div className="container flex flex-col justify-center items-center min-h-[100vh]">
            <div className="login-box bg-white w-[380px] min-h-[360px] rounded-lg px-4 py-4 flex flex-col justify-between items-center">
                <h1 className="text-3xl font-bold mt-4">ยืนยันอีเมล</h1>
                <div className="w-[100%] my-4">
                    <Formik
                        initialValues={{
                            email: 'sanyath007@gmail.com',
                            token: '',
                        }}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => {
                            console.log(formik.values);
                            
                            return (
                                <Form>
                                    <Row className="mb-2">
                                        <Col>
                                            <input
                                                type="text"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                                placeholder="Email"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            <input
                                                type="password"
                                                name="token"
                                                value={formik.values.token}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                                placeholder="รหัสยืนยันตัวตน 6 หลัก"
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
                                            ส่งอีเมล <i className="fas fa-paper-plane"></i>
                                        </button>
                                    </div>

                                    <div className="text-xs flex flex-row items-center gap-1">
                                        <i class="fas fa-info-circle"></i>
                                        <span>ระบบจะส่งรหัสยืนยันตัวตนของท่านไปยังอีเมลที่ลงทะเบียนไว้</span>
                                    </div>
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

export default VerifyEmail