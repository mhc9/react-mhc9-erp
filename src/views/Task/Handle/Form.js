import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers';
import moment from 'moment'
import OverWriteMomentBE from '../../../utils/OverwriteMomentBE'
import { FaSearch } from 'react-icons/fa';
import ModalEmployeeList from '../../../components/Modals/EmployeeList'

const handlingSchema = Yup.object().shape({});

const TaskHandlingForm = ({ task, onCancel }) => {
    const [selectedHandleDate, setSelectedHandleDate] = useState(moment());
    const [selectedHandleTime, setSelectedHandleTime] = useState(moment());
    const [showEmployeeModal, setShowEmployeeModal] = useState(false)
    const [handler, setHandler] = useState(null);

    useEffect(() => {

    }, []);

    const handleSubmit = (values, formik) => {
        console.log(values);

        formik.resetForm();
        onCancel();
    };

    return (
        <Formik
            initialValues={{
                handle_date: '',
                handle_time: '',
                task_id: '',
                handler_id: '',
                description: '',
                cause_id: '',
                cause_text: '',
                handle_type_id: ''
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
                                <select className="form-control text-sm font-thin mb-1">
                                    <option>-- เลือก --</option>
                                </select>
                                <input type="text" className="form-control text-sm font-thin" placeholder="ระบุ (ถ้ามี)" />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <label htmlFor="">ประเภทงาน</label>
                            <select className="form-control text-sm font-thin mr-1">
                                <option>-- เลือก --</option>
                            </select>
                        </Col>
                        <Col>
                            <label htmlFor="">สถานะ</label>
                            <select className="form-control text-sm font-thin mr-1">
                                <option>-- เลือก --</option>
                            </select>
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
                                className={`btn ${task ? 'btn-outline-warning' : 'btn-outline-primary'} mt-2 float-right`}
                                disabled={formik.isSubmitting}
                            >
                                {task ? 'บันทึกการแกไข' : 'บันทึก'}
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
