import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'

const AddAllocation = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget/allocation' }}>รายการจัดสรรงบ</Breadcrumb.Item>
                <Breadcrumb.Item active>รับโอนงบ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รับโอนงบ</h2>
                </div>
            </div>
        </div>
    )
}

export default AddAllocation