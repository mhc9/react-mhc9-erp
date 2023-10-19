import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Col, FormGroup, Row } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa';
import { getAsset } from '../../../features/asset/assetSlice';
import OwnershipList from './Ownership/List';
import OwnershipForm from './Ownership/Form';
import Gallery from './Gallery';
import Loading from '../../../components/Loading';
import AssetHistories from './Histories';

const AssetDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { asset, isLoading } = useSelector(state => state.asset);
    const { success } = useSelector(state => state.ownership);
    const [openOwnershipForm, setOpenOwnershipForm] = useState(false);

    useEffect(() => {
        if (id) dispatch(getAsset({ id }));
    }, [id])

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/asset">รายการพัสดุ</Breadcrumb.Item>
                <Breadcrumb.Item active>{id}</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="content-heading mb-2">
                    <h2 className="flex flex-row items-center gap-1 text-xl">
                        <FaInfoCircle className="text-info" />
                        <span>รายละเอียดพัสดุ : {id}</span>
                    </h2>
                </div>
                
                <div className="content-body mt-2 mb-4">
                    {isLoading && <div className="text-center"><Loading /></div>}
                    {!isLoading && asset && (
                        <>
                            <Row className="mb-3">
                                <Col md={4}>
                                    <Gallery asset={asset} />
                                </Col>
                                <Col>
                                    <Row className="mb-2">
                                        <Col md={4}>
                                            <FormGroup>
                                                <label>หมายเลขพัสดุ</label>
                                                <div className="form-control min-h-[34px] text-sm font-thin">
                                                    {asset.asset_no}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={8}>
                                            <FormGroup>
                                                <label>ชื่อพัสดุ</label>
                                                <div className="form-control min-h-[34px] text-sm font-thin">
                                                    {asset.name}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>ชนิดพัสดุ</label>
                                                <div className="form-control min-h-[34px] text-sm font-thin">
                                                    {asset.group?.category?.name}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>กลุ่มพัสดุ</label>
                                                <div className="form-control min-h-[34px] text-sm font-thin">
                                                    {asset.group?.name}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>ยี่ห้อ</label>
                                                <div className="form-control min-h-[34px] text-sm font-thin">
                                                    {asset.brand?.name}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>รุ่น</label>
                                                <div className="form-control min-h-[34px] text-sm font-thin">
                                                    {asset.model}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>ราคา</label>
                                                <div className="form-control min-h-[34px] text-sm font-thin">
                                                    {asset.price_per_unit}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>หน่วยนับ</label>
                                                <div className="form-control min-h-[34px] text-sm font-thin">
                                                    {asset.unit?.name}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>รายละเอียด</label>
                                                <div className="form-control text-sm font-thin h-20">
                                                    {asset.description}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>หมายเหตุ</label>
                                                <div className="form-control text-sm font-thin h-20">
                                                    {asset.remark}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="flex flex-row items-center justify-between mb-2">
                                        <h3 className="mb-2 font-bold">ผู้รับผิดชอบ</h3>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary text-sm"
                                            onClick={() => setOpenOwnershipForm(true)}
                                            disabled={success}
                                        >
                                            เพิ่มผู้รับผิดชอบ
                                        </button> 
                                    </div>
                                    <OwnershipList
                                        assetId={id ? id : ''}
                                        isUpdated={success}
                                    />

                                    <OwnershipForm
                                        isOpen={openOwnershipForm}
                                        handleHide={() => setOpenOwnershipForm(false)}
                                        assetId={id}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="flex flex-row items-center justify-between mb-2">
                                        <h3 className="mb-2 font-bold">ประวัติการซ่อมบำรุง</h3>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary text-sm"
                                            onClick={() => setOpenOwnershipForm(true)}
                                            disabled={success}
                                        >
                                            เพิ่มประวัติ
                                        </button> 
                                    </div>

                                    <AssetHistories />
                                </Col>
                            </Row>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AssetDetail
