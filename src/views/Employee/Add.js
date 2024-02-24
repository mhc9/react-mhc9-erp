import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import EmployeeForm from './Form'

const AddEmployee = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/employee" }}>บุคลากร</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มบุคลากรใหม่</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">เพิ่มบุคลากรใหม่</h2>

                <div className="my-2 border p-4 rounded-md">
                    <EmployeeForm />
                </div>
            </div>
        </div>
    )
}

    export default AddEmployee
