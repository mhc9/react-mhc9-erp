import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import moment from 'moment'
import OverWriteMomentBE from '../../utils/OverwriteMomentBE'
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
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [assets, setAssets] = useState([]);
    const [reporter, setReporter] = useState(null);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
    const [selectedTaskDate, setSelectedTaskDate] = useState(moment());
    const [selectedTaskTime, setSelectedTaskTime] = useState(moment());

    /** On mount component set initital value of asset local state by task prop */
    // useEffect(() => {
    //     if (task) {
    //         const taskAssets = task?.assets.map(item => item.asset);

    //         setAssets(taskAssets);
    //         setReporter(task.reporter);
    //     }
    // }, [task]);

    /** Initial data for form's dropdown input */
    // useEffect(() => {
    //     if (formData && task) setFilteredGroups(formData.groups);
    // }, [formData]);

    const handleTypeChange = (type) => {
        const newGroups = formData.groups.filter(group => group.task_type_id === parseInt(type, 10));

        setFilteredGroups(newGroups);
    };

    const handleAddAsset = (formik, asset) => {
        formik.setFieldValue('assets', [...formik.values.assets, asset]);
        setAssets([...assets, asset]);
    }

    const handleRemoveAsset = (formik, id) => {
        const newAssets = assets.filter(asset => parseInt(asset.id, 10) !== id);

        formik.setFieldValue('assets', newAssets.length > 0 ? [...newAssets] : [])
        setAssets(newAssets);
    };

    const handleSubmit = (values, formik) => {
        if (task) {
            dispatch(update({ id: '', data: values }));
        } else {
            dispatch(store(values));
        }

        /** Clear assigned input values */
        formik.resetForm();
        setReporter(null);
        setAssets([]);
    };

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    task_date: task ? moment(task.task_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                    task_time: task ? '' : '',
                    task_type_id: task ? task.group.task_type_id : '',
                    task_group_id: task ? task.task_group_id : '',
                    description: task ? task.description : '',
                    priority_id: task ? task.priority_id : '1',
                    reporter_id: task ? task.reporter_id : '',
                    remark: task ? task.remark : '',
                    assets: task? task.assets : [],
                }}
                validationSchema={taskSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form>
                            <ModalEmployeeList
                                isShow={openEmployeeModal}
                                onHide={() => setOpenEmployeeModal(false)}
                                onSelect={(employee) => {
                                    formik.setFieldValue("reporter_id", employee.id);
                                    setReporter(employee);
                                }}
                            />
                            <Row className="mb-2">
                                <Col md={2}>
                                    <FormGroup>
                                        <div className="flex flex-col">
                                            <label>วันที่แจ้ง</label>
                                            <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    value={selectedTaskDate}
                                                    onChange={(date) => {
                                                        setSelectedTaskDate(date);
                                                        formik.setFieldValue('task_date', date.format('YYYY-MM-DD'));
                                                    }}
                                                    variant="outlined"
                                                />
                                            </MuiPickersUtilsProvider>
                                            {(formik.errors.task_date && formik.touched.task_date) && (
                                                <span className="text-red-500 text-sm">{formik.errors.task_date}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <div className="flex flex-col">
                                        <label>เวลาที่แจ้ง</label>
                                            <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                                <TimePicker
                                                    format="hh:mm"
                                                    value={selectedTaskTime}
                                                    onChange={(time) => {
                                                        const dateStr = moment(selectedTaskDate).format('YYYY-MM-DD');
                                                        const timeStr = moment(time).format('hh:mm');

                                                        /** Create newTime from selectedTaskDate and selected time from input */
                                                        const newTime = moment(`${dateStr}T${timeStr}`);

                                                        /** Set newTime to selectedTaskTime state and task_time field */
                                                        setSelectedTaskTime(newTime);
                                                        formik.setFieldValue('task_time', newTime.format('hh:mm'));
                                                    }}
                                                    variant="outlined"
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        {(formik.errors.task_time && formik.touched.task_time) && (
                                            <span className="text-red-500 text-sm">{formik.errors.task_time}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>ประเภทปัญหา</label>
                                        {isLoading && <div className="form-control text-sm font-thin"><Loading /></div>}
                                        {!isLoading && <select
                                            name="task_type_id"
                                            value={formik.values.task_type_id}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                handleTypeChange(e.target.value);
                                            }}
                                            className="form-control text-sm font-thin"
                                        >
                                            <option value="">-- เลือกประเภทปัญหา --</option>
                                            {formData.types && formData.types.map((type, index) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>}
                                        {(formik.errors.task_type_id && formik.touched.task_type_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.task_type_id}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>กลุ่มอาการ</label>
                                        {isLoading && <div className="form-control text-sm font-thin"><Loading /></div>}
                                        {!isLoading && <select
                                            name="task_group_id"
                                            value={formik.values.task_group_id}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm font-thin"
                                        >
                                            <option value="">-- เลือกกลุ่มอาการ --</option>
                                            {filteredGroups && filteredGroups.map((group, index) => (
                                                <option key={group.id} value={group.id}>
                                                    {group.name}
                                                </option>
                                            ))}
                                        </select>}
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
                                            <div className="form-control text-sm font-thin min-h-[34px] bg-gray-100">
                                                {reporter && `${reporter?.prefix?.name}${reporter?.firstname} ${reporter?.lastname}`}
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => setOpenEmployeeModal(true)}
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
                                    <label className="form-control text-sm font-thin">
                                        <Field
                                            type="radio"
                                            name="priority_id"
                                            value="1"
                                        />
                                        <span className="ml-1 mr-4">ปกติ</span>

                                        <Field
                                            type="radio"
                                            name="priority_id"
                                            value="2"
                                        />
                                        <span className="ml-1 mr-4">ด่วน</span>

                                        <Field
                                            type="radio"
                                            name="priority_id"
                                            value="3"
                                        />
                                        <span className="ml-1 mr-4">ด่วนมาก</span>

                                        <Field
                                            type="radio"
                                            name="priority_id"
                                            value="4"
                                        />
                                        <span className="ml-1">ด่วนที่สุด</span>
                                    </label>
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
                                            className="form-control text-sm font-thin"
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
                                            className="form-control text-sm font-thin"
                                        ></textarea>
                                        {(formik.errors.remark && formik.touched.remark) && (
                                            <span className="text-red-500 text-sm">{formik.errors.remark}</span>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <div className="flex flex-col border p-2 rounded-md">
                                        <h3 className="mb-1">รายการพัสดุ (ถ้ามี)</h3>
                                        <TaskAssetForm onAdd={(asset) => handleAddAsset(formik, asset)} />

                                        <TaskAssetList
                                            assets={assets}
                                            onRemove={(id) => {
                                                handleRemoveAsset(formik, id);
                                            }}
                                        />
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