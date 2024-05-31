import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import { getComset } from '../../features/slices/comset/comsetSlice';
import Loading from '../../components/Loading'

const ComsetDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { comset, isLoading } = useSelector(state => state.comset);

    useEffect(() => {
        if (id) {
            dispatch(getComset(id));
        }
    }, [id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/comset">ชุดคอมพิวเตอร์</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดชุดคอมพิวเตอร์</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">รายละเอียดชุดคอมพิวเตอร์</h2>

                {isLoading && (
                    <div className="text-center"><Loading /></div>
                )}

                {(!isLoading && comset) && (
                    <div className="my-2 border p-4 rounded-md">
                        <Row className="mb-4">
                            <Col md={4} className="mb-2">
                                <label for="">ครุภัณฑ์</label>
                                <div className="form-control min-h-[34px] text-sm">
                                    {comset.asset?.asset_no}
                                </div>
                            </Col>
                            <Col md={8}>
                                <label for="">ชื่อชุดคอมพิวเตอร์</label>
                                <div className="form-control min-h-[34px] text-sm">
                                    {comset.name}
                                </div>
                            </Col>
                            <Col className="mb-2">
                                <label for="">ชื่อชุดคอมพิวเตอร์</label>
                                <div className="form-control min-h-[68px] text-sm">
                                    {comset.description}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-row items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold">อุปกรณ์ภายใน</h4>
                                    
                                    <div className="flex flex-row">
                                        <button type="button" className="btn btn-outline-primary btn-sm text-sm">
                                            เพิ่มอุปกรณ์
                                        </button>
                                    </div>
                                </div>

                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="w-[5%] text-center">#</th>
                                            <th className="w-[12%] text-center">ประเภทอุปกรณ์</th>
                                            <th>รายละเอียด</th>
                                            <th className="w-[8%] text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comset.details.map((eq, index) => (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="flex flex-row items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold">อุปกรณ์ต่อพ่วง</h4>
                                    
                                    <div className="flex flex-row">
                                        <button type="button" className="btn btn-outline-primary btn-sm text-sm">
                                            เพิ่มอุปกรณ์
                                        </button>
                                    </div>
                                </div>

                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="w-[5%] text-center">#</th>
                                            <th className="w-[12%] text-center">ประเภทอุปกรณ์</th>
                                            <th>รายละเอียด</th>
                                            <th className="w-[8%] text-center">Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        </div>
    )
}

    export default ComsetDetail
