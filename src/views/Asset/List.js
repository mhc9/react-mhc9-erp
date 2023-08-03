import React, { useEffect, useState } from 'react'
import { Breadcrumb, Col, Pagination, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FaSearch, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getAssets, destroy } from '../../features/asset/assetSlice';
import Loading from '../../components/Loading';
import AssetFilteringInput from '../../components/Asset/FilteringInput';
import moment from 'moment';
import Asset from '../../components/Asset/Asset';

const initialFilters = {
    assetNo: '',
    name: '',
    category: '',
    group: '',
    owner: '',
};

const AssetList = () => {
    const dispatch = useDispatch();
    const { assets, pager, loading, success } = useSelector(state => state.asset)
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getAssets({ url: `/api/assets/search` }));
        } else {
            dispatch(getAssets({ url: apiEndpoint }));
        }
    }, [apiEndpoint]);

    useEffect(() => {
        const filterStr = `&name=${filters.name}&category=${filters.category}&group=${filters.group}&owner=${filters.owner}`

        setApiEndpoint(`/api/assets/search?page=${filterStr}`);
    }, [filters]);

    const handleClickPage = (url) => {
        const filterStr = `&name=${filters.name}&category=${filters.category}&group=${filters.group}&owner=${filters.owner}`

        setApiEndpoint(`${url}${filterStr}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('คุณต้องการลบรายการครุภัณฑ์ใช่หรือไม่?')) {
            dispatch(destroy({ id }));
        }
    };

    const calcUsedAge = (firstYear) => {
        return moment().year() - (firstYear-543);
    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการพัสดุ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการพัสดุ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มพัสดุใหม่</Link>
                </div>

                <AssetFilteringInput filters={filters} onFilter={setFilters} />

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[20%]">เลขที่พัสดุ</th>
                                <th>รายละเอียด</th>
                                <th className="text-center w-[10%]">อายุใช้งาน</th>
                                <th className="text-center w-[20%]">ผู้รับผิดชอบ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                            {assets && assets.map((asset, index) => (
                                <tr key={asset.id} className="font-thin">
                                    <td className="text-center">{index+pager.from}</td>
                                    <td className="text-center text-sm">{asset.asset_no}</td>
                                    <td><Asset asset={asset} /></td>
                                    <td className="text-sm text-center">
                                        {`${calcUsedAge(asset.first_year)}ปี`}
                                    </td>
                                    <td className="text-sm">
                                        {asset.current_owner.length > 0 && `${asset.current_owner[0].owner.prefix.name}${asset.current_owner[0].owner.firstname} ${asset.current_owner[0].owner.lastname}`}
                                    </td>
                                    <td className="text-center p-1">
                                        <Link to={`/asset/${asset.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/asset/${asset.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(asset.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && assets.length <= 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        -- ไม่มีข้อมูล --
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {pager && (
                    <Pagination>
                        <Pagination.First disabled={pager.current_page === 1} onClick={() => handleClickPage(pager.first_page_url)} />
                        <Pagination.Prev disabled={!pager.prev_page_url} onClick={() => handleClickPage(pager.prev_page_url)} />
                        {/* <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item> */}
                        <Pagination.Next disabled={!pager.next_page_url} onClick={() => handleClickPage(pager.next_page_url)} />
                        <Pagination.Last disabled={pager.current_page === pager.last_page} onClick={() => handleClickPage(pager.last_page_url)} />
                    </Pagination>
                )}
            </div>
        </div>
    )
}

export default AssetList
