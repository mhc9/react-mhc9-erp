import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import RequisitionForm from './Form'
import { getRequisition } from '../../features/slices/requisition/requisitionSlice'

const EditRequisition = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { requisition } = useSelector(state => state.requisition);

    useEffect(() => {
        if (id) dispatch(getRequisition({ id }));
    }, [dispatch, id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/requisition' }}>รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขรายการคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แก้ไขรายการคำขอ (ID #{id})</h2>

                <div className="my-2 border p-4 rounded-md">
                    <RequisitionForm requisition={requisition} />
                </div>
            </div>
        </div>
    )
}

export default EditRequisition
