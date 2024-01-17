import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { currency, toShortTHDate } from '../../utils'
import { getRequisition, updateApprovals } from '../../features/slices/requisition/requisitionSlice'
import { resetSuccess } from '../../features/slices/approval/approvalSlice'
import ItemList from './Form/ItemList'
import ModalApprovalForm from './Approval/Form'

const RequisitionDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { requisition } = useSelector(state => state.requisition);
    const { isSuccess } = useSelector(state => state.approval);
    const [showApprovalForm, setShowApprovalForm] = useState(false);

    useEffect(() => {
        if (id) dispatch(getRequisition({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกข้อมูลคำขอเรียบร้อยแล้ว!!');

            dispatch(updateApprovals({ id: 'test' }));
            dispatch(resetSuccess());
        }
    }, [isSuccess]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item href="/requisition">รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">รายละเอียดคำขอ</h2>

                <div className="my-2 border p-4 rounded-md">
                    <ModalApprovalForm
                        isShow={showApprovalForm}
                        onHide={() => setShowApprovalForm(false)}
                        requisitionId={id}
                    />

                    {requisition && (
                        <>
                            <Row className="mb-2">
                                <Col md={4}>
                                    <label htmlFor="">เลขที่เอกสาร</label>
                                    <div className="form-control text-sm font-thin">{requisition.pr_no}</div>
                                </Col>
                                <Col md={2}>
                                    <div className="flex flex-col">
                                        <label htmlFor="">วันที่เอกสาร</label>
                                        <div className="form-control text-sm font-thin">
                                            {toShortTHDate(requisition.pr_date)}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <label>ประเภท (ซื้อ/จ้าง)</label>
                                    <div className="form-control text-sm font-thin">
                                        {requisition.order_type_id === 1 ? 'ซื้อ' : 'จ้าง'}
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <label htmlFor="">ประเภทสินค้า</label>
                                    <div className="form-control min-h-[34px] text-sm font-thin">
                                        {requisition.category?.name}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <label htmlFor="">เรื่อง</label>
                                    <div className="form-control min-h-[34px] text-sm font-thin">
                                        {requisition.topic}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={6}>
                                    <label htmlFor="">งบประมาณ</label>
                                    <div className="input-group">
                                        <div className="form-control min-h-[34px] text-sm font-thin">
                                            {requisition.budget?.name}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="">โครงการ</label>
                                    <div className="form-control min-h-[34px] text-sm font-thin">
                                        {requisition.project?.name}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={2}>
                                    <label htmlFor="">ปีงบ</label>
                                    <div className="form-control min-h-[34px] text-sm font-thin">
                                        {requisition.year}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                    <div className="input-group">
                                        <div className="form-control min-h-[34px] text-sm font-thin">
                                            {requisition.requester?.prefix?.name}{requisition.requester?.firstname} {requisition.requester?.lastname}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <label htmlFor="">หน่วยงาน</label>
                                    <div className="form-control min-h-[34px] text-sm font-thin">
                                        {requisition.division?.name}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <label htmlFor="">เหตุผลที่ขอ</label>
                                    <div className="form-control min-h-[34px] text-sm font-thin">{requisition.reason}</div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <div className="flex flex-col border p-2 rounded-md">
                                        <h1 className="font-bold text-lg mb-1">รายการสินค้า</h1>
                                        <ItemList
                                            items={requisition.details}
                                            showButtons={false}
                                        />

                                        <div className="flex flex-row justify-end">
                                            <div className="w-[12%]">
                                                <div className="form-control text-sm float-right text-right">{currency.format(requisition.net_total)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <div className="border w-full pt-2 pb-4 px-2 rounded-md">
                                        <h3 className="font-bold text-lg mb-1">ผู้ตรวจรับ</h3>
                                        {requisition.committees.length > 0 && requisition.committees.map((committee, index) => (
                                            <div className="min-w-[50%] flex flex-row font-thin text-sm" key={committee.id}>
                                                <span className="min-w-[45%]">
                                                    {index+1}. {committee.employee?.prefix.name}{committee.employee?.firstname} {committee.employee?.lastname}
                                                </span>
                                                <span>
                                                    <b>ตำแหน่ง</b> {committee.employee?.position?.name}{committee.employee?.level && committee.employee?.level?.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Col className="text-center">
                                    <Link to={`/preview/${id}/requisition`} target="_blank" className="btn btn-success">
                                        <i className="fas fa-print mr-1"></i>
                                        พิมพ์ใบขอซื้อ
                                    </Link>
                                    {(requisition.approvals && requisition.approvals.length > 0) ? (
                                        <>
                                            <Link to={`/preview/${id}/requisition/report`} target="_blank" className="btn btn-success mx-2">
                                                <i className="fas fa-print mr-1"></i>
                                                พิมพ์รายงานขอซื้อ/จ้าง
                                            </Link>
                                            <Link to={`/preview/${id}/requisition/committee`} target="_blank" className="btn btn-success">
                                                <i className="fas fa-print mr-1"></i>
                                                พิมพ์คำสั่งแต่งตั้ง
                                            </Link>
                                        </>
                                    ) : (
                                        <button type="button" className="btn btn-outline-primary ml-2" onClick={() => setShowApprovalForm(true)}>
                                            <i className="fas fa-save mr-1"></i>
                                            บันทึกรายงานขอซื้อ/จ้าง
                                        </button>
                                    )}
                                </Col>
                            </Row>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RequisitionDetail
