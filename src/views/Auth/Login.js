import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Spinner } from 'react-bootstrap'
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { login, resetSuccess } from '../../features/slices/auth/authSlice'

const loginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSuccess, isLoading } = useSelector(state => state.auth);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccess());

            navigate('/');
        }
    }, [isSuccess])

    const handleSubmit = (values, props) => {
        dispatch(login({ ...values }));

        props.resetForm();
    }

    return (
        <div className="container flex flex-col justify-center items-center min-h-[100vh]">
            <div className="login-box bg-white w-[360px] min-h-[360px] rounded-lg px-4 py-4 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mt-4">ระบบ MHC9 ERP</h1>
                <div className="w-[100%] my-4">
                    <Formik
                        initialValues={{
                            email: 'sanyath007@gmail.com',
                            password: '4621008811'
                        }}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <Row className="mb-2">
                                    <Col>
                                        <div className="form-control flex flex-row justify-between items-center">
                                            <input
                                                type="text"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                className="outline-none w-[90%]"
                                                placeholder="Email"
                                            />
                                            <span className="text-gray-500">
                                                <FaEnvelope />
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <div className="form-control flex flex-row justify-between items-center h-min-[34px]">
                                            {!visible ? (
                                            <input
                                                type="password"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                className="outline-none w-[90%]"
                                                placeholder="Password"
                                            />
                                            ) : <span>{formik.values.password}</span>}
                                            <span className="text-gray-500 cursor-pointer">
                                                {visible
                                                    ? <FaEye onClick={() => setVisible(!visible)} size={'18px'} />
                                                    : <FaEyeSlash onClick={() => setVisible(!visible)} size={'18px'} />
                                                }
                                            </span>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="d-grid mb-2">
                                    <button type="submit" className="btn btn-outline-primary">
                                        {isLoading && (
                                            <Spinner animation="border" role="status" size="sm" style={{ marginRight: '2px' }}>
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        )}
                                        ล็อกอิน <i className="fas fa-sign-in-alt"></i>
                                    </button>
                                </div>

                                <div className="flex flex-row justify-between mb-4 px-2">
                                    <div className="flex flex-row items-center gap-1">
                                        <input type="checkbox" name="" /> จำรหัสผ่าน
                                    </div>

                                    <Link to="/forgot-password" className="text-primary">ลืมรหัสผ่าน</Link>
                                </div>

                                <hr />

                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-outline-secondary">
                                        <i className="fas fa-user-plus"></i> ลงทะเบียน
                                    </button>
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

export default Login