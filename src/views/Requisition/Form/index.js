import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers'
import { toast } from 'react-toastify'
import moment from 'moment'
import {
    calculateNetTotal,
    currency,
    getFormDataItem,
    isExisted,
    removeItemWithFlag
} from '../../../utils'
import { useGetInitialFormDataQuery } from '../../../features/services/requisition/requisitionApi'
import { store, update } from '../../../features/slices/requisition/requisitionSlice'
import { useStyles } from '../../../hooks/useStyles'
import AddItem from './AddItem'
import ItemList from './ItemList'
import Committee from './Committee'
import Loading from '../../../components/Loading'
import ModalEmployeeList from '../../../components/Modals/EmployeeList'
import ModalBudgetList from '../../../components/Modals/BudgetList'
import BudgetTypeBadge from '../../../components/Budget/BudgetTypeBadge'
import EmployeeSelection from '../../../components/FormControls/EmployeeSelection'

const requisitionSchema = Yup.object().shape({
    pr_no: Yup.string().required('กรุณาระบุเลขที่เอกสาร'),
    pr_date: Yup.string().required('กรุณาระบุวันที่เอกสาร'),
    order_type_id: Yup.string().required('กรุณาระบุประเภทการจัดซื้อ'),
    category_id: Yup.string().required('กรุณาระบุประเภทสินค้า'),
    contract_desc: Yup.string().ensure().when('order_type_id', {
        is: (val) => val === '2',
        then: () => Yup.string().required('กรุณาระบุรายละเอียดการจ้าง'),
    }),
    topic: Yup.string().required('กรุณาระบุเรื่อง'),
    year: Yup.string().required('กรุณาระบุปีงบ'),
    budget_id: Yup.string().required('กรุณาระบุงบประมาณ'),
    requester_id: Yup.string().required('กรุณาระบุผู้ขอ/เจ้าของโครงการ'),
    department_id: Yup.string().required('กรุณาระบุหน่วยงาน'),
    reason: Yup.string().required('กรุณาระบุเหตุผลที่ขอ'),
    desired_date: Yup.string().required('กรุณาระบุวันที่ต้องการใช้'),
    items: Yup.mixed().test('Items Count', 'ไม่พบการระบุรายการสินค้า', val => val.filter(item => !item.removed).length > 0),
    committees: Yup.mixed().test('Committees Count', 'ไม่พบการระบุผู้ตรวจรับ', val => val.filter(comm => !comm.removed).length > 0),
});

const initialFormData = {
    categories: [],
    departments: [],
    divisions: [],
    projects: [],
};

