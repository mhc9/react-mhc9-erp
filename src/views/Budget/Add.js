import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import BudgetForm from './Form'

const AddBudget = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item href="/loan">รายการงบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มงบประมาณ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content px-4 py-2">

                <BudgetForm />

            </div>
        </div>
    )
}

export default AddBudget