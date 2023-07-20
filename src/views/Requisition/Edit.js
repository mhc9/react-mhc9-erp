import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import RequisitionForm from './Form'

const EditRequisition = () => {

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/requisition">รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขรายการคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แก้ไขรายการคำขอ</h2>

                <div className="my-2 border p-4 rounded-md">
                    <RequisitionForm />
                </div>
            </div>
        </div>
    )
}

export default EditRequisition
