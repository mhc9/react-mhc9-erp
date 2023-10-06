import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getOrders } from '../../../features/order/orderSlice'
import { currency, toShortTHDate } from '../../../utils'
import Loading from '../../../components/Loading'
import Pagination from '../../../components/Pagination'

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, pager, isLoading } = useSelector(state => state.order);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (apiEndpoint) {
            dispatch(getOrders({ url: '/api/orders' }));
        } else {
            dispatch(getOrders({ url: '/api/orders' }));
        }
    }, [dispatch, apiEndpoint, params]);

    const handleFilter = (queryString) => {

    };

    const handleDelete = (id) => {

    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการสั่งซื้อ/จ้าง</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการสั่งซื้อ/จ้าง</h2>
                    <Link to="add" className="btn btn-primary">สร้างคำสั่งซื้อ/จ้าง</Link>
                </div>

                <div>
                    <table className="table table-bordered text-sm">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">เอกสาร</th>
                                <th>รายการ</th>
                                <th className="text-center w-[12%]">ยอดซื้อ/จ้าง</th>
                                <th className="text-center w-[20%]">ผู้ขอ</th>
                                <th className="text-center w-[6%]">สถานะ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td className="text-center" colSpan={7}><Loading /></td>
                                </tr>
                            )}
                            {!isLoading && orders && orders.map((order, index) => (
                                <tr key={order.id} className="font-thin">
                                    <td className="text-center">{pager && pager.from+index}</td>
                                    <td>
                                        <p>เลขที่: <span className="badge rounded-pill text-bg-primary">{order.po_no}</span></p>
                                        <p>วันที่: <span className="badge rounded-pill text-bg-primary">{toShortTHDate(order.po_date)}</span></p>
                                    </td>
                                    <td>
                                        <p>รายการ{order.requisition?.topic} จำนวน {currency.format(order.item_count)} รายการ</p>
                                        <p>จาก {order.supplier?.name}</p>
                                    </td>
                                    <td className="text-right">{currency.format(order.net_total)} บาท</td>
                                    <td>
                                        <p className="font-bold">{order.requisition?.requester?.prefix?.name}{order.requisition?.requester?.firstname} {order.requisition?.requester?.lastname}</p>
                                        <p className="text-xs">{order.requisition?.requester?.position?.name}{order.requisition?.requester?.level && order.requisition?.requester?.level?.name}</p>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge rounded-pill text-bg-success">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/order/${order.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/order/${order.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(order.id)}>
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

export default OrderList
