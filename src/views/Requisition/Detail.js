import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { getRequisition } from '../../features/requisition/requisitionSlice'
import ItemList from './Form/ItemList'
import { currency } from '../../utils'

const RequisitionDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { requisition } = useSelector(state => state.requisition);

    useEffect(() => {
        if (id) dispatch(getRequisition({ id }));
    }, [dispatch, id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/requisition">รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">รายละเอียดคำขอ</h2>

                <div className="my-2 border p-4 rounded-md">
                    {requisition && (
                        <>
                            <Row className="mb-2">
                                <Col md={4}>
                                    <label htmlFor="">เลขที่เอกสาร</label>
                                    <div className="form-control text-sm">{requisition.pr_no}</div>
                                </Col>
                                <Col md={2}>
                                    <div className="flex flex-col">
                                        <label htmlFor="">วันที่เอกสาร</label>
                                        <div className="form-control text-sm">{requisition.pr_date}</div>

                                    </div>
                                </Col>
                                <Col md={2}>
                                    <label>ประเภทการจัดซื้อ</label>
                                    <div className="form-control text-sm">{requisition.order_type_id}</div>
                                </Col>
                                <Col md={4}>
                                    <label htmlFor="">ประเภทสินค้า</label>
                                    <div className="form-control text-sm">{requisition.category_id}</div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <label htmlFor="">เรื่อง</label>
                                    <div className="form-control text-sm">{requisition.topic}</div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={6}>
                                    <label htmlFor="">งบประมาณ</label>
                                    <div className="input-group">
                                        <div className="form-control h-[34px] text-sm">
                                            {requisition.budget?.name}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="">โครงการ</label>
                                    <div className="form-control text-sm">{requisition.project?.name}</div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col md={2}>
                                    <label htmlFor="">ปีงบ</label>
                                    <div className="form-control text-sm">
                                        {requisition.year}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                    <div className="input-group">
                                        <div className="form-control h-[34px] text-sm">
                                            {requisition.requester?.firstname} {requisition.requester?.lastname}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <label htmlFor="">หน่วยงาน</label>
                                    <div className="form-control text-sm">{requisition.division_id}</div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <label htmlFor="">เหตุผลที่ขอ</label>
                                    <div className="form-control text-sm">{requisition.reason}</div>
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
                                            <div className="w-[15%]">
                                                <div className="form-control text-sm float-right text-right">{currency.format(requisition.net_total)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <div className="border w-full p-2 rounded-md">
                                        <h3 className="font-bold text-lg mb-1">ผู้ตรวจรับ</h3>
                                        {requisition.committees.length > 0 && requisition.committees.map((committee, index) => (
                                            <div className="min-w-[50%] flex flex-row font-thin" key={committee.id}>
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
                            <Row className="mb-2">
                                <Col style={{ textAlign: 'center' }}>
                                    <Link to={`/preview/${id}`} className="btn btn-success">
                                        พิมพ์ใบขอซื้อ
                                    </Link>
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
