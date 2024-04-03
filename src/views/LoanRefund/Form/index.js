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

const refundSchema = Yup.object().shape({
    doc_no: Yup.string().required('กรุณาระบุเลขที่สัญญา'),
    doc_date: Yup.string().required('กรุณาระบุวันที่สัญญา'),
    contract_id: Yup.string().required('กรุณาระบุเลือกรายการคำขอ'),
    refund_type_id: Yup.string().required('กรุณาระบุเลขที่ฎีกา/อ้างอิง'),
    net_total: Yup.string().required('กรุณาระบุเลขที่สัญญา'),
});

const LoanRefundForm = ({ refund }) => {
    const dispatch = useDispatch();
    const [selectedDocDate, setSelectedDocDate] = useState(moment());
    const [showLoanModal, setShowLoanModal] = useState(false);
    // const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [loan, setLoan] = useState(null);
    const [edittingItem, setEdittingItem] = useState(null);
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (refund) {
            setSelectedDocDate(moment(refund.doc_date));

            setLoan(refund.loan);
            // setEmployee(contract.employee);
        }
    }, [refund]);

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
        if (refund) {
            dispatch(update({ id: refund.id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();

        /** Clear value of local states */
        setLoan(null);
        setSelectedDocDate(moment());
    };

    return (
        <Formik
            initialValues={{
                doc_no: refund ? refund.doc_no : '',
                doc_date:  refund ? moment(refund.doc_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                contract_id: refund ? refund.contract_id : '',
                refund_type_id: refund ? refund.refund_type_id : '1',
                net_total: refund ? refund.net_total : '',
                items: refund ? refund.details : [],
            }}
            validationSchema={refundSchema}
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
                                <div className="border rounded-md py-2 px-3 bg-[#EAD9D5] text-sm min-h-[260px]">
                                    <h1 className="font-bold text-lg mb-2">สัญญายืมเงิน</h1>
                                    <Row className="mb-2">
                                        <Col md={8} className="flex flex-row items-start justify-center">
                                            <label htmlFor="" className="w-[18%] mt-[8px]">สัญญายืมเงิน :</label>
                                            <div className="w-[90%]">
                                                <div className="input-group">
                                                    <div className="form-control text-sm h-[34px] bg-gray-100">
                                                        <b>เลขที่</b> {loan && <span>{loan?.doc_no} <b>ลงวันที่</b> {toLongTHDate(moment(loan?.doc_date).toDate())}</span>}
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
                                                {loan?.budgets && loan?.budgets.map((item, index) => (
                                                    <ul key={item.id}>
                                                        <li>
                                                            <span className="mr-1">{index+1}.</span>
                                                            {item.budget?.name}
                                                            <span className="ml-1">
                                                                {item.budget?.project?.plan?.name} / {item.budget?.project?.name}
                                                            </span>
                                                            {loan?.budgets.length > 1 && (
                                                                <span className="ml-1">
                                                                    <b>งบประมาณ</b> {currency.format(item?.total)} บาท
                                                                </span>
                                                            )}
                                                        </li>
                                                    </ul>
                                                ))}
                                                <p className="ml-1">
                                                    <b>รวมงบประมาณทั้งสิ้น</b> {currency.format(loan?.budget_total)} บาท
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col>
                                <h1 className="font-bold text-lg mb-2">เอกสารคืน/เบิกเพิ่ม</h1>
                                <Row className="mb-2">
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <label htmlFor="">เลขที่เอกสาร</label>
                                        <input
                                            type="text"
                                            name="doc_no"
                                            value={formik.values.doc_no}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        />
                                        {(formik.errors.doc_no && formik.touched.doc_no) && (
                                            <span className="text-red-500 text-xs">{formik.errors.doc_no}</span>
                                        )}
                                    </Col>
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="">วันที่เอกสาร</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedDocDate}
                                                onChange={(date) => {
                                                    setSelectedDocDate(date);
                                                    formik.setFieldValue('doc_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                        {(formik.errors.doc_date && formik.touched.doc_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.doc_date}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <label htmlFor="">ประเภท</label>
                                        <select
                                            type="text"
                                            name="refund_type_id"
                                            value={formik.values.refund_type_id}
                                            onChange={formik.handleChange}
                                            className="form-control text-sm"
                                        >
                                            <option value="">-- เลือกประเภท --</option>
                                            <option value="1">คืนเงิน</option>
                                            <option value="2">เบิกเพิ่ม</option>
                                        </select>
                                        {(formik.errors.refund_type_id && formik.touched.refund_type_id) && (
                                            <span className="text-red-500 text-xs">{formik.errors.refund_type_id}</span>
                                        )}
                                    </Col>
                                    <Col md={6} className="max-[768px]:mt-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="">ยอดเงิน{formik.values.refund_type_id === '1' ? 'คืน' : 'เบิกเพิ่ม'}</label>
                                            <input
                                                type="text"
                                                value={formik.values.net_total}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                        </div>
                                        {(formik.errors.bk02_date && formik.touched.bk02_date) && (
                                            <span className="text-red-500 text-xs">{formik.errors.bk02_date}</span>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่ายที่{formik.values.refund_type_id === '1' ? 'คืน' : 'เบิกเพิ่ม'}</h1>
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
                                <button type="submit" className={`btn ${refund ? 'btn-outline-warning' : 'btn-outline-primary'} float-right`}>
                                    {refund ? 'บันทึกการแก้ไข' : 'บันทึก'}
                                </button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default LoanRefundForm