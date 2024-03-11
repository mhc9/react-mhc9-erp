import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { getLoan } from '../../features/slices/loan/loanSlice'
import { useGetInitialFormDataQuery } from '../../features/services/loan/loanApi'
import { currency, toLongTHDate } from '../../utils'
import ExpenseList from './Form/ExpenseList'
import Loading from '../../components/Loading'

const LoanDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loan, isLoading } = useSelector(state => state.loan);
    const { data: formData, isLoading: loading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (id) {
            dispatch(getLoan(id));
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
                <Breadcrumb.Item href="/loan">รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดคำขอ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                {isLoading && <div className="text-center"><Loading /></div>}
                {!isLoading && (
                    <>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">เลขที่เอกสาร</label>
                                <div className="form-control text-sm">
                                    {loan?.doc_no}
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="flex flex-col">
                                    <label htmlFor="">วันที่เอกสาร</label>
                                    <div className="form-control text-sm">
                                        {toLongTHDate(moment(loan?.doc_date).toDate())}
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <label>ประเภทการยืม</label>
                                <div className="form-control text-sm">
                                    {getFormDataItem('loanTypes', loan?.loan_type_id)?.name}
                                </div>
                            </Col>
                            <Col md={3}>
                                <label htmlFor="">ประเภทเงินยืม</label>
                                <div className="form-control text-sm">
                                    {getFormDataItem('moneyTypes', loan?.money_type_id)?.name}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={4}>
                                <label htmlFor="">หน่วยงาน</label>
                                <div className="form-control text-sm">
                                    {loan?.department?.name}
                                </div>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                <div className="form-control text-sm">
                                    {loan?.employee?.firstname} {loan?.employee?.lastname}
                                </div>
                            </Col>
                            <Col md={2}>
                                <label htmlFor="">ปีงบ</label>
                                <div className="form-control text-sm">
                                    {loan?.year}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={12}>
                                <label htmlFor="">งบประมาณ</label>
                                <div className="form-control text-sm">
                                    {loan?.budget?.name}
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="form-control text-sm min-h-[34px] bg-gray-200 mt-1">
                                    โครงการ/ผลผลิต :
                                    {loan?.budget && (
                                        <span className="font-thin ml-1">{loan?.budget?.project?.plan?.name} / {loan?.budget?.project?.name}</span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={12}>
                                <label htmlFor="">โครงการ</label>
                                <div className="form-control text-sm">
                                    {loan?.project?.name}
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="form-control text-sm min-h-[34px] bg-gray-200 mt-1">
                                    รายละเอียดโครงการ :
                                    {loan?.project && (
                                        <span className="font-thin ml-1">
                                            {loan?.project?.place?.name}
                                            <span className="ml-1"><b>ระหว่างวันที่</b> {toLongTHDate(moment(loan?.project?.from_date).toDate())} - {toLongTHDate(moment(loan?.project?.to_date).toDate())}</span>
                                        </span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่าย</h1>
                                    <ExpenseList items={loan?.details} showButtons={false} />

                                    <div className="flex flex-row justify-end">
                                        <div className="w-[15%]">
                                            <div className="form-control text-sm float-right text-right">
                                                {currency.format(loan?.net_total)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">หมายเหตุ</label>
                                <div className="form-control text-sm min-h-[34px]">
                                    {loan?.remark}
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div>
    )
}

export default LoanDetail