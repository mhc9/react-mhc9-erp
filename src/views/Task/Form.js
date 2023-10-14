import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Row, Col, FormGroup, Form as BsForm } from 'react-bootstrap'
import moment from 'moment'
import api from '../../api'
import { store, update } from '../../features/task/taskSlice'
import { useGetInitialFormDataQuery } from '../../services/task/taskApi'
import TaskAssetList from './Asset/List'
import TaskAssetForm from './Asset/Form'
import Loading from '../../components/Loading'
import ModalEmployeeList from '../../components/Modals/EmployeeList'

const taskSchema = Yup.object().shape({
    task_date: Yup.string().required(),
    task_time: Yup.string().required(),
    task_group_id: Yup.string().required(),
    description: Yup.string().required(),
    priority_id: Yup.string().required(),
    reporter_id: Yup.string().required(),
});

const TaskForm = ({ task }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.task);
    const { data: formData } = useGetInitialFormDataQuery();
    const [assets, setAssets] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [reporter, setReporter] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    /** On mount component set initital value of asset local state by task prop */
    useEffect(() => {
        if (task) {
            const taskAssets = task?.assets.map(item => item.asset);

            setAssets(taskAssets);
            setReporter(task.reporter);
        }
    }, [task]);

    /** Initial data for form's dropdown input */
    useEffect(() => {
        if (formData && task) setFilteredGroups(formData.groups);
    }, [formData]);

    const handleTypeChange = (type) => {
        const newGroups = formData.groups.filter(group => group.task_type_id === parseInt(type, 10));

        setFilteredGroups(newGroups);
    };

    const handleAddAsset = (formik, asset) => {
        formik.setFieldValue('assets', [...formik.values.assets, asset.id])
        setAssets([...assets, asset]);
    }

    const handleRemoveAsset = (formik, id) => {
        const newAssets = assets.filter(asset => parseInt(asset.id, 10) !== id);

        formik.setFieldValue('assets', newAssets.length > 0 ? [...newAssets] : [])
        setAssets(newAssets);
    };

    const handleSubmit = (values, props) => {
        if (task) {
            dispatch(update({ id: '', data: values }));
        } else {
            dispatch(store(values));
        }

        props.resetForm();
    };

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    id: task ? task.id : '',
                    task_date: task ? moment(task.task_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                    task_time: task ? moment(`${task.task_date} ${task.task_time}`).format('HH:mm') : moment().format('HH:mm'),
                    task_type_id: task ? task.group.task_type_id : '',
                    task_group_id: task ? task.task_group_id : '',
                    description: task ? task.description : '',
                    priority_id: task ? task.priority_id : '1',
                    reporter_id: task ? task.reporter_id : '',
                    remark: task ? task.remark : '',
                    assets: [],
                }}
                validationSchema={taskSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form>
                            <ModalEmployeeList
                                isShow={openModal}
                                handleHide={() => setOpenModal(false)}
                                handleSelect={(employee) => {
                                    formik.setFieldValue("reporter_id", employee.id);
                                    setReporter(employee);
                                }}
                            />
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
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                handleTypeChange(e.target.value);
                                            }}
                                            className="form-control"
                                        >
                                            <option value="">-- เลือกประเภทปัญหา --</option>
                                            {formData.types && formData.types.map((type, index) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
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
                                            {filteredGroups && filteredGroups.map((group, index) => (
                                                <option key={group.id} value={group.id}>
                                                    {group.name}
                                                </option>
                                            ))}
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
                                            <div className="form-control">
                                                {reporter && `${reporter?.firstname} ${reporter?.lastname}`}
                                            </div>
                                            <input
                                                type="hidden"
                                                name="reporter_id"
                                                value={formik.values.reporter_id}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() => setOpenModal(true)}
                                            >
                                                ค้นหา
                                            </button>
                                        </div>
                                        {(formik.errors.reporter_id && formik.touched.reporter_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.reporter_id}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                <FormGroup>
                                    <label>ความเร่งด่วน</label>                                    
                                    <Field component="div" name="priority_id" className="form-control">
                                        <input
                                            type="radio"
                                            id="radioOne"
                                            defaultChecked={formik.values.priority_id === '1'}
                                            name="priority_id"
                                            value="1"
                                        />
                                        <label htmlFor="male" className="ml-1 mr-4">ปกติ</label>

                                        <input
                                            type="radio"
                                            id="radioOne"
                                            defaultChecked={formik.values.priority_id === "2"}
                                            name="priority_id"
                                            value="2"
                                        />
                                        <label htmlFor="male" className="ml-1 mr-4">ด่วน</label>

                                        <input
                                            type="radio"
                                            id="radioTwo"
                                            defaultChecked={formik.values.priority_id === "3"}
                                            name="priority_id"
                                            value="3"
                                        />
                                        <label htmlFor="famale" className="ml-1 mr-4">ด่วนมาก</label>

                                        <input
                                            type="radio"
                                            id="radioTwo"
                                            defaultChecked={formik.values.priority_id === "4"}
                                            name="priority_id"
                                            value="4"
                                        />
                                        <label htmlFor="famale" className="ml-1">ด่วนที่สุด</label>
                                    </Field>
                                    {(formik.errors.priority_id && formik.touched.priority_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.priority_id}</span>
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
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
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
                                            value={formik.values.remark}
                                            onChange={formik.handleChange}
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
                                        <h3 className="mb-1">รายการพัสดุ (ถ้ามี)</h3>
                                        <TaskAssetForm onAdd={(asset) => handleAddAsset(formik, asset)} />
                                        <TaskAssetList assets={assets} onRemove={(id) => handleRemoveAsset(formik, id)} />
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