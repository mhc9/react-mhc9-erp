import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import BudgetForm from './Form'

const AddBudget = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget' }}>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มงบประมาณ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">เพิ่มงบประมาณ</h2>
                </div>

                <div className="border rounded-md py-5">
                    <BudgetForm />
                </div>
            </div>
        </div>
    )
}

export default AddBudget