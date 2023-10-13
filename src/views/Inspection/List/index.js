import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { currency, toShortTHDate } from '../../../utils'
import { useGetInitialFormDataQuery } from '../../../services/inspection/inspectionApi'
import { getInspections } from '../../../features/inspection/inspectionSlice'
import Loading from '../../../components/Loading'
import Pagination from '../../../components/Pagination'
// import FilteringInputs from '../../../components/Requisition/FilteringInputs'

const initialFilters = {
    po_no: '',
    po_date: '',
    supplier: '',
    status: '1',
};

const initialFormData = {
    suppliers: []
};

const InspectionList = () => {
    const dispatch = useDispatch();
    const { inspections, pager, isLoading } = useSelector(state => state.inspection);
    const { data: fornData = initialFormData, isLoading: loading } = useGetInitialFormDataQuery();
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getInspections({ url: '/api/inspections/search?page=&status=1' }));
        } else {
            dispatch(getInspections({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params]);

    const handleFilter = (queryString) => {
        setParams(queryString);

        setApiEndpoint('/api/inspections/search?page=')
    };

    const handleDelete = (id) => {

    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการตรวจรับพัสดุ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการตรวจรับพัสดุ</h2>
                    <Link to="add" className="btn btn-primary">บันทึกตรวจรับพัสดุ</Link>
                </div>

                <div>
                    {/* <FilteringInputs
                        initialFilters={initialFilters}
                        formData={fornData}
                        onFilter={handleFilter}
                    /> */}

                    <table className="table table-bordered text-sm">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[10%]">วันที่ตรวจรับ</th>
                                <th>รายการ</th>
                                <th className="text-center w-[12%]">ยอดซื้อ/จ้าง</th>
                                {/* <th className="text-center w-[20%]">ผู้ขอ</th> */}
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
                            {!isLoading && inspections && inspections.map((inspection, index) => (
                                <tr key={inspection.id} className="font-thin">
                                    <td className="text-center">{pager && pager.from+index}</td>
                                    <td className="text-center">{toShortTHDate(inspection.inspect_date)}</td>
                                    <td>
                                        <p className="font-bold text-lg">{inspection.supplier?.name}</p>
                                        <p className="mb-1">
                                            เลขที่ใบส่งของ: <span className="badge rounded-pill text-bg-primary mr-2">{inspection.deliver_no}</span>
                                            วันที่: <span className="badge rounded-pill text-bg-primary">{toShortTHDate(inspection.deliver_date)}</span>
                                        </p>
                                        <p>รายการ{inspection.order.requisition?.topic} จำนวน {currency.format(inspection.item_count)} รายการ</p>
                                    </td>
                                    <td className="text-right"><b>{currency.format(inspection.net_total)}</b> บาท</td>
                                    {/* <td>
                                        <p className="font-bold">{order.requisition?.requester?.prefix?.name}{order.requisition?.requester?.firstname} {order.requisition?.requester?.lastname}</p>
                                        <p className="text-xs">{order.requisition?.requester?.position?.name}{order.requisition?.requester?.level && order.requisition?.requester?.level?.name}</p>
                                    </td> */}
                                    <td className="text-center">
                                        {inspection.status === 1 && <span className="badge rounded-pill text-bg-success">ครบแล้ว</span>}
                                        {inspection.status === 2 && <span className="badge rounded-pill text-bg-danger">ยังไม่ครบ</span>}
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/inspection/${inspection.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/inspection/${inspection.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(inspection.id)}>
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

export default InspectionList
