import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash, FaRegEye, FaRegEyeSlash   } from 'react-icons/fa'
import { toast } from 'react-toastify'
import moment from 'moment'
import { generateQueryString } from '../../utils'
import { getBudgets, destroy, toggle, resetDeleted, resetSuccess } from '../../features/slices/budget/budgetSlice'
import FilteringInputs from './FilteringInputs'
import PlanDropdown from './PlanDropdown'
import Pagination from '../../components/Pagination'
import Loading from '../../components/Loading'

const initialFilters = {
    year: moment().year(),
    name: '',
    plan: '',
    project: '',
};

const BudgetList = () => {
    const dispatch = useDispatch();
    const { budgets, pager, isLoading, isSuccess, isDeleted } = useSelector(state => state.budget);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getBudgets({ url: `/api/budgets/search?page=${params}` }));
        } else {
            dispatch(getBudgets({ url: `${apiEndpoint}${params}` }));
        }
    }, [apiEndpoint]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกข้อมูลงบประมาณสำเร็จ!!');
            dispatch(resetSuccess());
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isDeleted) {
            toast.success('ลบรายการงบประมาณสำเร็จ!!');
            dispatch(resetDeleted());
        }
    }, [isDeleted]);

    const handleDelete = (id) => {
        if (window.confirm(`คุณต้องการลบรายการงบประมาณ รหัส ${id} ใช่หรือไม่?`)) {
            dispatch(destroy(id));
        }
    };

    const handleToggleActive = (id, status) => {
        if (window.confirm(`คุณต้องการแก้ไขสถานะงบประมาณ รหัส ${id} ใช่หรือไม่?`)) {
            dispatch(toggle({ id, data: {status: status === 1 ? 0 : 1 } }));
        }
    };

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>งบประมาณ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการงบประมาณ</h2>
                    <div className="flex flex-row gap-1">
                        <PlanDropdown />
                        <Link to="add" className="btn btn-primary">เพิ่มรายการ</Link>
                    </div>
                </div>

                <FilteringInputs
                    initialFilters={initialFilters}
                    onFilter={(queryStr) => {
                        setParams(queryStr);
                        setApiEndpoint(prev => prev === '' ? `/api/budgets/search?page=` : '');
                    }}
                />

                <div>
                    <table className="table table-bordered text-sm mb-2">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th>รายการ</th>
                                <th className="text-center w-[18%]">รหัส New GFMIS</th>
                                <th className="text-center w-[6%]">ปีงบประมาณ</th>
                                <th className="text-center w-[6%]">สถานะ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && <tr><td className="text-center" colSpan={6}><Loading /></td></tr>}
                            {!isLoading && budgets?.map((budget, index) => (
                                <tr className="font-thin" key={budget.id}>
                                    <td className="text-center">{pager && pager.from+index}</td>
                                    <td>
                                        <p className="font-normal">
                                            {budget.project?.plan?.plan_no} {budget.project?.plan?.name}
                                        </p>
                                        <p>{budget.project?.name} <span className="text-xs">({budget.project?.gfmis_id})</span></p>
                                        <p className="font-bold text-primary">{budget.name}</p>
                                    </td>
                                    <td className="text-center font-bold text-primary">{budget.gfmis_id}</td>
                                    <td className="text-center">{budget.year && budget.year + 543}</td>
                                    <td className="text-center">
                                        <div className="flex justify-center cursor-pointer" onClick={() => handleToggleActive(budget.id, budget.status)}>
                                            {budget.status === 0
                                                ? <FaRegEyeSlash size={20} color='gray' />
                                                : <FaRegEye size={20} color='green' />
                                            }
                                        </div>
                                    </td>
                                    <td className="text-center p-1">
                                        <Link to={`/budget/${budget.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/budget/${budget.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(budget.id)}>
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

export default BudgetList