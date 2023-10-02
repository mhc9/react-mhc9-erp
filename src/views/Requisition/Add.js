import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import RequisitionForm from './Form'

const AddRequisition = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item href="/requisition">รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มรายการคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">เพิ่มรายการคำขอ</h2>

                <div className="my-2 border p-4 rounded-md">
                    <RequisitionForm />
                </div>
            </div>
        </div>
    )
}

export default AddRequisition
