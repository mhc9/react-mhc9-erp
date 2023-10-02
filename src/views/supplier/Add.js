import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import SupplierForm from './Form'

const AddSupplier = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/supplier">ผู้จัดจำหน่าย</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มผู้จัดจำหน่าย</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">เพิ่มผู้จัดจำหน่าย</h2>

                <div className="my-2 border p-4 rounded-md">
                    <SupplierForm />
                </div>
            </div>
        </div>
    )
}

export default AddSupplier