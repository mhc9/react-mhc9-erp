import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { getBudget, resetSuccess } from '../../features/slices/budget/budgetSlice'
import BudgetForm from './Form'
import Loading from '../../components/Loading'
import { toast } from 'react-toastify'

const EditBudget = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { budget, isLoading, isSuccess } = useSelector(state => state.budget);

    useEffect(() => {
        if (id) dispatch(getBudget(id));
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("บันทึกการแก้ไขงบประมาณสำเร็จ!!")
            dispatch(resetSuccess());
        }
    }, [isSuccess]);

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
                    {isLoading && <div className="text-center"><Loading /></div>}
                    {(!isLoading && budget) && <BudgetForm budget={budget} />}
                </div>
            </div>
        </div>
    )
}

export default EditBudget