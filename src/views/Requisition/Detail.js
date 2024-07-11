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
import Loading from '../../components/Loading'

const RequisitionDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { requisition, isLoading } = useSelector(state => state.requisition);
    const { approval, isSuccess } = useSelector(state => state.approval);
    const [showApprovalForm, setShowApprovalForm] = useState(false);

    useEffect(() => {
        if (id) dispatch(getRequisition({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกข้อมูลคำขอเรียบร้อยแล้ว!!');

            dispatch(updateApprovals(approval));
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

                <div className="my-2 border p-3 rounded-md">
                    {isLoading && <div className="text-center"><Loading /></div>}

                    {(!isLoading && requisition) && (
                        <>
                            <ModalApprovalForm
                                isShow={showApprovalForm}
                                onHide={() => setShowApprovalForm(false)}
                                requisitionId={id}
                            />

                            <Row>
                                <Col md={9}>
                                    <Row className="text-sm">
                                        <Col md={3} className="pb-1">
                                            <label htmlFor="">เลขที่เอกสาร</label>
                                            <div className="text-sm font-thin">{requisition.pr_no}</div>
                                        </Col>
                                        <Col md={3} className="pb-1">
                                            <div className="flex flex-col">
                                                <label htmlFor="">วันที่เอกสาร</label>
                                                <div className="text-sm font-thin">
                                                    {toShortTHDate(requisition.pr_date)}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={3} className="pb-1">
                                            <label>ประเภท (ซื้อ/จ้าง)</label>
                                            <div className="text-sm font-thin">
                                                {requisition.order_type_id === 1 ? 'ซื้อ' : 'จ้าง'}
                                            </div>
                                        </Col>
                                        <Col md={3} className="pb-1">
                                            <label htmlFor="">ประเภทสินค้า</label>
                                            <div className="text-sm font-thin">
                                                {requisition.category?.name}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pb-1">
                                            <label htmlFor="">เรื่อง</label>
                                            <div className="text-sm font-thin">
                                                {requisition.topic} จำนวน {requisition.item_count} รายการ
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={9} className="pb-1">
                                            <label htmlFor="">งบประมาณ</label>
                                            <div className="input-group">
                                                <div className="text-sm font-thin">
                                                    {requisition.budget?.name}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className="pb-1">
                                            <label htmlFor="">ปีงบ</label>
                                            <div className="text-sm font-thin">
                                                {requisition.year}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md={6} className="pb-1">
                                            <label htmlFor="">โครงการ</label>
                                            <div className="text-sm font-thin">
                                                {requisition.project?.name}
                                            </div>
                                        </Col>
                                        <Col className="pb-1">
                                            <label htmlFor="">เหตุผลที่ขอ</label>
                                            <div className="text-sm font-thin">{requisition.reason}</div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <div className="flex flex-col items-center border rounded-md p-3 mb-2">
                                        <div className={`border-4 border-gray-200 rounded-full w-[60px] h-[60px] overflow-hidden object-cover object-center mb-2`}>
                                            {requisition.requester?.avatar_url
                                                ? <img src={`${process.env.REACT_APP_API_URL}/uploads/${requisition.requester?.avatar_url}`} alt="requester-pic" />
                                                : <img src="/img/avatar-heroes.png" alt="requester-pic" className="avatar-img" />}
                                        </div>
                                        <div className="flex flex-col items-start w-full text-sm">
                                            <div className="w-full mb-1">
                                                <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                                <div className="input-group">
                                                    <div className="text-xs font-thin">
                                                        {requisition.requester?.prefix?.name}{requisition.requester?.firstname} {requisition.requester?.lastname}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full mb-1">
                                                <label htmlFor="">ตำแหน่ง</label>
                                                <div className="input-group">
                                                    <div className="text-xs font-thin">
                                                        {requisition.requester?.position?.name}{requisition.requester?.level?.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full mb-1">
                                                <label htmlFor="">หน่วยงาน</label>
                                                <div className="text-xs font-thin">
                                                    {requisition.division?.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                                <div className="text-sm float-right text-right">{currency.format(requisition.net_total)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="border w-full pt-2 pb-4 px-2 rounded-md">
                                        <h3 className="font-bold text-lg mb-1">ผู้ตรวจรับ</h3>
                                        {requisition.committees.length > 0 && requisition.committees.map((committee, index) => (
                                            <div className="min-w-[50%] flex flex-row font-thin text-sm ml-4" key={committee.id}>
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
                            <Row className="mt-3">
                                <Col className="text-center">
                                    <Link to={`/preview/${id}/requisition`} target="_blank" className="btn btn-success btn-sm">
                                        <i className="fas fa-print mr-1"></i>
                                        พิมพ์ใบขอซื้อ
                                    </Link>
                                    {(requisition.approvals && requisition.approvals.length > 0) ? (
                                        <>
                                            <Link to={`/preview/${id}/requisition/report`} target="_blank" className="btn btn-success btn-sm mx-2">
                                                <i className="fas fa-print mr-1"></i>
                                                พิมพ์รายงานขอซื้อ/จ้าง
                                            </Link>
                                            <Link to={`/preview/${id}/requisition/committee`} target="_blank" className="btn btn-success btn-sm">
                                                <i className="fas fa-print mr-1"></i>
                                                พิมพ์คำสั่งแต่งตั้ง
                                            </Link>
                                        </>
                                    ) : (
                                        <button type="button" className="btn btn-outline-primary btn-sm ml-2" onClick={() => setShowApprovalForm(true)}>
                                            <i className="fas fa-save mr-1"></i>
                                            บันทึกรายงานขอซื้อ/จ้าง
                                        </button>
                                    )}
                                </Col>
                            </Row>

                            {(requisition.approvals && requisition.approvals.length > 0) && (
                                <Row>
                                    <Col className="text-center">
                                        <Link to={`/preview/${id}/requisition/report`} target="_blank" className="btn btn-success mx-2">
                                            <i className="fas fa-print mr-1"></i>
                                            พิมพ์รายงานผลการพิจารณา
                                        </Link>
                                        <Link to={`/preview/${id}/requisition/committee`} target="_blank" className="btn btn-success">
                                            <i className="fas fa-print mr-1"></i>
                                            พิมพ์ประกาศผลผู้ชนะ
                                        </Link>
                                    </Col>
                                </Row>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RequisitionDetail
