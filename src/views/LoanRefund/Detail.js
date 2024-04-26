import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import moment from 'moment';
import { currency, toShortTHDate, toLongTHDate, getFormDataItem } from '../../utils'
import { getRefund } from '../../features/slices/loan-refund/loanRefundSlice';
import { useGetInitialFormDataQuery } from '../../features/services/loan/loanApi'
import ExpenseList from './Form/ExpenseList'
import Loading from '../../components/Loading'

const LoanRefundDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { refund, isLoading } = useSelector(state => state.loanRefund);
    const { data: formData } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (id) dispatch(getRefund(id));
    }, [id]);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item href="/loan-refund">รายการหักล้างเงินยืม</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดหักล้างเงินยืม</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-xl font-bold mb-1">รายละเอียดหักล้างเงินยืม (ID: {id})</h1>

                {isLoading && <div className="text-center"><Loading /></div>}
                {!isLoading && (
                    <>
                        <Row className="mb-2">
                            <Col md={8}>
                                <div className="border rounded-md py-2 px-4 bg-[#EAD9D5] text-sm min-h-[260px]">
                                    <h1 className="font-bold text-lg mb-2">สัญญายืมเงิน</h1>
                                    <Row className="mb-3">
                                        <Col md={8} className="flex flex-row items-start justify-center">
                                            <label htmlFor="" className="w-[20%] mt-[8px]">สัญญายืมเงิน :</label>
                                            <div className="w-[80%]">
                                                <div className="form-control text-sm h-[34px] bg-gray-100">
                                                    <b>เลขที่</b> {refund?.contract && <span>{refund?.contract?.contract_no} <b>ลงวันที่</b> {toLongTHDate(moment(refund?.contract?.contract_date).toDate())}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label>ประเภทการยืม :</label>
                                            <div className="font-thin ml-1">
                                                {getFormDataItem(formData, 'loanTypes', refund?.contract?.loan?.loan_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={5} className="flex flex-row items-center">
                                            <label htmlFor="">ประเภทเงินยืม :</label>
                                            <div className="font-thin ml-1">
                                                {getFormDataItem(formData, 'moneyTypes', refund?.contract?.loan?.money_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={3} className="flex flex-row items-center">
                                            <label htmlFor="">ปีงบประมาณ :</label>
                                            <div className="font-thin ml-1">{refund?.contract?.loan?.year}</div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label htmlFor="">หน่วยงาน :</label>
                                            <div className="font-thin ml-1">{refund?.contract?.loan?.department?.name}</div>
                                        </Col>
                                        <Col md={8} className="flex flex-row items-center">
                                            <label htmlFor="">ผู้ขอ/เจ้าของโครงการ :</label>
                                            <div className="font-thin ml-1">
                                                {refund?.contract?.loan?.employee?.prefix?.name}{refund?.contract?.loan?.employee?.firstname} {refund?.contract?.loan?.employee?.lastname}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[12%]">โครงการ :</label>
                                            <div className="font-thin ml-1 w-[88%]">
                                                {refund?.contract?.loan?.project_name}
                                                <span className="ml-1"><b>ระหว่างวันที่</b> {toShortTHDate(refund?.contract?.loan?.project_sdate)} - {toShortTHDate(refund?.contract?.loan?.project_edate)}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={12} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[12%]">งบประมาณ :</label>
                                            <div className="font-thin ml-1 w-[88%]">
                                                {refund?.contract?.loan?.budgets && refund?.contract?.loan?.budgets.map((item, index) => (
                                                    <ul key={item.id}>
                                                        <li>
                                                            <span className="mr-1">{index+1}.</span>
                                                            {item.budget?.name}
                                                            {/* <span className="ml-1">
                                                                {item.budget?.project?.plan?.name} / {item.budget?.project?.name}
                                                            </span> */}
                                                            {refund?.contract?.loan?.budgets.length > 1 && (
                                                                <span className="ml-1">
                                                                    <b>งบประมาณ</b> {currency.format(item?.total)} บาท
                                                                </span>
                                                            )}
                                                        </li>
                                                    </ul>
                                                ))}
                                                <p><b>รวมงบประมาณทั้งสิ้น</b> {currency.format(refund?.contract?.loan?.budget_total)} บาท</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col>
                                <div className="border rounded-md pt-2 pb-3 px-4 bg-[#ADD8E6] text-sm">
                                    <h1 className="font-bold text-lg mb-2">เอกสารคืน/เบิกเพิ่ม</h1>
                                    <Row className="mb-2">
                                        <Col md={10} className="mt-2">
                                            <label htmlFor="">เลขที่เอกสาร</label>
                                            <div className="form-control text-sm">
                                                {refund?.doc_no}
                                            </div>
                                        </Col>
                                        <Col md={10} className="mt-2">
                                            <div className="flex flex-col">
                                                <label htmlFor="">วันที่เอกสาร</label>
                                                <div className="form-control">
                                                    {toLongTHDate(moment(refund?.contract?.doc_date).toDate())}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={10} className="mt-2">
                                            <label htmlFor="">ประเภท</label>
                                            <div className="form-control text-sm">
                                                {refund?.refund_type_id === 1 ? 'คืนเงิน' : 'เบิกเพิ่ม'}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่ายที่{refund?.refund_type_id === 1 ? 'คืน' : 'เบิกเพิ่ม'}</h1>

                                    <ExpenseList
                                        items={refund?.details}
                                        showButtons={false}
                                    />

                                    <div className="flex flex-row justify-end items-center gap-2">
                                        ยอด{refund?.refund_type_id === 1 ? 'คืน' : 'เบิกเพิ่ม'}ทั้งสิ้น
                                        <div className="w-[15%]">
                                            <div className="form-control font-bold text-lg text-right text-red-600 float-right min-h-[34px]">
                                                {currency.format(refund?.net_total)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2 mt-4">
                            <Col className="flex justify-center">
                                <a href="#" className="btn btn-success mr-2">พิมพ์บันทึกหักล้างเงินยืม</a>
                                <a href="#" className="btn btn-primary">เคลียร์เงินยืม</a>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoanRefundDetail;