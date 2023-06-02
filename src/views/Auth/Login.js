import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login, resetSuccess } from '../../features/auth/authSlice'

const loginSchema = Yup.object().shape({
    UsUser: Yup.string().required(),
    password: Yup.string().required(),
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.auth);

    useEffect(() => {
        if (success) {
            console.log('On success changed...');
            dispatch(resetSuccess());

            navigate('/');
        }
    }, [success])

    const handleSubmit = (values, props) => {
        dispatch(login({ ...values }))
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-[100vh] border bg-gray-200">
            <div className="login-box flex flex-col justify-center items-center bg-white border rounded-md p-10">
                <h2 className="text-xl">ระบบ <b>IT</b> Helpdesk</h2>
                <Formik
                    initialValues={{
                        UsUser: '',
                        password: ''
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <div>
                                    <div className="flex flex-row gap-2 justify-center items-center my-4">
                                        <label className="w-3/12">ชื่อผู้ใช้ :</label>
                                        <div className="border px-4 py-2 rounded-full w-3/4">
                                            <input
                                                type="text"
                                                name="UsUser"
                                                value={formik.values.UsUser}
                                                onChange={formik.handleChange}
                                                placeholder="Username"
                                                className="outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-2 justify-center items-center my-4">
                                        <label className="w-3/12">รหัสผ่าน :</label>
                                        <div className="border px-4 py-2 rounded-full w-3/4">
                                            <input
                                                type="password"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                placeholder="Password"
                                                className="outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-1 justify-center items-center">
                                        <label className="w-3/12"></label>
                                        <div className="w-3/4 flex justify-between items-center">
                                            <button
                                                type="submit"
                                                className="bg-green-600 rounded-full px-4 py-2 text-white hover:bg-green-900"
                                            >
                                                ล็อกอิน
                                                <i className="fas fa-sign-in-alt ml-1"></i>
                                            </button>
                                            <Link to="/register" className="hover:text-blue-500 mr-1">
                                                <i className="fas fa-user-plus"></i> ลงทะเบียน
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                        </Form>
                    )
                }}
                </Formik>
            </div>
        </div>
    )
}

export default Login