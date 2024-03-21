import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import { FaSearch } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers';
import * as Yup from 'yup'
import moment from 'moment';
import { calculateNetTotal, currency, toShortTHDate, toLongTHDate, getFormDataItem } from '../../../utils'
import { store, update } from '../../../features/slices/loan-contract/loanContractSlice'
import { useGetInitialFormDataQuery } from '../../../features/services/loan/loanApi'
import Loading from '../../../components/Loading'
import ExpenseList from '../../../components/Expense/ExpenseList'
import ModalLoanList from '../../../components/Modals/Loan/List'
// import ModalEmployeeList from '../../../components/Modals/EmployeeList'

const contractSchema = Yup.object().shape({
    contract_no: Yup.string().required('กรุณาระบุเลขที่สัญญา'),
    contract_date: Yup.string().required('กรุณาระบุวันที่สัญญา'),
    loan_id: Yup.string().required('กรุณาระบุเลือกรายการคำขอ'),
    bill_no: Yup.string().required('กรุณาระบุเลขที่ฎีกา/อ้างอิง'),
    bk02_date: Yup.string().required('กรุณาระบุวันที่วาง บข.02'),
    sent_date: Yup.string().required('กรุณาระบุวันที่ส่งสัญญา'),
    deposit_date: Yup.string().required('กรุณาระบุวันที่เงินเข้า'),
    net_total: Yup.string().required('กรุณาระบุเลขที่สัญญา'),
});

