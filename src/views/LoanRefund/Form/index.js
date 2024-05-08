import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import { FaSearch } from 'react-icons/fa'
import { DatePicker } from '@material-ui/pickers';
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import moment from 'moment';
import { calculateNetTotal, currency, toShortTHDate, toLongTHDate, getFormDataItem } from '../../../utils'
import { store, update } from '../../../features/slices/loan-refund/loanRefundSlice'
import { useGetInitialFormDataQuery } from '../../../features/services/loan/loanApi'
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList'
import Loading from '../../../components/Loading'
import ModalLoanContractList from '../../../components/Modals/LoanContract/List'

const refundSchema = Yup.object().shape({
    doc_no: Yup.string().required('กรุณาระบุเลขที่สัญญา'),
    doc_date: Yup.string().required('กรุณาระบุวันที่สัญญา'),
    contract_id: Yup.string().required('กรุณาระบุเลือกรายการคำขอ'),
    refund_type_id: Yup.string().required('กรุณาระบุเลขที่ฎีกา/อ้างอิง'),
    net_total: Yup.string().required('กรุณาระบุเลขที่สัญญา'),
    items: Yup.mixed().test({
        message: "กรุณาระบุรายการค่าใช้จ่ายที่ต้องการคืน/เบิกเพิ่ม",
        test: arr => arr.length > 0
    })
});

