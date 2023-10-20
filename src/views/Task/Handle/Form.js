import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers';
import moment from 'moment'
import OverWriteMomentBE from '../../../utils/OverwriteMomentBE'
import { store } from '../../../features/task-handling/taskHandlingSlice'
import { useGetInitialFormDataQuery } from '../../../services/task-handling/taskHandlingApi'
import ModalEmployeeList from '../../../components/Modals/EmployeeList'
import Loading from '../../../components/Loading';

const handlingSchema = Yup.object().shape({
    handle_date: Yup.string().required(),
    handle_time: Yup.string().required(),
    handler_id: Yup.string().required(),
    description: Yup.string().required(),
    cause_id: Yup.string().required(),
    handle_type_id:  Yup.string().required()
});

const TaskHandlingForm = ({ task, onCancel }) => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [selectedHandleDate, setSelectedHandleDate] = useState(moment());
    const [selectedHandleTime, setSelectedHandleTime] = useState(moment());
    const [showEmployeeModal, setShowEmployeeModal] = useState(false)
    const [handler, setHandler] = useState(null);

    /** On mounted */
    useEffect(() => {

    }, []);

    const handleSubmit = (values, formik) => {
        dispatch(store(values));

        formik.resetForm();
        onCancel();
    };

    return (
        <Formik
            initialValues={{
                handle_date: moment().format('YYYY-MM-DD'),
                handle_time: moment().format('hh:mm'),
                task_id: task ? task.id : '',
                handler_id: '',
                description: '',
                cause_id: '',
                cause_text: '',
                handle_type_id: '1'
            }}
            validationSchema={handlingSchema}
            onSubmit={handleSubmit}
        >
        {(formik) => {
            return (
                <Form>
                    <ModalEmployeeList
                        isShow={showEmployeeModal}
                        onHide={() => setShowEmployeeModal(false)}
                        onSelect={(employee) => {
                            setHandler(employee);
                            formik.setFieldValue('handler_id', employee.id);
                        }}
                    />

                    <Row className="mb-2">
                        <Col md={2}>
                            <div className="flex flex-col">
                                <label>วันที่ดำเนินการ</label>
                                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedHandleDate}
                                        onChange={(date) => {
                                            setSelectedHandleDate(date);
                                            formik.setFieldValue('handle_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                    />
                                </MuiPickersUtilsProvider>
                                {(formik.errors.handle_date && formik.touched.handle_date) && (
                                    <span className="text-red-500 text-sm">{formik.errors.handle_date}</span>
                                )}
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="flex flex-col">
                            <label>เวลาที่ดำเนินการ</label>
                                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                    <TimePicker
                                        format="hh:mm"
                                        value={selectedHandleTime}
                                        onChange={(time) => {
                                            const dateStr = moment(selectedHandleDate).format('YYYY-MM-DD');
                                            const timeStr = moment(time).format('hh:mm');

                                            /** Create newTime from selectedHandleDate and selected time from input */
                                            const newTime = moment(`${dateStr}T${timeStr}`);

                                            /** Set newTime to selectedHandleTime state and handle_time field */
                                            setSelectedHandleTime(newTime);
                                            formik.setFieldValue('handle_time', newTime.format('hh:mm'));
                                        }}
                                        variant="outlined"
                                    />
                                </MuiPickersUtilsProvider>
                                {(formik.errors.handle_time && formik.touched.handle_time) && (
                                    <span className="text-red-500 text-sm">{formik.errors.handle_time}</span>
                                )}
                            </div>
                        </Col>
                        <Col>
                            <label htmlFor="">ผู้ดำเนินการ</label>
                            <div className="input-group">
                                <div className="form-control text-sm font-thin min-h-[34px] bg-gray-100">
                                    {handler && handler.firstname+ ' ' +handler.lastname}
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary text-sm"
                                    onClick={() => setShowEmployeeModal(true)}
                                >
                                    <FaSearch />
                                </button>
                            </div>
                            {(formik.errors.handler_id && formik.touched.handler_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.handler_id}</span>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <label>รายละเอียด</label>
                            <textarea
                                rows={3}
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className="form-control text-sm font-thin"
                            ></textarea>
                            {(formik.errors.description && formik.touched.description) && (
                                <span className="text-red-500 text-sm">{formik.errors.description}</span>
                            )}
                        </Col>
                        <Col>
                            <label htmlFor="">สาเหตุของปัญหา</label>
                            <div className="flex flex-col">
                                {isLoading && <div className="form-control text-center"><Loading /></div>}
                                {!isLoading && (
                                    <select
                                        name="cause_id"
                                        value={formik.values.cause_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm font-thin mb-1"
                                    >
                                        <option>-- เลือก --</option>
                                        {formData && formData.causes.map((cause, index) => (
                                            <option value={cause.id} key={cause.id}>
                                                {cause.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <input type="text" className="form-control text-sm font-thin" placeholder="ระบุ (ถ้ามี)" />
                            </div>
                            {(formik.errors.cause_id && formik.touched.cause_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.cause_id}</span>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <label htmlFor="">ประเภทงาน</label>
                            <label className="form-control text-sm font-thin">
                                <Field
                                    type="radio"
                                    name="handle_type_id"
                                    value="1"
                                />
                                <span className="ml-1 mr-4">ซ่อม</span>

                                <Field
                                    type="radio"
                                    name="handle_type_id"
                                    value="2"
                                />
                                <span className="ml-1 mr-4">บำรุงรักษา</span>

                                <Field
                                    type="radio"
                                    name="handle_type_id"
                                    value="3"
                                />
                                <span className="ml-1 mr-4">สร้าง</span>

                                <Field
                                    type="radio"
                                    name="handle_type_id"
                                    value="4"
                                />
                                <span className="ml-1 mr-4">แก้ไข</span>
                            </label>
                            {(formik.errors.handle_type_id && formik.touched.handle_type_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.handle_type_id}</span>
                            )}
                        </Col>
                        <Col>
                            <label htmlFor="">สถานะ</label>
                            {isLoading && <div className="form-control text-center"><Loading /></div>}
                            {!isLoading && (
                                <select
                                    name="status"
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm font-thin mr-1"
                                >
                                    <option>-- เลือก --</option>
                                    {formData && formData.statuses.map((status, index) => (
                                        <option value={status.id} key={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {(formik.errors.status && formik.touched.status) && (
                                <span className="text-red-500 text-sm">{formik.errors.status}</span>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button
                                type="button"
                                className={`btn btn-outline-danger mt-2 float-right ml-2`}
                                onClick={onCancel}
                            >
                                ยกเลิก
                            </button>
                            <button
                                type="submit"
                                className={`btn btn-outline-primary mt-2 float-right`}
                                disabled={formik.isSubmitting}
                            >
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

export default TaskHandlingForm
