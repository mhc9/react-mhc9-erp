import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Pagination } from 'react-bootstrap';
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa';
import Loading from '../../components/Loading';
import FilteringInputs from '../../components/Item/FilteringInputs'
import Item from '../../components/Item/Item';
import { currency } from '../../utils';
import { getItems, destroy } from '../../features/item/itemSlice';
import { useGetInitialFormDataQuery } from '../../services/item/itemApi'

const initialFilters = {
    name: '',
    category: ''
};

const initialFormData = {
    units: [],
    categories: [],
};

const ItemList = () => {
    const dispatch = useDispatch();
    const { items, pager, isLoading } = useSelector(state => state.item);
    const { data: formData = initialFormData } = useGetInitialFormDataQuery();
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getItems({ url: `/api/items/search?page=${params}` }));
        } else {
            dispatch(getItems({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params]);

    const handlePageClick = (url) => {
        setApiEndpoint(url);
    };

    const handleFilter = (queryStr) => {
        setParams(queryStr);
        setApiEndpoint(`/api/items/search?page=`);
    };

    const handleDelete = (id) => {
        if (window.confirm(`คุณต้องการลบรายการสินค้ารหัส ${id} หรือไม่?`)) {
            dispatch(destroy({ id }));
        }
    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการสินค้า-บริการ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการสินค้า/บริการ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มสินค้า/บริการใหม่</Link>
                </div>
                <div className="mt-2">
                    <FilteringInputs
                        initialFilters={initialFilters}
                        formData={formData}
                        onFilter={handleFilter}
                    />

                    <table className="table table-bordered mb-2">
                        <thead>
                            <tr>
                                <th className="w-[5%] text-center">#</th>
                                <th>ชื่อสินค้า/บริการ</th>
                                <th className="w-[15%] text-center">ราคา</th>
                                <th className="w-[10%] text-center">สถานะ</th>
                                <th className="w-[10%] text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td className="text-center" colSpan={4}><Loading /></td>
                                </tr>
                            )}
                            {(!isLoading && items) && items.map((item, index) => (
                                <tr key={item.id} className="text-sm">
                                    <td className="text-center">{pager && pager.from+index}</td>
                                    <td>
                                        <Item item={item} />
                                    </td>
                                    <td className="text-center">{currency.format(item.price)}</td>
                                    <td className="text-center"></td>
                                    <td className="text-center p-0">
                                        <Link to={`/item/${item.id}/detail`} className="btn btn-outline-primary btn-sm px-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/item/${item.id}/edit`} className="btn btn-outline-warning btn-sm px-1 m-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm px-1"
                                            onClick={() => handleDelete(item.id)}
                                        >
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

export default ItemList