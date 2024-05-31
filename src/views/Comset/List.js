import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getComsets } from '../../features/slices/comset/comsetSlice';
import Loading from '../../components/Loading';

const ComsetList = () => {
    const dispatch = useDispatch();
    const { comsets, pager, loading, success } = useSelector(state => state.comset)

    useEffect(() => {
        dispatch(getComsets());
    }, []);

    console.log(comsets);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>ชุดคอมพิวเตอร์</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">ชุดคอมพิวเตอร์</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มชุดคอมพิวเตอร์</Link>
                </div>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">หมายเลขพัสดุ</th>
                                <th className="text-center w-[15%]">ชุดคอมพิวเตอร์</th>
                                <th>รายละเอียด</th>
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
                            {comsets && comsets.map((com, index) => (
                                <tr key={com.id}>
                                    <td>{index+pager.from}</td>
                                    <td className="text-center text-sm font-thin">{com.asset?.asset_no}</td>
                                    <td className="text-center">{com.name}</td>
                                    <td className="text-center text-sm font-thin">{com.description}</td>
                                    <td className="text-center">
                                        <Link to={`/comset/${com.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/comset/${com.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && comsets.length <= 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center">
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

export default ComsetList
