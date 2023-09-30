import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Pagination } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getOrders } from '../../../features/order/orderSlice'

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, pager } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getOrders({ url: '/api/orders' }));
    }, [dispatch]);

    const handlePageClick = (e) => {

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
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[18%]">เอกสาร</th>
                                <th>รายการ</th>
                                <th className="text-center w-[18%]">ผู้ขอ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td className="text-center"></td>
                                    <td>
                                        <p className="border">เลขที่: </p>
                                        <p className="border">วันที่: </p>
                                    </td>
                                    <td></td>
                                    <td></td>
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

                    {(pager && pager.last_page > 1) && (
                        <div className="flex flex-row items-center justify-between gap-4">
                            <div className="text-sm font-thin flex flex-row items-center justify-between gap-4 w-3/5">
                                <span>หน้าที่ {pager.current_page}/{pager.last_page}</span>
                                <span>จำนวนทั้งสิ้น {pager.total} รายการ</span>
                            </div>

                            <Pagination>
                                <Pagination.First disabled={pager.current_page === 1} onClick={() => handlePageClick(pager.first_page_url)} />
                                <Pagination.Prev disabled={!pager.prev_page_url} onClick={() => handlePageClick(pager.prev_page_url)} />
                                {/* <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Ellipsis />

                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item>{13}</Pagination.Item>
                                <Pagination.Item disabled>{14}</Pagination.Item>

                                <Pagination.Ellipsis />
                                <Pagination.Item>{20}</Pagination.Item> */}
                                <Pagination.Next disabled={!pager.next_page_url} onClick={() => handlePageClick(pager.next_page_url)} />
                                <Pagination.Last disabled={pager.current_page === pager.last_page} onClick={() => handlePageClick(pager.last_page_url)} />
                            </Pagination>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderList
