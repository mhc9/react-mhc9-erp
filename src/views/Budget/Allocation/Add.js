import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { getBudget } from '../../../features/slices/budget/budgetSlice'
import { resetSuccess } from '../../../features/slices/budget-allocation/budgetAllocationSlice'
import AllocationForm from './Form'
import Loading from '../../../components/Loading'
import { toast } from 'react-toastify'

const AddAllocation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { budget, isLoading } = useSelector(state => state.budget);
    const { isSuccess } = useSelector(state => state.budgetAllocation);

    useEffect(() => {
        if (id) dispatch(getBudget(id))
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกรายการรับโอนงบสำเร็จ!!');
            dispatch(resetSuccess());
            navigate(-1);
        }
    }, [isSuccess]);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget/allocation' }}>สรุปยอดจัดสรรงบ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/budget/allocation/budget/${id}` }}>รายการจัดสรรงบ</Breadcrumb.Item>
                <Breadcrumb.Item active>รับโอนงบ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รับโอนงบ</h2>
                </div>
            </div>

            <div className="border rounded-md py-3 px-3">
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && budget) && <AllocationForm budget={budget} />}
            </div>
        </div>
    )
}

export default AddAllocation