const LoanContractForm = ({ contract }) => {
    const dispatch = useDispatch();
    const [selectedContractDate, setSelectedContractDate] = useState(moment());
    const [selectedBk02Date, setSelectedBk02Date] = useState(moment());
    const [selectedSentDate, setSelectedSentDate] = useState(moment());
    const [selectedDepositDate, setSelectedDepositDate] = useState(moment());
    const [showLoanModal, setShowLoanModal] = useState(false);
    // const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [loan, setLoan] = useState(null);
    const [edittingItem, setEdittingItem] = useState(null);
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (contract) {
            setSelectedContractDate(moment(contract.contract_date));
            setSelectedBk02Date(moment(contract.bk02_date));
            setSelectedSentDate(moment(contract.sent_date));
            setSelectedDepositDate(moment(contract.deposit_date));

            setLoan(contract.loan);
            // setEmployee(contract.employee);
        }
    }, [contract]);

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

    const handleSubmit = (values, formik) => {
        if (contract) {
            dispatch(update({ id: contract.id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();

        /** Clear value of local states */
        setLoan(null);
        // setEmployee(null);
        setSelectedContractDate(moment());
        setSelectedBk02Date(moment());
        setSelectedSentDate(moment());
        setSelectedDepositDate(moment());
    };

    return (
        <Formik
            initialValues={{
                contract_no: contract ? contract.contract_no : '',
                contract_date: contract ? moment(contract.contract_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                loan_id: contract ? contract.loan_id : '',
                bill_no: contract ? contract.bill_no : '',
                bk02_date: contract ? moment(contract.bk02_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                sent_date: contract ? moment(contract.sent_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                deposit_date: contract ? moment(contract.deposit_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                net_total: contract ? contract.net_total : '',
                items: contract ? contract.details : [],
            }}
            validationSchema={contractSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalLoanList
                            isShow={showLoanModal}
                            onHide={() => setShowLoanModal(false)}
                            onSelect={(loan) => {
                                setLoan(loan);

                                formik.setFieldValue('loan_id', loan.id);
                                formik.setFieldValue('net_total', loan.net_total);
                                formik.setFieldValue('items', loan.details);

                                setTimeout(() => formik.setFieldTouched('loan_id', true));
                            }}
                        />

                        {/* <ModalEmployeeList
                            isShow={showEmployeeModal}
                            onHide={() => setShowEmployeeModal(false)}
                            onSelect={(employee) => {
                                setEmployee(employee);
                                formik.setFieldValue('employee_id', employee.id);

                                if (employee.member_of.length > 0) {
                                    formik.setFieldValue('division_id', employee.member_of[0]?.division_id);
                                }
                            }}
                        /> */}

                        <Row className="mb-2">
                            <Col md={8}>
                                <div className="border rounded-md py-2 px-3 bg-[#D8E2DC] text-sm min-h-[260px]">
                                    <Row className="mb-2">
                                        <Col md={8} className="flex flex-row items-start justify-center">
                                            <label htmlFor="" className="w-[18%] mt-[8px]">คำขอยืมเงิน :</label>
                                            <div className="w-[82%]">
                                                <div className="input-group">
                                                    <div className="form-control text-sm h-[34px] bg-gray-100">
                                                        เลขที่ {loan && <span>{loan?.doc_no} / {toLongTHDate(moment(loan?.doc_date).toDate())}</span>}
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        name="loan_id"
                                                        value={formik.values.loan_id}
                                                        onChange={formik.handleChange}
                                                        className="form-control text-sm"
                                                    />
                                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowLoanModal(true)}>
                                                        <FaSearch />
                                                    </button>
                                                </div>
                                                {(formik.errors.loan_id && formik.touched.loan_id) && (
                                                    <span className="text-red-500 text-xs">{formik.errors.loan_id}</span>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label>ประเภทการยืม :</label>
                                            <div className="font-thin ml-1">
                                                {getFormDataItem(formData, 'loanTypes', loan?.loan_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={5} className="flex flex-row items-center">
                                            <label htmlFor="">ประเภทเงินยืม :</label>
                                            <div className="font-thin ml-1">
                                                {getFormDataItem(formData, 'moneyTypes', loan?.money_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={3} className="flex flex-row items-center">
                                            <label htmlFor="">ปีงบประมาณ :</label>
                                            <div className="font-thin ml-1">{loan?.year}</div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label htmlFor="">หน่วยงาน :</label>
                                            <div className="font-thin ml-1">{loan?.department?.name}</div>
                                        </Col>
                                        <Col md={8} className="flex flex-row items-center">
                                            <label htmlFor="">ผู้ขอ/เจ้าของโครงการ :</label>
                                            <div className="font-thin ml-1">
                                                {loan?.employee?.prefix?.name}{loan?.employee?.firstname} {loan?.employee?.lastname}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[12%]">โครงการ :</label>
                                            <div className="font-thin ml-1 w-[88%]">
                                                {loan?.project_name}
                                                <span className="ml-1"><b>ระหว่างวันที่</b> {toShortTHDate(loan?.project_sdate)} - {toShortTHDate(loan?.project_edate)}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={12} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[12%]">งบประมาณ :</label>
                                            <div className="font-thin ml-1 w-[88%]">
                                                {loan?.budget && (
                                                    <>
                                                        {loan?.budget?.name}
                                                        <span className="ml-1">
                                                            {loan?.budget?.project?.plan?.name} / {loan?.budget?.project?.name}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col>
                                <Row className="mb-2">
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <label htmlFor="">เลขที่สัญญา</label>
                                        <input
                                            type="text"
                                            name="contract_no"
                                            value={formik.values.contract_no}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        />
                                        {(formik.errors.contract_no && formik.touched.contract_no) && (
                                            <span className="text-red-500 text-xs">{formik.errors.contract_no}</span>
                                        )}
                                    </Col>
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่สัญญา</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedContractDate}
                                                onChange={(date) => {
                                                    setSelectedContractDate(date);
                                                    formik.setFieldValue('contract_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.contract_date && formik.touched.contract_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.contract_date}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <label htmlFor="">เลขที่ฎีกา/อ้างอิง</label>
                                        <input
                                            type="text"
                                            name="bill_no"
                                            value={formik.values.bill_no}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        />
                                        {(formik.errors.bill_no && formik.touched.bill_no) && (
                                            <span className="text-red-500 text-xs">{formik.errors.bill_no}</span>
                                        )}
                                    </Col>
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่วาง บข.02</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedBk02Date}
                                                onChange={(date) => {
                                                    setSelectedBk02Date(date);
                                                    formik.setFieldValue('bk02_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.bk02_date && formik.touched.bk02_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.bk02_date}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่ส่งสัญญา</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedSentDate}
                                                onChange={(date) => {
                                                    setSelectedSentDate(date);
                                                    formik.setFieldValue('sent_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.sent_date && formik.touched.sent_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.sent_date}</span>
                                        )}
                                    </Col>
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่เงินเข้า</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedDepositDate}
                                                onChange={(date) => {
                                                    setSelectedDepositDate(date);
                                                    formik.setFieldValue('deposit_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.deposit_date && formik.touched.deposit_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.deposit_date}</span>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่าย</h1>
                                    <ExpenseList
                                        items={loan?.details}
                                        showButtons={false}
                                        edittingItem={edittingItem}
                                        onEditItem={(data) => handleEditItem(data)}
                                        onRemoveItem={(id) => handleRemoveItem(formik, id)}
                                    />

                                    <div className="flex flex-row justify-end items-center gap-2">
                                        ยอดยืมทั้งสิ้น
                                        <div className="w-[15%]">
                                            <div className="form-control font-bold text-lg text-right text-red-600 float-right">
                                                {currency.format(formik.values.net_total)}
                                            </div>
                                            {(formik.errors.net_total && formik.touched.net_total) && (
                                                <span className="text-red-500 text-xs">{formik.errors.net_total}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {(formik.errors.items && formik.touched.items) && (
                                    <span className="text-red-500 text-xs">{formik.errors.items}</span>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button type="submit" className={`btn ${contract ? 'btn-outline-warning' : 'btn-outline-primary'} float-right`}>
                                    {contract ? 'บันทึกการแก้ไข' : 'บันทึก'}
                                </button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default LoanContractForm