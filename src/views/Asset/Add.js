import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import AssetForm from './Form'
import { resetSuccess } from '../../features/asset/assetSlice'

const AddAsset = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success } = useSelector(state => state.asset);

    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());

            navigate('/asset');
        }
    }, [success]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/asset">รายการพัสดุ</Breadcrumb.Item>
                <Breadcrumb.Item active>เพิ่มพัสดุใหม่</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">เพิ่มพัสดุใหม่</h2>

                <div className="my-2 border p-4 rounded-md">
                    <AssetForm />
                </div>
            </div>
        </div>
    )
}

    export default AddAsset
