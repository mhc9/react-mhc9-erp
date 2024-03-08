import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers';
import * as Yup from 'yup'
import moment from 'moment';
import { calculateNetTotal, currency, toShortTHDate } from '../../../utils'
import { store, update } from '../../../features/slices/loan/loanSlice'
import { useGetInitialFormDataQuery } from '../../../features/services/loan/loanApi'
import AddExpense from './AddExpense'
import ExpenseList from './ExpenseList'
import Loading from '../../../components/Loading'
import ModalBudgetList from '../../../components/Modals/BudgetList'
import ModalProjectList from '../../../components/Modals/Project/List'
import ModalProjectForm from '../../../components/Modals/Project/Form'
import ModalEmployeeList from '../../../components/Modals/EmployeeList'

const LoanForm = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedYear, setSelectedYear] = useState(moment());
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [budget, setBudget] = useState(null);
    const [project, setProject] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [edittedItem, setEdittedItem] = useState(null);
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    const handleAddItem = (formik, expense) => {
        const newItems = [...formik.values.items, expense];

        formik.setFieldValue('items', newItems);
        formik.setFieldValue('net_total', currency.format(calculateNetTotal(newItems)));
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
        formik.setFieldValue('net_total', currency.format(calculateNetTotal(updatedItems)));
    };

    const handleRemoveItem = (formik, id) => {
        const newItems = formik.values.items.filter(item => item.expense_id !== id);

        formik.setFieldValue('items', newItems);
        formik.setFieldValue('net_total', currency.format(calculateNetTotal(newItems)));
    };

    const handleSubmit = (values, formik) => {
        dispatch(store(values));

        formik.resetForm();

        /** Clear value of local states */
        setBudget(null);
        setEmployee(null);
        setSelectedDate(moment());
        setSelectedYear(moment());
    };

    return (
        <Formik
            initialValues={{
                doc_no: '',
                doc_date: '',
                loan_type_id: '',
                money_type_id: '',
                budget_id: '',
                project_id: '',
                employee_id: '',
                department_id: '',
                net_total: '',
                remark: '',
                items: [],
            }}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalBudgetList
                            isShow={showBudgetModal}
                            onHide={() => setShowBudgetModal(false)}
                            onSelect={(budget) => {
                                setBudget(budget);
                                formik.setFieldValue('budget_id', budget.id);
                            }}
                        />

                        <ModalProjectList
                            isShow={showProjectModal}
                            onHide={() => setShowProjectModal(false)}
                            onSelect={(project) => {
                                setProject(project);
                                formik.setFieldValue('project_id', project?.id);
                            }}
                        />

                        <ModalProjectForm
                            isShow={showProjectForm}
                            onHide={() => setShowProjectForm(false)}
                            onSubmit={(project) => {
                                console.log(project);
                                setProject(project);
                                formik.setFieldValue('project_id', project?.id);
                            }}
                        />

                        <ModalEmployeeList
                            isShow={showEmployeeModal}
                            onHide={() => setShowEmployeeModal(false)}
                            onSelect={(employee) => {
                                setEmployee(employee);
                                formik.setFieldValue('employee_id', employee.id);

                                /** Set default division_id of employee is member */
                                if (employee.member_of.length > 0) {
                                    formik.setFieldValue('division_id', employee.member_of[0]?.division_id);
                                }
                            }}
                        />

                        <Row className="mb-2">
                            <Col md={2}>
                                <label htmlFor="">เลขที่เอกสาร</label>
                                <input
                                    type="text"
                                    name="doc_no"
                                    value={formik.values.doc_no}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.doc_no && formik.touched.doc_no) && (
                                    <span className="text-red-500 text-sm">{formik.errors.doc_no}</span>
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
                                            formik.setFieldValue('doc_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                    />
                                </div>
                                {(formik.errors.doc_date && formik.touched.doc_date) && (
                                    <span className="text-red-500 text-sm">{formik.errors.doc_date}</span>
                                )}
                            </Col>
                            <Col md={4}>
                                <label>ประเภทการยืม</label>
                                <select
                                    name="loan_type_id"
                                    value={formik.values.loan_type_id}
                                    onChange={(e) => {
                                        const { value } = e.target;

                                        formik.handleChange(e);
                                        formik.setFieldValue('topic', value === '1' ? 'ขออนุมัติซื้อ' : 'ขออนุมัติจ้าง');
                                    }}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- ประเภทการยืม --</option>
                                    <option value="1">ยืมเงินโครงการ</option>
                                    <option value="2">ยืมเงินเดินทางไปราชการ</option>
                                </select>
                                {(formik.errors.loan_type_id && formik.touched.loan_type_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.loan_type_id}</span>
                                )}  
                            </Col>
                            <Col md={4}>
                                <label htmlFor="">ประเภทเงินยืม</label>
                                <select
                                    name="money_type_id"
                                    value={formik.values.money_type_id}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- ประเภทเงินยืม --</option>
                                    <option value="1">เงินทดลองราชการ</option>
                                    <option value="2">เงินยืมนอกงบประมาณ</option>
                                    <option value="3">เงินยืมราชการ	</option>
                                </select>
                                {(formik.errors.money_type_id && formik.touched.money_type_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.money_type_id}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={4}>
                                <label htmlFor="">หน่วยงาน</label>
                                <select
                                    name="department_id"
                                    value={formik.values.department_id}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- หน่วยงาน --</option>
                                    {formData?.departments && formData.departments.map(dep => (
                                        <option value={dep.id} key={dep.id}>
                                            {dep.name}
                                        </option>
                                    ))}
                                </select>
                                {(formik.errors.department_id && formik.touched.department_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.department_id}</span>
                                )}
                            </Col>
                            <Col md={6}>
                                <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                <div className="input-group">
                                    <div className="form-control text-sm h-[34px] bg-gray-100">
                                        {employee?.firstname} {employee?.lastname}
                                    </div>
                                    <input
                                        type="hidden"
                                        name="employee_id"
                                        value={formik.values.employee_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowEmployeeModal(true)}>
                                        <FaSearch />
                                    </button>
                                </div>
                                {(formik.errors.employee_id && formik.touched.employee_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.employee_id}</span>
                                )}
                            </Col>
                            <Col md={2}>
                                <label htmlFor="">ปีงบ</label>
                                <DatePicker
                                    format="YYYY"
                                    views={['year']}
                                    value={selectedYear}
                                    onChange={(date) => {
                                        setSelectedYear(date);
                                        formik.setFieldValue('year', date.year() + 543);
                                    }}
                                />
                                {(formik.errors.year && formik.touched.year) && (
                                    <span className="text-red-500 text-sm">{formik.errors.year}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={12}>
                                <label htmlFor="">งบประมาณ</label>
                                <div className="input-group">
                                    <div className="form-control text-sm h-[34px] bg-gray-100">
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
                            <Col md={12}>
                                <div className="form-control text-sm min-h-[34px] bg-gray-200 mt-1">
                                    โครงการ/ผลผลิต :
                                    {budget && (
                                        <span className="font-thin ml-1">{budget?.project?.plan?.name} / {budget?.project?.name}</span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={12}>
                                <label htmlFor="">โครงการ</label>
                                <div className="input-group">
                                    <div className="form-control text-sm h-[34px] bg-gray-100">
                                        {project?.name}
                                    </div>
                                    <input
                                        type="hidden"
                                        name="project_id"
                                        value={formik.values.project_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowProjectModal(true)}>
                                        <FaSearch />
                                    </button>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => setShowProjectForm(true)}>
                                        <FaPlus />
                                    </button>
                                </div>
                                {(formik.errors.project_id && formik.touched.project_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.project_id}</span>
                                )}
                            </Col>
                            <Col md={12}>
                                <div className="form-control text-sm min-h-[34px] bg-gray-200 mt-1">
                                    รายละเอียดโครงการ :
                                    {project && (
                                        <span className="font-thin ml-1">
                                            {project?.place?.name}
                                            <span className="ml-1"><b>ระหว่างวันที่</b> {toShortTHDate(project?.from_date)} - {toShortTHDate(project?.to_date)}</span>
                                            <span className="ml-1"><b>ผู้ดำเนินการ</b> {project?.owner?.firstname} {project?.owner?.lastname}</span>
                                        </span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่าย</h1>
                                    <AddExpense
                                        data={edittedItem}
                                        formData={formData?.expenses}
                                        onAddItem={(expense) => handleAddItem(formik, expense)}
                                        onUpdateItem={(id, expense) => handleUpdateItem(formik, id, expense)}
                                        onClear={setEdittedItem}
                                    />

                                    <ExpenseList
                                        items={formik.values.items}
                                        isEditting={edittedItem !== null}
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
                                <textarea
                                    rows="3"
                                    name="remark"
                                    value={formik.values.remark}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                ></textarea>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button type="submit" className="btn btn-outline-primary float-right">
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

export default LoanForm