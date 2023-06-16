import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import AssetForm from './Form'
import { getAsset } from '../../features/asset/assetSlice'

const EditAsset = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { asset, success } = useSelector(state => state.asset);

    useEffect(() => {
            dispatch(getAsset({ id }));
    }, [id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/asset">รายการพัสดุ</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขพัสดุ</Breadcrumb.Item>
                <Breadcrumb.Item active>{id}</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แก้ไขพัสดุ : {id}</h2>

                <div className="my-2 border p-4 rounded-md">
                    <AssetForm id={id} asset={asset} />
                </div>
            </div>
        </div>
    )
}

    export default EditAsset
