import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { getLoan } from '../../features/slices/loan/loanSlice'
import LoanContractForm from './Form'
import Loading from '../../components/Loading'

const EditLoanContract = () => {
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
                <Breadcrumb.Item href="/loan-contract">รายการสัญญา</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขสัญญา</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-xl font-bold mb-1">แก้ไขสัญญา (ID: {id})</h1>

                {isLoading
                    ? <div className="text-center"><Loading /></div>
                    : <LoanContractForm loan={loan} />
                }
            </div>
        </div>
    )
}

export default EditLoanContract