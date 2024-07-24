import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FaEdit } from "react-icons/fa";
import { currency, toShortTHDate } from '../../../utils'
import { getRequisition, updateApprovals } from '../../../features/slices/requisition/requisitionSlice'
import { resetSuccess } from '../../../features/slices/approval/approvalSlice'
import ItemList from '../Form/ItemList'
import ModalApprovalForm from '../Approval/Form'
import Loading from '../../../components/Loading'
import DropdownButton from '../../../components/FormControls/DropdownButton'
import DropdownItem from '../../../components/FormControls/DropdownButton/DropdownItem'
import ConsiderationForm from './Consideration/Form'
import ConsiderationDetail from './Consideration/Detail'

const RequisitionDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { requisition, isLoading } = useSelector(state => state.requisition);
    const { approval, isSuccess } = useSelector(state => state.approval);
    const [showApprovalForm, setShowApprovalForm] = useState(false);
    const [showConsiderForm, setShowConsiderForm] = useState(false);

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

    
    /** เซตโชว์ฟอร์มบันทึกรายงานผลการพิจารณา ถ้ายังไม่ได้บันทึกข้อมูลรายงานผลการพิจารณา */
    useEffect(() => {
        if (requisition) {
            setShowConsiderForm(requisition.approvals.length > 0 && requisition.approvals[0].consider_no === '');
        }
    }, [requisition]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/requisition' }}>รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">รายละเอียดคำขอ (ID #{id})</h2>

                <div className="my-2 border p-3 rounded-md">
                    {isLoading && <div className="text-center"><Loading /></div>}

                    {(!isLoading && requisition) && (
                        <>
                            <ModalApprovalForm
                                isShow={showApprovalForm}
                                onHide={() => setShowApprovalForm(false)}
                                requisitionId={id}
                            />

                            <Row className="mb-2">
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
                                        <Col className="pb-1">
                                            <label htmlFor="">เหตุผลที่ขอ</label>
                                            <div className="text-sm font-thin">{requisition.reason}</div>
                                        </Col>
                                        <Col md={6} className="pb-1">
                                            <label htmlFor="">โครงการ</label>
                                            <div className="text-sm font-thin">
                                                {requisition.project ? requisition.project?.name : '-'}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Report and directive */}
                                    {(requisition.approvals && requisition.approvals.length > 0) && (
                                        <>
                                            <Row className="mb-2">
                                                <Col md={4}>
                                                    <label htmlFor="">เลขที่รายงานขอซื้อ/จ้าง</label>
                                                    <div className="text-sm font-thin">{requisition.approvals[0].report_no}</div>
                                                </Col>
                                                <Col md={4}>
                                                    <label htmlFor="">วันที่รายงานขอซื้อ/จ้าง</label>
                                                    <div className="text-sm font-thin">{toShortTHDate(requisition.approvals[0].report_date)}</div>
                                                </Col>
                                                <Col md={4}>
                                                    <label htmlFor="">วิธีการจัดหา</label>
                                                    <div className="text-sm font-thin">{requisition.approvals[0].procuring?.name}</div>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col md={4}>
                                                    <label htmlFor="">วันที่กำหนดส่งมอบ</label>
                                                    <div className="text-sm font-thin">{toShortTHDate(requisition.approvals[0].deliver_date)}</div>
                                                </Col>
                                                <Col md={4}>
                                                    <label htmlFor="">เลขที่คำสั่งแต่งตั้งผู้ตรวจรับ</label>
                                                    <div className="text-sm font-thin">{requisition.approvals[0].directive_no}</div>
                                                </Col>
                                                <Col md={4}>
                                                    <label htmlFor="">เลขที่คำสั่งแต่งตั้งผู้ตรวจรับ</label>
                                                    <div className="text-sm font-thin">{toShortTHDate(requisition.approvals[0].directive_date)}</div>
                                                </Col>
                                            </Row>
                                        </>
                                    )}
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

                                        <div className="flex flex-row justify-end items-center gap-1">
                                            <div>รวมเป็นเงินทั้งสิ้น :</div>
                                            <div className="w-[15%]">
                                                <div className="text-right form-control font-bold">
                                                    {currency.format(requisition.net_total)}
                                                </div>
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
                            {(requisition.approvals && requisition.approvals.length > 0) && (
                                <Row>
                                    <Col>
                                        <div className="border w-full py-2 px-3 rounded-md">
                                            <div className="flex flex-row justify-between items-center">
                                                <h3 className="font-bold text-lg mb-1">รายงานผลการพิจารณา</h3>
                                                {!showConsiderForm && (
                                                    <button type="button" className="btn btn-light">
                                                        <FaEdit className="text-warning" onClick={() => setShowConsiderForm(true)} />
                                                    </button>
                                                )}
                                                
                                                {(showConsiderForm && requisition.approvals[0].consider_no !== '') &&<span class="badge rounded-pill bg-warning text-dark">แก้ไขรายงาน</span>}
                                            </div>

                                            {!showConsiderForm
                                                ? (
                                                    <ConsiderationDetail approval={requisition.approvals[0]} />
                                                ) : (
                                                    <ConsiderationForm
                                                        approval={requisition.approvals[0].consider_no !== '' ? null : requisition.approvals[0]}
                                                        requisition={requisition}
                                                        onSubmitted={() => setShowConsiderForm(false)}
                                                    />
                                                )}
                                        </div>
                                    </Col>
                                </Row>
                            )}
                            <Row className="mt-3">
                                <Col>
                                    <div className="flex flex-row justify-center">
                                        <DropdownButton title="ใบขอซื้อ" btnColor="primary" cssClass="mr-1">
                                            <DropdownItem>
                                                <Link to={`/preview/${id}/requisition`} target="_blank" className="text-success">
                                                    <i className="fas fa-print mr-1"></i>
                                                    พิมพ์ใบขอซื้อ
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <a href={`${process.env.REACT_APP_API_URL}/requisitions/${id}/document`} target="_blank" className="text-primary">
                                                    <i className="far fa-file-word mr-1"></i>
                                                    ดาวน์โหลดใบขอซื้อ
                                                </a>
                                            </DropdownItem>
                                        </DropdownButton>

                                        {(requisition.approvals && requisition.approvals.length > 0) ? (
                                            <>
                                                <DropdownButton title="รายงานขอซื้อ/จ้าง" btnColor="primary" cssClass="mr-1">
                                                    <DropdownItem>
                                                        <Link to={`/preview/${id}/requisition/report`} target="_blank" className="text-success">
                                                            <i className="fas fa-print mr-1"></i>
                                                            พิมพ์รายงานขอซื้อ/จ้าง
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <a href={`${process.env.REACT_APP_API_URL}/requisitions/${id}/report`} target="_blank" className="text-primary">
                                                            <i className="far fa-file-word mr-1"></i>
                                                            ดาวน์โหลดรายงานขอซื้อ/จ้าง
                                                        </a>
                                                    </DropdownItem>
                                                </DropdownButton>

                                                <DropdownButton title="คำสั่งแต่งตั้ง" btnColor="primary" cssClass="mr-1">
                                                    <DropdownItem>
                                                        <Link to={`/preview/${id}/requisition/committee`} target="_blank" className="text-success">
                                                            <i className="fas fa-print mr-1"></i>
                                                            พิมพ์คำสั่งแต่งตั้ง
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <a href={`${process.env.REACT_APP_API_URL}/requisitions/${id}/document`} target="_blank" className="text-primary">
                                                            <i className="far fa-file-word mr-1"></i>
                                                            ดาวน์โหลดคำสั่งแต่งตั้ง
                                                        </a>
                                                    </DropdownItem>
                                                </DropdownButton>
                                                {requisition.approvals[0].consider_no !== '' && (
                                                    <>
                                                        <DropdownButton title="รายงานผลการพิจารณา" btnColor="primary" cssClass="mr-1">
                                                            <DropdownItem>
                                                                <Link to={`/preview/${id}/requisition/report`} target="_blank" className="text-success">
                                                                    <i className="fas fa-print mr-1"></i>
                                                                    พิมพ์รายงานผลการพิจารณา
                                                                </Link>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <a href={`${process.env.REACT_APP_API_URL}/requisitions/${id}/document`} target="_blank" className="text-primary">
                                                                    <i className="far fa-file-word mr-1"></i>
                                                                    ดาวน์โหลดรายงานผลการพิจารณา
                                                                </a>
                                                            </DropdownItem>
                                                        </DropdownButton>
                                                        <DropdownButton title="ประกาศผลผู้ชนะ" btnColor="primary" cssClass="mr-1">
                                                            <DropdownItem>
                                                                <Link to={`/preview/${id}/requisition/committee`} target="_blank" className="text-success">
                                                                    <i className="fas fa-print mr-1"></i>
                                                                    พิมพ์ประกาศผลผู้ชนะ
                                                                </Link>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <a href={`${process.env.REACT_APP_API_URL}/requisitions/${id}/document`} target="_blank" className="text-primary">
                                                                    <i className="far fa-file-word mr-1"></i>
                                                                    ดาวน์โหลดประกาศผลผู้ชนะ
                                                                </a>
                                                            </DropdownItem>
                                                        </DropdownButton>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <button type="button" className="btn btn-outline-primary btn-sm mr-1" onClick={() => setShowApprovalForm(true)}>
                                                <i className="fas fa-save mr-1"></i>
                                                บันทึกรายงานขอซื้อ/จ้าง
                                            </button>
                                        )}
                                    </div>
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
