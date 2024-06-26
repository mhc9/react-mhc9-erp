import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import moment from 'moment'
import { getContract, resetSuccess } from '../../features/slices/loan-contract/loanContractSlice'
import { useGetInitialFormDataQuery } from '../../features/services/loan/loanApi'
import { currency, toLongTHDate, toShortTHDate, getFormDataItem, isOverRefundDate } from '../../utils'
import Loading from '../../components/Loading'
import ExpenseList from '../../components/Expense//ExpenseList'
import ModalDepositForm from '../../components/Modals/LoanContract/Deposit/Form'
import ModalApprovalForm from '../../components/Modals/LoanContract/Approval/Form'

const LoanContractDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { contract, isLoading, isSuccess } = useSelector(state => state.loanContract);
    const { data: formData, isLoading: loading } = useGetInitialFormDataQuery();
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [showApprovalForm, setShowApprovalForm] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getContract(id));
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกสำเร็จ!!');
            dispatch(resetSuccess());
        }
    }, [isSuccess]);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item href="/loan-contract">รายการสัญญา</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดสัญญา</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-xl font-bold mb-1">รายละเอียดสัญญา (ID: {id})</h1>

                {isLoading && <div className="text-center"><Loading /></div>}
                {!isLoading && (
                    <>
                        <ModalDepositForm
                            isShow={showDepositForm}
                            onHide={setShowDepositForm}
                            contract={contract}
                        />

                        <ModalApprovalForm
                            isShow={showApprovalForm}
                            onHide={setShowApprovalForm}
                            contract={contract}
                        />

                        <Row className="mb-3">
                            <Col md={8}>
                                <div className="border rounded-md py-2 px-3 bg-[#D8E2DC] text-sm min-h-[305px]">
                                    <h1 className="font-bold text-lg mb-2">คำขอยืมเงิน</h1>
                                    <Row className="mb-2">
                                        <Col md={5} className="flex flex-row items-center">
                                            <label htmlFor="">เลขที่เอกสาร :</label>
                                            <div className="font-thin ml-1">
                                                {contract?.loan?.doc_no}
                                            </div>
                                        </Col>
                                        <Col md={4} className="flex flex-row items-center">
                                            <label htmlFor="">วันที่เอกสาร :</label>
                                            <div className="font-thin ml-1">
                                                {toLongTHDate(moment(contract?.loan?.doc_date).toDate())}
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
                                        <Col md={5} className="flex flex-row items-center">
                                            <label>ประเภทการยืม :</label>
                                            <div className="font-thin ml-1">
                                                {formData && getFormDataItem(formData, 'loanTypes', contract?.loan?.loan_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={4} className="flex flex-row items-center">
                                            <label htmlFor="">ประเภทเงินยืม :</label>
                                            <div className="font-thin ml-1">
                                                {formData && getFormDataItem(formData, 'moneyTypes', contract?.loan?.money_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={3} className="flex flex-row items-center">
                                            <label htmlFor="">กำหนดคืนภายใน</label>
                                            <div className="font-thin ml-1">
                                                {contract ? contract?.refund_days : '-'} วัน
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={6} className="flex flex-row items-center">
                                            <label htmlFor="">หน่วยงาน :</label>
                                            <div className="font-thin ml-1">
                                                {contract?.loan?.department?.name}
                                            </div>
                                        </Col>
                                        <Col md={6} className="flex flex-row items-center">
                                            <label htmlFor="">ผู้ขอ/เจ้าของโครงการ :</label>
                                            <div className="font-thin ml-1">
                                                {contract?.loan?.employee?.firstname} {contract?.loan?.employee?.lastname}
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
                                <Row>
                                    <Col>
                                        <div className="border rounded-md py-2 px-4 bg-[#EAD9D5] text-sm min-h-[260px]">
                                            <div className="flex items-center mb-2">
                                                <h1 className="font-bold text-lg mr-2">สัญญายืมเงิน</h1>
                                                <div className="text-lg text-center">
                                                    {contract?.status === 1 && <span className="badge rounded-pill text-bg-success">อนุมัติแล้ว</span>}
                                                    {contract?.status === 2 && <span className="badge rounded-pill text-bg-secondary">เงินเข้าแล้ว</span>}
                                                    {contract?.status === 3 && <span className="badge rounded-pill text-bg-warning">รอเคลียร์</span>}
                                                    {contract?.status === 4 && <span className="badge rounded-pill text-bg-dark">เคลียร์แล้ว</span>}
                                                    {contract?.status === 9 && <span className="badge rounded-pill text-bg-danger">ยกเลิก</span>}
                                                </div>
                                            </div>

                                            <Row className="mb-2">
                                                <Col>
                                                    <label htmlFor="">เลขที่สัญญา</label>
                                                    <div className="form-control text-sm text-center text-blue-600 font-bold min-h-[34px]">
                                                        {contract?.contract_no}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col md={6}>
                                                    <label htmlFor="">วันที่ส่งสัญญา</label>
                                                    <div className="form-control text-sm min-h-[34px]">
                                                        {contract?.sent_date ? toLongTHDate(moment(contract?.sent_date).toDate()) : '-'}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <label htmlFor="">วันที่อนุมัติ</label>
                                                    <div className="form-control text-sm min-h-[34px]">
                                                        {contract?.approved_date ? toLongTHDate(moment(contract?.approved_date).toDate()) : '-'}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col md={6}>
                                                    <label htmlFor="">เลขที่ฎีกา/อ้างอิง</label>
                                                    <div className="form-control text-sm min-h-[34px]">
                                                        {contract?.bill_no}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <label htmlFor="">วันที่วาง ขบ.02</label>
                                                    <div className="form-control text-sm">
                                                        {contract?.bk02_date ? toLongTHDate(moment(contract?.bk02_date).toDate()) : '-'}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col md={6}>
                                                    <label htmlFor="">วันที่เงินเข้า</label>
                                                    <div className="form-control text-sm">
                                                        {contract?.deposited_date ? toLongTHDate(moment(contract?.deposited_date).toDate()) : '-'}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <label htmlFor="">วันที่กำหนดคืนเงิน</label>
                                                    <div className="form-control text-sm">
                                                        {contract?.refund_date ? toLongTHDate(moment(contract?.refund_date).toDate()) : '-'}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>                            
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่าย</h1>
                                    <ExpenseList
                                        courses={contract?.loan?.courses}
                                        items={contract?.details.map(item => ({ ...item, course_id: item.loan_detail.course_id }))}
                                        showButtons={false}
                                    />

                                    <div className="flex flex-row justify-end">
                                        <div className="w-[15%]">
                                            <div className="form-control text-sm float-right text-right">
                                                {currency.format(contract?.net_total)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">หมายเหตุ</label>
                                <div className="form-control text-sm min-h-[68px]">
                                    {contract?.remark}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2 mt-4">
                            <Col className="flex justify-center">
                                {(contract?.status === 1 && !contract?.deposited_date) && (
                                    <a href="#" className="btn btn-primary" onClick={() => setShowDepositForm(true)}>
                                        บันทึกเงินเข้า
                                    </a>
                                )}
                                {(contract?.status === 2 && isOverRefundDate(contract?.refund_date)) && (
                                    <Link to={`/preview/${id}/loan-contract/collection-form`} target="_blank" className="btn btn-success">
                                        <i className="fas fa-print mr-1"></i>
                                        พิมพ์บันทึกทวงหนี้
                                    </Link>
                                )}
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div>
    )
}

export default LoanContractDetail