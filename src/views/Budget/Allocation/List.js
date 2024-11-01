import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getAllocationsByBudget } from '../../../features/slices/budget-allocation/budgetAllocationSlice'
import { currency, toShortTHDate } from '../../../utils'
import Loading from '../../../components/Loading'
import BudgetTypeBadge from '../../../components/Budget/BudgetTypeBadge'

const AllocationList = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { allocations, pager, isLoading } = useSelector(state => state.budgetAllocation);
    const [endpoint, setEndpoint] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getAllocationsByBudget(id));
        } else {
            // dispatch(getAllocationsByBudget({ url: `${endpoint}` }));
        }
    }, [endpoint]);

    const handleDelete = (id) => {

    };

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget-plan' }}>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget/allocation' }}>สรุปยอดจัดสรรงบ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการจัดสรรงบ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการจัดสรรงบ</h2>
                    <div className="flex flex-row gap-1">
                        <Link to={`/budget/allocation/budget/${id}/add`} className="btn btn-primary">
                            เพิ่มรายการ
                        </Link>
                    </div>
                </div>

                <div>
                    {/* ======================== Budget Detail ======================== */}
                    {isLoading && <div className="text-center" colSpan={5}><Loading /></div>}

                    {(!isLoading && allocations) && (
                        <div className="border rounded-md py-3 px-4 mb-2 leading-6">
                            <p className="text-gray-500">{allocations[0].budget.activity?.project?.plan?.name}</p>
                            <p className="font-semibold">{allocations[0].budget.activity?.project?. name}</p>
                            <p className="font-bold text-blue-600 mr-1">{allocations[0].budget.activity?.name}</p>
                            <p><b>ประเภท</b> <BudgetTypeBadge type={allocations[0].budget.type} /></p>
                            <p><b>ยอดจัดสรรแล้ว</b> {currency.format(allocations[0].budget.total)} <b>บาท</b></p>
                        </div>
                    )}
                    {/* ======================== Budget Detail ======================== */}

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
                            {(!isLoading && allocations) && allocations.map((allocation, index) => (
                                <tr>
                                    <td className="text-center">{index+pager?.from}</td>
                                    <td className="text-left">
                                        <p className="font-thin text-sm"><b>เลขที่</b> {allocation.doc_no}</p>
                                        <p className="font-thin text-sm"><b>วันที่</b> {toShortTHDate(allocation.doc_date)}</p>
                                    </td>
                                    <td>{allocation.description}</td>
                                    <td className="text-center">{currency.format(allocation.total)}</td>
                                    <td className="text-center p-1">
                                        <Link to={`/budget/allocation/budget/${id}/${allocation.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(allocation.id)}>
                                            <FaTrash />
                                        </button>
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