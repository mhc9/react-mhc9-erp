import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'

const AssetDetail = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดพัสดุ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายละเอียดพัสดุ</h2>
                    
                </div>
            </div>
        </div>
    )
}

export default AssetDetail
