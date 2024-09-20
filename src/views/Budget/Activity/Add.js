import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { resetSuccess } from '../../../features/slices/budget/budgetSlice'
import BudgetActivityForm from './Form'

const AddBudgetActivity = () => {
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const { isSuccess } = useSelector(state => state.budget);

    useEffect(() => {
        if (isSuccess) {
            toast.success("บันทึกข้อมูลกิจกรรมสำเร็จ!!");
            dispatch(resetSuccess());
            navigate("/budget");
        }
    }, [isSuccess]);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget-plan' }}>แผนงาน</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget-project' }}>โครงการ/ผลผลิต</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget' }}>กิจกรรม</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มกิจกรรม</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">เพิ่มกิจกรรม</h2>
                </div>

                <div className="border rounded-md py-5">
                    <BudgetActivityForm />
                </div>
            </div>
        </div>
    )
}

export default AddBudgetActivity