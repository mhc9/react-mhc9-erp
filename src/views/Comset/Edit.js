import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import ComsetForm from './Form'

const EditComset = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/comset">ชุดคอมพิวเตอร์</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขชุดคอมพิวเตอร์</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แก้ไขชุดคอมพิวเตอร์</h2>

                <div className="my-2 border p-4 rounded-md">
                    <ComsetForm />
                </div>
            </div>
        </div>
    )
}

    export default EditComset
