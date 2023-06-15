import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import OwnershipList from './Ownership/List';
import Loading from '../../components/Loading';
import { getAsset } from '../../features/asset/assetSlice';

const AssetDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { asset, loading } = useSelector(state => state.asset);

    useEffect(() => {
        if (id) {
            dispatch(getAsset({ id }));
        }
    }, [id])

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/asset">รายการพัสดุ</Breadcrumb.Item>
                <Breadcrumb.Item active>{id}</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="content-heading flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายละเอียดพัสดุ : {id}</h2>
                </div>
                
                <div className="content-body mt-2 mb-4">
                    {loading && <div className="text-center"><Loading /></div>}
                    {asset && (
                        <>
                            <div className="border mt-2 mb-4">
                                <Row>
                                    <Col>{asset.asset_no}</Col>
                                    <Col>{asset.description}</Col>
                                </Row>
                            </div>

                            <div>
                                <h3>ผู้รับผิดชอบ</h3>
                                <OwnershipList />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AssetDetail
