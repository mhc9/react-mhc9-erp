import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { getContract } from '../../features/slices/loan-contract/loanContractSlice'
import { useGetInitialFormDataQuery } from '../../features/services/loan/loanApi'
import { currency, toLongTHDate, toShortTHDate } from '../../utils'
import Loading from '../../components/Loading'
import ExpenseList from '../../components/Expense//ExpenseList'
import ModalDepositForm from '../../components/Modals/Deposit/Form'

const LoanContractDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { contract, isLoading } = useSelector(state => state.loanContract);
    const { data: formData, isLoading: loading } = useGetInitialFormDataQuery();
    const [showDepositForm, setShowDepositForm] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getContract(id));
        }
    }, [id]);

    const getFormDataItem = (dataName, id) => {
        return formData[dataName].find(item => item.id === id);
    }

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item href="/loan-contract">รายการสัญญา</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดสัญญา</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                {isLoading && <div className="text-center"><Loading /></div>}
                {!isLoading && (
                    <>
                        <ModalDepositForm
                            isShow={showDepositForm}
                            onHide={setShowDepositForm}
                            contract={contract}
                        />

                        <Row className="mb-2">
                            <Col md={8}>
                                <div className="border rounded-md py-2 px-3 bg-[#D8E2DC] text-sm min-h-[260px]">
                                    <h1 className="font-bold text-lg mb-2">รายละเอียดคำขอยืมเงิน</h1>
                                    <Row>
                                        <Col md={3}>
                                            <label htmlFor="">เลขที่เอกสาร</label>
                                            <div className="form-control text-sm">
                                                {contract?.loan?.doc_no}
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <div className="flex flex-col">
                                                <label htmlFor="">วันที่เอกสาร</label>
                                                <div className="form-control text-sm">
                                                    {toLongTHDate(moment(contract?.loan?.doc_date).toDate())}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <label>ประเภทการยืม</label>
                                            <div className="form-control text-sm">
                                                {formData && getFormDataItem('loanTypes', contract?.loan?.loan_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <label htmlFor="">ประเภทเงินยืม</label>
                                            <div className="form-control text-sm">
                                                {formData && getFormDataItem('moneyTypes', contract?.loan?.money_type_id)?.name}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4}>
                                            <label htmlFor="">หน่วยงาน</label>
                                            <div className="form-control text-sm">
                                                {contract?.loan?.department?.name}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                            <div className="form-control text-sm">
                                                {contract?.loan?.employee?.firstname} {contract?.loan?.employee?.lastname}
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <label htmlFor="">ปีงบ</label>
                                            <div className="form-control text-sm">
                                                {contract?.loan?.year}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
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
                                                <p className="ml-1">
                                                    <b>รวมงบประมาณทั้งสิ้น</b> {currency.format(contract?.loan?.budget_total)} บาท
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <div className="border rounded-md py-2 px-3 bg-[#EAD9D5] text-sm min-h-[260px]">
                                            <div className="flex items-center mb-2 border">
                                                <h1 className="font-bold text-lg mr-2">สัญญายืมเงิน</h1>
                                                <div className="text-lg text-center">
                                                    {contract?.status === 1 && <span className="badge rounded-pill text-bg-secondary">รออนุมัติ</span>}
                                                    {contract?.status === 2 && <span className="badge rounded-pill text-bg-success">อนุมัติแล้ว</span>}
                                                    {contract?.status === 3 && <span className="badge rounded-pill text-bg-info">เคลียร์แล้ว</span>}
                                                    {contract?.status === 9 && <span className="badge rounded-pill text-bg-danger">ยกเลิก</span>}
                                                </div>
                                            </div>

                                            <Row className="mb-2">
                                                <Col md={6} className="max-[768px]:mt-2">
                                                    <label htmlFor="">เลขที่สัญญา</label>
                                                    <div className="form-control text-sm">
                                                        {contract?.contract_no}
                                                    </div>
                                                </Col>
                                                <Col md={6} className="max-[768px]:mt-2">
                                                    <label htmlFor="">กำหนดคืนภายใน (วัน)</label>
                                                    <div className="form-control text-center text-sm">
                                                        {contract?.refund_days}
                                                    </div>
                                                </Col>
                                                {/* <Col md={6} className="max-[768px]:mt-2">
                                                    <label htmlFor="">วันที่สัญญา</label>
                                                    <div className="form-control text-sm">
                                                        {toLongTHDate(moment(contract?.contract_date).toDate())}
                                                    </div>
                                                </Col> */}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col md={6} className="max-[768px]:mt-2">
                                                    <label htmlFor="">เลขที่ฎีกา/อ้างอิง</label>
                                                    <div className="form-control text-sm">
                                                        {contract?.bill_no}
                                                    </div>
                                                </Col>
                                                <Col md={6} className="max-[768px]:mt-2">
                                                    <label htmlFor="">วันที่ส่งสัญญา</label>
                                                    <div className="form-control text-sm">
                                                        {toLongTHDate(moment(contract?.sent_date).toDate())}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col md={6} className="max-[768px]:mt-2">
                                                    <label htmlFor="">วันที่วาง บข.02</label>
                                                    <div className="form-control text-sm">
                                                        {toLongTHDate(moment(contract?.bk02_date).toDate())}
                                                    </div>
                                                </Col>
                                                <Col md={6} className="max-[768px]:mt-2">
                                                    <label htmlFor="">วันที่เงินเข้า</label>
                                                    <div className="form-control text-sm">
                                                        {contract?.deposit_date ? toLongTHDate(moment(contract?.deposit_date).toDate()) : '-'}
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
                                <a href="#" className="btn btn-success mr-2">พิมพ์สัญญาเงินยืม</a>
                                {contract?.status < 2 && <a href="#" className="btn btn-primary">อนุมัติสัญญา</a>}
                                {contract?.status === 2 && <a href="#" className="btn btn-primary" onClick={() => setShowDepositForm(true)}>บันทึกเงินเข้า</a>}
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div>
    )
}

export default LoanContractDetail