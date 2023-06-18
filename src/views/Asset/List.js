import React, { useEffect, useState } from 'react'
import { Breadcrumb, Col, Pagination, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FaSearch, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getAssets } from '../../features/asset/assetSlice';
import Loading from '../../components/Loading';
import FilteringInput from './FilteringInput';
import moment from 'moment';

const initialFilters = {
    assetNo: '',
    name: '',
    category: '',
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
        const filterStr = `&name=${filters.name}&category=${filters.category}&owner=${filters.owner}`

        setApiEndpoint(`/api/assets/search?page=${filterStr}`);
    }, [filters]);

    const handleClickPage = (url) => {
        const filterStr = `&name=${filters.name}&category=${filters.category}&owner=${filters.owner}`

        setApiEndpoint(`${url}${filterStr}`);
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

                <FilteringInput filters={filters} onFilter={setFilters} />

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
                                <tr key={asset.id}>
                                    <td className="text-center">{index+pager.from}</td>
                                    <td className="text-center text-sm">{asset.asset_no}</td>
                                    <td className="font-thin">
                                        <p className="text-gray-500 text-sm">{asset.group?.category?.name}</p>
                                        <p>{asset.name}</p>
                                        <span className="font-bold ml-1">ยี่ห้อ: </span>{asset.brand.name} 
                                        <span className="font-bold ml-1">รุ่น: </span>{asset.model ? asset.model : '-'}
                                        <span className="font-bold ml-1">ซื้อเมื่อปี: </span>{asset.first_year ? asset.first_year : '-'}
                                        {/* <p className="text-sm font-thin text-gray-500 ml-1">{asset.description}</p> */}
                                        <p className="text-sm font-thin text-red-400">
                                            <span className="font-bold">หมายเหตุ: </span>{asset.remark ? asset.remark : '-'}
                                        </p>
                                    </td>
                                    <td className="text-sm text-center">
                                        {`${calcUsedAge(asset.first_year)}ปี`}
                                    </td>
                                    <td className="text-sm">
                                        {asset.current_owner.length > 0 && `${asset.current_owner[0].owner.prefix.name}${asset.current_owner[0].owner.firstname} ${asset.current_owner[0].owner.lastname}`}
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/asset/${asset.id}/detail`} className="btn btn-sm btn-info mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/asset/${asset.id}/edit`} className="btn btn-sm btn-warning mr-1">
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
