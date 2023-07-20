import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import AddItem from './AddItem'
import ItemList from './ItemList'
import Committee from './Committee'
import ModalEmployeeList from '../../../components/Modals/EmployeeList'
import ModalBudgetList from '../../../components/Modals/BudgetList'
import Loading from '../../../components/Loading'
import { calculateNetTotal } from '../../../utils'
import OverWriteMomentBE from '../../../utils/OverwriteMomentBE'
import { useGetInitialFormDataQuery } from '../../../services/requisition/requisitionApi'
import { store } from '../../../features/requisition/requisitionSlice'

const requisitionSchema = Yup.object().shape({
    pr_no: Yup.string().required(),
    pr_date: Yup.string().required(),
    order_type_id: Yup.string().required(),
    category_id: Yup.string().required(),
    topic: Yup.string().required(),
    year: Yup.string().required(),
    budget_id: Yup.string().required(),
    requester_id: Yup.string().required(),
    division_id: Yup.string().required(),
    reason: Yup.string().required(),
    items: Yup.mixed().test('Items Count', 'ไม่พบการระบุรายการสินค้า', val => val.length > 0),
    committees: Yup.mixed().test('Committees Count', 'ไม่พบการระบุผู้ตรวจรับ', val => val.length > 0),
});

const initialFormData = {
    categories: [],
    departments: [],
    divisions: [],
    projects: [],
};

