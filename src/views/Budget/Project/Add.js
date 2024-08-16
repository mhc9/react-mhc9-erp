import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import BudgetProjectForm from './Form'
import { Link } from 'react-router-dom'

const AddBudgetProject = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget' }}>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget-project' }}>โครงการ/ผลผลิต</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มโครงการ/ผลผลิต</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl">เพิ่มโครงการ/ผลผลิต</h2>
                    </div>

                    <div className="border rounded-md py-5">
                        <BudgetProjectForm />
                    </div>
            </div>
        </div>
    )
}

export default AddBudgetProject