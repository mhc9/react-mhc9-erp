import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import Pagination from '../../../components/Pagination'
import { getSuppliers } from '../../../features/supplier/supplierSlice'

const SupplierList = () => {
    const dispatch = useDispatch();
    const { suppliers, pager, isLoading } = useSelector(state => state.supplier);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        dispatch(getSuppliers({ url: `/api/suppliers/search` }))
    }, []);

    const handleFilter = (queryStr) => {
        setParams(queryStr);
        setApiEndpoint(`/api/suppliers/search?page=`);
    };

    const handleDelete = (id) => {

    };

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
                    <table className="table table-bordered text-sm">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="w-[25%]">ชื่อผู้จัดจำหน่าย</th>
                                <th>ที่อยู่</th>
                                <th className="w-[20%]">เจ้าของ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers && suppliers.map((supplier, index) => (
                                <tr className="font-thin">
                                    <td className="text-center">{pager && pager.from + index}</td>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.owner_name}</td>
                                    <td className="text-center">
                                        <Link to={`/supplier/${supplier.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/supplier/${supplier.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(supplier.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    pager={pager}
                    onPageClick={(url) => setApiEndpoint(url)}
                />
            </div>
        </div>
    )
}

export default SupplierList