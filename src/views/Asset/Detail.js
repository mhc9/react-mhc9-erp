import React from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'

const AssetDetail = () => {
    const { id } = useParams();

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/asset">รายการพัสดุ</Breadcrumb.Item>
                <Breadcrumb.Item active>{id}</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายละเอียดพัสดุ : {id}</h2>

                </div>
            </div>
        </div>
    )
}

export default AssetDetail
