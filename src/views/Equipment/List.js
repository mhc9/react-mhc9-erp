import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getEquipments } from '../../features/equipment/equipmentSlice';

const EquipmentList = () => {
    const dispatch = useDispatch();
    const { equipments, pager, loading, success } = useSelector(state => state.equipment)

    useEffect(() => {
        dispatch(getEquipments());
    }, []);

    console.log(equipments);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>อุปกรณ์</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">อุปกรณ์</h2>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={2} className="text-center">
                                        <Spinner animation="border" role="status" size="sm" style={{ marginRight: '2px' }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </td>
                                </tr>
                            )}
                            {equipments && equipments.map((eq, index) => (
                                <tr key={eq.id}>
                                    <td>{index+pager.from}</td>
                                    <td>{eq.description}</td>
                                    <td>
                                        <Link to={`/equipments/${eq.id}/edit`} className="btn btn-sm btn-warning">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && equipments.length <= 0 && (
                                <tr>
                                    <td colSpan={2} className="text-center">
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

export default EquipmentList
