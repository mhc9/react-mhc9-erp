import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import LoanContractForm from './Form'

const AddLoanContract = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item href="/loan-contract">รายการสัญญา</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มสัญญา</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-xl font-bold mb-1">เพิ่มสัญญา</h1>

                <LoanContractForm />

            </div>
        </div>
    )
}

export default AddLoanContract