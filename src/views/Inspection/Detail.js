import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { getInspection } from '../../features/inspection/inspectionSlice'
import { currency, toShortTHDate } from '../../utils'
import ItemList from './ItemList'
import Loading from '../../components/Loading'

const InspectionDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { inspection, isLoading } = useSelector(state => state.inspection);

    useEffect(() => {
        if (id) dispatch(getInspection(id));
    }, [dispatch, id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item href="/order">รายการตรวจรับพัสดุ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดการตรวจรับพัสดุ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">รายละเอียดการตรวจรับพัสดุ</h2>

                <div className="my-2 border p-4 rounded-md">
                    {isLoading && (
                        <div className="text-center"><Loading /></div>
                    )}

                    {!isLoading && inspection && (
                        <>
                            <Row className="mb-2">
                                <Col md={8}>
                                    <Row className="mb-2">
                                        <Col md={5}>
                                            <label htmlFor="">เลขที่ใบส่งของ</label>
                                            <div className="form-control text-sm font-thin">{inspection.deliver_no}</div>
                                        </Col>
                                        <Col md={5}>
                                            <label htmlFor="">วันที่ใบส่งของ</label>
                                            <div className="form-control text-sm font-thin">
                                                {toShortTHDate(inspection.deliver_date)}
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <span className="mr-2">ปีงบ</span>
                                            <div className="form-control text-sm float-right text-center">
                                                {inspection.year}
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* รายละเอียดคำขอซื้อ */}
                                    <Row>
                                        <Col>
                                            <div className="form-control min-h-[125px] text-sm font-thin bg-green-300">
                                                <p>
                                                    <label className="font-bold mr-1">เลขที่ใบสั่งซื้อ/จ้าง</label>
                                                    <span className="mr-2">{inspection.order?.po_no}</span>
                                                    <label className="font-bold mr-1">วันที่</label>
                                                    <span>{toShortTHDate(inspection.order?.po_date)}</span>
                                                </p>
                                                <p>
                                                    <label className="font-bold mr-1">เรื่อง</label>
                                                    <span className="mr-2">{inspection.order?.requisition?.topic}</span>
                                                    <label className="font-bold mr-1">จำนวน</label>
                                                    <span className="mr-2">{currency.format(inspection.order?.item_count)} รายการ</span>
                                                    <label className="font-bold mr-1">เป็นเงินทั้งสิ้น</label>
                                                    <span className="mr-2">{currency.format(inspection.order?.net_total)} บาท</span>
                                                </p>
                                                {/* <p>
                                                    <label className="font-bold mr-1">งบประมาณ</label>
                                                    <span>{order.requisition?.budget?.name}</span>
                                                </p>
                                                <p>
                                                    <label className="font-bold mr-1">โครงการ</label>
                                                    <span className="mr-2">
                                                        {order.requisition?.project ? order.requisition?.project?.name : '-'}
                                                    </span>
                                                </p>
                                                <p>
                                                    <label className="font-bold mr-1">ผู้ขอ/เจ้าของโครงการ</label>
                                                    <span className="mr-2">
                                                        {order.requisition?.requester?.firstname} {order.requisition?.requester?.lastname}
                                                    </span>
                                                    <label className="font-bold mr-1">หน่วยงาน</label>
                                                    <span>{order.requisition?.division?.name}</span>
                                                </p>
                                                <p>
                                                    <label className="font-bold mr-1">เหตุผลที่ขอ</label>
                                                    <span>{order.requisition?.reason}</span>
                                                </p> */}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row className="mb-2">
                                        <Col>
                                            <label htmlFor="">ประเภทสินค้า</label>
                                            <div className="form-control min-h-[34px] text-sm font-thin">
                                                {inspection.order.requisition?.category?.name}
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* รายละเอียดผู้จัดจำหน่าย */}
                                    <Row>
                                        <Col>
                                            <div className="form-control min-h-[125px] text-sm font-thin bg-gray-200">
                                                <p className="font-bold text-lg mr-1">{inspection.supplier?.name}</p>
                                                <p><b className="mr-1">เลขประจำตัวผู้เสียภาษี</b>{inspection.supplier?.tax_no}</p>
                                                <p>
                                                    <b className="mr-1">ที่อยู่</b>
                                                    {inspection.supplier?.address} {inspection.supplier?.moo ? ' หมู่' + inspection.supplier?.moo : ' หมู่ -'}
                                                    {inspection.supplier?.road ? ' ถนน' + inspection.supplier?.road : ' ถนน -'}
                                                </p>
                                                <p>
                                                    ต.{inspection.supplier?.tambon?.name} อ.{inspection.supplier?.amphur?.name}{' '}
                                                    จ.{inspection.supplier?.changwat?.name} {inspection.supplier?.zipcode}
                                                </p>
                                                <p>
                                                    <b className="mr-1">โทร.</b>{inspection.supplier?.tel} <b className="mx-1">Fax.</b>{inspection.supplier?.fax}
                                                </p>
                                                {/* <p><b className="mr-1">เลขที่บัญชีธนาคาร</b>{inspection.supplier?.bank_acc_no ? inspection.supplier?.bank_acc_no : '-'}</p>
                                                <p>
                                                    <b className="mr-1">ธนาคาร</b>{inspection.supplier?.bank ? inspection.supplier?.bank?.name : '-'}
                                                    <b className="mx-1">สาขา</b>{inspection.supplier?.bank_acc_branch ? inspection.supplier?.bank_acc_branch : '-'}
                                                </p> */}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-2">
                                <Col>
                                    <div className="flex flex-col border p-2 rounded-md">
                                        <h1 className="font-bold text-lg mb-1">รายการสินค้า</h1>
                                        <ItemList
                                            items={inspection.details}
                                            showButtons={false}
                                        />

                                        <div className="flex flex-row justify-end items-center mb-2">
                                            <span className="mr-2">รวมเป็นเงิน</span>
                                            <div className="w-[12%]">
                                                <div className="form-control text-sm float-right text-right">
                                                    {currency.format(inspection.total)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-end items-center mb-2">
                                            <span className="mr-2">ภาษีมูลค่าเพิ่ม</span>
                                            <div className="form-control text-sm float-right text-right w-10 mr-1">
                                                {currency.format(inspection.vat_rate)}%
                                            </div>
                                            <div className="w-[12%]">
                                                <div className="form-control text-sm float-right text-right">
                                                    {currency.format(inspection.vat)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-end items-center">
                                            <span className="mr-2">ยอดสุทธิ</span>
                                            <div className="w-[12%]">
                                                <div className="form-control text-sm text-right float-right">
                                                    {currency.format(inspection.net_total)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    {/* <div className="border w-full pt-2 pb-4 px-2 rounded-md">
                                        <h3 className="font-bold text-lg mb-1">ผู้ตรวจรับ</h3>
                                        {order.requisition?.committees.length > 0 && order.requisition?.committees.map((committee, index) => (
                                            <div className="min-w-[50%] flex flex-row font-thin text-sm" key={committee.id}>
                                                <span className="min-w-[45%]">
                                                    {index+1}. {committee.employee?.prefix.name}{committee.employee?.firstname} {committee.employee?.lastname}
                                                </span>
                                                <span>
                                                    <b>ตำแหน่ง</b> {committee.employee?.position?.name}{committee.employee?.level && committee.employee?.level?.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div> */}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col style={{ textAlign: 'center' }}>
                                    <Link to={`/preview/${id}`} className="btn btn-success">
                                        พิมพ์รายงานผลการตรวจรับ
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

export default InspectionDetail
