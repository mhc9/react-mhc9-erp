import React, { useEffect } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getBudgetPlans } from '../../../features/slices/budget-plan/budgetPlanSlice'
import Loading from '../../../components/Loading'

const BudgetPlanList = () => {
    const dispatch = useDispatch();
    const { plans, pager, isLoading } = useSelector(state => state.budgetPlan);

    useEffect(() => {
        dispatch(getBudgetPlans({ url: `/api/budget-plans/search` }));
    }, []);

    const handleDelete = (id) => {

    };

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/budget' }}>งบประมาณ</Breadcrumb.Item>
                <Breadcrumb.Item active>แผนงาน</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">แผนงาน</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มรายการ</Link>
                </div>

                <div>
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="w-[5%] text-center">#</th>
                                <th>แผนงาน</th>
                                <th className="w-[10%] text-center">ปีงบประมาณ</th>
                                <th className="w-[10%] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td colSpan={4} className="text-center"><Loading /></td>
                                </tr>
                            )}
                            {!isLoading && plans.map((plan, index) => (
                                <tr key={plan.id}>
                                    <td className="text-center">{index+1}</td>
                                    <td>{plan.plan_no} {plan.name}</td>
                                    <td className="text-center">{plan.year && plan.year+543}</td>
                                    <td className="text-center p-1">
                                        <Link to={`/budget-plan/${plan.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/budget-plan/${plan.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(plan.id)}>
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

export default BudgetPlanList