import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { toShortTHDate } from '../../../../utils'

const ConsiderationDetail = ({ approval }) => {
    return (
        <Row>
            <Col md={5}>
                <label htmlFor="">เลขที่รายงาน</label>
                <div className="text-sm font-thin">
                    {approval.consider_no}
                </div>
            </Col>
            <Col md={3}>
                <label htmlFor="">วันที่รายงาน</label>
                <div className="text-sm font-thin">
                    {toShortTHDate(approval.consider_date)}
                </div>
            </Col>
            <Col md={3}>
                <label htmlFor="">วันที่ประกาศผู้ชนะ</label>
                <div className="text-sm font-thin">
                    {toShortTHDate(approval.notice_date)}
                </div>
            </Col>
            <Col md={12} className="mt-2">
                <label htmlFor="">ผู้ขาย/ผู้จัดจำหน่าย</label>
                <div className="text-sm font-thin">
                    <span>{approval.supplier?.name}</span>
                    <span className="ml-2"><b>เลขประจำตัวผู้เสียภาษี</b> <span className=" text-blue-600">{approval.supplier?.tax_no}</span></span>
                </div>
            </Col>
            {/* <Col md={3} className="mt-2">
                <label htmlFor="">วันที่ส่งมอบ</label>
                <div className="text-sm font-thin">
                    {toShortTHDate(approval.deliver_date)}
                </div>
            </Col>
            <Col md={3} className="mt-2">
                <label htmlFor="">ส่งมอบภายใน</label>
                <div className="text-sm font-thin">
                    {approval.deliver_days} วัน
                </div>
            </Col> */}
        </Row>
    )
}

export default ConsiderationDetail