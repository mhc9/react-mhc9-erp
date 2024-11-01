import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { getBudgets } from '../../../features/slices/budget/budgetSlice'
import { getAllocations } from '../../../features/slices/budget-allocation/budgetAllocationSlice'
import { currency } from '../../../utils'
import BudgetTypeBadge from '../../../components/Budget/BudgetTypeBadge'

const AllocationSummary = () => {
    const dispatch = useDispatch();
    const { budgets, pager } = useSelector(state => state.budget);
    const { allocations } = useSelector(state => state.budgetAllocation);

    useEffect(() => {
        dispatch(getBudgets({ url: `/api/budgets/search?page=&year=2025` }));
        dispatch(getAllocations({ url: `/api/budget-allocations/search` }));
    }, []);
    console.log(allocations);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item active>สรุปยอดจัดสรรงบ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">สรุปยอดจัดสรรงบ</h2>
                </div>

                <div>
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="w-[5%] text-center">#</th>
                                <th>กิจกรรม</th>
                                <th className="w-[8%] text-center">ปีงบ</th>
                                <th className="w-[10%] text-center">จำนวนรับโอน</th>
                                <th className="w-[10%] text-center">ยอดจัดสรร</th>
                                <th className="w-[8%] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgets && budgets.map((budget, index) => (
                                <tr>
                                    <td className="text-center">{index+pager?.from}</td>
                                    <td>
                                        <p className="text-sm text-gray-400">{budget.activity?.project?.plan?.name}</p>
                                        <p className="text-sm font-semibold">{budget.activity?.project?. name}</p>
                                        <p>
                                            <span className="font-bold text-blue-600 mr-1">{budget.activity?.name}</span>
                                            <BudgetTypeBadge type={budget.type} />
                                        </p>
                                    </td>
                                    <td className="text-center">{budget.activity && budget.activity?.year+543}</td>
                                    <td className="text-center">{budget.year}</td>
                                    <td className="text-right">{currency.format(budget.total)}</td>
                                    <td className="text-center">
                                        <Link to={`/budget/allocation/activity/${budget.id}`} className="btn btn-primary btn-sm">
                                            จัดสรร
                                        </Link>
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

export default AllocationSummary