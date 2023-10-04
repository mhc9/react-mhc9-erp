import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import Pagination from '../../../components/Pagination'
import { getSuppliers } from '../../../features/supplier/supplierSlice'

const SupplierList = () => {
    const dispatch = useDispatch();
    const { suppliers, pager, isLoading } = useSelector(state => state.supplier);

    useEffect(() => {
        dispatch(getSuppliers({ url: `/api/suppliers/search` }))
    }, []);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>ผู้จัดจำหน่าย</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
            <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">ผู้จัดจำหน่าย</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มผู้จัดจำหน่าย</Link>
                </div>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ชื่อผู้จัดจำหน่าย</th>
                                <th>ที่อยู่</th>
                                <th>เจ้าของ</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers && suppliers.map((supplier, index) => (
                                <tr>
                                    <td>{pager && pager.from + index}</td>
                                    <td>{supplier.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination pager={pager} />
            </div>
        </div>
    )
}

export default SupplierList