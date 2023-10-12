import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { resetSuccess } from '../../features/order/orderSlice'
import InspectionForm from './Form'

const AddInspection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSuccess } = useSelector(state => state.order);

    useEffect(() => {
        if (isSuccess) {
            toast.success("บันทึกข้อมูลการสั่งซื้อ/จ้างเรียบร้อยแล้ว!!");

            dispatch(resetSuccess());

            navigate('/order');
        }
    }, [isSuccess]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item href="/inspection">รายการตรวจรับพัสดุ</Breadcrumb.Item>
                <Breadcrumb.Item active>ตรวจรับพัสดุ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">บันทึกตรวจรับพัสดุ</h2>

                <div className="my-2 border p-4 rounded-md">
                    <InspectionForm />
                </div>
            </div>
        </div>
    )
}

export default AddInspection
