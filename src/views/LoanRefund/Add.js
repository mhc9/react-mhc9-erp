import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import LoanRefundForm from './Form'

const AddLoanRefund = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item href="/loan-refund">รายการหักล้างเงินยืม</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มรายการหักล้างเงินยืม</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-xl font-bold mb-1">เพิ่มรายการหักล้างเงินยืม</h1>

                <LoanRefundForm />

            </div>
        </div>
    )
}

export default AddLoanRefund