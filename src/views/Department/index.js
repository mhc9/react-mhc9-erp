import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import DepartmentList from './List'
import AddDepartment from './Add'

const Department = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>กลุ่มงาน</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">กลุ่มงาน</h2>
                </div>

                <AddDepartment />

                <DepartmentList />
            </div>
        </div>
    )
}

export default Department
