import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Col, FormGroup, Row } from 'react-bootstrap'
import OwnershipList from './Ownership/List';
import Loading from '../../components/Loading';
import { getAsset } from '../../features/asset/assetSlice';
import OwnershipForm from './Ownership/Form';

const AssetDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { asset, loading } = useSelector(state => state.asset);
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
                            <div className="mt-2 mb-4">
                                <Row className="mb-2">
                                    <Col md={4}>
                                        <FormGroup>
                                            <label>หมายเลขพัสดุ</label>
                                            <div className="form-control">{asset.asset_no}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={8}>
                                        <FormGroup>
                                            <label>ชื่อพัสดุ</label>
                                            <div className="form-control">{asset.name}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>ประเภทพัสดุ</label>
                                            <div className="form-control">{asset.type.name}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>ชนิดพัสดุ</label>
                                            <div className="form-control">{asset.category.name}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>ยี่ห้อ</label>
                                            <div className="form-control h-10">
                                                {asset.brand?.name}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>รุ่น</label>
                                            <div className="form-control h-10">
                                                {asset.model}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>ราคา</label>
                                            <div className="form-control h-10">
                                                {asset.price_per_unit}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>หน่วยนับ</label>
                                            <div className="form-control h-10">
                                                {asset.unit?.name}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <FormGroup>
                                            <label>รายละเอียด</label>
                                            <div className="form-control h-20">
                                                {asset.description}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="">
                                            <h3 className="mb-2 font-bold">รูปพัสดุ</h3>
                                            <div className="flex flex-row gap-4">
                                                {[1,2,3,4].map((image, index) => (<div key={index} className="border rounded-md w-4/12 h-32">image 1</div>))}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div>
                                <div className="flex flex-row items-center justify-between mb-2">
                                    <h3 className="mb-2 font-bold">ผู้รับผิดชอบ</h3>

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
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
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AssetDetail
