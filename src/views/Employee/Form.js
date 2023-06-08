import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ModalAssetList from '../../components/Modals/AssetList';
import api from '../../api';
import { store } from '../../features/employee/employeeSlice';
import Loading from '../../components/Loading'

const employeeSchema = Yup.object().shape({
    prefix_id: Yup.string().required(),
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    cid: Yup.string().required(),
    sex: Yup.string().required(),
    birthdate: Yup.string().required(),
    position_id: Yup.string().required(),
    started_at: Yup.string().required(),
});

const EmployeeForm = () => {
    const dispatch = useDispatch();
    const { loading, success } = useSelector(state => state.employee);
    const [prefixes, setPrefixes] = useState([]);
    const [positions, setPositions] = useState([]);
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);

    useEffect(() => {
        getFormInitialData();

        return () => getFormInitialData();
    }, []);

    const getFormInitialData = async () => {
        try {
            const res = await api.get('/api/employees/form/init');
            
            setPrefixes(res.data.prefixes);
            setPositions(res.data.postions);
            setClasses(res.data.classes);
        } catch (error) {
            
        }
    };

    const handlePositionSelected = (position) => {
        const newClasses = classes.filter(classes => classes.position_id === parseInt(position, 10));

        setFilteredClasses(newClasses);
    };

    const handleSubmit = (values, props) => {
        console.log(values, props);
        dispatch(store(values))
    };

    return (
        <Formik
            initialValues={{
                id: '',
                employee_no: '',
                prefix_id: '',
                firstname: '',
                lastname: '',
                cid: '',
                sex: '',
                birthdate: '',
                tel: '',
                email: '',
                line_id: '',
                position_id: '',
                class_id: '',
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
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>รายละเอียด</label>
                                    <textarea
                                        rows={3}
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                    </textarea>
                                    {(formik.errors.description && formik.touched.description) && (
                                        <span className="text-red-500 text-sm">{formik.errors.description}</span>
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
                                        <option value="">-- เลือกประเภท --</option>
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
                                        name="class_id"
                                        value={formik.values.class_id} 
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกกลุ่ม --</option>
                                        {filteredClasses && filteredClasses.map(group => (
                                            <option value={group.id} key={group.id}>
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.class_id && formik.touched.class_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.class_id}</span>
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
