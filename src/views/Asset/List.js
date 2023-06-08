import React, { useEffect, useState } from 'react'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getAssets } from '../../features/asset/assetSlice';
import Loading from '../../components/Loading';

const AssetList = () => {
    const dispatch = useDispatch();
    const { assets, pager, loading, success } = useSelector(state => state.asset)

    useEffect(() => {
        dispatch(getAssets());
    }, []);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>พัสดุ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">พัสดุ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มพัสดุใหม่</Link>
                </div>

                <div className="flex flex-col gap-2 my-2">
                    <Row>
                        <Col md={4}>
                            <select className="form-control">
                                <option>-- ชนิดพัสดุ --</option>
                            </select>
                        </Col>
                        <Col md={4}>
                            <input type="text" className="form-control" placeholder="ชื่อพัสดุ" />
                        </Col>
                        <Col md={4}>
                            <select className="form-control">
                                <option>-- ผู้รับผิดชอบ --</option>
                            </select>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[20%]">เลขที่พัสดุ</th>
                                <th>รายละเอียด</th>
                                <th className="text-center w-[20%]">ผู้รับผิดชอบ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                            {assets && assets.map((asset, index) => (
                                <tr key={asset.id}>
                                    <td className="text-center">{index+pager.from}</td>
                                    <td className="text-center text-sm">{asset.asset_no}</td>
                                    <td>
                                        <p className="text-gray-500 text-sm">{asset.category.name}</p>
                                        {asset.description}
                                    </td>
                                    <td className="text-sm">{asset.remark}</td>
                                    <td className="text-center">
                                        <Link to={`/assets/${asset.id}/edit`} className="btn btn-sm btn-warning mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && assets.length <= 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        -- ไม่มีข้อมูล --
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AssetList
