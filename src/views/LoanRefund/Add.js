import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import LoanRefundForm from './Form'

const AddLoanRefund = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item href="/loan-contract">รายการคืนเงิน</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มคืนเงิน</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">

                <LoanRefundForm />

            </div>
        </div>
    )
}

export default AddLoanRefund