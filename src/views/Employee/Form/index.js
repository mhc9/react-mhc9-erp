import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Form as BsForm, FormGroup, Col, Row } from 'react-bootstrap'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import Loading from '../../../components/Loading'
import OverWriteMomentBE from '../../../utils/OverwriteMomentBE'
import { store } from '../../../features/employee/employeeSlice'
import { useGetInitialFormDataQuery } from '../../../services/employee/employeeApi'

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

const initialFormData = {
    prefixes: [],
    positions: [],
    levels: []
}

const EmployeeForm = ({ employee }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.employee);
    const [filteredLevels, setFilteredLevels] = useState([]);
    const [selectedBirthdate, setSelectedBirthdate] = useState(moment());
    const [selectedAssignedAt, setSelectedAssignedAt] = useState(moment());
    const [selectedStartedAt, setSelectedStartedAt] = useState(moment());
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        setSelectedImage(`/img/avatar-heroes.png`)
    }, []);

    const handlePositionSelected = (id) => {
        const position = formData && formData.positions.find(pos => pos.id === parseInt(id, 10));
        const newLevels = formData && formData.levels.filter(level => level.position_type_id === position.position_type_id);

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
                assigned_at: '',
                started_at: '',
                remark: '',
            }}
            validationSchema={employeeSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-4">
                            <Col md={12} className="flex flex-col justify-center items-center">
                                <div className="w-[120px] h-[120px] flex justify-center items-center rounded-full border overflow-hidden">
                                    <label className="hover:cursor-pointer">
                                        <input type="file" className="mt-2 hidden" />
                                        <figure className="relative">
                                            <img src={selectedImage} alt="employee-pic" className="w-full h-auto" />
                                            <figcaption className="absolute bottom-0 text-center opacity-5 hover:opacity-100 hover:bg-gray-300 text-white w-full h-full">
                                                Test 555
                                            </figcaption>
                                        </figure>
                                    </label>
                                </div>
                            </Col>
                        </Row>
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
                                        {formData && formData.prefixes && formData.prefixes.map(prefix => (
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
                                    <div className="flex flex-col">
                                        <label>วันเกิด</label>
                                        <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedBirthdate}
                                                onChange={(date) => {
                                                    setSelectedBirthdate(date);
                                                    formik.setFieldValue('birthdate', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </MuiPickersUtilsProvider>
                                        {(formik.errors.birthdate && formik.touched.birthdate) && (
                                            <span className="text-red-500 text-sm">{formik.errors.birthdate}</span>
                                        )}
                                    </div>
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
                                    <label>ตำแหน่ง</label>
                                    <select name="position_id" value={formik.values.position_id} className="form-control"
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            handlePositionSelected(e.target.value);
                                        }}
                                    >
                                        <option value="">-- เลือกตำแหน่ง --</option>
                                        {formData && formData.positions && formData.positions.map(type => (
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
                                    <div className="flex flex-col">
                                        <label>วันที่บรรจุ</label>
                                        <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedAssignedAt}
                                                onChange={(date) => {
                                                    setSelectedAssignedAt(date);
                                                    formik.setFieldValue('assigned_at', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </MuiPickersUtilsProvider>
                                        {(formik.errors.assigned_at && formik.touched.assigned_at) && (
                                            <span className="text-red-500 text-sm">{formik.errors.assigned_at}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <div className="flex flex-col">
                                        <label>วันที่เริ่มงาน (ที่ศูนย์สุขภาพจิตที่ 9)</label>
                                        <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedStartedAt}
                                                onChange={(date) => {
                                                    setSelectedStartedAt(date);
                                                    formik.setFieldValue('started_at', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </MuiPickersUtilsProvider>
                                        {(formik.errors.started_at && formik.touched.started_at) && (
                                            <span className="text-red-500 text-sm">{formik.errors.started_at}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
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
