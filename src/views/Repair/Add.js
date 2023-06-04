import React from 'react'
import { Breadcrumb } from 'react-bootstrap'

const AddRepair = () => {
    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">บริการ</Breadcrumb.Item>
                <Breadcrumb.Item active>แจ้งปัญหา/แจ้งซ่อม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แจ้งปัญหา/แจ้งซ่อม</h2>

                
            </div>
        </div>
    )
}

export default AddRepair