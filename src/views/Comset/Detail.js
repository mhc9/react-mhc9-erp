import React from 'react'
import { Breadcrumb } from 'react-bootstrap'

const ComsetDetail = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดชุดคอมพิวเตอร์</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">รายละเอียดชุดคอมพิวเตอร์</h2>

                <div className="my-2 border p-4 rounded-md">

                </div>
            </div>
        </div>
    )
}

    export default ComsetDetail
