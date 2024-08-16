import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import BudgetPlanForm from './Form'

const AddBudgetPlan = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget' }}>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget-plan' }}>แผนงาน</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มแผนงาน</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">เพิ่มแผนงาน</h2>
                </div>

                <BudgetPlanForm />
            </div>
        </div>
    )
}

export default AddBudgetPlan