import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import OrderForm from './Form'

const AddOrder = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/order">รายการสั่งซื้อ/จ้าง</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มรายการสั่งซื้อ/จ้าง</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">เพิ่มรายการสั่งซื้อ/จ้าง</h2>

                <div className="my-2 border p-4 rounded-md">
                    <OrderForm />
                </div>
            </div>
        </div>
    )
}

export default AddOrder
