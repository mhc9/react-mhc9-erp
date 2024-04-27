import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { getLoan } from '../../features/slices/loan/loanSlice'
import LoanForm from './Form'
import Loading from '../../components/Loading'

const EditLoan = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loan, isLoading } = useSelector(state => state.loan);

    useEffect(() => {
        if (id) {
            dispatch(getLoan(id));
        }
    }, [id]);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item href="/loan">รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขคำขอ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-xl font-bold mb-1">แก้ไขคำขอ (ID: {id})</h1>

                {isLoading
                    ? <div className="text-center"><Loading /></div>
                    : <LoanForm loan={loan} />
                }
            </div>
        </div>
    )
}

export default EditLoan