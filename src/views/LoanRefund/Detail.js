import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'
import moment from 'moment';
import { currency, toShortTHDate, toLongTHDate, getFormDataItem } from '../../utils'
import { getRefund, resetSuccess } from '../../features/slices/loan-refund/loanRefundSlice';
import { useGetInitialFormDataQuery } from '../../features/services/loan/loanApi'
import ExpenseList from './Form/ExpenseList'
import Loading from '../../components/Loading'
import ModalApprovalForm from '../../components/Modals/LoanRefund/Approval/Form'
import { toast } from 'react-toastify';

const LoanRefundDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { refund, isLoading, isSuccess } = useSelector(state => state.loanRefund);
    const { data: formData } = useGetInitialFormDataQuery();
    const [showApprovalForm, setShowApprovalForm] = useState(false);

    useEffect(() => {
        if (id) dispatch(getRefund(id));
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccess());

            toast.success("บันทึกเคลียร์เงินเรียบร้อยแล้ว!!");
        }
    }, [isSuccess]);

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
                        <ModalApprovalForm
                            isShow={showApprovalForm}
                            onHide={() => setShowApprovalForm(false)}
                            refund={refund}
                        />

                        <Row className="mb-2">
                            <Col md={8}>
                                <div className="border rounded-md py-2 px-4 bg-[#EAD9D5] text-sm min-h-[315px]">
                                    <h1 className="font-bold text-lg mb-2">สัญญายืมเงิน</h1>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label htmlFor="">สัญญายืมเงินเลขที่ :</label>
                                            <div className="ml-1 text-blue-600 font-bold">
                                                    {refund?.contract && <span>{refund?.contract?.contract_no}</span>}
                                            </div>
                                        </Col>
                                        <Col md={4} className="flex flex-row items-center">
                                            <label htmlFor="">ส่งวันที่ :</label>
                                            <div className="ml-1 font-thin">
                                                {toLongTHDate(moment(refund?.contract?.sent_date).toDate())}
                                            </div>
                                        </Col>
                                        <Col className="flex flex-row items-center">
                                            <label>เงินเข้าวันที่ :</label>
                                            <div className="ml-1 text-green-600 font-bold">
                                                {toLongTHDate(moment(refund?.contract?.deposited_date).toDate())}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label>กำหนดคืนเงินภายใน :</label>
                                            <div className="ml-1 font-thin">
                                                {refund?.contract ? currency.format(refund?.contract?.refund_days) : '-'} วัน
                                            </div>
                                        </Col>
                                        <Col className="flex flex-row items-center">
                                            <label>วันที่กำหนดคืนเงิน :</label>
                                            <div className="ml-1 text-red-500 font-bold">
                                                {toLongTHDate(moment(refund?.contract?.refund_date).toDate())}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label>ประเภทการยืม :</label>
                                            <div className="ml-1 font-thin">
                                                {getFormDataItem(formData, 'loanTypes', refund?.contract?.loan?.loan_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={5} className="flex flex-row items-center">
                                            <label htmlFor="">ประเภทเงินยืม :</label>
                                            <div className="ml-1 font-thin">
                                                {getFormDataItem(formData, 'moneyTypes', refund?.contract?.loan?.money_type_id)?.name}
                                            </div>
                                        </Col>
                                        <Col md={3} className="flex flex-row items-center">
                                            <label htmlFor="">ปีงบประมาณ :</label>
                                            <div className="ml-1 font-thin">
                                                {refund?.contract && refund?.contract?.loan?.year+543}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={4} className="flex flex-row items-center">
                                            <label htmlFor="">หน่วยงาน :</label>
                                            <div className="ml-1 font-thin">{refund?.contract?.loan?.department?.name}</div>
                                        </Col>
                                        <Col md={8} className="flex flex-row items-center">
                                            <label htmlFor="">ผู้ขอ/เจ้าของโครงการ :</label>
                                            <div className="ml-1 font-thin">
                                                {refund?.contract?.loan?.employee?.prefix?.name}{refund?.contract?.loan?.employee?.firstname} {refund?.contract?.loan?.employee?.lastname}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={12} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[12%]">โครงการ :</label>
                                            <div className="ml-1 font-thin w-[88%]">
                                                {refund?.contract?.loan?.project_name}
                                                <span className="ml-1"><b>ระหว่างวันที่</b> {toShortTHDate(refund?.contract?.loan?.project_sdate)} - {toShortTHDate(refund?.contract?.loan?.project_edate)}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={12} className="flex flex-row items-start">
                                            <label htmlFor="" className="w-[12%]">งบประมาณ :</label>
                                            <div className="ml-1 font-thin w-[88%]">
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
                                <div className="border rounded-md pt-2 pb-2 px-4 bg-[#ADD8E6] text-sm">
                                    <div className="flex flex-row items-center gap-2">
                                        <h1 className="font-bold text-lg">เอกสารหักล้างเงินยืม</h1>
                                        <div>
                                            {refund?.status === 'N' && <span className="badge rounded-pill bg-danger">ยังไม่เคลียร์</span>}
                                            {refund?.status === 'Y' && <span className="badge rounded-pill bg-success">เคลียร์แล้ว</span>}
                                        </div>
                                    </div>
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
                                                <div className="form-control text-sm">
                                                    {toLongTHDate(moment(refund?.doc_date).toDate())}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6} className="mt-2">
                                            <label htmlFor="">ประเภท</label>
                                            <div className="form-control text-sm">
                                                {refund?.refund_type_id === 1 ? 'คืนเงิน' : 'เบิกเพิ่ม'}
                                            </div>
                                        </Col>                                        
                                        <Col md={6} className="mt-2">
                                            <label htmlFor="">&nbsp;</label>
                                            <div className="flex flex-row items-center gap-1 mt-1">
                                                {refund?.is_over20 === 1 ? <FaCheckSquare /> : <FaRegSquare />} เกิน 20%
                                            </div>
                                        </Col>
                                        <Col md={10} className="mt-2">
                                            <label htmlFor="">ยอดเงิน{refund?.balance >= 0 ? 'คืน' : 'เบิกเพิ่ม'}</label>
                                            <div className="form-control">
                                                {refund?.balance < 0 && (
                                                    <span className="text-red-600 font-bold">
                                                        {currency.format(refund?.balance)}
                                                    </span>
                                                )}
                                                {refund?.balance >= 0 && (
                                                    <span className="text-green-600 font-bold">
                                                        {currency.format(refund?.balance)}
                                                    </span>
                                                )} บาท
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายการค่าใช้จ่ายจริง</h1>

                                    <ExpenseList
                                        items={refund?.details}
                                        courses={refund?.contract?.loan?.courses}
                                        showButtons={false}
                                    />

                                    <div className="flex flex-row justify-end items-center gap-2">
                                        ยอดใช้จริงทั้งสิ้น
                                        <div className="w-[10%]">
                                            <div className="form-control font-bold text-lg text-right float-right min-h-[34px]">
                                                {refund?.net_total >= refund?.contract?.net_total && (
                                                    <span className="text-red-600 font-bold">
                                                        {currency.format(refund?.net_total)}
                                                    </span>
                                                )}
                                                {refund?.net_total < refund?.contract?.net_total && (
                                                    <span className="text-green-600 font-bold">
                                                        {currency.format(refund?.net_total)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-[10%]">
                                            <div className="form-control font-bold text-lg text-right float-right min-h-[34px]">
                                                {refund?.balance < 0 && (
                                                    <span className="text-red-600 font-bold">
                                                        {currency.format(refund?.balance)}
                                                    </span>
                                                )}
                                                {refund?.balance >= 0 && (
                                                    <span className="text-green-600 font-bold">
                                                        {currency.format(refund?.balance)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2 mt-4">
                            <Col className="flex justify-center">
                                <Link to={`/preview/${id}/loan-refund/form`} className="btn btn-success mr-1">
                                    พิมพ์บันทึกหักล้างเงินยืม
                                </Link>

                                {refund?.is_over20 === 1 && (
                                    <Link to={`/preview/${id}/loan-refund/over20-form`} className="btn btn-danger mr-1">
                                        พิมพ์บันทึกขอคืนเงินยืมเกิน 20%
                                    </Link>
                                )}

                                {refund?.status === 'N' && (
                                    <a href="#" className="btn btn-primary" onClick={() => setShowApprovalForm(true)}>
                                        เคลียร์เงินยืม
                                    </a>
                                )}
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoanRefundDetail;