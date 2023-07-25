import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import EmployeeForm from './Form'

const EditEmployee = () => {
    const { id } = useParams();

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/employee">บุคลากร</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขบุคลากร</Breadcrumb.Item>
                <Breadcrumb.Item active>{id}</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แก้ไขบุคลากร ID: {id}</h2>

                <div className="my-2 border p-4 rounded-md">
                    <EmployeeForm />
                </div>
            </div>
        </div>
    )
}

    export default EditEmployee
