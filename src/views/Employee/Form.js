import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Form as BsForm, FormGroup, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api';
import { store } from '../../features/employee/employeeSlice';
import Loading from '../../components/Loading'

const employeeSchema = Yup.object().shape({
    prefix_id: Yup.string().required(),
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    cid: Yup.string().required(),
    sex: Yup.string().required(),
    // birthdate: Yup.string().required(),
    position_id: Yup.string().required(),
    // started_at: Yup.string().required(),
});

const EmployeeForm = ({ employee }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.employee);
    const [prefixes, setPrefixes] = useState([]);
    const [positions, setPositions] = useState([]);
    const [levels, setLevels] = useState([]);
    const [filteredLevels, setFilteredLevels] = useState([]);

    useEffect(() => {
        getFormInitialData();

        return () => getFormInitialData();
    }, []);

    const getFormInitialData = async () => {
        try {
            const res = await api.get('/api/employees/form/init');
            
            setPrefixes(res.data.prefixes);
            setPositions(res.data.positions);
            setLevels(res.data.levels);
        } catch (error) {
            
        }
    };

    const handlePositionSelected = (id) => {
        const position = positions.find(pos => pos.id === parseInt(id, 10));
        const newLevels = levels.filter(level => level.position_type_id === position.position_type_id);

        setFilteredLevels(newLevels);
    };

    const handleSubmit = (values, props) => {
        if (employee) {

        } else {
            dispatch(store(values));
        }

        props.resetForm();
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                id: '',
                employee_no: '',
                prefix_id: '',
                firstname: '',
                lastname: '',
                cid: '',
                sex: '1',
                birthdate: '',
                tel: '',
                email: '',
                line_id: '',
                position_id: '',
                level_id: '',
                started_at: '',
                remark: '',
            }}
            validationSchema={employeeSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>เลขที่พนักงาน</label>
                                    <input
                                        type="text"
                                        name="employee_no"
                                        value={formik.values.employee_no}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.employee_no && formik.touched.employee_no) && (
                                        <span className="text-red-500 text-sm">{formik.errors.employee_no}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>เลขบัตรประชาชน</label>
                                    <input
                                        type="text"
                                        name="cid"
                                        value={formik.values.cid}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.cid && formik.touched.cid) && (
                                        <span className="text-red-500 text-sm">{formik.errors.cid}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>คำนำหน้า</label>
                                    <select
                                        name="prefix_id"
                                        value={formik.values.prefix_id} 
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกคำนำหน้า --</option>
                                        {prefixes && prefixes.map(prefix => (
                                            <option value={prefix.id} key={prefix.id}>
                                                {prefix.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.prefix_id && formik.touched.prefix_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.prefix_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ชื่อ</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.firstname && formik.touched.firstname) && (
                                        <span className="text-red-500 text-sm">{formik.errors.firstname}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>สกุล</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.lastname && formik.touched.lastname) && (
                                        <span className="text-red-500 text-sm">{formik.errors.lastname}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>ตำแหน่ง</label>
                                    <select name="position_id" value={formik.values.position_id} className="form-control"
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            handlePositionSelected(e.target.value);
                                        }}
                                    >
                                        <option value="">-- เลือกตำแหน่ง --</option>
                                        {positions && positions.map(type => (
                                            <option value={type.id} key={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.position_id && formik.touched.position_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.position_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ระดับ</label>
                                    <select
                                        name="level_id"
                                        value={formik.values.level_id} 
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกระดับ --</option>
                                        {filteredLevels && filteredLevels.map(level => (
                                            <option value={level.id} key={level.id}>
                                                {level.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.level_id && formik.touched.level_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.level_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>วันเกิด</label>
                                    <BsForm.Control
                                        type="date"
                                        name="birthdate"
                                        value={formik.values.birthdate}
                                        onChange={formik.handleChange}
                                    />
                                    {(formik.errors.birthdate && formik.touched.birthdate) && (
                                        <span className="text-red-500 text-sm">{formik.errors.birthdate}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>เพศ</label>                                    
                                    <Field component="div" name="sex" className="form-control">
                                        <input
                                            type="radio"
                                            id="radioOne"
                                            defaultChecked={formik.values.sex === "one"}
                                            name="sex"
                                            value="1"
                                        />
                                        <label htmlFor="male" className="ml-1 mr-4">ชาย</label>

                                        <input
                                            type="radio"
                                            id="radioTwo"
                                            defaultChecked={formik.values.sex === "two"}
                                            name="sex"
                                            value="2"
                                        />
                                        <label htmlFor="famale" className="ml-1">หญิง</label>
                                    </Field>
                                    {(formik.errors.sex && formik.touched.sex) && (
                                        <span className="text-red-500 text-sm">{formik.errors.sex}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>วันที่เริ่มงาน</label>
                                    <BsForm.Control
                                        type="date"
                                        name="started_at"
                                        value={formik.values.started_at}
                                        onChange={formik.handleChange}
                                    />
                                    {(formik.errors.started_at && formik.touched.started_at) && (
                                        <span className="text-red-500 text-sm">{formik.errors.started_at}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>โทรศัพท์</label>
                                    <input
                                        type="text"
                                        name="tel"
                                        value={formik.values.tel}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.tel && formik.touched.tel) && (
                                        <span className="text-red-500 text-sm">{formik.errors.tel}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>อีเมล</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.email && formik.touched.email) && (
                                        <span className="text-red-500 text-sm">{formik.errors.email}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>LINE ID</label>
                                    <input
                                        type="text"
                                        name="line_id"
                                        value={formik.values.line_id}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.line_id && formik.touched.line_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.line_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>หมายเหตุ</label>
                                    <textarea
                                        rows={3}
                                        name="remark"
                                        value={formik.values.remark}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                    </textarea>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary mt-2 float-right"
                                    disabled={formik.isSubmitting}
                                >
                                    {loading && <Loading />}
                                    บันทึก
                                </button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default EmployeeForm
