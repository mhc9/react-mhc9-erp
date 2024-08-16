import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import BudgetProjectForm from './Form'

const AddBudgetProject = () => {
    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item>หน้าหลัก</Breadcrumb.Item>
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