const RequisitionForm = ({ requisition }) => {
    const dispatch = useDispatch();
    const [budget, setBudget] = useState(null);
    const [requester, setRequester] = useState(null);
    const [edittedItem, setEdittedItem] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedYear, setSelectedYear] = useState(moment());
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    /** On editting mode set default value to requester, budget, selectedDate and selectedYear local states */
    useEffect(() => {
        if (requisition) {
            setBudget(requisition.budget);
            setRequester(requisition.requester);
            setSelectedDate(requisition.pr_date);
            setSelectedYear(moment(`${requisition.year - 543}-09-01`));
        }
    }, [requisition]);

    const handleAddItem = (formik, item) => {
        const newItems = [...formik.values.items, item];

        formik.setFieldValue('items', newItems);
        formik.setFieldValue('item_count', newItems.length);
        formik.setFieldValue('net_total', calculateNetTotal(newItems));
    };

    const handleEditItem = (data) => {
        setEdittedItem(data);
    };

    const handleUpdateItem = (formik, id, data) => {
        const updatedItems = formik.values.items.map(item => {
            if (item.item_id === id) return { ...data };

            return item;
        });

        setEdittedItem(null);
        formik.setFieldValue('items', updatedItems);
        formik.setFieldValue('item_count', updatedItems.length);
        formik.setFieldValue('net_total', calculateNetTotal(updatedItems));
    };

    const handleRemoveItem = (formik, id) => {
        const newItems = formik.valuesitems.filter(item => item.item_id !== id);

        formik.setFieldValue('items', newItems);
        formik.setFieldValue('item_count', newItems.length);
        formik.setFieldValue('net_total', calculateNetTotal(newItems));
    };

    const handleUpdateCommittees = (formik, committees) => {
        formik.setFieldValue('committees', committees);
    };

    const handleSubmit = (values, formik) => {
        dispatch(store(values));

        formik.resetForm();

        /** Clear value of local states */
        setBudget(null);
        setRequester(null);
        setSelectedDate(moment());
        setSelectedYear(moment());
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                pr_no: requisition ? requisition.pr_no : '',
                pr_date: requisition ? moment(requisition.pr_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                order_type_id: requisition ? requisition.order_type_id : 1,
                category_id: requisition ? requisition.category_id : '',
                topic: requisition ? requisition.topic : 'ขออนุมัติ',
                year: requisition ? requisition.year : moment().year() + 543,
                budget_id: requisition ? requisition.budget_id : '',
                project_id: (requisition && requisition.project_id) ? requisition.project_id : '',
                division_id: (requisition && requisition.division_id) ? requisition.division_id : '',
                requester_id: requisition ? requisition.requester_id : '',
                reason: requisition ? requisition.reason : '',
                item_count: requisition ? requisition.item_count : 0,
                net_total: requisition ? requisition.net_total : '',
                items: requisition ? requisition.details : [],
                committees: requisition ? requisition.committees : [] 
            }}
            validationSchema={requisitionSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        {isLoading && <div className="text-center"><Loading /></div>}
                        {!isLoading && (
                            <>
                                <ModalEmployeeList
                                    isShow={showEmployeeModal}
                                    onHide={() => setShowEmployeeModal(false)}
                                    onSelect={(employee) => {
                                        setRequester(employee);
                                        formik.setFieldValue('requester_id', employee.id);

                                        /** Set default division_id of employee is member */
                                        if (employee.member_of.length > 0) {
                                            formik.setFieldValue('division_id', employee.member_of[0]?.division_id);
                                        }
                                    }}
                                />

                                <ModalBudgetList
                                    isShow={showBudgetModal}
                                    onHide={() => setShowBudgetModal(false)}
                                    onSelect={(budget) => {
                                        setBudget(budget);
                                        formik.setFieldValue('budget_id', budget.id);
                                    }}
                                />

                                <Row className="mb-2">
                                    <Col md={4}>
                                        <label htmlFor="">เลขที่เอกสาร</label>
                                        <input
                                            type="text"
                                            name="pr_no"
                                            value={formik.values.pr_no}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        />
                                        {(formik.errors.pr_no && formik.touched.pr_no) && (
                                            <span className="text-red-500 text-sm">{formik.errors.pr_no}</span>
                                        )}
                                    </Col>
                                    <Col md={2}>
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่เอกสาร</label>
                                            <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    value={selectedDate}
                                                    onChange={(date) => {
                                                        setSelectedDate(date);
                                                        formik.setFieldValue('pr_date', date.format('YYYY-MM-DD'));
                                                    }}
                                                    variant="outlined"
                                                />
                                            </MuiPickersUtilsProvider>
                                            {/* <input
                                                type="text"
                                                name="pr_date"
                                                value={formik.values.pr_date}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            /> */}

                                        </div>
                                        {(formik.errors.pr_date && formik.touched.pr_date) && (
                                            <span className="text-red-500 text-sm">{formik.errors.pr_date}</span>
                                        )}
                                    </Col>
                                    <Col md={2}>
                                        <label>ประเภทการจัดซื้อ</label>
                                        <select
                                            name="order_type_id"
                                            value={formik.values.order_type_id}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        >
                                            <option value="">-- ประเภท --</option>
                                            <option value="1">ซื้อ</option>
                                            <option value="2">จ้าง</option>
                                        </select>
                                        {(formik.errors.order_type_id && formik.touched.order_type_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.order_type_id}</span>
                                        )}  
                                    </Col>
                                    <Col md={4}>
                                        <label htmlFor="">ประเภทสินค้า</label>
                                        <select
                                            name="category_id"
                                            value={formik.values.category_id}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        >
                                            <option value="">-- ประเภทสินค้า --</option>
                                            {formData?.types && formData.types.map(type => (
                                                <optgroup key={type.id} label={type.name}>
                                                    {type.categories.map(category => (
                                                        <option value={category.id} key={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                        {(formik.errors.category_id && formik.touched.category_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.category_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">เรื่อง</label>
                                            <input
                                                type="text"
                                                name="topic"
                                                value={formik.values.topic}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                        {(formik.errors.topic && formik.touched.topic) && (
                                            <span className="text-red-500 text-sm">{formik.errors.topic}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <label htmlFor="">งบประมาณ</label>
                                        <div className="input-group">
                                            <div className="form-control h-[34px] text-sm">
                                                {budget?.name}
                                            </div>
                                            <input
                                                type="hidden"
                                                name="budget_id"
                                                value={formik.values.budget_id}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowBudgetModal(true)}>
                                                <FaSearch />
                                            </button>
                                        </div>
                                        {(formik.errors.budget_id && formik.touched.budget_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.budget_id}</span>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <label htmlFor="">โครงการ</label>
                                        <select
                                            name="project_id"
                                            value={formik.values.project_id}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        >
                                            <option value="">-- โครงการ --</option>
                                            {formData.projects && formData.projects.map(project => (
                                                <option value={project.id} key={project.id}>
                                                    {project.name}
                                                </option>
                                            ))}
                                        </select>
                                        {(formik.errors.project_id && formik.touched.project_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.project_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={2}>
                                        <label htmlFor="">ปีงบ</label>
                                        <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                            <DatePicker
                                                format="YYYY"
                                                views={['year']}
                                                value={selectedYear}
                                                onChange={(date) => {
                                                    setSelectedYear(date);
                                                    formik.setFieldValue('year', date.year() + 543);
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        {(formik.errors.year && formik.touched.year) && (
                                            <span className="text-red-500 text-sm">{formik.errors.year}</span>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                        <div className="input-group">
                                            <div className="form-control h-[34px] text-sm">
                                                {requester?.firstname} {requester?.lastname}
                                            </div>
                                            <input
                                                type="hidden"
                                                name="requester_id"
                                                value={formik.values.requester_id}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowEmployeeModal(true)}>
                                                <FaSearch />
                                            </button>
                                        </div>
                                        {(formik.errors.requester_id && formik.touched.requester_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.requester_id}</span>
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <label htmlFor="">หน่วยงาน</label>
                                        <select
                                            name="division_id"
                                            value={formik.values.division_id}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        >
                                            <option value="">-- หน่วยงาน --</option>
                                            {formData?.departments && formData.departments.map(dep => (
                                                <optgroup key={dep.id} label={dep.name}>
                                                    {dep.divisions.map(division => (
                                                        <option value={division.id} key={division.id}>
                                                            {division.name}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                        {(formik.errors.division_id && formik.touched.division_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.division_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">เหตุผลที่ขอ</label>
                                        <textarea
                                            rows={2}
                                            name="reason"
                                            value={formik.values.reason}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        ></textarea>
                                        {(formik.errors.reason && formik.touched.reason) && (
                                            <span className="text-red-500 text-sm">{formik.errors.reason}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <div className="flex flex-col border p-2 rounded-md">
                                            <h1 className="font-bold text-lg mb-1">รายการสินค้า</h1>
                                            <AddItem
                                                data={edittedItem}
                                                onAddItem={(item) => handleAddItem(formik, item)}
                                                onUpdateItem={(id, item) => handleUpdateItem(formik, id, item)}
                                            />
                                            <ItemList
                                                items={formik.values.items}
                                                onEditItem={(data) => handleEditItem(data)}
                                                onRemoveItem={(id) => handleRemoveItem(formik, id)}
                                            />

                                            <div className="flex flex-row justify-end">
                                                <div className="w-[15%]">
                                                    <input
                                                        type="text"
                                                        name="net_total"
                                                        value={formik.values.net_total}
                                                        onChange={formik.handleChange}
                                                        placeholder="รวมเป็นเงินทั้งสิ้น"
                                                        className="form-control text-sm float-right text-right"
                                                    />
                                                    {(formik.errors.net_total && formik.touched.net_total) && (
                                                        <span className="text-red-500 text-sm">{formik.errors.net_total}</span>
                                                    )}
                                                </div>
                                                <div className="w-[10%]"></div>
                                            </div>
                                        </div>
                                        {(formik.errors.items && formik.touched.items) && (
                                            <span className="text-red-500 text-sm">{formik.errors.items}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <Committee
                                            defaultValue={formik.values.committees}
                                            onUpdate={(committees) => handleUpdateCommittees(formik, committees)}
                                        />
                                        {(formik.errors.committees && formik.touched.committees) && (
                                            <span className="text-red-500 text-sm">{formik.errors.committees}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <button type="submit" className="btn btn-outline-primary float-right">
                                            บันทึก
                                        </button>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default RequisitionForm
