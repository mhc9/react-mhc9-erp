import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Row, Col, FormGroup, Form as BsForm } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import TaskAssetList from './Asset/List'
import TaskAssetForm from './Asset/Form'

const taskSchema = Yup.object().shape({
    task_date: Yup.string().required(),
    task_time: Yup.string().required(),
    task_group_id: Yup.string().required(),
    description: Yup.string().required(),
    priority_id: Yup.string().required(),
});

const TaskForm = ({ task }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.task);
    const [assets, setAssets] = useState([]);

    const handleSubmit = (values, props) => {
        console.log(values, props);
    };

    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    task_date: '',
                    task_time: '',
                    task_type_id: '',
                    task_group_id: '',
                    description: '',
                    asset_id: '',
                    priority_id: '',
                    remark: '',
                }}
                validationSchema={taskSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Row className="mb-2">
                                <Col>
                                    <FormGroup>
                                        <label>วันที่แจ้ง</label>
                                        <BsForm.Control
                                            type="date"
                                            name="task_date"
                                            value={formik.values.task_date}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                        {(formik.errors.task_date && formik.touched.task_date) && (
                                            <span className="text-red-500 text-sm">{formik.errors.task_date}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label>เวลาที่แจ้ง</label>
                                        <BsForm.Control
                                            type="time"
                                            name="task_time"
                                            value={formik.values.task_time}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                        {(formik.errors.task_time && formik.touched.task_time) && (
                                            <span className="text-red-500 text-sm">{formik.errors.task_time}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <FormGroup>
                                        <label>ประเภทปัญหา</label>
                                        <select
                                            name="task_type_id"
                                            value={formik.values.task_type_id}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">-- เลือกประเภทปัญหา --</option>
                                        </select>
                                        {(formik.errors.task_type_id && formik.touched.task_type_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.task_type_id}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label>กลุ่มอาการ</label>
                                        <select
                                            name="task_group_id"
                                            value={formik.values.task_group_id}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">-- เลือกกลุ่มอาการ --</option>
                                        </select>
                                        {(formik.errors.task_group_id && formik.touched.task_group_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.task_group_id}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <FormGroup>
                                        <label>ผู้แจ้ง</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                name="reporter_id"
                                                value={formik.values.reporter_id}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                            <button type="button" className="btn btn-outline-primary">
                                                ค้นหา
                                            </button>
                                        </div>
                                        {(formik.errors.reporter_id && formik.touched.reporter_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.reporter_id}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                    <FormGroup>
                                        <label>รายละเอียด</label>
                                        <textarea
                                            rows={3}
                                            name="description"
                                            className="form-control"
                                        ></textarea>
                                        {(formik.errors.description && formik.touched.description) && (
                                            <span className="text-red-500 text-sm">{formik.errors.description}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <label>หมายเหตุ</label>
                                        <textarea
                                            rows={3}
                                            name="remark"
                                            className="form-control"
                                        ></textarea>
                                        {(formik.errors.remark && formik.touched.remark) && (
                                            <span className="text-red-500 text-sm">{formik.errors.remark}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <div>
                                        <h3 className="mb-1">รายการพัสดุ</h3>
                                        <TaskAssetForm onSelected={(asset) => setAssets([...assets, asset])} />
                                        <TaskAssetList assets={assets} />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button
                                        type="submit"
                                        className={`btn ${task ? 'btn-outline-warning' : 'btn-outline-primary'} mt-2 float-right`}
                                        disabled={formik.isSubmitting}
                                    >
                                        {loading && <Loading />}
                                        {task ? 'บันทึกการแกไข' : 'บันทึก'}
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default TaskForm