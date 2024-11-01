import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { getAllocations } from '../../../features/slices/budget-allocation/budgetAllocationSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/Loading'
import { currency, toShortTHDate } from '../../../utils'

const AllocationList = () => {
    const dispatch = useDispatch();
    const { allocations, pager, isLoading } = useSelector(state => state.budgetAllocation);
    const [endpoint, setEndpoint] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getAllocations({ url: `/api/budget-allocations/search` }));
        } else {
            dispatch(getAllocations({ url: `${endpoint}` }));
        }
    }, [endpoint]);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget-plan' }}>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการจัดสรรงบ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการจัดสรรงบ</h2>
                    <div className="flex flex-row gap-1">
                        <Link to={`/budget/allocation/add`} className="btn btn-primary">
                            เพิ่มรายการ
                        </Link>
                    </div>
                </div>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">อ้างอิง</th>
                                <th>รายละเอียด</th>
                                <th className="text-center w-[15%]">ยอดรับโอน</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && <tr><td className="text-center" colSpan={5}><Loading /></td></tr>}
                            {(!isLoading && allocations) && allocations.map((allocation, index) => (
                                <tr>
                                    <td className="text-center">{index+pager?.from}</td>
                                    <td className="text-left">
                                        <p className="font-thin text-sm"><b>เลขที่</b> {allocation.doc_no}</p>
                                        <p className="font-thin text-sm"><b>วันที่</b> {toShortTHDate(allocation.doc_date)}</p>
                                    </td>
                                    <td>{allocation.description}</td>
                                    <td className="text-center">{currency.format(allocation.total)}</td>
                                    <td className="text-center">

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllocationList