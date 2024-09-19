import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import moment from 'moment'
import { generateQueryString } from '../../../utils'
import { getBudgetPlans, resetDeleted, destroy } from '../../../features/slices/budget-plan/budgetPlanSlice'
import FilteringInputs from './FilteringInputs'
import Loading from '../../../components/Loading'
import Pagination from '../../../components/Pagination'

const BudgetPlanList = () => {
    const dispatch = useDispatch();
    const { plans, pager, isLoading, isDeleted } = useSelector(state => state.budgetPlan);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString({ year: moment().year() }))

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getBudgetPlans({ url: `/api/budget-plans/search?page=${params}` }));
        } else {
            dispatch(getBudgetPlans({ url: `${endpoint}${params}` }));
        }
    }, [endpoint]);

    useEffect(() => {
        if (isDeleted) {
            toast.success('ลบรายการแผนงานสำเร็จ!!');
            dispatch(resetDeleted());
            setEndpoint(prev => prev === '' ? '/api/budget-plans/search?page=' : '');
        }
    }, [isDeleted]);

    const handleDelete = (id) => {
        if (window.confirm(`คุณต้องการลบรายการแผนงาน รหัส ${id} ใช่หรือไม่?`)) {
            dispatch(destroy(id))
        }
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

                <FilteringInputs
                    initialFilters={{ year: moment().year() }}
                    onFilter={(queryStr) => {
                        setParams(queryStr);
                        setEndpoint(prev => prev === '' ? `/api/budget-plans/search?page=` : '');
                    }}
                />

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
                                    <td className="hover:text-purple-500"><Link to="/budget-project">{plan.plan_no} {plan.name}</Link></td>
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

                    {(pager && pager.last_page > 1) && (
                        <Pagination
                            pager={pager}
                            onPageClick={(url) => setEndpoint(url)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default BudgetPlanList