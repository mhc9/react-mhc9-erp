import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getRequisitions } from '../../../features/slices/requisition/requisitionSlice'
import { currency, generateQueryString, toShortTHDate } from '../../../utils'
import DetailList from './DetailList'
import Loading from '../../../components/Loading'
import Pagination from '../../../components/Pagination'
import RequisitionFilteringInputs from '../../../components/Requisition/FilteringInputs'
import EmployeeCard from '../../../components/Employee/Card'

const initialFilters = {
    pr_no: '',
    pr_date: '',
    division: '',
    status: '1'
};

const RequisitionList = () => {
    const dispatch = useDispatch();
    const { requisitions, pager, isLoading } = useSelector(state => state.requisition);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getRequisitions({ url: `/api/requisitions/search?page=&status=1` }));
        } else {
            dispatch(getRequisitions({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params])

    const handleFilter = (queryStr) => {
        setParams(queryStr);

        setApiEndpoint(`/api/requisitions/search?page=`);
    };

    const handleDelete = (id) => {
        console.log(id);
    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการคำขอ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มคำขอ</Link>
                </div>

                <div>
                    <RequisitionFilteringInputs
                        initialFilters={initialFilters}
                        onFilter={handleFilter}
                    />

                    <table className="table table-bordered mb-2">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">เอกสาร</th>
                                <th>รายการ</th>
                                <th className="text-center w-[25%]">ผู้ขอ</th>
                                <th className="text-center w-[8%]">สถานะ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td className="text-center" colSpan={6}><Loading /></td>
                                </tr>
                            )}
                            {(!isLoading && requisitions) && requisitions.map((requisition, index) => (
                                <tr key={requisition.id}>
                                    <td className="text-center">{pager && pager.from + index}</td>
                                    <td className="text-sm">
                                        <p>เลขที่ <span className="badge rounded-pill text-bg-primary">{requisition.pr_no}</span></p>
                                        <p>วันที่ <span className="badge rounded-pill text-bg-primary">{toShortTHDate(requisition.pr_date)}</span></p>
                                    </td>
                                    <td className="text-sm">
                                        <p>
                                            <span className="mr-2">{requisition.category.name} จำนวน {requisition.item_count} รายการ</span>
                                            <span>เป็นเงินทั้งสิ้น {currency.format(requisition.net_total)} บาท</span>
                                        </p>
                                        {requisition.project && (
                                            <div className="text-xs font-thin text-blue-600">
                                                *{requisition.project.name}
                                            </div>
                                        )}

                                        <DetailList items={requisition.details} />
                                    </td>
                                    <td className="text-sm">
                                        <EmployeeCard employee={requisition.requester} />
                                    </td>
                                    <td className="text-center">
                                        {requisition.status === 1 && <span className="badge rounded-pill text-bg-secondary">รอดำเนินการ</span>}
                                        {requisition.status === 2 && <span className="badge rounded-pill text-bg-success">จัดซื้อแล้ว</span>}
                                    </td>
                                    <td className="text-center p-1">
                                        <Link to={`/requisition/${requisition.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/requisition/${requisition.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(requisition.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        pager={pager}
                        onPageClick={(url) => setApiEndpoint(url)}
                    />
                </div>
            </div>
        </div>
    )
}

export default RequisitionList