const LoanRefundForm = ({ refund }) => {
    const dispatch = useDispatch();
    const [selectedDocDate, setSelectedDocDate] = useState(moment());
    const [showLoanModal, setShowLoanModal] = useState(false);
    // const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [contract, setContract] = useState(null);
    const [edittingItem, setEdittingItem] = useState(null);
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (refund) {
            setSelectedDocDate(moment(refund.doc_date));

            setContract(refund.loan);
            // setEmployee(contract?.employee);
        }
    }, [refund]);

    const handleAddItem = (formik, contractDetail) => {
        /** Determines whether incoming data is existed or not  */
        if (formik.values.items.some(item => item.contract_detail_id === contractDetail.contract_detail_id)) {
            toast.error('ไม่สามารถระบุรายการค่าใช้จ่ายซ้ำได้!!');
            return
        }

        /** Create new items array */
        const newItems = [...formik.values.items, contractDetail];

        formik.setFieldValue('items', newItems);
        formik.setFieldValue('net_total', calculateNetTotal(newItems));
        formik.setFieldValue('balance', contract?.net_total - calculateNetTotal(newItems));
        setRefundType(formik, contract?.net_total - calculateNetTotal(newItems));

        setTimeout(() => formik.setFieldTouched('items', true));
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
        formik.setFieldValue('balance', contract?.net_total - calculateNetTotal(newItems));
        setRefundType(formik, contract?.net_total - calculateNetTotal(newItems));
    };

    const handleSubmit = (values, formik) => {
        if (refund) {
            dispatch(update({ id: refund.id, data: values }));
        } else {
            dispatch(store(values));
        }

        formik.resetForm();

        /** Clear value of local states */
        setContract(null);
        setSelectedDocDate(moment());
    };

    const setRefundType = (formik, balance) => {
        console.log(balance);
        formik.setFieldValue('refund_type_id', balance >= 0 ? '1' : '2');
    };

    return (
        <Formik
            initialValues={{
                doc_no: refund ? refund.doc_no : '',
                doc_date:  refund ? moment(refund.doc_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                contract_id: refund ? refund.contract_id : '',
                refund_type_id: refund ? refund.refund_type_id : '1',
                net_total: refund ? refund.net_total : '',
                balance: refund ? refund.balance : '',
                items: refund ? refund.details : [],
            }}
            validationSchema={refundSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalLoanContractList
                            isShow={showLoanModal}
                            onHide={() => setShowLoanModal(false)}
                            onSelect={(contract) => {
                                setContract(contract);
                                formik.setFieldValue('contract_id', contract?.id);
                                setTimeout(() => formik.setFieldTouched('contract_id', true));
                            }}
                        />

                        <Row className="mb-3">
                            <Col md={8}>
                                <div className="border rounded-md py-2 px-3 bg-[#EAD9D5] text-sm min-h-[260px]">
                                    <h1 className="font-bold text-lg mb-2">สัญญายืมเงิน</h1>
                                    <Row className="mb-3">
                                        <Col md={8} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[22%] mt-[8px]">สัญญายืมเงิน :</label>
                                            <div className="w-[65%]">
                                                <div className="input-group">
                                                    <div className="form-control text-sm h-[34px] bg-gray-100">
                                                        {contract && <span className="mr-4"><b className="mr-1">เลขที่</b> {contract?.contract_no}</span>}
                                                    </div>
                                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowLoanModal(true)}>
                                                        <FaSearch />
                                                    </button>
                                                </div>
                                                {(formik.errors.contract_id && formik.touched.contract_id) && (
                                                    <span className="text-red-500 text-xs">{formik.errors.contract_id}</span>
                                                )}
                                            </div>
                                        </Col>
                                        <Col className="flex flex-row items-center">
                                            <label htmlFor="">ส่งวันที่ :</label>
                                            <div className="font-thin ml-1">
                                                {toLongTHDate(moment(contract?.sent_date).toDate())}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col className="flex flex-row items-center">
                                                <label>เงินเข้าวันที่ :</label>
                                                <div className="ml-1 text-green-600 font-bold">
                                                    {toLongTHDate(moment(contract?.deposited_date).toDate())}
                                                </div>
                                            </Col>
                                        <Col className="flex flex-row items-center">
                                            <label>กำหนดคืนเงินภายใน :</label>
                                            <div className="font-thin ml-1">
                                                {contract ? currency.format(contract?.refund_days) : '-'} วัน
                                            </div>
                                        </Col>
                                        <Col className="flex flex-row items-center">
                                            <label>วันที่กำหนดคืนเงิน :</label>
                                            <div className="ml-1 text-red-500 font-bold">
                                                {toLongTHDate(moment(contract?.refund_date).toDate())}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label>ประเภทการยืม :</label>
                                            <div className="font-thin ml-1">
                                                {getFormDataItem(formData, 'loanTypes', contract?.loan?.loan_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={5} className="flex flex-row items-center">
                                            <label htmlFor="">ประเภทเงินยืม :</label>
                                            <div className="font-thin ml-1">
                                                {getFormDataItem(formData, 'moneyTypes', contract?.loan?.money_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={3} className="flex flex-row items-center">
                                            <label htmlFor="">ปีงบประมาณ :</label>
                                            <div className="font-thin ml-1">
                                                {contract && contract?.loan?.year+543}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label htmlFor="">หน่วยงาน :</label>
                                            <div className="font-thin ml-1">{contract?.loan?.department?.name}</div>
                                        </Col>
                                        <Col md={8} className="flex flex-row items-center">
                                            <label htmlFor="">ผู้ขอ/เจ้าของโครงการ :</label>
                                            <div className="font-thin ml-1">
                                                {contract?.loan?.employee?.prefix?.name}{contract?.loan?.employee?.firstname} {contract?.loan?.employee?.lastname}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={12} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[12%]">โครงการ :</label>
                                            <div className="font-thin ml-1 w-[88%]">
                                                {contract?.loan?.project_name}
                                                <span className="ml-1"><b>ระหว่างวันที่</b> {toShortTHDate(contract?.loan?.project_sdate)} - {toShortTHDate(contract?.loan?.project_edate)}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={12} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[12%]">งบประมาณ :</label>
                                            <div className="font-thin ml-1 w-[88%]">
                                                {contract?.loan?.budgets && contract?.loan?.budgets.map((item, index) => (
                                                    <ul key={item.id}>
                                                        <li>
                                                            <span className="mr-1">{index+1}.</span>
                                                            {item.budget?.name}
                                                            <span className="ml-1">
                                                                {item.budget?.project?.plan?.name} / {item.budget?.project?.name}
                                                            </span>
                                                            {contract?.loan?.budgets.length > 1 && (
                                                                <span className="ml-1">
                                                                    <b>งบประมาณ</b> {currency.format(item?.total)} บาท
                                                                </span>
                                                            )}
                                                        </li>
                                                    </ul>
                                                ))}
                                                <p><b>รวมงบประมาณทั้งสิ้น</b> {currency.format(contract?.loan?.budget_total)} บาท</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col>
                                <h1 className="font-bold text-lg mb-2">เอกสารหักล้างเงินยืม</h1>
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
                                            <label htmlFor="">ยอดเงิน{parseFloat(formik.values.balance) >= 0 ? 'คืน' : 'เบิกเพิ่ม'}</label>
                                            <div className="form-control text-sm font-bold bg-gray-200 min-h-[34px]">
                                                {parseFloat(formik.values.balance) < 0 && (
                                                    <span className="text-red-600">
                                                        {currency.format(formik.values.balance)}
                                                    </span>
                                                )}
                                                {parseFloat(formik.values.balance) >= 0 && (
                                                    <span className="text-green-600">
                                                        {currency.format(formik.values.balance)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {(formik.errors.net_total && formik.touched.net_total) && (
                                            <span className="text-red-500 text-xs">{formik.errors.net_total}</span>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่ายจริง</h1>

                                    <AddExpense
                                        expenses={contract?.details}
                                        courses={contract?.loan?.courses}
                                        refundType={formik.values.refund_type_id}
                                        onAddItem={(data) => handleAddItem(formik, data)}
                                    />

                                    <ExpenseList
                                        items={formik.values.items}
                                        showButtons={true}
                                        edittingItem={edittingItem}
                                        onEditItem={(data) => handleEditItem(data)}
                                        onRemoveItem={(id) => handleRemoveItem(formik, id)}
                                    />

                                    <div className="flex flex-row justify-end items-center gap-2">
                                        ยอดใช้จริงทั้งสิ้น
                                        <div className="w-[10%]">
                                            <div className="form-control font-bold text-lg text-right float-right min-h-[34px]">
                                                {contract?.net_total < parseFloat(formik.values.net_total) && (
                                                    <span className="text-red-600">
                                                        {currency.format(formik.values.net_total)}
                                                    </span>
                                                )}
                                                {contract?.net_total >= parseFloat(formik.values.net_total) && (
                                                    <span className="text-green-600">
                                                        {currency.format(formik.values.net_total)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-[9.5%]">
                                            <div className="form-control font-bold text-lg text-right float-right min-h-[34px]">
                                                {parseFloat(formik.values.balance) < 0 && (
                                                    <span className="text-red-600">
                                                        {currency.format(formik.values.balance)}
                                                    </span>
                                                )}
                                                {parseFloat(formik.values.balance) >= 0 && (
                                                    <span className="text-green-600">
                                                        {currency.format(formik.values.balance)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-[9.5%]"></div>
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