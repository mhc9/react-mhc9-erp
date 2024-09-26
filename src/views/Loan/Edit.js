import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getLoan, resetSuccess } from '../../features/slices/loan/loanSlice'
import LoanForm from './Form'
import Loading from '../../components/Loading'

const EditLoan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loan, isLoading, isSuccess } = useSelector(state => state.loan);

    useEffect(() => {
        if (id) dispatch(getLoan(id));
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขข้อมูลคำขอเรียบร้อยแล้ว!!');
            dispatch(resetSuccess());
            navigate('/loan')
        }
    }, [isSuccess]);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/loan' }}>รายการคำขอยืมเงิน</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขคำขอยืมเงิน</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-xl font-bold mb-1">แก้ไขคำขอยืมเงิน (#{id})</h1>

                {isLoading
                    ? <div className="text-center"><Loading /></div>
                    : <LoanForm loan={loan} />
                }
            </div>
        </div>
    )
}

export default EditLoan