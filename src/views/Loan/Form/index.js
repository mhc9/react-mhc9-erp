import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { FaSearch, FaPlus, FaMinus } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import moment from 'moment';
import { calculateNetTotal, currency, toShortTHDate } from '../../../utils'
import { store, update } from '../../../features/slices/loan/loanSlice'
import { useGetInitialFormDataQuery } from '../../../features/services/loan/loanApi'
import AddExpense from './AddExpense'
import ExpenseList from './ExpenseList'
import Loading from '../../../components/Loading'
// import ModalProjectList from '../../../components/Modals/Project/List'
// import ModalProjectForm from '../../../components/Modals/Project/Form'
import ModalEmployeeList from '../../../components/Modals/EmployeeList'
import AddBudget from './AddBudget'
import BudgetList from './BudgetList'

const loanSchema = Yup.object().shape({
    doc_no: Yup.string().required(),
    doc_date: Yup.string().required(),
    loan_type_id: Yup.string().required(),
    money_type_id: Yup.string().required(),
    year: Yup.string().required(),
    budget_id: Yup.string().required(),
    project_id: Yup.string().required(),
    department_id: Yup.string().required(),
    employee_id: Yup.string().required(),
    net_total: Yup.string().required(),
});

const LoanForm = ({ loan }) => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedStartDate, setSelectedStartDate] = useState(moment());
    const [selectedEndDate, setSelectedEndDate] = useState(moment());
    const [selectedYear, setSelectedYear] = useState(moment());
    // const [showProjectModal, setShowProjectModal] = useState(false);
    // const [showProjectForm, setShowProjectForm] = useState(false);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [project, setProject] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [edittingItem, setEdittingItem] = useState(null);
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (loan) {
            setSelectedDate(moment(loan.doc_date));
            setSelectedYear(moment(loan.year));

            // setBudget(loan.budget);
            // setProject(loan.project);
            setEmployee(loan.employee);
        }
    }, [loan]);

    const handleAddItem = (formik, expense) => {
        const newItems = [...formik.values.items, expense];

        formik.setFieldValue('items', newItems);
        formik.setFieldValue('net_total', currency.format(calculateNetTotal(newItems)));
    };

    const handleEditItem = (data) => {
        setEdittingItem(data);
    };

    const handleUpdateItem = (formik, id, data) => {
        const updatedItems = formik.values.items.map(item => {
            if (item.item_id === id) return { ...data };

            return item;
        });

        setEdittingItem(null);
        formik.setFieldValue('items', updatedItems);
        formik.setFieldValue('net_total', currency.format(calculateNetTotal(updatedItems)));
    };

    const handleRemoveItem = (formik, id) => {
        const newItems = formik.values.items.filter(item => item.expense_id !== id);

        formik.setFieldValue('items', newItems);
        formik.setFieldValue('net_total', currency.format(calculateNetTotal(newItems)));
    };

    const handleAddBudget = (formik, budget) => {
        const newBudgets = [...formik.values.budgets, budget];

        formik.setFieldValue('budgets', newBudgets);
        formik.setFieldValue('budget_total', currency.format(calculateNetTotal(newBudgets)));
    };

    const handleRemoveBudget = (formik, id) => {
        const newBudgets = formik.values.budgets.filter(item => item.budget_id !== id);

        formik.setFieldValue('budgets', newBudgets);
        formik.setFieldValue('budget_total', currency.format(calculateNetTotal(newBudgets)));
    };

    const handleSubmit = (values, formik) => {
        if (loan) {
            dispatch(update({ id: loan.id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();

        /** Clear value of local states */
        // setBudget(null);
        // setEmployee(null);
        setSelectedDate(moment());
        setSelectedYear(moment());
    };

    return (
        <Formik
            initialValues={{
                doc_no: loan ? loan.doc_no : '',
                doc_date: loan ? moment(loan.doc_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                loan_type_id: loan ? loan.loan_type_id : '',
                money_type_id: loan ? loan.money_type_id : '',
                year: loan ? moment(loan.year).format('YYYY-MM-DD') : moment().year() + 543,
                employee_id: loan ? loan.employee_id : '',
                department_id: loan ? loan.department_id : '',
                project_name: loan ? loan.project_name : '',
                calculation: loan ? loan.calculation : '1',
                budget_total: loan ? loan.budget_total : '',
                net_total: loan ? loan.net_total : '',
                remark: loan ? loan.remark : '',
                budgets: loan ? loan.budgets : [],
                items: loan ? loan.details : [],
            }}
            validationSchema={loanSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        {/* <ModalProjectList
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
                        /> */}

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
                                    onChange={formik.handleChange}
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
                        <Row className="mb-3">
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
                                <div className="flex flex-col">
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
                                </div>
                                {(formik.errors.year && formik.touched.year) && (
                                    <span className="text-red-500 text-sm">{formik.errors.year}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={12}>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายละเอียดโครงการ</h1>
                                    <Row className="mb-2">
                                        <Col md={2}>
                                            <label htmlFor="">เลขที่ขออนุมติ</label>
                                            <input
                                                type="text"
                                                name="project_no"
                                                value={formik.values.project_no}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                            {(formik.errors.project_no && formik.touched.project_no) && (
                                                <span className="text-red-500 text-sm">{formik.errors.project_no}</span>
                                            )}
                                        </Col>
                                        <Col md={2}>
                                            <div className="flex flex-col">
                                                <label htmlFor="">วันที่ขออนุมติ</label>
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    value={selectedDate}
                                                    onChange={(date) => {
                                                        setSelectedDate(date);
                                                        formik.setFieldValue('project_date', date.format('YYYY-MM-DD'));
                                                    }}
                                                    variant="outlined"
                                                />
                                            </div>
                                            {(formik.errors.project_date && formik.touched.project_date) && (
                                                <span className="text-red-500 text-sm">{formik.errors.project_date}</span>
                                            )}
                                        </Col>
                                        <Col md={8}>
                                            <label htmlFor="">ชื่อโครงการ</label>
                                            <input
                                                type="text"
                                                name="project_name"
                                                value={formik.values.project_name}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                            {(formik.errors.project_name && formik.touched.project_name) && (
                                                <span className="text-red-500 text-sm">{formik.errors.project_name}</span>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={3}>
                                            <div className="flex flex-col">
                                                <label htmlFor="">วันที่จัด</label>
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    value={selectedStartDate}
                                                    onChange={(date) => {
                                                        setSelectedStartDate(date);
                                                        formik.setFieldValue('project_sdate', date.format('YYYY-MM-DD'));
                                                    }}
                                                    variant="outlined"
                                                />
                                            </div>
                                            {(formik.errors.project_sdate && formik.touched.project_sdate) && (
                                                <span className="text-red-500 text-sm">{formik.errors.project_sdate}</span>
                                            )}
                                        </Col>
                                        <Col md={3}>
                                            <div className="flex flex-col">
                                                <label htmlFor="">ถึงวันที่</label>
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    value={selectedEndDate}
                                                    onChange={(date) => {
                                                        setSelectedEndDate(date);
                                                        formik.setFieldValue('project_edate', date.format('YYYY-MM-DD'));
                                                    }}
                                                    variant="outlined"
                                                />
                                            </div>
                                            {(formik.errors.project_edate && formik.touched.project_edate) && (
                                                <span className="text-red-500 text-sm">{formik.errors.project_edate}</span>
                                            )}
                                        </Col>
                                        <Col md={5}>
                                            <label>การคิดค่าใช้จ่าย</label>                                    
                                            <label className="form-control text-sm font-thin">
                                                <Field
                                                    type="radio"
                                                    name="calculation"
                                                    value="1"
                                                    checked={formik.values.calculation === "1"}
                                                    onChange={() => formik.setFieldValue("calculation", "1")}
                                                />
                                                <span className="ml-1 mr-8">คิดค่าใช้จ่ายรวม</span>

                                                <Field
                                                    type="radio"
                                                    name="calculation"
                                                    value="2"
                                                    checked={formik.values.calculation === "2"}
                                                    onChange={() => formik.setFieldValue("calculation", "2")}
                                                />
                                                <span className="ml-1">คิดค่าใช้จ่ายแยกวันที่</span>
                                            </label>
                                            {(formik.errors.calculation && formik.touched.calculation) && (
                                                <span className="text-red-500 text-sm">{formik.errors.calculation}</span>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        {formik.values.calculation === '2' && (
                                            <Col md={2}>
                                                <label htmlFor="">วันที่</label>
                                                <div className="form-control text-sm min-h-[34px]">
                                                    
                                                </div>
                                            </Col>
                                        )}
                                        <Col md={formik.values.calculation === '2' ? 9 : 11}>
                                            <label htmlFor="">สถานที่จัด</label>
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
                                                <button type="button" className="btn btn-outline-secondary text-sm" onClick={() => setShowEmployeeModal(true)}>
                                                    <FaSearch />
                                                </button>
                                                <button type="button" className="btn btn-outline-primary text-sm px-2" onClick={() => setShowEmployeeModal(true)}>
                                                    New
                                                </button>
                                            </div>
                                            {(formik.errors.doc_no && formik.touched.doc_no) && (
                                                <span className="text-red-500 text-sm">{formik.errors.doc_no}</span>
                                            )}
                                        </Col>
                                        <Col>
                                            <label htmlFor=""></label>
                                            <div className='flex flex-row items-center h-[36px]'>
                                                <button
                                                    type="button"
                                                    className={`btn btn-outline-primary rounded-full p-1`}
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ul>
                                                <li>
                                                    - รุ่นที่ 1 วันที่ วว/ดดดด/ปปป ณ โรงแรม xxxx
                                                    <button type="button" className="btn btn-outline-danger rounded-full p-0 ml-2"><FaMinus /></button>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">งบประมาณ</h1>
                                    <AddBudget
                                        formData={formData?.budgets}
                                        onAddBudget={(budget) => handleAddBudget(formik, budget)}
                                    />

                                    <BudgetList
                                        budgets={formik.values.budgets}
                                        onRemoveBudget={(id) => handleRemoveBudget(formik, id)}
                                    />

                                    <div className="flex flex-row justify-end items-center">
                                        <div className="mr-2">งบประมาณทั้งสิ้น</div>
                                        <div className="w-[15%]">
                                            <input
                                                type="text"
                                                name="budget_total"
                                                value={formik.values.budget_total}
                                                onChange={formik.handleChange}
                                                placeholder="งบประมาณทั้งสิ้น"
                                                className="form-control text-sm float-right text-right"
                                            />
                                            {(formik.errors.budget_total && formik.touched.budget_total) && (
                                                <span className="text-red-500 text-sm">{formik.errors.budget_total}</span>
                                            )}
                                        </div>
                                        <div className="w-[10%]"></div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่าย</h1>
                                    <AddExpense
                                        data={edittingItem}
                                        formData={formData?.expenses}
                                        onAddItem={(expense) => handleAddItem(formik, expense)}
                                        onUpdateItem={(id, expense) => handleUpdateItem(formik, id, expense)}
                                        onClear={setEdittingItem}
                                    />

                                    <ExpenseList
                                        items={formik.values.items}
                                        edittingItem={edittingItem}
                                        onEditItem={(data) => handleEditItem(data)}
                                        onRemoveItem={(id) => handleRemoveItem(formik, id)}
                                    />

                                    <div className="flex flex-row justify-end items-center">
                                        <div className="mr-2">ค่าใช้จ่ายทั้งสิ้น</div>
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
                                <label htmlFor="">หมายเหตุ</label>
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
                                <button type="submit" className={`btn ${loan ? 'btn-outline-warning' : 'btn-outline-primary'} float-right`}>
                                    {loan ? 'บันทึกการแก้ไข' : 'บันทึก'}
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