const RequisitionForm = ({ requisition }) => {
    const classes = useStyles();
    const [cookies] = useCookies();
    const dispatch = useDispatch();
    const { loggedInUser } = useSelector(state => state.auth);
    const [budget, setBudget] = useState(null);
    const [requester, setRequester] = useState(null);
    const [edittingItem, setEdittingItem] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedYear, setSelectedYear] = useState(moment(`${cookies.budgetYear}-01-01`));
    const [selectedDesiredDate, setSelectedDesiredDate] = useState(moment());
    const [selectedDep, setSelectedDep] = useState('');
    const [filteredTypes, setFilteredTypes] = useState([]);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        /** Initial filteredType state with order_type_id is 1 */
        handleTypeChange(1);
    }, []);

    useEffect(() => {
        if (loggedInUser) setRequester(loggedInUser.employee);
    }, [loggedInUser]);

    /** On editting mode set default value to requester, budget, selectedDate and selectedYear local states */
    useEffect(() => {
        if (requisition) {
            setBudget(requisition.budget);
            setRequester(requisition.requester);
            setSelectedDate(requisition.pr_date);
            setSelectedYear(moment(`${requisition.year}-09-01`));
            setSelectedDep(`${requisition.department_id}${requisition.division_id ? '-' + requisition.division_id : ''}`);

            handleTypeChange(requisition.order_type_id || 1);
        }
    }, [requisition]);

    const handleAddItem = (formik, item) => {
        if (isExisted(formik.values.items.filter(item => !item.removed), item.item_id)) {
            toast.error("ไม่สามารถเลือกรายการซ้ำได้!!");
            return;
        }

        const newItems = [...formik.values.items, item];

        formik.setFieldValue('items', newItems);
        formik.setFieldValue('item_count', newItems.length);
        formik.setFieldValue('net_total', currency.format(calculateNetTotal(newItems, (isRemove) => isRemove)));
        setTimeout(() => formik.setFieldTouched('items', true), 300);
    };

    const handleEditItem = (data) => {
        setEdittingItem(data);
    };

    /**
     * 
     * @param formik as Formik
     * @param id as int
     * @param data as data (loan_detail table)
     */
    const handleUpdateItem = (formik, id, data) => {
        const updatedItems = formik.values.items.map(item => {
            if (item.id === id) return { ...data, updated: true };

            return item;
        });

        setEdittingItem(null);
        formik.setFieldValue('items', updatedItems);
        formik.setFieldValue('item_count', updatedItems.length);
        formik.setFieldValue('net_total', currency.format(calculateNetTotal(updatedItems)));
    };

    /**
     * 
     * @param formik Formik
     * @param id int
     * @param isNewItem bool
     */
    const handleRemoveItem = (formik, id, isNewItem = false) => {
        const newItems = removeItemWithFlag(formik.values.items, id, isNewItem);
        const itemTotal = calculateNetTotal(newItems.filter(item => item.expense_group === 1), (isRemoved) => isRemoved);


        formik.setFieldValue('items', newItems);
        formik.setFieldValue('item_count', newItems.length);
        formik.setFieldValue('net_total', itemTotal);
    };

    const handleUpdateCommittees = (formik, committees) => {
        formik.setFieldValue('committees', committees);
        console.log(committees);
    };

    const handleSubmit = (values, formik) => {
        if (requisition) {
            dispatch(update({ id: requisition.id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();

        /** Clear value of local states */
        setBudget(null);
        setRequester(null);
        setSelectedDate(moment());
        setSelectedYear(moment(`${cookies.budgetYear}-01-01`));
    };

    const handleTypeChange = (typeId) => {
        (formData && formData.types) && setFilteredTypes(formData.types.filter(type => type.order_type_id === parseInt(typeId)));
    };

    return (
        <Formik
            initialValues={{
                pr_no: requisition ? requisition.pr_no : '',
                pr_date: requisition ? moment(requisition.pr_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                order_type_id: requisition ? requisition.order_type_id : 1,
                category_id: requisition ? requisition.category_id : '',
                contract_desc: (requisition && requisition.contract_desc) ? requisition.contract_desc : '',
                topic: requisition ? requisition.topic : 'ขออนุมัติงบประมาณซื้อ',
                year: requisition ? requisition.year : cookies.budgetYear,
                budget_id: requisition ? requisition.budget_id : '',
                project_id: (requisition && requisition.project_id) ? requisition.project_id : '',
                project_name: (requisition && requisition.project_name) ? requisition.project_name : '',
                department_id: (requisition && requisition.department_id) ? requisition.department_id : '',
                division_id: (requisition && requisition.division_id) ? requisition.division_id : '',
                requester_id: requisition ? requisition.requester_id : requester?.id,
                reason: requisition ? requisition.reason : '',
                desired_date: requisition ? requisition.desired_date : '',
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
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedDate}
                                                onChange={(date) => {
                                                    setSelectedDate(date);
                                                    formik.setFieldValue('pr_date', date.format('YYYY-MM-DD'));
                                                }}
                                                className={classes.muiTextFieldInput}
                                            />
                                        </div>
                                        {(formik.errors.pr_date && formik.touched.pr_date) && (
                                            <span className="text-red-500 text-sm">{formik.errors.pr_date}</span>
                                        )}
                                    </Col>
                                    <Col md={2}>
                                        <label>ประเภทซื้อ/จ้าง</label>
                                        <select
                                            name="order_type_id"
                                            value={formik.values.order_type_id}
                                            onChange={(e) => {
                                                const { value } = e.target;

                                                formik.handleChange(e);
                                                formik.setFieldValue('topic', value === '1' ? 'ขออนุมัติงบประมาณซื้อ' : 'ขออนุมัติงบประมาณ');
                                                handleTypeChange(value);
                                            }}
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
                                            onChange={(e) => {
                                                formik.handleChange(e);

                                                if (parseInt(formik.values.order_type_id, 10) === 1) {
                                                    formik.setFieldValue('topic', 'ขออนุมัติงบประมาณซื้อ' + getFormDataItem(formData, "categories", parseInt(e.target.value))?.name);
                                                }
                                            }}
                                            className="form-control text-sm"
                                        >
                                            <option value="">-- ประเภทสินค้า --</option>
                                            {filteredTypes.map(type => (
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
                                {parseInt(formik.values.order_type_id, 10) === 2 && (
                                    <Row className="mb-2">
                                        <Col>
                                            <label htmlFor="">รายละเอียดการจ้าง</label>
                                                <input
                                                    type="text"
                                                    name="contract_desc"
                                                    value={formik.values.contract_desc}
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        formik.setFieldValue('topic', 'ขออนุมัติงบประมาณ' + e.target.value);
                                                    }}
                                                    className="form-control text-sm"
                                                />
                                            {(formik.errors.contract_desc && formik.touched.contract_desc) && (
                                                <span className="text-red-500 text-sm">{formik.errors.contract_desc}</span>
                                            )}
                                        </Col>
                                    </Row>
                                )}
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
                                    <Col md={2}>
                                        <label htmlFor="">ปีงบประมาณ</label>
                                        <DatePicker
                                            format="YYYY"
                                            views={['year']}
                                            value={selectedYear}
                                            onChange={(date) => {
                                                setSelectedYear(date);
                                                formik.setFieldValue('year', date.year());
                                            }}
                                            className={classes.muiTextFieldInput}
                                        />
                                        {(formik.errors.year && formik.touched.year) && (
                                            <span className="text-red-500 text-sm">{formik.errors.year}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <label htmlFor="">งบประมาณ</label>
                                        <div className="input-group">
                                            <div className="form-control h-[34px] text-sm bg-gray-200">
                                                {budget?.activity?.name}
                                                {budget && <BudgetTypeBadge type={budget.type} />}
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
                                    <Col md={3}>
                                        <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                        <EmployeeSelection
                                            data={requisition?.requester}
                                            fieldName="requester_id"
                                        />
                                        {(formik.errors.requester_id && formik.touched.requester_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.requester_id}</span>
                                        )}
                                    </Col>
                                    <Col md={3}>
                                        <label htmlFor="">หน่วยงาน</label>
                                        <select
                                            name="department_id"
                                            value={selectedDep}
                                            onChange={(e) => {
                                                const val = e.target.value;

                                                if (val.search(/-/i)) {
                                                    const [department, division] = val.split('-');

                                                    formik.setFieldValue('department_id', department);
                                                    formik.setFieldValue('division_id', division);
                                                } else {
                                                    formik.setFieldValue('department_id', val);
                                                    formik.setFieldValue('division_id', '');
                                                }

                                                setSelectedDep(val);
                                                setTimeout(() => formik.setFieldTouched('department_id', true), 300);
                                            }}
                                            className="form-control text-sm"
                                        >
                                            <option value="">-- หน่วยงาน --</option>
                                            {formData?.departments && formData.departments.filter(dep => dep.id !== 1).map(dep => (
                                                <Fragment key={dep.id}>
                                                    <option value={dep.id} className="font-bold">
                                                        {dep.name}
                                                    </option>
                                                    {dep.divisions.length > 0 && dep.divisions.filter(division => division.has_saraban === 1).map(division => (
                                                        <option value={`${dep.id}-${division.id}`} key={`${dep.id}-${division.id}`}>
                                                            {division.name}
                                                        </option>
                                                    ))}
                                                </Fragment>
                                            ))}
                                        </select>
                                        {(formik.errors.department_id && formik.touched.department_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.department_id}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">โครงการ (ถ้ามี)</label>
                                        <textarea
                                            rows={2}
                                            name="project_name"
                                            value={formik.values.project_name}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        ></textarea>
                                        {/* <select
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
                                        </select> */}
                                        {(formik.errors.project_id && formik.touched.project_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.project_id}</span>
                                        )}
                                    </Col>
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
                                            <h1 className="font-bold text-lg mb-1">รายการสินค้า/บริการ</h1>
                                            <AddItem
                                                item={edittingItem}
                                                defaultCategory={formik.values.category_id}
                                                onAddItem={(item) => handleAddItem(formik, item)}
                                                onUpdateItem={(id, item) => handleUpdateItem(formik, id, item)}
                                                onCancel={() => setEdittingItem(null)}
                                            />

                                            <ItemList
                                                items={formik.values.items.filter(item => !item.removed)}
                                                onEditItem={(data) => handleEditItem(data)}
                                                onRemoveItem={(id, isNewItem = false) => handleRemoveItem(formik, id, isNewItem)}
                                            />
                                            {(formik.errors.items && formik.touched.items) && (
                                                <span className="text-red-500 text-sm">{formik.errors.items}</span>
                                            )}

                                            <Row>
                                                <Col md={4}>
                                                    <div className="row">
                                                        <label htmlFor="" className="col-4 text-right pr-1">วันที่ต้องการใช้</label>
                                                        <div className="col-8 w-[50%] pl-1">
                                                            <DatePicker
                                                                format="DD/MM/YYYY"
                                                                value={selectedDesiredDate}
                                                                onChange={(date) => {
                                                                    setSelectedDesiredDate(date);
                                                                    formik.setFieldValue('desired_date', date.format('YYYY-MM-DD'));
                                                                }}
                                                                className={classes.muiTextFieldInput}
                                                            />
                                                            {(formik.errors.desired_date && formik.touched.desired_date) && (
                                                                <span className="text-red-500 text-sm">{formik.errors.desired_date}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="flex flex-row justify-end items-center gap-1">
                                                        <div className="pr-1">รวมเป็นเงินทั้งสิ้น</div>
                                                        <div className="w-[22%]">
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
                                                        <div className="w-[15%] pl-1">บาท</div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
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
                                        <button type="submit" className={`btn ${requisition ? 'btn-outline-secondary' : 'btn-outline-primary'} float-right`}>
                                            {requisition ? 'บันทึกการแก้ไข' : 'บันทึก'}
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
